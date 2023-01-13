import { useMemo, useRef, useState, Dispatch, SetStateAction } from "react"
import { useDidUpdate } from './use-did-update'

export interface StateWithMutatorsProps<T> {
  defaultValue?: T
  initialValue?: T
  onChange?: (state: T) => void
}

export type StateWithMutatorsHook<T> = [
  state: T,
  mutators: {
    clear: () => void
    reset: () => void
    set: Dispatch<SetStateAction<T>>
  }
]

export function useStateWithMutators<T>({
  defaultValue,
  initialValue,
  onChange,
}: StateWithMutatorsProps<T>): StateWithMutatorsHook<T> {
  const defaultValueRef = useRef<T>(defaultValue)
  const [state, set] = useState<T>(initialValue ?? defaultValue)
  const mutators = useMemo(
    () => ({
      clear: () => set(defaultValueRef.current),
      reset: () => set(initialValue),
      set,
    }),
    []
  )

  useDidUpdate(() => {
    onChange?.(state)
  }, [state])

  return [state, mutators]
}