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
import type { LibrarySpeaker } from './LibrarySpeaker';
import {
    LibrarySpeakerFromJSON,
    LibrarySpeakerFromJSONTyped,
    LibrarySpeakerToJSON,
} from './LibrarySpeaker';

/**
 * 音声ライブラリの情報
 * @export
 * @interface BaseLibraryInfo
 */
export interface BaseLibraryInfo {
    /**
     * 音声ライブラリの名前
     * @type {string}
     * @memberof BaseLibraryInfo
     */
    name: string;
    /**
     * 音声ライブラリのUUID
     * @type {string}
     * @memberof BaseLibraryInfo
     */
    uuid: string;
    /**
     * 音声ライブラリのバージョン
     * @type {string}
     * @memberof BaseLibraryInfo
     */
    version: string;
    /**
     * 音声ライブラリのダウンロードURL
     * @type {string}
     * @memberof BaseLibraryInfo
     */
    downloadUrl: string;
    /**
     * 音声ライブラリのバイト数
     * @type {number}
     * @memberof BaseLibraryInfo
     */
    bytes: number;
    /**
     * 音声ライブラリに含まれるキャラクターのリスト
     * @type {Array<LibrarySpeaker>}
     * @memberof BaseLibraryInfo
     */
    speakers: Array<LibrarySpeaker>;
}

/**
 * Check if a given object implements the BaseLibraryInfo interface.
 */
export function instanceOfBaseLibraryInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "uuid" in value;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "downloadUrl" in value;
    isInstance = isInstance && "bytes" in value;
    isInstance = isInstance && "speakers" in value;

    return isInstance;
}

export function BaseLibraryInfoFromJSON(json: any): BaseLibraryInfo {
    return BaseLibraryInfoFromJSONTyped(json, false);
}

export function BaseLibraryInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseLibraryInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'uuid': json['uuid'],
        'version': json['version'],
        'downloadUrl': json['download_url'],
        'bytes': json['bytes'],
        'speakers': ((json['speakers'] as Array<any>).map(LibrarySpeakerFromJSON)),
    };
}

export function BaseLibraryInfoToJSON(value?: BaseLibraryInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'uuid': value.uuid,
        'version': value.version,
        'download_url': value.downloadUrl,
        'bytes': value.bytes,
        'speakers': ((value.speakers as Array<any>).map(LibrarySpeakerToJSON)),
    };
}

