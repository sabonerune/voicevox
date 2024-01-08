import { ref } from "vue";
import semver from "semver";
import { UpdateInfo } from "@/type/preload";

// 最新版があるか調べる
// 現バージョンより新しい最新版があれば`latestVersion`に代入される
export const useFetchNewUpdateInfos = () => {
  const isCheckingFinished = ref<boolean>(false);
  const isShowNotification = ref<boolean>(false);
  const latestVersion = ref("");
  const newUpdateInfos = ref<UpdateInfo[]>([]);

  const skipVersionPromise = window.electron.getSetting("skipUpdateVersion");
  const currentVersionPromise = window.electron
    .getAppInfos()
    .then((obj) => obj.version);

  const url: string | undefined = import.meta.env.VITE_LATEST_UPDATE_INFOS_URL;
  if (!url) {
    throw new Error(
      "VITE_LATEST_UPDATE_INFOS_URLが未設定です。.env内に記載してください。"
    );
  }
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then(async (json) => {
      const currentVersion = await currentVersionPromise;
      newUpdateInfos.value = json.filter((item: UpdateInfo) => {
        return semver.lt(currentVersion, item.version);
      });
      if (newUpdateInfos.value?.length) {
        latestVersion.value = newUpdateInfos.value[0].version;
        const skipVersion = await skipVersionPromise;
        if (
          semver.valid(skipVersion) == undefined ||
          semver.lt(skipVersion, latestVersion.value)
        ) {
          isShowNotification.value = true;
        }
      }
      isCheckingFinished.value = true;
    });

  return {
    isCheckingFinished,
    isShowNotification,
    latestVersion,
    newUpdateInfos,
  };
};
