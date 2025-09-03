import { clsx } from 'clsx'
import { useState } from 'react'

import { EventsSwiper } from '../events-swiper'
import { PeriodControls } from '../period-controls'
import { AnimatedNumber } from '../ui/animated-number'
import { CircularCarousel } from '../ui/circular-carousel'
import { DotsIndicator } from '../ui/dots-indicator'
import { Title } from '../ui/title'

import styles from './styles.module.css'

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
          className={clsx(styles.carousel, 'visible-from-lg')}
          height={600}
          items={data}
          radius={265}
          width={800}
          offset={-Math.PI / 3}
          onActiveChange={setActive}
        />
      </div>
      <PeriodControls
        className={clsx(styles.periodControls, 'visible-from-lg')}
        current={active}
        onClickNext={() => move(1)}
        onClickPrev={() => move(-1)}
        total={data.length}
      />
      <EventsSwiper
        className={styles.eventsSwiper}
        events={events}
        animationKey={active}
      />
      <DotsIndicator
        activeIndex={active}
        className={clsx('hidden-from-lg', styles.periodDotsIndicator)}
        count={data.length}
        onChange={setActive}
      />
    </section>
  )
}
