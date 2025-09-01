import { useCallback, useInsertionEffect, useRef } from 'react'

export const useEvent = <Params extends unknown[], Return>(
  callback: (...args: Params) => Return,
): ((...args: Params) => Return) => {
  const internalCallbackRef = useRef<typeof callback>(callback)

  useInsertionEffect(() => {
    internalCallbackRef.current = callback
  }, [callback])

  return useCallback((...args) => {
    const fn = internalCallbackRef.current
    return fn(...args)
  }, [])
}
