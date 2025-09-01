import type { Key } from 'react'
import type { Swiper as SwiperInstance } from 'swiper/types'

import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useForceUpdate } from '@/hooks/use-force-update'
import { rem } from '@/lib/consts'

import { IconButton } from '../ui/icon-button'

import styles from './styles.module.css'

export interface EventsSwiperProps {
  animationKey: Key | null
  className?: string
  events: {
    year: number
    description: string
  }[]
}

export const EventsSwiper = ({
  events,
  animationKey,
  className,
}: EventsSwiperProps) => {
  const forceUpdate = useForceUpdate()
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={animationKey}
        animate={{ opacity: 1 }}
        className={clsx(styles.container, className)}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.slideButtonContainer}>
          {!swiper?.isBeginning && (
            <IconButton onClick={() => swiper?.slidePrev()}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={5 * rem}
          onSlideChange={forceUpdate}
          onSwiper={setSwiper}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <p className={styles.year}>{event.year}</p>
              <p className={styles.description}>
                {event.description}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.slideButtonContainer}>
          {!swiper?.isEnd && (
            <IconButton onClick={() => swiper?.slideNext()}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
