import { useContext } from 'react'
import { ToggleContext } from 'context/ToggleContext'

export function useToggleContext() {
  return useContext(ToggleContext)
}
