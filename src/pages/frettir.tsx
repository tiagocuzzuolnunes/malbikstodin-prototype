import { useTranslation } from 'react-i18next'
import { SectionPage } from '../components/shared'
import { Card } from '../components/ui'
import { cn } from '../lib/utils'
import {
  dashboardNews,
  newsAnnouncements,
  newsStats,
  type DashboardNewsItem,
} from '../data/news'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

const statusClass: Record<DashboardNewsItem['status'], string> = {
  published: 'bg-success/10 text-success',
  draft: 'bg-surface-muted text-foreground-muted',
  scheduled: 'bg-alert/15 text-alert',
}

export default function FrettirPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.frettir" descriptionKey="pages.frettir.description" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {newsStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0">
            <p className="text-sm font-medium tracking-wide text-foreground-muted">
              {t(stat.labelKey)}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums">
              {stat.value.toLocaleString(locale)}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card elevated padding="lg" className="min-h-0">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t('news.feedTitle')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">{t('news.feedSubtitle')}</p>
            </div>
            <p className="text-sm text-foreground-muted">
              {t('news.feedCount', { count: dashboardNews.length })}
            </p>
          </div>

          <ul className="mt-8 divide-y divide-border border-t border-border">
            {dashboardNews.map((item) => (
              <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-foreground-muted uppercase">
                    {t(`news.categories.${item.category}`)}
                  </p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">{t(item.summaryKey)}</p>
                  <time className="mt-2 block text-xs text-foreground-muted">
                    {formatDate(item.publishedAt, locale)}
                  </time>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide',
                    statusClass[item.status],
                  )}
                >
                  {t(`news.status.${item.status}`)}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card elevated padding="lg" className="min-h-0">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {t('news.announcementsTitle')}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t('news.announcementsSubtitle')}
            </p>
          </div>

          <ul className="mt-8 divide-y divide-border border-t border-border">
            {newsAnnouncements.map((item) => (
              <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight">
                    {t(`news.announcements.${item.titleKey}`)}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {t(`news.audience.${item.audienceKey}`)}
                  </p>
                </div>
                <time className="text-sm font-medium text-foreground-muted">
                  {formatDate(item.date, locale)}
                </time>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
