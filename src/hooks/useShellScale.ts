import { useEffect } from 'react'

/** 56.25rem at the default 16px root — matches theme.css shell scale design height. */
const SHELL_SCALE_REFERENCE_PX = 56.25 * 16
const SHELL_SCALE_MIN = 0.82
const SHELL_SCALE_MAX = 1.12

function computeShellScale() {
  const rootFontPx = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  )
  const referencePx =
    Number.isFinite(rootFontPx) && rootFontPx > 0
      ? 56.25 * rootFontPx
      : SHELL_SCALE_REFERENCE_PX

  const raw = window.innerHeight / referencePx
  return Math.min(SHELL_SCALE_MAX, Math.max(SHELL_SCALE_MIN, raw))
}

/** Apply `--shell-scale` now (safe to call before React mounts). */
export function syncShellScale() {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty(
    '--shell-scale',
    String(computeShellScale()),
  )
}

/**
 * Sync `--shell-scale` from viewport height.
 * Firefox still rejects length÷length in CSS (e.g. `100dvh / 56.25rem`), which
 * invalidates every `calc(... * var(--shell-scale))` in the chrome.
 */
export function useShellScale() {
  useEffect(() => {
    const sync = () => {
      syncShellScale()
    }

    sync()
    window.addEventListener('resize', sync)
    window.visualViewport?.addEventListener('resize', sync)
    void document.fonts?.ready?.then(sync)

    return () => {
      window.removeEventListener('resize', sync)
      window.visualViewport?.removeEventListener('resize', sync)
    }
  }, [])
}
