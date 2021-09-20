import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { IMenuContext, MenuContext } from './context'

type SelectCallback = (index: number) => void
export interface BaseMenuProps {
  defaultIndex?: number
  onSelect?: SelectCallback
  children?: any
  mode?: 'vertical' | 'horizontal'
}
export type MenuProps = Omit<
  React.HtmlHTMLAttributes<HTMLUListElement>,
  keyof BaseMenuProps
> &
  BaseMenuProps

export const Menu: FC<MenuProps> = props => {
  const {
    defaultIndex = 0,
    onSelect,
    mode,
    className,
    children,
    ...restProps
  } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const contextValue: IMenuContext = {
    currentActiveIndex: currentIndex,
    onSelect(index: number) {
      setCurrentIndex(index)
      onSelect?.(index)
    },
  }

  const classes = classNames('antd-menu', `antd-menu-${mode}`, className)
  return (
    <ul className={classes} {...restProps}>
      <MenuContext.Provider value={contextValue}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}
