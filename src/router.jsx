import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import routes from '~react-pages'
import { applyLayouts } from './utils/applyLayouts.jsx'
import './layouts/layouts.css'

const layoutRoutes = applyLayouts(routes)

function AppRoutes() {
  const { t } = useTranslation()
  const element = useRoutes(layoutRoutes)

  return <Suspense fallback={<p>{t('common.loading')}</p>}>{element}</Suspense>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
