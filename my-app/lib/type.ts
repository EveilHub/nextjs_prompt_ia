import { ChangeEvent, SubmitEvent } from "react";

export type GalaxyProps = {
    focal?: [number, number];
    rotation?: [number, number];
    starSpeed?: number;
    density?: number;
    hueShift?: number;
    disableAnimation?: boolean;
    speed?: number;
    mouseInteraction?: boolean;
    glowIntensity?: number;
    saturation?: number;
    mouseRepulsion?: boolean;
    twinkleIntensity?: number;
    rotationSpeed?: number;
    repulsionStrength?: number;
    autoCenterRepulsion?: number;
    transparent?: boolean;
};

export type WordType = {
    wordEn: string; 
    wordEs: string; 
    wordDe: string; 
    wordZh: string;
};

export type WordsType = {
    wordsEn: string[]; 
    wordsEs: string[]; 
    wordsDe: string[]; 
    wordsZh: string[];
};

export type TranslationType = {
    translationsEn: { [key: string]: string };
    translationsEs: { [key: string]: string };
    translationsDe: { [key: string]: string };
    translationsZh: { [key: string]: string };
};

export type PropsTranslate = {
    name?: string;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
};