import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {
  Header,
  Sidebar,
  MobileNavDrawer,
  Breadcrumbs,
  Footer,
  PageTransition,
} from '../components/layout'
import { useScrollCompact } from '../hooks/useScrollCompact'

const DESKTOP_MQ = '(min-width: 768px)'

export default function RootLayout() {
  const mainRef = useRef(null)
  const { pathname } = useLocation()
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

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="layout layout-root flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden overscroll-none">
      <Header compact={compact} onOpenMobileNav={openMobileNav} />
      <MobileNavDrawer open={mobileNavOpen} onClose={closeMobileNav} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main
          ref={mainRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain border-t border-border bg-surface-muted px-4 pt-4 pb-0 shadow-header-content sm:px-5 sm:pt-5 md:px-6 md:pt-6"
        >
          <PageTransition className="flex min-h-full flex-col">
            <div className="flex-1">
              <Breadcrumbs />
              <Outlet />
            </div>
            <Footer />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
