import { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useDidUpdate } from './use-did-update'
import { useEvent } from './use-event'
import { useReducedMotion } from './use-reduced-motion'

const noop = () => {}

export type TransitionStatus =
  | 'entered'
  | 'entering'
  | 'exited'
  | 'exiting'
  | 'pre-entering'
  | 'pre-exiting'

interface UseTransitionOptions {
  duration: number
  enterDelay?: number
  exitDelay?: number
  exitDuration: number
  mounted: boolean
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

export const useTransition = ({
  duration,
  exitDuration,
  mounted,
  onEnter = noop,
  onExit = noop,
  onEntered = noop,
  onExited = noop,
  enterDelay,
  exitDelay,
}: UseTransitionOptions) => {
  const shouldReduceMotion = useReducedMotion()
  const [transitionDuration, setTransitionDuration] = useState(
    shouldReduceMotion ? 0 : duration,
  )
  const [transitionStatus, setStatus] = useState<TransitionStatus>(
    mounted ? 'entered' : 'exited',
  )
  const transitionTimeoutRef = useRef<number>(-1)
  const delayTimeoutRef = useRef<number>(-1)
  const rafRef = useRef(-1)

  const onTransitionStart = useEvent((shouldMount: boolean) =>
    shouldMount ? onEnter() : onExit(),
  )
  const onTransitionEnd = useEvent((shouldMount: boolean) =>
    shouldMount ? onEntered() : onExited(),
  )

  function clearAllTimeouts() {
    window.clearTimeout(transitionTimeoutRef.current)
    window.clearTimeout(delayTimeoutRef.current)
    cancelAnimationFrame(rafRef.current)
  }

  const handleStateChange = useCallback(
    (shouldMount: boolean) => {
      clearAllTimeouts()

      const newTransitionDuration = shouldReduceMotion
        ? 0
        : shouldMount
          ? duration
          : exitDuration
      setTransitionDuration(newTransitionDuration)

      if (newTransitionDuration === 0) {
        onTransitionStart(shouldMount)
        onTransitionEnd(shouldMount)
        setStatus(shouldMount ? 'entered' : 'exited')
      } else {
        rafRef.current = requestAnimationFrame(() => {
          // eslint-disable-next-line react-dom/no-flush-sync
          ReactDOM.flushSync(() => {
            setStatus(shouldMount ? 'pre-entering' : 'pre-exiting')
          })
          rafRef.current = requestAnimationFrame(() => {
            onTransitionStart(shouldMount)
            setStatus(shouldMount ? 'entering' : 'exiting')
            transitionTimeoutRef.current = window.setTimeout(() => {
              onTransitionEnd(shouldMount)
              setStatus(shouldMount ? 'entered' : 'exited')
            }, newTransitionDuration)
          })
        })
      }
    },
    [
      shouldReduceMotion,
      duration,
      exitDuration,
      onTransitionStart,
      onTransitionEnd,
    ],
  )

  const handleTransitionWithDelay = useCallback(
    (shouldMount: boolean) => {
      clearAllTimeouts()
      const delay = shouldMount ? enterDelay : exitDelay
      if (typeof delay !== 'number') {
        handleStateChange(shouldMount)
        return
      }
      delayTimeoutRef.current = window.setTimeout(
        () => {
          handleStateChange(shouldMount)
        },
        shouldMount ? enterDelay : exitDelay,
      )
    },
    [enterDelay, exitDelay, handleStateChange],
  )

  useDidUpdate(() => {
    handleTransitionWithDelay(mounted)
  }, [handleTransitionWithDelay, mounted])

  useEffect(
    () => () => {
      clearAllTimeouts()
    },
    [],
  )

  return {
    transitionDuration,
    transitionStatus,
  }
}

const transitionStatuses: Record<TransitionStatus, 'in' | 'out'> = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  'pre-exiting': 'out',
  'pre-entering': 'out',
}

export interface GetTransitionClassesOptions {
  state: TransitionStatus
  transition: Record<'in' | 'out', string>
}

export const getTransitionClasses = ({
  transition,
  state,
}: GetTransitionClassesOptions) =>
  transition[transitionStatuses[state]]
