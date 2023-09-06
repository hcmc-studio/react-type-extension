import { Dispatch } from "react";
export type StatePair<T> = {
    value: T;
    setter: Dispatch<T>;
};
export type BooleanStatePair = StatePair<boolean> & {
    setTrue(): void;
    setFalse(): void;
    toggle(): void;
};
export type UndefinedStatePair<T> = StatePair<T | undefined> & {
    unset(): void;
};
export type ErrorStatePairs = {
    title: StatePair<string>;
    body: StatePair<any>;
    closeable: BooleanStatePair;
    visible: BooleanStatePair;
    show(title: string, body: any, closeable?: boolean): void;
};
export declare function useStatePair<T>(defaultValue: T): StatePair<T>;
export declare function useBooleanPair(defaultValue?: boolean): BooleanStatePair;
export declare function useUndefinedPair<T>(defaultValue?: T | undefined): UndefinedStatePair<T>;
export type ErrorPairsConfig = {
    title?: string;
    body?: any;
    closeable?: boolean;
    visible?: boolean;
};
export declare function useErrorPairs(config?: ErrorPairsConfig): ErrorStatePairs;
