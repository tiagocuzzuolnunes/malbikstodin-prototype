import { useTranslation } from 'react-i18next'
import { Card } from '../ui'
import type { HourEntry } from '../../data/hours'
import { formatAppDate } from '../../lib/formatDate'
import { formatHours } from './hoursUtils'

type HoursEntriesTableProps = {
  entries: HourEntry[]
}

export function HoursEntriesTable({ entries }: HoursEntriesTableProps) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{t('hours.tableTitle')}</h2>
          <p className="mt-1 text-sm text-foreground-muted">{t('hours.tableSubtitle')}</p>
        </div>
        <p className="text-sm text-foreground-muted">
          {t('hours.count', { count: entries.length })}
        </p>
      </div>

      <div className="mt-6 min-w-0 overflow-hidden rounded-card border border-border">
        <div className="md:hidden">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="space-y-2 border-b border-border px-4 py-4 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs tracking-wide text-foreground-muted">
                    {entry.serial}
                  </p>
                  <h3 className="mt-1 font-semibold tracking-tight wrap-break-word">
                    {entry.description}
                  </h3>
                </div>
                <p className="shrink-0 font-medium tabular-nums">
                  {t('hours.hoursValue', { value: formatHours(entry.hours, locale) })}
                </p>
              </div>
              <p className="text-sm text-foreground-muted">
                {t(`hours.categories.${entry.category}`)} ·{' '}
                {formatAppDate(entry.date, t, locale)}
              </p>
              <p className="text-sm text-foreground-muted">{entry.submittedBy}</p>
            </article>
          ))}
        </div>

        <div className="hidden min-w-0 md:block">
          <table className="w-full table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[28%]" />
              <col className="w-[18%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[18%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-2 py-3 font-medium text-foreground-muted">
                  {t('hours.columns.serial')}
                </th>
                <th className="px-2 py-3 font-medium text-foreground-muted">
                  {t('hours.columns.description')}
                </th>
                <th className="px-2 py-3 font-medium text-foreground-muted">
                  {t('hours.columns.category')}
                </th>
                <th className="px-2 py-3 font-medium text-foreground-muted">
                  {t('hours.columns.hours')}
                </th>
                <th className="px-2 py-3 font-medium text-foreground-muted">
                  {t('hours.columns.date')}
                </th>
                <th className="px-2 py-3 font-medium text-foreground-muted">
                  {t('hours.columns.submittedBy')}
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                >
                  <td className="px-2 py-3 align-top font-mono text-xs tracking-wide text-foreground-muted">
                    {entry.serial}
                  </td>
                  <td className="px-2 py-3 align-top font-medium wrap-break-word whitespace-normal">
                    {entry.description}
                  </td>
                  <td className="px-2 py-3 align-top wrap-break-word whitespace-normal">
                    {t(`hours.categories.${entry.category}`)}
                  </td>
                  <td className="px-2 py-3 align-top tabular-nums wrap-break-word whitespace-normal">
                    {formatHours(entry.hours, locale)}
                  </td>
                  <td className="px-2 py-3 align-top wrap-break-word whitespace-normal">
                    {formatAppDate(entry.date, t, locale)}
                  </td>
                  <td className="px-2 py-3 align-top wrap-break-word whitespace-normal">
                    {entry.submittedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
