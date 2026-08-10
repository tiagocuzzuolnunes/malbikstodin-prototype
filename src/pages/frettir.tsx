import { useTranslation } from 'react-i18next'
import { SectionPage } from '../components/shared'
import { Card } from '../components/ui'
import {
  dashboardNews,
  newsAnnouncements,
  newsStats,
  type DashboardNewsItem,
} from '../data/news'
import { statusRowBg } from '../lib/statusRowTint'
import { cn } from '../lib/utils'

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

const statusRowTint: Record<DashboardNewsItem['status'], string> = {
  published: statusRowBg.success,
  draft: statusRowBg.muted,
  scheduled: statusRowBg.alert,
}

export default function FrettirPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <SectionPage titleKey="nav.frettir" descriptionKey="pages.frettir.description" />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {newsStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0">
            <p className="text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
              {t(stat.labelKey)}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:mt-3 sm:text-4xl">
              {stat.value.toLocaleString(locale)}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2">
        <Card elevated padding="lg" className="min-h-0 min-w-0 overflow-hidden">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {t('news.feedTitle')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">{t('news.feedSubtitle')}</p>
            </div>
            <p className="shrink-0 text-sm text-foreground-muted">
              {t('news.feedCount', { count: dashboardNews.length })}
            </p>
          </div>

          <ul className="mt-6 divide-y divide-border border-t border-border sm:mt-8">
            {dashboardNews.map((item) => (
              <li
                key={item.id}
                className={cn(
                  'flex flex-col gap-3 px-3 py-4 -mx-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:px-4 sm:-mx-4',
                  statusRowTint[item.status],
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium tracking-wide text-foreground-muted uppercase">
                    {t(`news.categories.${item.category}`)}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold tracking-tight wrap-break-word sm:text-base">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted wrap-break-word">
                    {t(item.summaryKey)}
                  </p>
                  <time className="mt-2 block text-xs text-foreground-muted">
                    {formatDate(item.publishedAt, locale)}
                  </time>
                </div>
                <span
                  className={cn(
                    'inline-flex w-fit shrink-0 items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide',
                    statusClass[item.status],
                  )}
                >
                  {t(`news.status.${item.status}`)}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card elevated padding="lg" className="min-h-0 min-w-0 overflow-hidden">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {t('news.announcementsTitle')}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t('news.announcementsSubtitle')}
            </p>
          </div>

          <ul className="mt-6 divide-y divide-border border-t border-border sm:mt-8">
            {newsAnnouncements.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold tracking-tight wrap-break-word sm:text-base">
                    {t(`news.announcements.${item.titleKey}`)}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {t(`news.audience.${item.audienceKey}`)}
                  </p>
                </div>
                <time className="shrink-0 text-sm font-medium text-foreground-muted">
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
