import { useCallback, useEffect, useRef } from 'react'
import { useStateWithMutators } from './use-state-with-mutators'

interface OneOfProps<T> {
  initialValue?: T
  items: T[]
}

type OneOfHook<T> = [
  state: T,
  mutators: {
    clear: () => void
    reset: () => void
    set: (next: T) => void
  }
]

export function useOneOf<T = string>({ initialValue, items }: OneOfProps<T>): OneOfHook<T> {
  const [state, mutators] = useStateWithMutators<T>({
    initialValue: items.find(item => item === initialValue)
  })
  const itemsRef = useRef(items)

  const set = useCallback((next: T) => {
    if (itemsRef.current.includes(next)) {
      mutators.set(next)
    }
  }, [])

  useEffect(() => {
    itemsRef.current = items;

    if (!items.includes(state)) {
      mutators.clear()
    }
  }, [items])

  return [state, {
    clear: mutators.clear,
    reset: mutators.reset,
    set,
  }]
}
