export const newsStats = [
  { id: 'published', value: 18, labelKey: 'news.stats.published' },
  { id: 'drafts', value: 3, labelKey: 'news.stats.drafts' },
  { id: 'scheduled', value: 2, labelKey: 'news.stats.scheduled' },
  { id: 'views', value: 1240, labelKey: 'news.stats.views' },
] as const

export type NewsCategory = 'operations' | 'safety' | 'people' | 'company'

export type DashboardNewsItem = {
  id: string
  titleKey: string
  summaryKey: string
  category: NewsCategory
  publishedAt: string
  status: 'published' | 'draft' | 'scheduled'
}

export const dashboardNews: DashboardNewsItem[] = [
  {
    id: 'n1',
    titleKey: 'home.news.items.asphalt.title',
    summaryKey: 'home.news.items.asphalt.summary',
    category: 'operations',
    publishedAt: '2026-07-14',
    status: 'published',
  },
  {
    id: 'n2',
    titleKey: 'home.news.items.safety.title',
    summaryKey: 'home.news.items.safety.summary',
    category: 'safety',
    publishedAt: '2026-07-12',
    status: 'published',
  },
  {
    id: 'n3',
    titleKey: 'home.news.items.hiring.title',
    summaryKey: 'home.news.items.hiring.summary',
    category: 'people',
    publishedAt: '2026-07-10',
    status: 'published',
  },
  {
    id: 'n4',
    titleKey: 'news.items.plant.title',
    summaryKey: 'news.items.plant.summary',
    category: 'operations',
    publishedAt: '2026-07-18',
    status: 'scheduled',
  },
  {
    id: 'n5',
    titleKey: 'news.items.benefits.title',
    summaryKey: 'news.items.benefits.summary',
    category: 'company',
    publishedAt: '2026-07-20',
    status: 'draft',
  },
]

export type NewsAnnouncement = {
  id: string
  titleKey: string
  date: string
  audienceKey: string
}

export const newsAnnouncements: NewsAnnouncement[] = [
  {
    id: 'a1',
    titleKey: 'news.announcements.intranet',
    date: '2026-07-16',
    audienceKey: 'allStaff',
  },
  {
    id: 'a2',
    titleKey: 'news.announcements.fieldSafety',
    date: '2026-07-17',
    audienceKey: 'fieldTeams',
  },
  {
    id: 'a3',
    titleKey: 'news.announcements.leadership',
    date: '2026-07-19',
    audienceKey: 'managers',
  },
]
