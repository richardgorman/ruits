import { useDidUpdate } from './use-did-update'
import { useMemo, useState, Dispatch, SetStateAction } from 'react'
import { StateWithMutatorsProps } from './use-state-with-mutators'

export type ToggleHook = [
  isToggled: boolean,
  mutators: {
    flip: () => void
    off: () => void
    on: () => void
    set: Dispatch<SetStateAction<boolean>>
  }
]

export type ToggleHookListener = StateWithMutatorsProps<boolean>['onChange']

export function useToggle(
  initialState?: boolean,
  onChange?: ToggleHookListener
): ToggleHook {
  const [state, set] = useState(initialState ?? false)
  const mutators = useMemo(
    () => ({
      flip: () => set((current) => !current),
      off: () => set(false),
      on: () => set(true),
      set,
    }),
    []
  )

  useDidUpdate(() => {
    onChange?.(state)
  }, [state])

  return [state, mutators]
}
