import { useState } from "react";
export function useStatePair(defaultValue) {
    const [value, setter] = useState(defaultValue);
    return { value, setter };
}
export function useBooleanPair(defaultValue = false) {
    const [value, setter] = useState(defaultValue);
    return {
        value,
        setter,
        setTrue() {
            setter(true);
        },
        setFalse() {
            setter(false);
        },
        toggle() {
            setter(!value);
        }
    };
}
export function useUndefinedPair(defaultValue = undefined) {
    const [value, setter] = useState(defaultValue);
    return {
        value,
        setter,
        unset() {
            setter(undefined);
        }
    };
}
export function useErrorPairs(config) {
    const states = {
        title: useStatePair(config?.title ?? ''),
        body: useStatePair(config?.body ?? {}),
        closeable: useBooleanPair(config?.closeable ?? true),
        visible: useBooleanPair(config?.visible ?? false),
        show(title, body, closeable = true) {
            states.title.setter(title);
            states.body.setter(body);
            states.closeable.setter(closeable);
            states.visible.setTrue();
        }
    };
    return states;
}
