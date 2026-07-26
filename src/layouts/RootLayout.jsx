import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Sidebar, MobileNavDrawer, Breadcrumbs } from '../components/layout'
import { useScrollCompact } from '../hooks/useScrollCompact'

const DESKTOP_MQ = '(min-width: 768px)'

export default function RootLayout() {
  const mainRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_MQ).matches : false,
  )
  const compact = useScrollCompact(mainRef, { enabled: isDesktop })
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const openMobileNav = useCallback(() => setMobileNavOpen(true), [])
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), [])

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_MQ)
    const sync = () => setIsDesktop(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return (
    <div className="layout layout-root flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden overscroll-none">
      <Header compact={compact} onOpenMobileNav={openMobileNav} />
      <MobileNavDrawer open={mobileNavOpen} onClose={closeMobileNav} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main
          ref={mainRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain border-t border-border bg-surface-muted p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-header-content sm:p-5 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))] md:p-6 md:pb-6"
        >
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
