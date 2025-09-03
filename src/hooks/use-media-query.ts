import { useEffect, useState } from 'react'

export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean
}

type MediaQueryCallback = (event: {
  matches: boolean
  media: string
}) => void

function attachMediaListener(
  query: MediaQueryList,
  callback: MediaQueryCallback,
) {
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function getInitialValue(query: string, initialValue?: boolean) {
  if (typeof initialValue === 'boolean') {
    return initialValue
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches
  }

  return false
}

export const useMediaQuery = (
  query: string,
  initialValue?: boolean,
  { getInitialValueInEffect }: UseMediaQueryOptions = {
    getInitialValueInEffect: true,
  },
) => {
  const [matches, setMatches] = useState(
    getInitialValueInEffect
      ? initialValue
      : () => getInitialValue(query),
  )
  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)
    return attachMediaListener(mediaQuery, (event) =>
      setMatches(event.matches),
    )
  }, [query])

  return matches || false
}
