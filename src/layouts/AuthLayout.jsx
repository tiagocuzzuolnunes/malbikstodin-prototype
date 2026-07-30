import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import PageSkeleton from '../components/layout/PageSkeleton'

export default function AuthLayout() {
  return (
    <div className="layout layout-auth">
      <main className="layout-auth-main">
        <section className="layout-auth-card">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </div>
  )
}
