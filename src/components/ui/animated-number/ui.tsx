import type { SpringOptions } from 'framer-motion'

import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export interface AnimatedNumberProps {
  as?: React.ElementType
  className?: string
  springOptions?: SpringOptions
  value: number
}

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = 'span',
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(
    as as keyof React.JSX.IntrinsicElements,
  )

  const spring = useSpring(value, springOptions)
  const display = useTransform(spring, (current: number) =>
    Math.round(current).toString(),
  )

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <MotionComponent className={className}>{display}</MotionComponent>
  )
}
