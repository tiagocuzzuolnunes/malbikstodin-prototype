import AuthLayout from '../layouts/AuthLayout'
import RootLayout from '../layouts/RootLayout'

export function applyLayouts(routes) {
  const rootChildren = []
  let authChildren = []

  for (const route of routes) {
    if (route.path === 'auth' && route.children?.length) {
      authChildren = route.children
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

  return layoutRoutes
}
