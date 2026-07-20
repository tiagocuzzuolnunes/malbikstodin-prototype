export const itStats = [
  { id: 'openTickets', value: 12, labelKey: 'it.stats.openTickets' },
  { id: 'systemsUp', value: 98, labelKey: 'it.stats.systemsUp' },
  { id: 'devices', value: 64, labelKey: 'it.stats.devices' },
  { id: 'pendingAccess', value: 5, labelKey: 'it.stats.pendingAccess' },
] as const

export type TicketPriority = 'high' | 'medium' | 'low'
export type TicketStatus = 'open' | 'inProgress' | 'waiting'

export type ItTicket = {
  id: string
  serial: string
  titleKey: string
  requester: string
  priority: TicketPriority
  status: TicketStatus
  openedAt: string
}

export const itTickets: ItTicket[] = [
  {
    id: 't1',
    serial: 'IT-041',
    titleKey: 'vpnAccess',
    requester: 'Guðrún Pálsdóttir',
    priority: 'high',
    status: 'open',
    openedAt: '2026-07-16',
  },
  {
    id: 't2',
    serial: 'IT-040',
    titleKey: 'laptopLock',
    requester: 'Andri Már Stefánsson',
    priority: 'medium',
    status: 'inProgress',
    openedAt: '2026-07-15',
  },
  {
    id: 't3',
    serial: 'IT-039',
    titleKey: 'printerQueue',
    requester: 'Ásta Ragnarsdóttir',
    priority: 'low',
    status: 'waiting',
    openedAt: '2026-07-14',
  },
  {
    id: 't4',
    serial: 'IT-038',
    titleKey: 'emailShared',
    requester: 'Kristján Ólafsson',
    priority: 'medium',
    status: 'open',
    openedAt: '2026-07-14',
  },
  {
    id: 't5',
    serial: 'IT-037',
    titleKey: 'softwareInstall',
    requester: 'Katrín Björnsdóttir',
    priority: 'high',
    status: 'inProgress',
    openedAt: '2026-07-13',
  },
]

export type SystemStatus = 'operational' | 'degraded' | 'maintenance'

export type ItSystem = {
  id: string
  nameKey: string
  status: SystemStatus
  uptime: string
}

export const itSystems: ItSystem[] = [
  { id: 's1', nameKey: 'intranet', status: 'operational', uptime: '99.9%' },
  { id: 's2', nameKey: 'email', status: 'operational', uptime: '99.8%' },
  { id: 's3', nameKey: 'vpn', status: 'degraded', uptime: '97.2%' },
  { id: 's4', nameKey: 'erp', status: 'operational', uptime: '99.5%' },
  { id: 's5', nameKey: 'backup', status: 'maintenance', uptime: '—' },
]
