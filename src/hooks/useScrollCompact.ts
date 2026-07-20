import { useEffect, useState, type RefObject } from 'react'

/**
 * Compacts when a scroll container moves past `threshold`,
 * and expands again only when fully back at the top.
 */
export function useScrollCompact(
  scrollRef: RefObject<HTMLElement | null>,
  threshold = 48,
) {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
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
  }, [scrollRef, threshold])

  return compact
}
