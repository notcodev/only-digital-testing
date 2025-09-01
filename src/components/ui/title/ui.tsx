import { clsx } from 'clsx'

import styles from './styles.module.css'

export interface TitleProps {
  children?: React.ReactNode
  className?: string
  as?: Extract<
    React.ElementType,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  >
}

export const Title = ({
  as: Component = 'h1',
  className,
  ...props
}: TitleProps) => {
  return (
    <Component className={clsx(styles.title, className)} {...props} />
  )
}
