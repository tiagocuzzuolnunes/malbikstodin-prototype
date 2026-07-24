import { useCallback, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import MobileNavDrawer from '../components/MobileNavDrawer'
import Breadcrumbs from '../components/Breadcrumbs'
import { useScrollCompact } from '../hooks/useScrollCompact'

export default function RootLayout() {
  const mainRef = useRef(null)
  const compact = useScrollCompact(mainRef)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const openMobileNav = useCallback(() => setMobileNavOpen(true), [])
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), [])

  return (
    <div className="layout layout-root h-svh overflow-hidden">
      <Header compact={compact} onOpenMobileNav={openMobileNav} />
      <MobileNavDrawer open={mobileNavOpen} onClose={closeMobileNav} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main
          ref={mainRef}
          className="min-h-0 flex-1 overflow-auto border-t border-border bg-surface-muted p-4 shadow-header-content sm:p-5 md:p-6"
        >
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
