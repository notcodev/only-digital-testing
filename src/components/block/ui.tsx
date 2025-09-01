import { clsx } from 'clsx'
import { useState } from 'react'

import { AnimatedNumber } from '../ui/animated-number'
import {
  CircularCarousel,
  getShiftRadians,
} from '../ui/circular-carousel'
import { Title } from '../ui/title'
import { data } from './data'

import styles from './styles.module.css'

export const Block = () => {
  const [active, setActive] = useState(0)

  const move = (delta: number) => {
    setActive(
      (prevActive) =>
        (prevActive + delta + data.length) % data.length,
    )
  }

  const startYear = data[active].events[0].year
  const endYear =
    data[active].events[data[active].events.length - 1].year

  return (
    <section>
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
          shift={getShiftRadians(data.length, -1)}
          width={800}
          onActiveChange={setActive}
        />
      </div>

      <button
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'
        type='button'
        onClick={() => move(2)} // move along arc
      >
        Move 45°
      </button>
      <button
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'
        type='button'
        onClick={() => move(-3)} // move along arc
      >
        Move -45°
      </button>
    </section>
  )
}
