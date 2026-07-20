export type CompanyEvent = {
  id: string
  titleKey: string
  descriptionKey: string
  date: string | { from: string; to?: string }
  type: 'event' | 'deadline'
}

export const companyEvents: CompanyEvent[] = [
  {
    id: '1',
    titleKey: 'home.events.items.board.title',
    descriptionKey: 'home.events.items.board.description',
    date: '2026-07-18',
    type: 'event',
  },
  {
    id: '2',
    titleKey: 'home.events.items.budget.title',
    descriptionKey: 'home.events.items.budget.description',
    date: '2026-07-22',
    type: 'deadline',
  },
  {
    id: '3',
    titleKey: 'home.events.items.maintenance.title',
    descriptionKey: 'home.events.items.maintenance.description',
    date: { from: '2026-07-25', to: '2026-07-27' },
    type: 'event',
  },
  {
    id: '4',
    titleKey: 'home.events.items.training.title',
    descriptionKey: 'home.events.items.training.description',
    date: '2026-07-30',
    type: 'deadline',
  },
  {
    id: '5',
    titleKey: 'home.events.items.client.title',
    descriptionKey: 'home.events.items.client.description',
    date: '2026-08-05',
    type: 'event',
  },
  {
    id: '6',
    titleKey: 'home.events.items.inventory.title',
    descriptionKey: 'home.events.items.inventory.description',
    date: '2026-08-08',
    type: 'deadline',
  },
]
