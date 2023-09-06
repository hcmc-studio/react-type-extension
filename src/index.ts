import {Dispatch, useState} from "react";

export type StatePair<T> = {
    value: T
    setter: Dispatch<T>
}

export type BooleanStatePair = StatePair<boolean> & {
    setTrue(): void
    setFalse(): void
    toggle(): void
}

export type UndefinedStatePair<T> = StatePair<T | undefined> & {
    unset(): void
}

export type ErrorStatePairs = {
    title: StatePair<string>
    body: StatePair<any>
    closeable: BooleanStatePair
    visible: BooleanStatePair
    show(title: string, body: any, closeable?: boolean): void
}

export function useStatePair<T>(defaultValue: T): StatePair<T> {
    const [value, setter] = useState<T>(defaultValue)

    return { value, setter }
}

export function useBooleanPair(defaultValue: boolean = false): BooleanStatePair {
    const [value, setter] = useState<boolean>(defaultValue)

    return {
        value,
        setter,
        setTrue() {
            setter(true)
        },
        setFalse() {
            setter(false)
        },
        toggle() {
            setter(!value)
        }
    }
}

export function useUndefinedPair<T>(defaultValue: T | undefined = undefined): UndefinedStatePair<T> {
    const [value, setter] = useState<T | undefined>(defaultValue)

    return {
        value,
        setter,
        unset() {
            setter(undefined);
        }
    }
}

export type ErrorPairsConfig = {
    title?: string
    body?: any
    closeable?: boolean
    visible?: boolean
}

export function useErrorPairs(config?: ErrorPairsConfig): ErrorStatePairs {
    const states: ErrorStatePairs = {
        title: useStatePair(config?.title ?? ''),
        body: useStatePair(config?.body ?? {}),
        closeable: useBooleanPair(config?.closeable ?? true),
        visible: useBooleanPair(config?.visible ?? false),
        show(title: string, body: any, closeable: boolean = true) {
            states.title.setter(title)
            states.body.setter(body)
            states.closeable.setter(closeable)
            states.visible.setTrue()
        }
    }

    return states
}