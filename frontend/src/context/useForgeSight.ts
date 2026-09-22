import { useContext } from 'react'
import { ForgeSightContext } from './contextValue'

export function useForgeSight() {
  const context = useContext(ForgeSightContext)
  if (!context) throw new Error('useForgeSight must be used inside ForgeSightProvider')
  return context
}