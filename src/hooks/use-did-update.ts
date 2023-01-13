import { useEffect, useRef } from 'react'

export const useDidUpdate: typeof useEffect = (effect, deps) => {
  const isFirstCall = useRef(false)

  useEffect(() => {
    if (isFirstCall.current) {
      effect()
    } else {
      isFirstCall.current = true
    }
  }, deps)
}
