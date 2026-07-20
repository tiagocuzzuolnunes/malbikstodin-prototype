import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectAreaId } from '../config/projects'
import { employees } from '../data/employees'
import {
  getArchiveByArea,
  type ArchiveDocument,
  type ArchiveStatus,
  type DocumentType,
} from '../data/archive'
import { cn } from '../lib/utils'

type ArchiveListProps = {
  areaId: ProjectAreaId
}

const statusClass: Record<ArchiveStatus, string> = {
  approved: 'bg-success/10 text-success',
  inReview: 'bg-alert/15 text-alert',
  denied: 'bg-danger/10 text-danger',
}

const typeClass: Record<DocumentType, string> = {
  word: 'bg-surface-muted text-foreground',
  excel: 'bg-accent/10 text-foreground',
  pdf: 'bg-interactive-hover text-foreground',
}

function employeeName(employeeId: string) {
  return employees.find((employee) => employee.id === employeeId)?.name ?? '—'
}

function formatDate(value: string, locale: string) {
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
        'inline-flex max-w-full items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide break-words whitespace-normal',
        className,
      )}
    >
      {children}
    </span>
  )
}

function MobileRow({
  document,
  locale,
}: {
  document: ArchiveDocument
  locale: string
}) {
  const { t } = useTranslation()

  return (
    <article className="space-y-3 border-b border-border px-4 py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
            {document.serial}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight break-words">
            {document.name}
          </h3>
        </div>
        <Badge className={statusClass[document.status]}>
          {t(`archive.status.${document.status}`)}
        </Badge>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('archive.columns.date')}</dt>
          <dd className="mt-0.5">{formatDate(document.date, locale)}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('archive.columns.type')}</dt>
          <dd className="mt-1">
            <Badge className={typeClass[document.type]}>
              {t(`archive.type.${document.type}`)}
            </Badge>
          </dd>
        </div>
        <div className="min-w-0 col-span-2">
          <dt className="text-foreground-muted">{t('archive.columns.insertedBy')}</dt>
          <dd className="mt-0.5 break-words">{employeeName(document.insertedByEmployeeId)}</dd>
        </div>
      </dl>
    </article>
  )
}

export default function ArchiveList({ areaId }: ArchiveListProps) {
  const { t, i18n } = useTranslation()
  const areaDocuments = useMemo(() => getArchiveByArea(areaId), [areaId])

  return (
    <section className="space-y-4" aria-labelledby="archive-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="archive-heading" className="text-2xl font-semibold tracking-tight">
          {t('archive.title')}
        </h2>
        <p className="text-sm text-foreground-muted">
          {t('archive.count', { count: areaDocuments.length })}
        </p>
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
        <div className="md:hidden">
          {areaDocuments.map((document) => (
            <MobileRow key={document.id} document={document} locale={i18n.language} />
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-3xl table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-[12%]" />
              <col className="w-[28%]" />
              <col className="w-[14%]" />
              <col className="w-[20%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('archive.columns.serial')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('archive.columns.name')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('archive.columns.date')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('archive.columns.insertedBy')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('archive.columns.type')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('archive.columns.status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {areaDocuments.map((document) => (
                <tr
                  key={document.id}
                  className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                >
                  <td className="px-3 py-3 align-top font-mono text-xs tracking-wide text-foreground-muted">
                    {document.serial}
                  </td>
                  <td className="px-3 py-3 align-top font-medium break-words whitespace-normal">
                    {document.name}
                  </td>
                  <td className="px-3 py-3 align-top whitespace-normal">
                    {formatDate(document.date, i18n.language)}
                  </td>
                  <td className="px-3 py-3 align-top break-words whitespace-normal">
                    {employeeName(document.insertedByEmployeeId)}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Badge className={typeClass[document.type]}>
                      {t(`archive.type.${document.type}`)}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Badge className={statusClass[document.status]}>
                      {t(`archive.status.${document.status}`)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
