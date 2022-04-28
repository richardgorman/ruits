import { useCallback, useState } from "react"
import { useStateWithMutators } from "./use-state-with-mutators"

type Direction = -1 | 0 | 1

interface SequenceProps<T> {
  initialValue: T
  items: T[]
  loop?: boolean
}

type SequenceHook<T> = [
  state: {
    direction: Direction,
    index: number,
    value: T,
  },
  mutators: {
    goTo: (next: T) => void
    next: () => void
    prev: () => void
    reset: () => void
  }
]

function getNext(items, current) {
  return (current + 1) % items.length
}

function getPrev(items, current) {
  return (current - 1 + items.length) % items.length
}

export function useSequence<T = string>({ initialValue, items, loop }: SequenceProps<T>): SequenceHook<T> {
  const [state, mutators] = useStateWithMutators<T>({ initialValue })
  const [direction, setDirection] = useState<Direction>(0)
  const [index, setIndex] = useState<number>(items.findIndex(item => item === initialValue))

  const goTo = useCallback((next) => {
    const nextIndex = items.findIndex(item => item === next)

    if (index === nextIndex || nextIndex === -1) {
      return
    }

    const nextDirection = nextIndex > index ? 1 : -1

    mutators.set(next)
    setDirection(nextDirection)
    setIndex(nextIndex)
  }, [index, items, mutators.set])

  const next = useCallback(() => {
    if (!loop && index === items.length - 1) {
      return
    }

    const nextValue = items[getNext(items, index)]
  
    mutators.set(nextValue)
    setDirection(1)
    setIndex(current => getNext(items, current))
  }, [index, items, loop, mutators.set])

  const prev = useCallback(() => {
    if (!loop && index === 0) {
      return
    }

    const nextValue = items[getPrev(items, index)]

    mutators.set(nextValue)
    setDirection(-1)
    setIndex(current => getPrev(items, current))
  }, [index, items, loop, mutators.set])

  return [{
    direction,
    index,
    value: state,
  }, {
    goTo,
    next,
    prev,
    reset: mutators.reset,
  }]
}