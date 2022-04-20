import React, { createContext, useContext } from 'react'
import { ToggleHook, useToggle } from '../hooks/use-toggle'
import { AsProp } from '../shared/types'

const ExpandContext = createContext<ToggleHook | null>(null)

export interface ToggleProps {
  children: React.ComponentType
  initialState?: boolean
}

export interface ToggleButtonProps {
  as: AsProp
  event: 'onChange' | 'onClick'
}

export function Toggle({ children, initialState }: ToggleProps): JSX.Element {
  const toggle = useToggle(initialState)

  return (
    <ExpandContext.Provider value={toggle}>{children}</ExpandContext.Provider>
  )
}

export function ToggleButton({
  as,
  event = 'onClick',
  ...rest
}: ToggleButtonProps) {
  const { flip } = useToggle()
  const Component = as

  return <Component {...rest} {...{ [event]: flip }} />
}

export function ToggleContent({ children }): JSX.Element | null {
  const { isToggled } = useToggleContext()

  return isToggled ? children : null
}

export function useToggleContext() {
  return useContext(ExpandContext)
}
