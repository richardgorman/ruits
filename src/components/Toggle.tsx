import { ReactNode } from 'react'
import { ToggleContext } from 'context/ToggleContext'
import { useToggle } from 'hooks/use-toggle'

interface ToggleProps {
  children: ReactNode
  initialValue?: boolean
}

export function Toggle({ children, initialValue }: ToggleProps) {
  const toggleHook = useToggle(initialValue)

  return (
    <ToggleContext.Provider value={toggleHook}>
      {children}
    </ToggleContext.Provider>
  )
}
