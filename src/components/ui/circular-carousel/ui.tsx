import type { MotionValue } from 'framer-motion'
import type { CSSProperties } from 'react'

import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { clsx } from 'clsx'
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

import { useEvent } from '@/hooks/use-event'

import styles from './styles.module.css'

interface CarouselItemProps {
  angle: MotionValue<number>
  delta?: number
  isActive: boolean
  label?: string
  number: number
  shift?: number
  transitionDuration: number
  onClick?: () => void
  circle: {
    cx: number
    cy: number
    R: number
  }
}

const CarouselItem = ({
  angle,
  delta = 0,
  isActive,
  circle,
  number,
  label,
  onClick,
  shift = 0,
  transitionDuration,
}: CarouselItemProps) => {
  const { cx, cy, R } = circle
  const x = useTransform(
    angle,
    (a) => cx + R * Math.cos(a + delta + shift),
  )
  const y = useTransform(
    angle,
    (a) => cy + R * Math.sin(a + delta + shift),
  )

  return (
    <motion.g
      className={clsx(styles.carouselItem, isActive && styles.active)}
      style={{ x, y }}
      onClick={onClick}
    >
      <circle
        className={styles.carouselItemHoverHelper}
        fill='transparent'
      />
      <circle
        className={styles.carouselItemCircle}
        fill='currentColor'
        stroke='currentColor'
      />
      <text
        className={styles.carouselItemNumber}
        fill='currentColor'
        dominantBaseline='middle'
        textAnchor='middle'
      >
        {number}
      </text>
      <AnimatePresence initial={false}>
        {isActive && label && (
          <motion.text
            animate={{
              opacity: 1,
              transition: {
                duration: transitionDuration,
                delay: transitionDuration,
              },
            }}
            className={styles.carouselItemLabel}
            exit={{ opacity: 0 }}
            fill='currentColor'
            initial={{ opacity: 0 }}
            dominantBaseline='middle'
          >
            {label}
          </motion.text>
        )}
      </AnimatePresence>
    </motion.g>
  )
}

export interface CircularCarouselProps {
  active?: number
  className?: string
  defaultActive?: number
  height: number
  items: { id: number; label?: string }[]
  offset?: number
  radius: number
  transitionDuration?: number
  width: number
  onActiveChange?: (index: number) => void
}

export const CircularCarousel = ({
  active: prop,
  defaultActive = 0,
  onActiveChange: onChange,
  items,
  width,
  height,
  radius,
  transitionDuration = 0.6,
  offset: shift,
  className,
}: CircularCarouselProps) => {
  const cx = width / 2
  const cy = height / 2

  const angle = useMotionValue(0)
  const [active, setActive] = useControllableState({
    defaultProp: defaultActive,
    prop,
    onChange,
  })
  const lastActive = useRef(active)

  const onActiveChanged = useEvent(
    (active: number, newActive: number) => {
      setActive(newActive)

      if (
        Math.abs(newActive - active) > Math.floor(items.length / 2)
      ) {
        const currentRadians = active * ((2 * Math.PI) / items.length)
        const lapOffset = Math.sign(newActive - active) * 2 * Math.PI

        angle.set((currentRadians + lapOffset) * -1)
      }

      const newRadians = newActive * ((2 * Math.PI) / items.length)
      animate(angle, newRadians * -1, {
        duration: transitionDuration,
        ease: 'easeInOut',
      })
    },
  )

  useEffect(() => {
    onActiveChanged(lastActive.current, active)
    lastActive.current = active
  }, [active, onActiveChanged])

  return (
    <svg
      style={
        {
          '--transition-duration': `${transitionDuration}s`,
        } as CSSProperties
      }
      className={className}
      height={height}
      width={width}
    >
      <circle
        className={styles.carouselCircle}
        cx={cx}
        cy={cy}
        fill='none'
        r={radius}
      />

      {items.map(({ label, id }, index) => (
        <CarouselItem
          key={id}
          angle={angle}
          circle={{ R: radius, cx, cy }}
          delta={2 * Math.PI * (index / items.length)}
          isActive={index === active}
          label={label}
          number={index + 1}
          shift={shift}
          onClick={() => setActive(index)}
          transitionDuration={transitionDuration}
        />
      ))}
    </svg>
  )
}
