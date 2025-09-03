import { clsx } from 'clsx'

import styles from './styles.module.css'

export interface DotsIndicatorProps {
  activeIndex: number
  className?: string
  count: number
  onChange?: (index: number) => void
}

export const DotsIndicator = ({
  count,
  activeIndex,
  onChange,
  className,
}: DotsIndicatorProps) => (
  <div className={clsx(styles.container, className)}>
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        className={styles.dotContainer}
        type='button'
        onClick={() => onChange?.(index)}
      >
        <span
          className={clsx(
            styles.dot,
            index === activeIndex && styles.active,
          )}
        />
        <span className='sr-only'>
          {index + 1} из {count}
        </span>
      </button>
    ))}
  </div>
)
