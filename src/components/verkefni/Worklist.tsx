import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectAreaId } from '../../config/projects'
import { employees } from '../../data/employees'
import {
  getTasksByArea,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '../../data/tasks'
import { useVirtualWindow } from '../../hooks/useVirtualWindow'
import { cn } from '../../lib/utils'

type WorklistProps = {
  areaId: ProjectAreaId
}

const ROW_HEIGHT = 56
const VIRTUALIZE_THRESHOLD = 20

const priorityClass: Record<TaskPriority, string> = {
  high: 'bg-danger/10 text-danger',
  medium: 'bg-alert/15 text-alert',
  low: 'bg-surface-muted text-foreground-muted',
}

const statusClass: Record<TaskStatus, string> = {
  inCourse: 'bg-accent/10 text-accent',
  planned: 'bg-surface-muted text-foreground-muted',
  finished: 'bg-success text-success-foreground',
  delayed: 'bg-danger/10 text-danger',
}

function employeeName(employeeId: string) {
  return employees.find((employee) => employee.id === employeeId)?.name ?? '—'
}

function formatDueDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function Badge({
  className,
  children,
}: {
  className: string
  children: string
}) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide wrap-break-word whitespace-normal',
        className,
      )}
    >
      {children}
    </span>
  )
}

function MobileRow({
  task,
  locale,
}: {
  task: Task
  locale: string
}) {
  const { t } = useTranslation()

  return (
    <article className="space-y-3 border-b border-border px-4 py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
            {task.serial}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight wrap-break-word">
            {task.title}
          </h3>
        </div>
        <Badge className={priorityClass[task.priority]}>
          {t(`worklist.priority.${task.priority}`)}
        </Badge>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('worklist.columns.employee')}</dt>
          <dd className="mt-0.5 wrap-break-word">{employeeName(task.employeeId)}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('worklist.columns.project')}</dt>
          <dd className="mt-0.5 wrap-break-word">{task.projectName}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('worklist.columns.status')}</dt>
          <dd className="mt-1">
            <Badge className={statusClass[task.status]}>
              {t(`worklist.status.${task.status}`)}
            </Badge>
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('worklist.columns.dueDate')}</dt>
          <dd className="mt-0.5">{formatDueDate(task.dueDate, locale)}</dd>
        </div>
      </dl>
    </article>
  )
}

function DesktopTaskRow({ task, locale }: { task: Task; locale: string }) {
  const { t } = useTranslation()

  return (
    <tr className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40">
      <td className="px-3 py-3 align-top font-mono text-xs tracking-wide text-foreground-muted">
        {task.serial}
      </td>
      <td className="px-3 py-3 align-top font-medium wrap-break-word whitespace-normal">
        {task.title}
      </td>
      <td className="px-3 py-3 align-top wrap-break-word whitespace-normal">
        {employeeName(task.employeeId)}
      </td>
      <td className="px-3 py-3 align-top wrap-break-word whitespace-normal text-foreground-muted">
        {task.projectName}
      </td>
      <td className="px-3 py-3 align-top">
        <Badge className={priorityClass[task.priority]}>
          {t(`worklist.priority.${task.priority}`)}
        </Badge>
      </td>
      <td className="px-3 py-3 align-top">
        <Badge className={statusClass[task.status]}>
          {t(`worklist.status.${task.status}`)}
        </Badge>
      </td>
      <td className="px-3 py-3 align-top whitespace-normal">
        {formatDueDate(task.dueDate, locale)}
      </td>
    </tr>
  )
}

export default function Worklist({ areaId }: WorklistProps) {
  const { t, i18n } = useTranslation()
  const areaTasks = useMemo(() => getTasksByArea(areaId), [areaId])
  const scrollRef = useRef<HTMLDivElement>(null)
  const windowing = useVirtualWindow(scrollRef, {
    itemCount: areaTasks.length,
    itemHeight: ROW_HEIGHT,
    threshold: VIRTUALIZE_THRESHOLD,
  })

  const visibleTasks = windowing.enabled
    ? areaTasks.slice(windowing.startIndex, windowing.endIndex)
    : areaTasks

  return (
    <section className="space-y-4" aria-labelledby="worklist-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="worklist-heading" className="text-2xl font-semibold tracking-tight">
          {t('worklist.title')}
        </h2>
        <p className="text-sm text-foreground-muted">
          {t('worklist.count', { count: areaTasks.length })}
        </p>
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
        {/* Mobile: stacked rows — no horizontal scroll */}
        <div className="md:hidden">
          {areaTasks.map((task) => (
            <MobileRow key={task.id} task={task} locale={i18n.language} />
          ))}
        </div>

        {/* Desktop: windowed table body when lists grow past the threshold */}
        <div className="hidden md:block">
          <table className="w-full table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-[7%]" />
              <col className="w-[24%]" />
              <col className="w-[16%]" />
              <col className="w-[16%]" />
              <col className="w-[12%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('worklist.columns.serial')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('worklist.columns.task')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('worklist.columns.employee')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('worklist.columns.project')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('worklist.columns.priority')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('worklist.columns.status')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('worklist.columns.dueDate')}
                </th>
              </tr>
            </thead>
          </table>

          <div
            ref={scrollRef}
            className={cn(windowing.enabled && 'max-h-128 overflow-y-auto')}
            onScroll={windowing.enabled ? windowing.onScroll : undefined}
          >
            {windowing.enabled ? (
              <div style={{ height: windowing.totalHeight, position: 'relative' }}>
                <table
                  className="w-full table-fixed border-collapse text-left text-sm"
                  style={{
                    position: 'absolute',
                    top: windowing.offsetTop,
                    left: 0,
                    right: 0,
                  }}
                >
                  <colgroup>
                    <col className="w-[7%]" />
                    <col className="w-[24%]" />
                    <col className="w-[16%]" />
                    <col className="w-[16%]" />
                    <col className="w-[12%]" />
                    <col className="w-[13%]" />
                    <col className="w-[12%]" />
                  </colgroup>
                  <tbody>
                    {visibleTasks.map((task) => (
                      <DesktopTaskRow
                        key={task.id}
                        task={task}
                        locale={i18n.language}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <colgroup>
                  <col className="w-[7%]" />
                  <col className="w-[24%]" />
                  <col className="w-[16%]" />
                  <col className="w-[16%]" />
                  <col className="w-[12%]" />
                  <col className="w-[13%]" />
                  <col className="w-[12%]" />
                </colgroup>
                <tbody>
                  {visibleTasks.map((task) => (
                    <DesktopTaskRow
                      key={task.id}
                      task={task}
                      locale={i18n.language}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
