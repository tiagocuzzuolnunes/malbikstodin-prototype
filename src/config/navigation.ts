import type { LucideIcon } from 'lucide-react'
import {
  House,
  Package,
  HandCoins,
  ClipboardList,
  Settings2,
} from 'lucide-react'
import { getMaintenanceEquipment } from '../data/equipmentMaintenance'

export type NavChild = {
  to: string
  labelKey: string
}

export type NavItem = {
  to: string
  labelKey: string
  icon: LucideIcon
  children?: NavChild[]
}

export const navItems: NavItem[] = [
  { to: '/', labelKey: 'nav.heim', icon: House },
  {
    to: '/skraning',
    labelKey: 'nav.skraning',
    icon: ClipboardList,
    children: [
      { to: '/skraning/hours', labelKey: 'nav.hours' },
      { to: '/skraning/radstofun-vigtana', labelKey: 'nav.radstofunVigtana' },
      { to: '/skraning/nytt-verkefni', labelKey: 'nav.nyttVerkefni' },
    ],
  },
  {
    to: '/fjarmal',
    labelKey: 'nav.fjarmal',
    icon: HandCoins,
    children: [
      { to: '/fjarmal/utgjold', labelKey: 'nav.utgjold' },
      { to: '/fjarmal/kostnadargreining', labelKey: 'nav.kostnadargreining' },
      { to: '/fjarmal/verkbokhald', labelKey: 'nav.verkbokhald' },
      { to: '/fjarmal/reikningar', labelKey: 'nav.reikningar' },
    ],
  },
  {
    to: '/verkefni',
    labelKey: 'nav.verkefni',
    icon: Package,
    children: [
      { to: '/verkefni/rekstur', labelKey: 'nav.rekstur' },
      { to: '/verkefni/events', labelKey: 'nav.events' },
      { to: '/verkefni/ferlar', labelKey: 'nav.ferlar' },
      { to: '/verkefni/verkferill', labelKey: 'nav.verkferill' },
      { to: '/verkefni/stadarmaelingar', labelKey: 'nav.stadarmaelingar' },
      { to: '/verkefni/lugan', labelKey: 'nav.lugan' },
      { to: '/verkefni/vidhald', labelKey: 'nav.vidhald' },
      { to: '/verkefni/dagskra-vorubila', labelKey: 'nav.dagskraVorubila' },
    ],
  },
  {
    to: '/stjornun',
    labelKey: 'nav.stjornun',
    icon: Settings2,
    children: [
      { to: '/stjornun/starfsfolk', labelKey: 'nav.starfsfolk' },
      { to: '/stjornun/adgangsstyring', labelKey: 'nav.adgangsstyring' },
      { to: '/stjornun/gaedi', labelKey: 'nav.gaedi' },
      { to: '/stjornun/eignarhald', labelKey: 'nav.eignarhald' },
    ],
  },
]

