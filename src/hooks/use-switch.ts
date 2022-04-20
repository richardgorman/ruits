import { useMemo, useState, Dispatch, SetStateAction } from 'react'

type SwitchHook = [
  isToggled: boolean,
  mutators: {
    flip: () => void
    off: () => void
    on: () => void
    set: Dispatch<SetStateAction<boolean>>
  }
]

export function useSwitch(initialState?: boolean): SwitchHook {
  const [state, set] = useState(initialState ?? false)
  const mutators = useMemo(() => ({
    flip: () => set(current => !current),
    off: () => set(false),
    on: () => set(true),
    set,
  }), [])

  return [state, mutators]
}
