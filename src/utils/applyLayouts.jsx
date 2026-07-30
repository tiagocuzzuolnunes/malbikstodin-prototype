import AuthLayout from '../layouts/AuthLayout'
import RootLayout from '../layouts/RootLayout'

function isCatchAllRoute(route) {
  return route.path === '*' || route.path?.includes('*')
}

export function applyLayouts(routes) {
  const rootChildren = []
  const notFoundRoutes = []
  let authChildren = []

  for (const route of routes) {
    if (route.path === 'auth' && route.children?.length) {
      authChildren = route.children
      continue
    }

    if (isCatchAllRoute(route)) {
      notFoundRoutes.push(route)
      continue
    }

    if (route.path !== 'auth') {
      rootChildren.push(route)
    }
  }

  const layoutRoutes = [
    {
      element: <RootLayout />,
      children: rootChildren,
    },
  ]

  if (authChildren.length > 0) {
    layoutRoutes.push({
      path: 'auth',
      element: <AuthLayout />,
      children: authChildren,
    })
  }

  // 404 stays outside RootLayout (no header/sidebar)
  layoutRoutes.push(...notFoundRoutes)

  return layoutRoutes
}
