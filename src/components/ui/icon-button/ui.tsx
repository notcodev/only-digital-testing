import { clsx } from 'clsx'

import styles from './styles.module.css'

export interface IconButtonProps
  extends React.ComponentProps<'button'> {
  size?: 'default' | 'large'
  variant?: 'filled' | 'outlined'
}

export const IconButton = ({
  size = 'default',
  variant = 'filled',
  className,
  type = 'button',
  ...props
}: IconButtonProps) => {
  const composedClassName = clsx(
    styles.iconButton,
    {
      filled: styles.iconButtonVariantFilled,
      outlined: styles.iconButtonVariantOutlined,
    }[variant],
    {
      large: styles.iconButtonSizeLarge,
      default: styles.iconButtonSizeDefault,
    }[size],
    className,
  )

  return (
    <button className={composedClassName} type={type} {...props} />
  )
}
