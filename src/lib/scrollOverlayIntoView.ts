/** Expanded desktop header: p-7 (28×2) + tallest control (~56px) ≈ 112px */
const FALLBACK_HEADER_HEIGHT_PX = 112
const OVERLAY_GAP_PX = 16

/** Scroll the nearest scroll container so `element` is fully visible below the sticky header. */
export function scrollOverlayIntoView(element: HTMLElement) {
  requestAnimationFrame(() => {
    const rect = element.getBoundingClientRect()
    const headerOffset = getStickyHeaderOffset()
    const viewTop = headerOffset + OVERLAY_GAP_PX
    const viewBottom = window.innerHeight - OVERLAY_GAP_PX

    if (rect.top >= viewTop && rect.bottom <= viewBottom) return

    let delta = 0
    if (rect.top < viewTop) {
      delta = rect.top - viewTop
    } else if (rect.bottom > viewBottom) {
      delta = rect.bottom - viewBottom
    }

    if (delta === 0) return

    const scroller = findScrollParent(element)
    if (scroller === document.documentElement || scroller === document.body) {
      window.scrollBy({ top: delta, behavior: 'smooth' })
      return
    }

    scroller.scrollBy({ top: delta, behavior: 'smooth' })
  })
}

function getStickyHeaderOffset() {
  const header = document.querySelector<HTMLElement>('[data-app-header]')
  const measured = header?.getBoundingClientRect().height ?? 0
  return measured > 0 ? measured : FALLBACK_HEADER_HEIGHT_PX
}

function findScrollParent(element: HTMLElement) {
  let current: HTMLElement | null = element.parentElement

  while (current) {
    const { overflowY } = getComputedStyle(current)
    const canScroll =
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      current.scrollHeight > current.clientHeight

    if (canScroll) return current
    current = current.parentElement
  }

  return document.documentElement
}
