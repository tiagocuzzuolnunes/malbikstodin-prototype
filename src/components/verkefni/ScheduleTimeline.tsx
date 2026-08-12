import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectAreaId } from '../../config/projects'
import { projectAreas } from '../../config/projects'
import { employees } from '../../data/employees'
import { getSchedules, type AreaDaySchedule, type ScheduleBlock } from '../../data/schedules'
import { cn } from '../../lib/utils'

type ScheduleTimelineProps = {
  areaId?: ProjectAreaId
}

function employeeById(employeeId: string) {
  return employees.find((employee) => employee.id === employeeId)
}

function formatDay(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function BlockItem({
  block,
  isLast,
}: {
  block: ScheduleBlock
  isLast: boolean
}) {
  const { t } = useTranslation()

  return (
    <li className="relative flex gap-4 pb-7 last:pb-0">
      {!isLast ? (
        <span
          className="absolute top-9 bottom-0 left-4.5 w-px bg-border"
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-border bg-surface-muted',
        )}
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-foreground" />
      </div>

      <div className="min-w-0 pt-1">
        <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
          {block.startTime} – {block.endTime}
        </p>
        <h4 className="mt-1 text-base font-semibold tracking-tight">
          {t(`schedule.blocks.${block.titleKey}`)}
        </h4>
        {block.locationKey ? (
          <p className="mt-1 text-sm text-foreground-muted">
            {t(`schedule.locations.${block.locationKey}`)}
          </p>
        ) : null}
      </div>
    </li>
  )
}

function ScheduleDay({
  schedule,
  showAreaTitle,
}: {
  schedule: AreaDaySchedule
  showAreaTitle: boolean
}) {
  const { t, i18n } = useTranslation()
  const area = projectAreas.find((item) => item.id === schedule.areaId)
  const headingId = `schedule-heading-${schedule.areaId}`

  return (
    <section className="space-y-6" aria-labelledby={headingId}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id={headingId} className="text-2xl font-semibold tracking-tight">
            {showAreaTitle && area ? t(area.titleKey) : t('schedule.title')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {formatDay(schedule.date, i18n.language)}
          </p>
        </div>
        <p className="text-sm text-foreground-muted">
          {t('schedule.employeeCount', { count: schedule.employees.length })}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {schedule.employees.map((entry) => {
          const employee = employeeById(entry.employeeId)
          const employeeHeadingId = `schedule-employee-${schedule.areaId}-${entry.employeeId}`

          return (
            <article
              key={`${schedule.areaId}-${entry.employeeId}`}
              className="overflow-hidden rounded-card border border-border bg-surface shadow-card"
              aria-labelledby={employeeHeadingId}
            >
              <header className="border-b border-border px-5 py-4">
                <h3
                  id={employeeHeadingId}
                  className="text-lg font-semibold tracking-tight"
                >
                  {employee?.name ?? '—'}
                </h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  {employee?.title ?? t('schedule.unknownRole')}
                </p>
              </header>

              <ol className="px-5 py-5">
                {entry.blocks.map((block, index) => (
                  <BlockItem
                    key={block.id}
                    block={block}
                    isLast={index === entry.blocks.length - 1}
                  />
                ))}
              </ol>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function ScheduleTimeline({ areaId }: ScheduleTimelineProps) {
  const { t } = useTranslation()
  const schedules = useMemo(() => getSchedules(areaId), [areaId])

  if (schedules.length === 0) {
    return (
      <p className="text-sm text-foreground-muted">{t('schedule.empty')}</p>
    )
  }

  const showAreaTitle = schedules.length > 1

  return (
    <div className={showAreaTitle ? 'space-y-10' : undefined}>
      {schedules.map((schedule) => (
        <ScheduleDay
          key={schedule.areaId}
          schedule={schedule}
          showAreaTitle={showAreaTitle}
        />
      ))}
    </div>
  )
}
