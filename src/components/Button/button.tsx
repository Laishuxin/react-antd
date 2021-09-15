import React from 'react'
import cx from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

// TODO(rushui 2021-09-15): add success etc.
// TODO(rushui 2021-09-15): use union types instead.
export enum ButtonType {
  Primary = 'primary',
  Link = 'link',
  Danger = 'danger',
  Default = 'default',
}

export interface BaseButtonProps {
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  href?: string
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = BaseButtonProps &
  Partial<NativeAnchorProps & NativeButtonProps>

const Button: React.FC<ButtonProps> = props => {
  const { disabled, size, btnType: buttonType, href, ...restProps } = props
  // btn, btn-lg, btn-primary
  const classes = cx('btn', {
    [`btn-${size}`]: !!size,
    [`btn-${buttonType}`]: !!buttonType,
    disabled: disabled && buttonType === ButtonType.Link,
  })

  if (buttonType === ButtonType.Link && href) {
    // eslint-disable-next-line
    return <a className={classes} href={href} {...restProps} />
  }

  return <button className={classes} disabled={disabled} {...restProps} />
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
