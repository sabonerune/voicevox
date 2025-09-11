import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { ArtifactCreated } from "electron-builder";

const appimagetoolPath = path.join(
  import.meta.dirname,
  "..",
  "vendored",
  "appimagetool",
  "appimagetool.AppImage",
);

const injectCode = `
if ! unshare -Ur true 2>/dev/null ; then
  args+=("--no-sandbox")
  NUMBER_OF_ARGS=$((NUMBER_OF_ARGS + 1))
fi
`;

/**
 * AppRunスクリプトに'--no-sandbox'が必要か判定して自動的に追加するコードを注入する
 */
async function fixAppRun(appDirPath: string) {
  const appRunPath = path.join(appDirPath, "AppRun");
  const appRun = await fs.readFile(appRunPath, {
    encoding: "utf-8",
  });
  const searchPattern = /^args=\("\$@"\)\nNUMBER_OF_ARGS="\$#"$/m;
  if (!searchPattern.test(appRun)) {
    throw new Error(
      "electron-builder等の更新によりAppRunが予期せぬコードに変更されています。",
    );
  }
  const fixdAppRun = appRun.replace(searchPattern, `$&\n${injectCode}`);
  await fs.writeFile(appRunPath, fixdAppRun);
}

/**
 * デフォルトで作成される.desktopファイルのExecキーから'--no-sandbox'を取り除く
 */
async function fixDesktopfile(appDirPath: string) {
  let desktopfilePath: string | undefined = undefined;
  for await (const value of fs.glob(path.join(appDirPath, "*.desktop"))) {
    desktopfilePath = value;
    break;
  }
  if (desktopfilePath == undefined) {
    throw new Error("*.desktop file is not found");
  }
  const desktopfile = await fs.readFile(desktopfilePath, {
    encoding: "utf-8",
  });
  const fixdDesktopfile = desktopfile.replace(
    /^(Exec=.*)( --no-sandbox(?= |$))(.*)/m,
    "$1$3",
  );
  await fs.writeFile(desktopfilePath, fixdDesktopfile);
}

/*
 * electron-builderが作成したAppImageを修正する
 * appimagetoolで再パッケージすることでlibfuse2をインストール不要にする
 */
export async function appImageArtifactBuildCompleted(
  artifactCreated: ArtifactCreated,
) {
  const artifactPath = artifactCreated.file;
  const tempDir = await fs.mkdtemp(path.join(tmpdir(), "appimage_extract"));
  try {
    execFileSync(artifactPath, ["--appimage-extract"], { cwd: tempDir });
    const appDirPath = path.join(tempDir, "squashfs-root");
    await fixAppRun(appDirPath);
    await fixDesktopfile(appDirPath);
    execFileSync(appimagetoolPath, [
      "--no-appstream",
      appDirPath,
      artifactPath,
    ]);
  } finally {
    await fs.rm(tempDir, { recursive: true });
  }
}
