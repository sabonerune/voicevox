/* tslint:disable */
/* eslint-disable */
/**
 * VOICEVOX Engine
 * VOICEVOX の音声合成エンジンです。
 *
 * The version of the OpenAPI document: latest
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 対応しているデバイスの情報
 * @export
 * @interface SupportedDevicesInfo
 */
export interface SupportedDevicesInfo {
    /**
     * CPUに対応しているか
     * @type {boolean}
     * @memberof SupportedDevicesInfo
     */
    cpu: boolean;
    /**
     * CUDA(Nvidia GPU)に対応しているか
     * @type {boolean}
     * @memberof SupportedDevicesInfo
     */
    cuda: boolean;
    /**
     * DirectML(Nvidia GPU/Radeon GPU等)に対応しているか
     * @type {boolean}
     * @memberof SupportedDevicesInfo
     */
    dml: boolean;
}

/**
 * Check if a given object implements the SupportedDevicesInfo interface.
 */
export function instanceOfSupportedDevicesInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "cpu" in value;
    isInstance = isInstance && "cuda" in value;
    isInstance = isInstance && "dml" in value;

    return isInstance;
}

export function SupportedDevicesInfoFromJSON(json: any): SupportedDevicesInfo {
    return SupportedDevicesInfoFromJSONTyped(json, false);
}

export function SupportedDevicesInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SupportedDevicesInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cpu': json['cpu'],
        'cuda': json['cuda'],
        'dml': json['dml'],
    };
}

export function SupportedDevicesInfoToJSON(value?: SupportedDevicesInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cpu': value.cpu,
        'cuda': value.cuda,
        'dml': value.dml,
    };
}

