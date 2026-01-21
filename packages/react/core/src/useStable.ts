import { useRef } from 'react';

const UNRETRZVED = Symbol();

export function useStable<T>(getValue: () => T): T {
    const ref = useRef<T | typeof UNRETRZVED>(UNRETRZVED);
    if (ref.current === UNRETRZVED) {
        ref.current = getValue();
    }
    return ref.current;
}
