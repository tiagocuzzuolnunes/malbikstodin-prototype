import { Suspense, useEffect } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import PageSkeleton from './components/layout/PageSkeleton'
import { prefetchPrimaryNavOnIdle } from './lib/prefetchRoute'
import { applyLayouts } from './utils/applyLayouts.jsx'
import './layouts/layouts.css'

const layoutRoutes = applyLayouts(routes)

function AppRoutes() {
  const element = useRoutes(layoutRoutes)

  useEffect(() => {
    prefetchPrimaryNavOnIdle()
  }, [])

  return <Suspense fallback={<PageSkeleton />}>{element}</Suspense>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
