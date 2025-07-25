/* tslint:disable */
/* eslint-disable */
/**
 * VOICEVOX ENGINE OSS
 * VOICEVOX OSS の音声合成エンジンです。
 *
 * The version of the OpenAPI document: latest
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Speaker } from './Speaker';
import {
    SpeakerFromJSON,
    SpeakerFromJSONTyped,
    SpeakerToJSON,
} from './Speaker';
import type { SpeakerInfo } from './SpeakerInfo';
import {
    SpeakerInfoFromJSON,
    SpeakerInfoFromJSONTyped,
    SpeakerInfoToJSON,
} from './SpeakerInfo';

/**
 * 音声ライブラリに含まれるキャラクターの情報。
 * @export
 * @interface LibrarySpeaker
 */
export interface LibrarySpeaker {
    /**
     * 
     * @type {Speaker}
     * @memberof LibrarySpeaker
     */
    speaker: Speaker;
    /**
     * 
     * @type {SpeakerInfo}
     * @memberof LibrarySpeaker
     */
    speakerInfo: SpeakerInfo;
}

/**
 * Check if a given object implements the LibrarySpeaker interface.
 */
export function instanceOfLibrarySpeaker(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "speaker" in value;
    isInstance = isInstance && "speakerInfo" in value;

    return isInstance;
}

export function LibrarySpeakerFromJSON(json: any): LibrarySpeaker {
    return LibrarySpeakerFromJSONTyped(json, false);
}

export function LibrarySpeakerFromJSONTyped(json: any, ignoreDiscriminator: boolean): LibrarySpeaker {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'speaker': SpeakerFromJSON(json['speaker']),
        'speakerInfo': SpeakerInfoFromJSON(json['speaker_info']),
    };
}

export function LibrarySpeakerToJSON(value?: LibrarySpeaker | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'speaker': SpeakerToJSON(value.speaker),
        'speaker_info': SpeakerInfoToJSON(value.speakerInfo),
    };
}

