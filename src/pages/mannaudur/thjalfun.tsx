import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionPage } from '../../components/shared'
import { Card } from '../../components/ui'
import {
  certifications,
  departmentCourseProgress,
  upcomingCourses,
  type CertificationStatus,
} from '../../data/hr'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'

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

const statusClass: Record<CertificationStatus, string> = {
  onCourse: 'bg-alert/15 text-alert',
  valid: 'bg-success/10 text-success',
  expired: 'bg-danger/10 text-danger',
}

const statusRowTint: Record<CertificationStatus, string> = {
  onCourse: statusRowBg.alert,
  valid: statusRowBg.success,
  expired: statusRowBg.danger,
}

function CoursesCalendar({ locale }: { locale: string }) {
  const { t } = useTranslation()
  const [cursor] = useState(() => new Date(2026, 6, 1))
  const year = cursor.getFullYear()
  const monthIndex = cursor.getMonth()

  const courseDates = useMemo(
    () => new Set(upcomingCourses.map((course) => course.date)),
    [],
  )

  const upcoming = useMemo(
    () => [...upcomingCourses].sort((a, b) => a.date.localeCompare(b.date)),
    [],
  )

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
    <div className="space-y-5">
      <p className="text-sm font-medium tracking-wide text-foreground-muted uppercase">
        {formatDate(`${year}-${String(monthIndex + 1).padStart(2, '0')}-01`, locale, {
          month: 'long',
          year: 'numeric',
        })}
      </p>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-foreground-muted">
        {weekdayLabels.map((label) => (
          <span key={label} className="py-1 font-medium tracking-wide uppercase">
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) {
            return <span key={`blank-${index}`} className="aspect-square" />
          }

          const dateKey = toDateKey(year, monthIndex, day)
          const hasCourse = courseDates.has(dateKey)

          return (
            <span
              key={dateKey}
              className={cn(
                'flex aspect-square items-center justify-center rounded-control text-sm',
                hasCourse
                  ? 'bg-accent text-accent-foreground font-semibold'
                  : 'text-foreground',
              )}
            >
              {day}
            </span>
          )
        })}
      </div>

      <ul className="space-y-3 border-t border-border pt-4">
        {upcoming.map((course) => (
          <li key={course.id}>
            <p className="font-medium tracking-tight">
              {t(`hr.training.upcomingCourses.${course.titleKey}`)}
            </p>
            <p className="mt-0.5 text-sm text-foreground-muted">
              {formatDate(course.date, locale, {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
              {course.time ? ` · ${course.time}` : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DepartmentProgressChart() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      {departmentCourseProgress.map((item) => (
        <div key={item.department}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium">{t(`hr.departments.${item.department}`)}</span>
            <span className="tabular-nums text-foreground-muted">{item.progress}%</span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-control bg-surface-muted"
            role="meter"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={item.progress}
            aria-label={t('hr.training.progressAria', {
              department: t(`hr.departments.${item.department}`),
              value: item.progress,
            })}
          >
            <div
              className="h-full rounded-control bg-accent transition-[width]"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ThjalfunPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.thjalfun"
        descriptionKey="pages.mannaudur.trainingDescription"
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card elevated padding="lg" className="min-h-0">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {t('hr.training.certificationsTitle')}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t('hr.training.certificationsSubtitle')}
            </p>
          </div>

          <ul className="mt-8 divide-y divide-border border-t border-border">
            {certifications.map((cert) => (
              <li
                key={cert.id}
                className={cn(
                  'flex flex-wrap items-start justify-between gap-3 px-3 py-4 -mx-3 sm:px-4 sm:-mx-4',
                  statusRowTint[cert.status],
                )}
              >
                <div className="min-w-0">
                  <p className="text-base font-semibold tracking-tight">
                    {t(`hr.training.certNames.${cert.nameKey}`)}
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {t(`hr.departments.${cert.department}`)} ·{' '}
                    {formatDate(cert.issuedAt, locale, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide',
                    statusClass[cert.status],
                  )}
                >
                  {t(`hr.training.status.${cert.status}`)}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-6">
          <Card elevated padding="lg" className="min-h-0">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t('hr.training.upcomingTitle')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">
                {t('hr.training.upcomingSubtitle')}
              </p>
            </div>
            <div className="mt-6">
              <CoursesCalendar locale={locale} />
            </div>
          </Card>

          <Card elevated padding="lg" className="min-h-0">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t('hr.training.progressTitle')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">
                {t('hr.training.progressSubtitle')}
              </p>
            </div>
            <div className="mt-6">
              <DepartmentProgressChart />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
