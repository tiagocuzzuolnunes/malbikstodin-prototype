export type NewsItem = {
  id: string
  titleKey: string
  summaryKey: string
  publishedAt: string
}

export const latestNews: NewsItem[] = [
  {
    id: '1',
    titleKey: 'home.news.items.asphalt.title',
    summaryKey: 'home.news.items.asphalt.summary',
    publishedAt: '2026-07-14',
  },
  {
    id: '2',
    titleKey: 'home.news.items.safety.title',
    summaryKey: 'home.news.items.safety.summary',
    publishedAt: '2026-07-12',
  },
  {
    id: '3',
    titleKey: 'home.news.items.hiring.title',
    summaryKey: 'home.news.items.hiring.summary',
    publishedAt: '2026-07-10',
  },
]
