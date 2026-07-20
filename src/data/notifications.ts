export type AppNotification = {
  id: string
  titleKey: string
  bodyKey: string
  timeKey: string
  unread?: boolean
}

export const notifications: AppNotification[] = [
  {
    id: '1',
    titleKey: 'notifications.items.budget.title',
    bodyKey: 'notifications.items.budget.body',
    timeKey: 'notifications.items.budget.time',
    unread: true,
  },
  {
    id: '2',
    titleKey: 'notifications.items.safety.title',
    bodyKey: 'notifications.items.safety.body',
    timeKey: 'notifications.items.safety.time',
    unread: true,
  },
  {
    id: '3',
    titleKey: 'notifications.items.maintenance.title',
    bodyKey: 'notifications.items.maintenance.body',
    timeKey: 'notifications.items.maintenance.time',
  },
]
