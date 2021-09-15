import React from 'react'
import cx from 'classnames'

export enum ButtonSize {
  lg,
  sm,
}

export enum ButtonType {
  default,
  primary,
  secondary,
  success,
  info,
  warning,
  danger,
  light,
  dark,
  link,
}

export interface BaseButtonProps {
  disabled?: boolean
  size?: keyof typeof ButtonSize
  btnType?: keyof typeof ButtonType
  href?: string
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = BaseButtonProps &
  Partial<NativeAnchorProps & NativeButtonProps>

const Button: React.FC<ButtonProps> = props => {
  const { disabled, size, btnType: buttonType, href, ...restProps } = props
  const classes = cx('btn', {
    [`btn-${size}`]: !!size,
    [`btn-${buttonType}`]: !!buttonType,
    disabled: disabled && buttonType === 'link',
  })

  if (buttonType === 'link' && href) {
    // eslint-disable-next-line
    return <a className={classes} href={href} {...restProps} />
  }

  return <button className={classes} disabled={disabled} {...restProps} />
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button
