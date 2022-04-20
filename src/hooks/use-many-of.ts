import { useCallback } from 'react'
import { useStateWithMutators } from './use-state-with-mutators';

interface ManyOfProps<T> {
  items: T[],
  initialValue?: T[],
}

type ManyOfHook<T> = [
  state: T[],
  mutators: {
    deselect: (item: T) => void
    deselectAll: () => void
    flip: (item: T) => void
    reset: () => void
    select: (item: T) => void
    selectAll: () => void
  }
]

export function useManyOf<T = string>({ initialValue, items }: ManyOfProps<T>): ManyOfHook<T> {
  const [state, mutators] = useStateWithMutators<T[]>({
    defaultValue: [],
    initialValue: initialValue?.filter(value => items.includes(value))
  })

  const select = useCallback((item: T): boolean => {
    if (state.includes(item) || !items.includes(item)) {
      return false
    }

    mutators.set(current => current.concat(item))
    return true
  }, [state, items])

  const selectAll = useCallback(() => mutators.set(items), [items])

  const deselect = useCallback((itemToRemove) => {
    mutators.set(current => current.filter(item => item !== itemToRemove))
  }, [])

  const flip = useCallback((item: T) => (
    select(item) || deselect(item)
  ), [deselect, select])

  return [state, {
    deselect,
    deselectAll: mutators.clear,
    flip,
    reset: mutators.reset,
    select,
    selectAll,
  }]
}
