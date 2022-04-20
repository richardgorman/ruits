import { useMemo, useRef, useState, Dispatch, SetStateAction } from "react"

interface StateWithMutatorsProps<T> {
  defaultValue?: T,
  initialValue?: T,
}

type StateWithMutatorsHook<T> = [
  state: T,
  mutators: {
    clear: () => void;
    reset: () => void;
    set: Dispatch<SetStateAction<T>>;
  }
]

export function useStateWithMutators<T>({ defaultValue, initialValue }: StateWithMutatorsProps<T>): StateWithMutatorsHook<T> {
  const defaultValueRef = useRef<T>(defaultValue)
  const [state, set] = useState<T>(initialValue ?? defaultValue)
  const mutators = useMemo(() => ({
    clear: () => set(defaultValueRef.current),
    reset: () => set(initialValue),
    set,
  }), [])

  return [state, mutators]
}