import { useMemo, useState, Dispatch, SetStateAction } from 'react'

export type ToggleHook = [
  isToggled: boolean,
  mutators: {
    flip: () => void
    off: () => void
    on: () => void
    set: Dispatch<SetStateAction<boolean>>
  }
]

export function useToggle(initialState?: boolean): ToggleHook {
  const [state, set] = useState(initialState ?? false)
  const mutators = useMemo(() => ({
    flip: () => set(current => !current),
    off: () => set(false),
    on: () => set(true),
    set,
  }), [])

  return [state, mutators]
}
