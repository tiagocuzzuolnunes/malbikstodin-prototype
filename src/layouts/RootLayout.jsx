import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import MobileNavDrawer from '../components/layout/MobileNavDrawer'
import PageSkeleton from '../components/layout/PageSkeleton'
import PageTransition from '../components/layout/PageTransition'
import Sidebar from '../components/layout/Sidebar'
import { useScrollCompact } from '../hooks/useScrollCompact'

const DESKTOP_MQ = '(min-width: 768px)'

export default function RootLayout() {
  const scrollRef = useRef(null)
  const { pathname } = useLocation()
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_MQ).matches : false,
  )
  const compact = useScrollCompact(scrollRef, { enabled: isDesktop })
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
    scrollRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="layout layout-root flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden overscroll-none">
      <Header compact={compact} onOpenMobileNav={openMobileNav} />
      <MobileNavDrawer open={mobileNavOpen} onClose={closeMobileNav} />

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
      >
        <div className="flex min-h-full">
          <Sidebar />

          <main className="min-w-0 flex-1 border-t border-b border-border bg-surface-muted pt-4 pb-16 shadow-shell-content sm:pt-5 sm:pb-20 md:pt-6 md:pb-24 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:pl-[max(1.25rem,env(safe-area-inset-left))] sm:pr-[max(1.25rem,env(safe-area-inset-right))] md:pl-[max(1.5rem,env(safe-area-inset-left))] md:pr-[max(1.5rem,env(safe-area-inset-right))]">
            <PageTransition>
              <Breadcrumbs />
              <Suspense fallback={<PageSkeleton />}>
                <Outlet />
              </Suspense>
            </PageTransition>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  )
}
