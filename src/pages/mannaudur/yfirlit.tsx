import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SectionPage from '../../components/SectionPage'
import { buttonVariants, Card } from '../../components/ui'
import { cn } from '../../lib/utils'
import {
  employeesInTraining,
  hrEvents,
  hrStats,
  newHires,
} from '../../data/hr'

const TRAINING_PATH = '/mannaudur/thjalfun'

function formatDate(value: string, locale: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(`${value}T12:00:00`))
}

function startOfMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex, 1)
}

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate()
}

function toDateKey(year: number, monthIndex: number, day: number) {
  const month = String(monthIndex + 1).padStart(2, '0')
  const dayValue = String(day).padStart(2, '0')
  return `${year}-${month}-${dayValue}`
}

function HrCalendar({ locale }: { locale: string }) {
  const { t } = useTranslation()
  const [cursor] = useState(() => new Date(2026, 6, 1))
  const year = cursor.getFullYear()
  const monthIndex = cursor.getMonth()

  const eventDates = useMemo(() => {
    return new Set(hrEvents.map((event) => event.date))
  }, [])

  const upcoming = useMemo(() => {
    return [...hrEvents].sort((a, b) => a.date.localeCompare(b.date))
  }, [])

  const firstWeekday = startOfMonth(year, monthIndex).getDay()
  const totalDays = daysInMonth(year, monthIndex)
  const leadingBlanks = (firstWeekday + 6) % 7
  const cells = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: totalDays }, (_, index) => index + 1),
  ]

  const weekdayLabels = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(2026, 0, 5 + index)
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)
  })

  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <p className="text-sm font-medium tracking-wide text-foreground-muted uppercase">
          {formatDate(`${year}-${String(monthIndex + 1).padStart(2, '0')}-01`, locale, {
            month: 'long',
            year: 'numeric',
          })}
        </p>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-foreground-muted">
          {weekdayLabels.map((label) => (
            <span key={label} className="py-1 font-medium tracking-wide uppercase">
              {label}
            </span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((day, index) => {
            if (!day) {
              return <span key={`blank-${index}`} className="aspect-square" />
            }

            const dateKey = toDateKey(year, monthIndex, day)
            const hasEvent = eventDates.has(dateKey)

            return (
              <span
                key={dateKey}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-control text-sm',
                  hasEvent
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'text-foreground',
                )}
              >
                {day}
              </span>
            )
          })}
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <h3 className="text-base font-semibold tracking-tight">{t('hr.events.upcoming')}</h3>
        <ul className="mt-4 space-y-3">
          {upcoming.map((event) => (
            <li key={event.id} className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium tracking-tight">
                  {t(`hr.events.items.${event.titleKey}`)}
                </p>
                <p className="mt-0.5 text-sm text-foreground-muted">
                  {formatDate(event.date, locale, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                  {event.time ? ` · ${event.time}` : null}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function MannaudurYfirlitPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.yfirlit" descriptionKey="pages.mannaudur.dashboardDescription" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {hrStats.map((stat) => {
          const content = (
            <>
              <p className="text-sm font-medium tracking-wide text-foreground-muted">
                {t(stat.labelKey)}
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums">
                {stat.value}
              </p>
            </>
          )

          if ('to' in stat && stat.to) {
            return (
              <Link
                key={stat.id}
                to={stat.to}
                className="block rounded-card outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <Card
                  elevated
                  padding="md"
                  className="min-h-0 h-full hover:bg-interactive-hover/40"
                >
                  {content}
                  <p className="mt-3 text-sm font-medium text-foreground-muted">
                    {t(stat.openHintKey)}
                  </p>
                </Card>
              </Link>
            )
          }

          return (
            <Card key={stat.id} elevated padding="md" className="min-h-0">
              {content}
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card elevated padding="lg" className="min-h-0 flex flex-col">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t('hr.inTraining.title')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">
                {t('hr.inTraining.subtitle')}
              </p>
            </div>
            <p className="text-sm text-foreground-muted">
              {t('hr.inTraining.count', { count: employeesInTraining.length })}
            </p>
          </div>

          <ul className="mt-8 flex-1 divide-y divide-border border-t border-border">
            {employeesInTraining.slice(0, 5).map((employee) => (
              <li key={employee.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="text-base font-semibold tracking-tight">{employee.name}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{employee.title}</p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {t(`hr.departments.${employee.department}`)} ·{' '}
                    {t(`hr.training.courses.${employee.courseKey}`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              to={TRAINING_PATH}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'min-h-12 px-5')}
            >
              {t('hr.training.openButton')}
            </Link>
          </div>
        </Card>

        <Card elevated padding="lg" className="min-h-0">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t('hr.events.title')}</h2>
            <p className="mt-1 text-sm text-foreground-muted">{t('hr.events.subtitle')}</p>
          </div>
          <div className="mt-8">
            <HrCalendar locale={locale} />
          </div>
        </Card>
      </div>

      <Card elevated padding="lg" className="min-h-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t('hr.newHires.title')}</h2>
            <p className="mt-1 text-sm text-foreground-muted">{t('hr.newHires.subtitle')}</p>
          </div>
          <p className="text-sm text-foreground-muted">
            {t('hr.newHires.count', { count: newHires.length })}
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {newHires.map((hire) => (
            <li key={hire.id} className="rounded-control border border-border px-4 py-3">
              <p className="font-semibold tracking-tight">{hire.name}</p>
              <p className="mt-1 text-sm text-foreground-muted">{hire.title}</p>
              <p className="mt-1 text-sm text-foreground-muted">
                {t(`hr.departments.${hire.department}`)} ·{' '}
                {formatDate(hire.startedAt, locale, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
