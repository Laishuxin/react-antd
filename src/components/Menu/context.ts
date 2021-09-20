import { createContext } from 'react'
export interface IMenuContext {
  currentActiveIndex: number
  onSelect?: (index: number) => void
}

export const MenuContext = createContext<IMenuContext>({
  currentActiveIndex: 0,
})
