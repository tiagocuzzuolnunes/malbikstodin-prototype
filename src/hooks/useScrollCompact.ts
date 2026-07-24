import { useEffect, useState, type RefObject } from 'react'

type UseScrollCompactOptions = {
  threshold?: number
  /** When false, always returns false and does not listen to scroll. */
  enabled?: boolean
}

/**
 * Compacts when a scroll container moves past `threshold`,
 * and expands again only when fully back at the top.
 */
export function useScrollCompact(
  scrollRef: RefObject<HTMLElement | null>,
  options: UseScrollCompactOptions | number = {},
) {
  const normalized = typeof options === 'number' ? { threshold: options } : options
  const threshold = normalized.threshold ?? 48
  const enabled = normalized.enabled ?? true
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setCompact(false)
      return
    }

    const element = scrollRef.current
    if (!element) return

    let frame = 0

    const update = () => {
      frame = 0
      const top = element.scrollTop

      setCompact((current) => {
        if (!current && top > threshold) return true
        if (current && top <= 0) return false
        return current
      })
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    element.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      element.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [scrollRef, threshold, enabled])

  return enabled ? compact : false
}
