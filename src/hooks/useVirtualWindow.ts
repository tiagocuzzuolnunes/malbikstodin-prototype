import { useEffect, useState, type RefObject, type UIEvent } from 'react'

type VirtualWindowOptions = {
  itemCount: number
  itemHeight: number
  overscan?: number
  /** Below this count, render everything (no windowing). */
  threshold?: number
}

type VirtualWindowResult = {
  enabled: boolean
  startIndex: number
  endIndex: number
  offsetTop: number
  totalHeight: number
  onScroll: (event: UIEvent<HTMLElement>) => void
}

/**
 * Lightweight list windowing for tall tables/lists.
 * Activates only when itemCount >= threshold.
 */
export function useVirtualWindow(
  scrollRef: RefObject<HTMLElement | null>,
  { itemCount, itemHeight, overscan = 6, threshold = 20 }: VirtualWindowOptions,
): VirtualWindowResult {
  const enabled = itemCount >= threshold
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(480)

  useEffect(() => {
    if (!enabled) return

    const node = scrollRef.current
    if (!node) return

    const sync = () => {
      setScrollTop(node.scrollTop)
      setViewportHeight(node.clientHeight || 480)
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, scrollRef, itemCount])

  const totalHeight = itemCount * itemHeight

  if (!enabled) {
    return {
      enabled: false,
      startIndex: 0,
      endIndex: itemCount,
      offsetTop: 0,
      totalHeight,
      onScroll: () => {},
    }
  }

  const visibleCount = Math.ceil(viewportHeight / itemHeight) + overscan * 2
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(itemCount, startIndex + visibleCount)

  return {
    enabled: true,
    startIndex,
    endIndex,
    offsetTop: startIndex * itemHeight,
    totalHeight,
    onScroll: (event: UIEvent<HTMLElement>) => {
      setScrollTop(event.currentTarget.scrollTop)
    },
  }
}
