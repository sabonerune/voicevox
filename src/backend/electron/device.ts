import { app } from "electron";

const microsoftVendorId = 0x1414;
const nvidiaVendorId = 0x10de;

function hasVendorId(device: unknown): device is Record<"vendorId", unknown> {
  return device != null && typeof device === "object" && "vendorId" in device;
}

/**
 * GPUモードがサポートされているかどうか。
 * windowsの場合は全GPUに対応。
 * linuxの場合はNVIDIAのみ対応。
 */
export async function hasSupportedGpu(platform: string): Promise<boolean> {
  return app
    .getGPUInfo("basic")
    .then((GPUInfo) => {
      if (
        GPUInfo == null ||
        typeof GPUInfo !== "object" ||
        !("gpuDevice" in GPUInfo) ||
        !Array.isArray(GPUInfo.gpuDevice)
      ) {
        return false;
      }
      if (platform === "win32") {
        // ソフトウエアレンダラーは除外する
        return GPUInfo.gpuDevice.some((device) => {
          if (hasVendorId(device)) {
            switch (device.vendorId) {
              case 0x0000: // Info collection failed to identify a GPU
              case 0xffff: // Chromium internal flag for software rendering
              case 0x15ad: // VMware
                return false;
              case microsoftVendorId:
                // Microsoft software renderer
                return "deviceId" in device && device.deviceId !== 0x008c;
              default:
                return true;
            }
          }
          return false;
        });
      } else if (platform === "linux") {
        return GPUInfo.gpuDevice.some(
          (device) => hasVendorId(device) && device.vendorId === nvidiaVendorId,
        );
      }
      return false;
    })
    .catch(() => false);
}
