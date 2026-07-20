import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SectionPage from '../../components/SectionPage'
import { Button, Card } from '../../components/ui'
import { cn } from '../../lib/utils'
import {
  employeeLicenses,
  licenseOverviewStats,
  type LicenseStatus,
} from '../../data/licenses'

const statusClass: Record<LicenseStatus, string> = {
  valid: 'bg-success/10 text-success',
  expiringSoon: 'bg-alert/15 text-alert',
  expired: 'bg-danger/10 text-danger',
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export default function MannaudurLeyfiPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const [statusFilter, setStatusFilter] = useState<'all' | LicenseStatus>('all')

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return employeeLicenses
    return employeeLicenses.filter((license) => license.status === statusFilter)
  }, [statusFilter])

  const filters: { id: 'all' | LicenseStatus; label: string }[] = [
    { id: 'all', label: t('hr.licenses.filters.all') },
    { id: 'valid', label: t('hr.licenses.status.valid') },
    { id: 'expiringSoon', label: t('hr.licenses.status.expiringSoon') },
    { id: 'expired', label: t('hr.licenses.status.expired') },
  ]

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.leyfi"
        descriptionKey="pages.mannaudur.licensesDescription"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {licenseOverviewStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0">
            <p className="text-sm font-medium tracking-wide text-foreground-muted">
              {t(stat.labelKey)}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {t('hr.licenses.manageTitle')}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t('hr.licenses.manageSubtitle')}
            </p>
          </div>
          <p className="text-sm text-foreground-muted">
            {t('hr.licenses.count', { count: filtered.length })}
          </p>
        </div>

        <div
          className="flex flex-wrap gap-3"
          role="group"
          aria-label={t('hr.licenses.filters.label')}
        >
          {filters.map((item) => {
            const isActive = statusFilter === item.id

            return (
              <Button
                key={item.id}
                type="button"
                size="md"
                variant={isActive ? 'primary' : 'ghost'}
                aria-pressed={isActive}
                className={cn(!isActive && 'text-foreground hover:bg-interactive-hover')}
                onClick={() => setStatusFilter(item.id)}
              >
                {item.label}
              </Button>
            )
          })}
        </div>

        <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
          <div className="md:hidden">
            {filtered.map((license) => (
              <article
                key={license.id}
                className="space-y-3 border-b border-border px-4 py-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
                      {license.serial}
                    </p>
                    <h3 className="mt-1 text-base font-semibold tracking-tight">
                      {license.employeeName}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {t(`hr.licenses.types.${license.typeKey}`)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide',
                      statusClass[license.status],
                    )}
                  >
                    {t(`hr.licenses.status.${license.status}`)}
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-foreground-muted">{t('hr.licenses.columns.department')}</dt>
                    <dd className="mt-0.5">{t(`hr.departments.${license.department}`)}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">{t('hr.licenses.columns.expires')}</dt>
                    <dd className="mt-0.5">{formatDate(license.expiresAt, locale)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-3xl table-fixed border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hr.licenses.columns.serial')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hr.licenses.columns.employee')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hr.licenses.columns.license')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hr.licenses.columns.department')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hr.licenses.columns.expires')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hr.licenses.columns.status')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((license) => (
                  <tr
                    key={license.id}
                    className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                  >
                    <td className="px-3 py-3 align-top font-mono text-xs tracking-wide text-foreground-muted">
                      {license.serial}
                    </td>
                    <td className="px-3 py-3 align-top font-medium">{license.employeeName}</td>
                    <td className="px-3 py-3 align-top">
                      {t(`hr.licenses.types.${license.typeKey}`)}
                    </td>
                    <td className="px-3 py-3 align-top">
                      {t(`hr.departments.${license.department}`)}
                    </td>
                    <td className="px-3 py-3 align-top">
                      {formatDate(license.expiresAt, locale)}
                    </td>
                    <td className="px-3 py-3 align-top">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide',
                          statusClass[license.status],
                        )}
                      >
                        {t(`hr.licenses.status.${license.status}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
