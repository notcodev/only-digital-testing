import type { DependencyList, EffectCallback } from 'react'

import { useLayoutEffect, useRef } from 'react'

export const useDidUpdate = (
  effect: EffectCallback,
  deps?: DependencyList,
) => {
  const mounted = useRef(false)

  useLayoutEffect(
    () => () => {
      mounted.current = false
    },
    [],
  )

  useLayoutEffect(() => {
    if (mounted.current) {
      return effect()
    }

    mounted.current = true
    return undefined
  }, deps)
}
