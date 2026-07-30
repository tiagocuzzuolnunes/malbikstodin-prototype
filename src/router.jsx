import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import { applyLayouts } from './utils/applyLayouts.jsx'
import './layouts/layouts.css'

const layoutRoutes = applyLayouts(routes)

function AppRoutes() {
  const element = useRoutes(layoutRoutes)

  return <Suspense fallback={null}>{element}</Suspense>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
