import { clsx } from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { IconButton } from '../ui/icon-button'

import styles from './styles.module.css'

const numberFormatter = Intl.NumberFormat('ru-RU', {
  style: 'decimal',
  minimumIntegerDigits: 2,
})

export interface PeriodControlsProps {
  className?: string
  current: number
  total: number
  onClickNext: () => void
  onClickPrev: () => void
}

export const PeriodControls = ({
  className,
  current,
  total,
  onClickNext,
  onClickPrev,
}: PeriodControlsProps) => {
  return (
    <div className={clsx(styles.root, 'visible-from-lg', className)}>
      <span className={styles.currentPeriod}>
        {numberFormatter.format(current + 1)} /{' '}
        {numberFormatter.format(total)}
      </span>
      <div className={styles.buttonsContainer}>
        <IconButton
          size='large'
          variant='outlined'
          onClick={onClickPrev}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          size='large'
          variant='outlined'
          onClick={onClickNext}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  )
}