export function getBreadcrumbKeys(pathname: string) {
  const crumbs: { to: string; labelKey: string; label?: string }[] = [
    { to: '/', labelKey: 'nav.heim' },
  ]

  if (pathname === '/') return crumbs

  const match = navItems.find((item) => item.to !== '/' && pathname.startsWith(item.to))
  if (match) {
    crumbs.push({ to: match.to, labelKey: match.labelKey })
  }

  if (pathname.startsWith('/skraning/')) {
    if (pathname === '/skraning/hours' || pathname.startsWith('/skraning/hours/')) {
      crumbs.push({ to: '/skraning/hours', labelKey: 'nav.hours' })
      return crumbs
    }

    if (
      pathname === '/skraning/radstofun-vigtana' ||
      pathname.startsWith('/skraning/radstofun-vigtana/')
    ) {
      crumbs.push({
        to: '/skraning/radstofun-vigtana',
        labelKey: 'nav.radstofunVigtana',
      })
      return crumbs
    }

    if (
      pathname === '/skraning/nytt-verkefni' ||
      pathname.startsWith('/skraning/nytt-verkefni/')
    ) {
      crumbs.push({
        to: '/skraning/nytt-verkefni',
        labelKey: 'nav.nyttVerkefni',
      })
      return crumbs
    }
  }

  if (pathname.startsWith('/fjarmal/')) {
    if (
      pathname === '/fjarmal/utgjold' ||
      pathname.startsWith('/fjarmal/utgjold/')
    ) {
      crumbs.push({ to: '/fjarmal/utgjold', labelKey: 'nav.utgjold' })
      return crumbs
    }

    if (
      pathname === '/fjarmal/kostnadargreining' ||
      pathname.startsWith('/fjarmal/kostnadargreining/')
    ) {
      crumbs.push({
        to: '/fjarmal/kostnadargreining',
        labelKey: 'nav.kostnadargreining',
      })
      return crumbs
    }

    if (
      pathname === '/fjarmal/verkbokhald' ||
      pathname.startsWith('/fjarmal/verkbokhald/')
    ) {
      crumbs.push({
        to: '/fjarmal/verkbokhald',
        labelKey: 'nav.verkbokhald',
      })
      return crumbs
    }

    if (
      pathname === '/fjarmal/reikningar' ||
      pathname.startsWith('/fjarmal/reikningar/')
    ) {
      crumbs.push({ to: '/fjarmal/reikningar', labelKey: 'nav.reikningar' })
      return crumbs
    }

    const invoiceRoutes = [
      { match: '/fjarmal/yfirferd', labelKey: 'nav.yfirferd' },
      { match: '/fjarmal/serfraedingur', labelKey: 'nav.serfraedingur' },
      { match: '/fjarmal/vantar', labelKey: 'nav.vantar' },
      { match: '/fjarmal/leiga', labelKey: 'nav.leiga' },
    ] as const

    for (const route of invoiceRoutes) {
      if (pathname === route.match || pathname.startsWith(`${route.match}/`)) {
        crumbs.push({ to: '/fjarmal/reikningar', labelKey: 'nav.reikningar' })
        crumbs.push({ to: route.match, labelKey: route.labelKey })
        return crumbs
      }
    }
  }

  if (pathname.startsWith('/stjornun')) {
    if (
      pathname === '/stjornun/starfsfolk' ||
      pathname.startsWith('/stjornun/starfsfolk/')
    ) {
      crumbs.push({
        to: '/stjornun/starfsfolk',
        labelKey: 'nav.starfsfolk',
      })
      return crumbs
    }

    if (
      pathname === '/stjornun/adgangsstyring' ||
      pathname.startsWith('/stjornun/adgangsstyring/')
    ) {
      crumbs.push({
        to: '/stjornun/adgangsstyring',
        labelKey: 'nav.adgangsstyring',
      })
      return crumbs
    }

    if (pathname.startsWith('/stjornun/gaedi')) {
      crumbs.push({ to: '/stjornun/gaedi', labelKey: 'nav.gaedi' })

      if (
        pathname === '/stjornun/gaedi/rannsoknarskra' ||
        pathname.startsWith('/stjornun/gaedi/rannsoknarskra/')
      ) {
        crumbs.push({
          to: '/stjornun/gaedi/rannsoknarskra',
          labelKey: 'nav.rannsoknarskra',
        })
      }

      return crumbs
    }

    if (
      pathname === '/stjornun/eignarhald' ||
      pathname.startsWith('/stjornun/eignarhald/')
    ) {
      crumbs.push({
        to: '/stjornun/eignarhald',
        labelKey: 'nav.eignarhald',
      })
      return crumbs
    }

    return crumbs
  }

  if (pathname.startsWith('/verkefni/events')) {
    crumbs.push({ to: '/verkefni/events', labelKey: 'nav.events' })
    return crumbs
  }

  if (pathname.startsWith('/verkefni/rekstur')) {
    crumbs.push({ to: '/verkefni/rekstur', labelKey: 'nav.rekstur' })
    return crumbs
  }

  if (pathname === '/verkefni/worklist' || pathname.startsWith('/verkefni/worklist/')) {
    crumbs.push({ to: '/verkefni/rekstur', labelKey: 'nav.rekstur' })
    crumbs.push({ to: '/verkefni/worklist', labelKey: 'nav.worklist' })
    return crumbs
  }

  if (pathname === '/verkefni/contracts' || pathname.startsWith('/verkefni/contracts/')) {
    crumbs.push({ to: '/verkefni/rekstur', labelKey: 'nav.rekstur' })
    crumbs.push({ to: '/verkefni/contracts', labelKey: 'nav.contracts' })
    return crumbs
  }

  if (pathname === '/verkefni/skjalasafn' || pathname.startsWith('/verkefni/skjalasafn/')) {
    crumbs.push({ to: '/verkefni/rekstur', labelKey: 'nav.rekstur' })
    crumbs.push({ to: '/verkefni/skjalasafn', labelKey: 'nav.skjalasafn' })
    return crumbs
  }

  if (pathname === '/verkefni/taeki' || pathname.startsWith('/verkefni/taeki/')) {
    crumbs.push({ to: '/verkefni/rekstur', labelKey: 'nav.rekstur' })
    crumbs.push({ to: '/verkefni/taeki', labelKey: 'nav.taeki' })
    return crumbs
  }

  if (pathname.startsWith('/verkefni/ferlar')) {
    crumbs.push({ to: '/verkefni/ferlar', labelKey: 'nav.ferlar' })
    return crumbs
  }

  if (pathname.startsWith('/verkefni/verkferill')) {
    crumbs.push({
      to: '/verkefni/verkferill',
      labelKey: 'nav.verkferill',
    })
    return crumbs
  }

  if (pathname.startsWith('/verkefni/stadarmaelingar')) {
    crumbs.push({
      to: '/verkefni/stadarmaelingar',
      labelKey: 'nav.stadarmaelingar',
    })
    return crumbs
  }

  if (pathname.startsWith('/verkefni/lugan')) {
    crumbs.push({
      to: '/verkefni/lugan',
      labelKey: 'nav.lugan',
    })
    return crumbs
  }

  if (pathname.startsWith('/verkefni/vidhald')) {
    crumbs.push({
      to: '/verkefni/vidhald',
      labelKey: 'nav.vidhald',
    })

    const equipmentMatch = pathname.match(/^\/verkefni\/vidhald\/([^/]+)\/?$/)
    if (equipmentMatch) {
      const equipmentId = decodeURIComponent(equipmentMatch[1])
      const machine = getMaintenanceEquipment(equipmentId)
      crumbs.push({
        to: `/verkefni/vidhald/${equipmentId}`,
        labelKey: machine?.nameKey ?? 'nav.vidhald',
        label: machine?.serial,
      })
    }

    return crumbs
  }

  if (pathname.startsWith('/verkefni/dagskra-vorubila')) {
    crumbs.push({
      to: '/verkefni/dagskra-vorubila',
      labelKey: 'nav.dagskraVorubila',
    })
    return crumbs
  }

  if (pathname === '/verkefni/dagskra' || pathname.startsWith('/verkefni/dagskra/')) {
    crumbs.push({ to: '/verkefni/rekstur', labelKey: 'nav.rekstur' })
    crumbs.push({ to: '/verkefni/dagskra', labelKey: 'nav.dagskra' })
    return crumbs
  }

  return crumbs
}
