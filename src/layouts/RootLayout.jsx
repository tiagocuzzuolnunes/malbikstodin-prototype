import { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Breadcrumbs from '../components/Breadcrumbs'
import { useScrollCompact } from '../hooks/useScrollCompact'

export default function RootLayout() {
  const mainRef = useRef(null)
  const compact = useScrollCompact(mainRef)

  return (
    <div className="layout layout-root h-svh overflow-hidden">
      <Header compact={compact} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main
          ref={mainRef}
          className="min-h-0 flex-1 overflow-auto border-t border-border bg-surface-muted p-6 shadow-header-content"
        >
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
