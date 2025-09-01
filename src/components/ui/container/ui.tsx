import { clsx } from 'clsx'

import styles from './styles.module.css'

export const Container = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={clsx(styles.container, className)} {...props}>
    <div className={styles.innerContainer}>{children}</div>
  </div>
)
