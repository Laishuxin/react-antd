import classNames from 'classnames'
import React, { FC, useContext } from 'react'
import { MenuContext } from './context'

interface BaseMenuItemProps {
  index: number
  disabled?: boolean
}

type MenuItemProps = React.HtmlHTMLAttributes<HTMLLIElement> & BaseMenuItemProps
export const MenuItem: FC<MenuItemProps> = props => {
  const { index, disabled, className, ...restProps } = props
  const context = useContext(MenuContext)
  const handleClick = () => {
    if (disabled) {
      return
    }
    context.onSelect?.(index)
  }

  const classes = classNames(
    'antd-menu-item',
    {
      'is-disabled': !!disabled,
      'is-active': index === context.currentActiveIndex,
    },
    className,
  )

  // TODO(rushui 2021-09-17): 采用事件代理实现
  return (
    <li key={index} className={classes} onClick={handleClick} {...restProps} />
  )
}

MenuItem.defaultProps = {
  disabled: false,
}
