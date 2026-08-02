/** Maps primary app paths to their page modules for hover/idle prefetch. */
const routeImporters: Record<string, () => Promise<unknown>> = {
  '/': () => import('../pages/index'),
  '/skraning': () => import('../pages/skraning/index'),
  '/reikningar': () => import('../pages/reikningar/index'),
  '/frettir': () => import('../pages/frettir'),
  '/mannaudur': () => import('../pages/mannaudur/index'),
  '/taekni': () => import('../pages/taekni'),
  '/fjarmal': () => import('../pages/fjarmal'),
  '/verkefni': () => import('../pages/verkefni/index'),
  '/stjornun': () => import('../pages/stjornun/index'),
}

const prefetched = new Set<string>()

export function prefetchRoute(to: string) {
  if (prefetched.has(to)) return

  const load = routeImporters[to]
  if (!load) return

  prefetched.add(to)
  void load().catch(() => {
    prefetched.delete(to)
  })
}

/** Prefetch primary nav targets during browser idle time. */
export function prefetchPrimaryNavOnIdle() {
  if (typeof window === 'undefined') return

  const paths = Object.keys(routeImporters)

  const run = () => {
    for (const path of paths) {
      prefetchRoute(path)
    }
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 4000 })
    return
  }

  globalThis.setTimeout(run, 1500)
}
