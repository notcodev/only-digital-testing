import type { Key } from 'react'
import type { Swiper as SwiperInstance } from 'swiper/types'

import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useForceUpdate } from '@/hooks/use-force-update'
import { useMediaQuery } from '@/hooks/use-media-query'
import { breakpoints, rem } from '@/lib/consts'

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
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.lg})`)
  const forceUpdate = useForceUpdate()
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)

  return (
    <AnimatePresence initial={false} mode='wait'>
      <motion.div
        key={animationKey}
        animate={{ opacity: 1 }}
        className={clsx(styles.container, className)}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className={clsx(
            styles.slideButtonContainer,
            'visible-from-lg',
          )}
        >
          {!swiper?.isBeginning && (
            <IconButton onClick={() => swiper?.slidePrev()}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </div>
        <Swiper
          slidesPerView={isMobile ? 1.5 : 3}
          spaceBetween={isMobile ? 3 * rem : 5 * rem}
          onSlideChange={forceUpdate}
          onSwiper={setSwiper}
        >
          {events.map((event, index) => (
            <SwiperSlide
              key={index}
              className={
                isMobile
                  ? clsx(
                      styles.mobileSlide,
                      isMobile &&
                        swiper?.activeIndex === index &&
                        styles.active,
                    )
                  : undefined
              }
            >
              <p className={styles.year}>{event.year}</p>
              <p className={styles.description}>
                {event.description}
              </p>
            </SwiperSlide>
          ))}
          c
        </Swiper>
        <div
          className={clsx(
            styles.slideButtonContainer,
            'visible-from-lg',
          )}
        >
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
