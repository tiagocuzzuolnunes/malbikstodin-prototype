import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectAreaId } from '../../config/projects'
import {
  getContractsByArea,
  type Contract,
  type ContractStatus,
} from '../../data/contracts'
import { cn } from '../../lib/utils'

type ContractsListProps = {
  areaId: ProjectAreaId
}

const statusClass: Record<ContractStatus, string> = {
  active: 'bg-accent/10 text-accent',
  planned: 'bg-alert/15 text-alert',
  completed: 'bg-success text-success-foreground',
  expired: 'bg-danger/10 text-danger',
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function formatIsk(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
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
  contract,
  locale,
}: {
  contract: Contract
  locale: string
}) {
  const { t } = useTranslation()

  return (
    <article className="space-y-3 border-b border-border px-4 py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
            {contract.serial}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight wrap-break-word">
            {contract.name}
          </h3>
        </div>
        <Badge className={statusClass[contract.status]}>
          {t(`contracts.status.${contract.status}`)}
        </Badge>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
        <div className="min-w-0 col-span-2">
          <dt className="text-foreground-muted">{t('contracts.columns.amount')}</dt>
          <dd className="mt-0.5 font-medium tabular-nums">
            {formatIsk(contract.amountIsk, locale)}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('contracts.columns.startDate')}</dt>
          <dd className="mt-0.5">{formatDate(contract.startDate, locale)}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('contracts.columns.endDate')}</dt>
          <dd className="mt-0.5">{formatDate(contract.endDate, locale)}</dd>
        </div>
      </dl>
    </article>
  )
}

export default function ContractsList({ areaId }: ContractsListProps) {
  const { t, i18n } = useTranslation()
  const areaContracts = useMemo(() => getContractsByArea(areaId), [areaId])

  return (
    <section className="space-y-4" aria-labelledby="contracts-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="contracts-heading" className="text-2xl font-semibold tracking-tight">
          {t('contracts.title')}
        </h2>
        <p className="text-sm text-foreground-muted">
          {t('contracts.count', { count: areaContracts.length })}
        </p>
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
        <div className="md:hidden">
          {areaContracts.map((contract) => (
            <MobileRow key={contract.id} contract={contract} locale={i18n.language} />
          ))}
        </div>

        <div className="hidden md:block">
          <table className="w-full table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-[12%]" />
              <col className="w-[28%]" />
              <col className="w-[18%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('contracts.columns.serial')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('contracts.columns.name')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('contracts.columns.amount')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('contracts.columns.startDate')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('contracts.columns.endDate')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('contracts.columns.status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {areaContracts.map((contract) => (
                <tr
                  key={contract.id}
                  className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                >
                  <td className="px-3 py-3 align-top font-mono text-xs tracking-wide text-foreground-muted">
                    {contract.serial}
                  </td>
                  <td className="px-3 py-3 align-top font-medium wrap-break-word whitespace-normal">
                    {contract.name}
                  </td>
                  <td className="px-3 py-3 align-top tabular-nums whitespace-normal">
                    {formatIsk(contract.amountIsk, i18n.language)}
                  </td>
                  <td className="px-3 py-3 align-top whitespace-normal">
                    {formatDate(contract.startDate, i18n.language)}
                  </td>
                  <td className="px-3 py-3 align-top whitespace-normal">
                    {formatDate(contract.endDate, i18n.language)}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Badge className={statusClass[contract.status]}>
                      {t(`contracts.status.${contract.status}`)}
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
