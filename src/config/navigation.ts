import type { LucideIcon } from 'lucide-react'
import {
  Newspaper,
  House,
  Package,
  PersonStanding,
  Laptop,
  HandCoins,
  ClipboardList,
  DollarSign,
} from 'lucide-react'

export type NavItem = {
  to: string
  labelKey: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { to: '/', labelKey: 'nav.heim', icon: House },
  { to: '/skraning', labelKey: 'nav.skraning', icon: ClipboardList },
  { to: '/reikningar', labelKey: 'nav.reikningar', icon: DollarSign },
  { to: '/frettir', labelKey: 'nav.frettir', icon: Newspaper },
  { to: '/mannaudur', labelKey: 'nav.mannaudur', icon: PersonStanding },
  { to: '/taekni', labelKey: 'nav.taekni', icon: Laptop },
  { to: '/fjarmal', labelKey: 'nav.fjarmal', icon: HandCoins },
  { to: '/verkefni', labelKey: 'nav.verkefni', icon: Package },
]

import { projectAreas } from './projects'

export function getBreadcrumbKeys(pathname: string) {
  const crumbs = [{ to: '/', labelKey: 'nav.heim' }]

  if (pathname === '/') return crumbs

  const match = navItems.find((item) => item.to !== '/' && pathname.startsWith(item.to))
  if (match) {
    crumbs.push({ to: match.to, labelKey: match.labelKey })
  }

  if (pathname.startsWith('/reikningar/')) {
    if (
      pathname === '/reikningar/yfirferd' ||
      pathname.startsWith('/reikningar/yfirferd/')
    ) {
      crumbs.push({ to: '/reikningar/yfirferd', labelKey: 'nav.yfirferd' })
      return crumbs
    }

    if (
      pathname === '/reikningar/serfraedingur' ||
      pathname.startsWith('/reikningar/serfraedingur/')
    ) {
      crumbs.push({ to: '/reikningar/serfraedingur', labelKey: 'nav.serfraedingur' })
      return crumbs
    }

    if (
      pathname === '/reikningar/vantar' ||
      pathname.startsWith('/reikningar/vantar/')
    ) {
      crumbs.push({ to: '/reikningar/vantar', labelKey: 'nav.vantar' })
      return crumbs
    }

    if (
      pathname === '/reikningar/leiga' ||
      pathname.startsWith('/reikningar/leiga/')
    ) {
      crumbs.push({ to: '/reikningar/leiga', labelKey: 'nav.leiga' })
      return crumbs
    }
  }

  if (pathname.startsWith('/mannaudur/')) {
    if (
      pathname === '/mannaudur/starfsfolk' ||
      pathname.startsWith('/mannaudur/starfsfolk/')
    ) {
      crumbs.push({ to: '/mannaudur/starfsfolk', labelKey: 'nav.starfsfolk' })
      return crumbs
    }

    if (
      pathname === '/mannaudur/yfirlit' ||
      pathname.startsWith('/mannaudur/yfirlit/')
    ) {
      crumbs.push({ to: '/mannaudur/yfirlit', labelKey: 'nav.yfirlit' })
      return crumbs
    }

    if (
      pathname === '/mannaudur/thjalfun' ||
      pathname.startsWith('/mannaudur/thjalfun/')
    ) {
      crumbs.push({ to: '/mannaudur/yfirlit', labelKey: 'nav.yfirlit' })
      crumbs.push({ to: '/mannaudur/thjalfun', labelKey: 'nav.thjalfun' })
      return crumbs
    }

    if (
      pathname === '/mannaudur/leyfi' ||
      pathname.startsWith('/mannaudur/leyfi/')
    ) {
      crumbs.push({ to: '/mannaudur/yfirlit', labelKey: 'nav.yfirlit' })
      crumbs.push({ to: '/mannaudur/leyfi', labelKey: 'nav.leyfi' })
      return crumbs
    }

    if (
      pathname === '/mannaudur/abendingar' ||
      pathname.startsWith('/mannaudur/abendingar/')
    ) {
      crumbs.push({ to: '/mannaudur/abendingar', labelKey: 'nav.abendingar' })
      return crumbs
    }
  }

  if (pathname.startsWith('/verkefni/events')) {
    crumbs.push({ to: '/verkefni/events', labelKey: 'nav.events' })
    return crumbs
  }

  if (pathname.startsWith('/verkefni/ferlar')) {
    crumbs.push({ to: '/verkefni/ferlar', labelKey: 'nav.ferlar' })
    return crumbs
  }

  if (pathname.startsWith('/verkefni/stjornun')) {
    crumbs.push({ to: '/verkefni/stjornun', labelKey: 'nav.stjornun' })

    if (
      pathname === '/verkefni/stjornun/adgangsstyring' ||
      pathname.startsWith('/verkefni/stjornun/adgangsstyring/')
    ) {
      crumbs.push({
        to: '/verkefni/stjornun/adgangsstyring',
        labelKey: 'nav.adgangsstyring',
      })
    }

    return crumbs
  }

  const area = projectAreas.find((item) => pathname.startsWith(item.to))
  if (area) {
    crumbs.push({ to: area.to, labelKey: area.titleKey })

    if (pathname === `${area.to}/worklist` || pathname.startsWith(`${area.to}/worklist/`)) {
      crumbs.push({ to: `${area.to}/worklist`, labelKey: 'nav.worklist' })
    }

    if (pathname === `${area.to}/contracts` || pathname.startsWith(`${area.to}/contracts/`)) {
      crumbs.push({ to: `${area.to}/contracts`, labelKey: 'nav.contracts' })
    }

    if (pathname === `${area.to}/skjalasafn` || pathname.startsWith(`${area.to}/skjalasafn/`)) {
      crumbs.push({ to: `${area.to}/skjalasafn`, labelKey: 'nav.skjalasafn' })
    }

    if (pathname === `${area.to}/dagskra` || pathname.startsWith(`${area.to}/dagskra/`)) {
      crumbs.push({ to: `${area.to}/dagskra`, labelKey: 'nav.dagskra' })
    }

    if (pathname === `${area.to}/taeki` || pathname.startsWith(`${area.to}/taeki/`)) {
      crumbs.push({ to: `${area.to}/taeki`, labelKey: 'nav.taeki' })
    }
  }

  return crumbs
}
