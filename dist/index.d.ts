import { Dispatch, JSX } from "react";
import { ListOptionFilter, ListOptionOrder, SortOrder } from "ts-protocol-extension";
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
export type ListOptionFilterStatePairs<Filter extends ListOptionFilter> = {
    [key in keyof Filter]: StatePair<Filter[key]>;
};
export type ListOptionFilterIndicatorProps<Filter extends ListOptionFilter, Props> = Props & {
    statePairs: ListOptionFilterStatePairs<Filter>;
};
export type ListOptionFilterSelectorProps<Filter extends ListOptionFilter, Props> = Props & {
    selectedKey: keyof Filter;
    statePairs: ListOptionFilterStatePairs<Filter>;
    onDoneClick?: () => void;
};
export interface ListOptionFilterExtension<Filter extends ListOptionFilter, IndicatorProps, SelectorProps> {
    names: Record<keyof Filter, string>;
    useStatePairs(initial?: Partial<Filter>): ListOptionFilterStatePairs<Filter>;
    indicators(props: ListOptionFilterIndicatorProps<Filter, IndicatorProps>): JSX.Element;
    selectors(props: ListOptionFilterSelectorProps<Filter, SelectorProps>): JSX.Element;
}
export type ListOptionOrderStatePairs<Order extends ListOptionOrder> = Record<keyof Order, UndefinedStatePair<SortOrder>>;
export interface ListOptionOrderExtension<Order extends ListOptionOrder> {
    names: Record<keyof Order, string>;
    useStatePairs(initial?: Partial<Order>): ListOptionOrderStatePairs<Order>;
}
