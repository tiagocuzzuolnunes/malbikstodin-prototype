import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="layout layout-auth">
      <main className="layout-auth-main">
        <section className="layout-auth-card">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
