import { clsx } from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'

import { EventsSwiper } from '../events-swiper'
import { AnimatedNumber } from '../ui/animated-number'
import {
  CircularCarousel,
  getOffsetRadians,
} from '../ui/circular-carousel'
import { IconButton } from '../ui/icon-button'
import { Title } from '../ui/title'

import styles from './styles.module.css'

const numberFormatter = Intl.NumberFormat('ru-RU', {
  style: 'decimal',
  minimumIntegerDigits: 2,
})

export interface HistoricalDatesProps {
  data: {
    id: number
    label: string
    events: {
      year: number
      description: string
    }[]
  }[]
}

export const HistoricalDates = ({ data }: HistoricalDatesProps) => {
  const [active, setActive] = useState(0)

  const move = (delta: number) => {
    setActive(
      (prevActive) =>
        (prevActive + delta + data.length) % data.length,
    )
  }

  const events = data[active].events
  const startYear = events[0].year
  const endYear = events[events.length - 1].year

  return (
    <section className={styles.root}>
      <Title>
        Исторические <br />
        даты
      </Title>
      <div className={styles.periodContainer}>
        <AnimatedNumber
          className={clsx(styles.period, styles.periodStartYear)}
          value={startYear}
        />
        <AnimatedNumber
          className={clsx(styles.period, styles.periodEndYear)}
          value={endYear}
        />
        <CircularCarousel
          active={active}
          className={styles.carousel}
          height={600}
          items={data}
          radius={265}
          width={800}
          offset={getOffsetRadians(data.length, -1)}
          onActiveChange={setActive}
        />
      </div>

      <div className={styles.periodControls}>
        <span className={styles.currentPeriod}>
          {numberFormatter.format(active + 1)} /{' '}
          {numberFormatter.format(data.length)}
        </span>
        <div className={styles.periodButtonsContainer}>
          <IconButton
            size='large'
            variant='outlined'
            onClick={() => move(-1)}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            size='large'
            variant='outlined'
            onClick={() => move(1)}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>

      <EventsSwiper
        className={styles.eventsSwiper}
        events={events}
        animationKey={active}
      />
    </section>
  )
}
