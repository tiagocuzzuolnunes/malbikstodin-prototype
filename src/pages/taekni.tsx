import { useTranslation } from 'react-i18next'
import { SectionPage } from '../components/shared'
import { Card } from '../components/ui'
import { cn } from '../lib/utils'
import {
  itStats,
  itSystems,
  itTickets,
  type SystemStatus,
  type TicketPriority,
  type TicketStatus,
} from '../data/it'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

const priorityClass: Record<TicketPriority, string> = {
  high: 'bg-danger/10 text-danger',
  medium: 'bg-alert/15 text-alert',
  low: 'bg-surface-muted text-foreground-muted',
}

const ticketStatusClass: Record<TicketStatus, string> = {
  open: 'bg-accent/10 text-accent',
  inProgress: 'bg-alert/15 text-alert',
  waiting: 'bg-surface-muted text-foreground-muted',
}

const systemStatusClass: Record<SystemStatus, string> = {
  operational: 'bg-success/10 text-success',
  degraded: 'bg-alert/15 text-alert',
  maintenance: 'bg-danger/10 text-danger',
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
        'inline-flex max-w-full items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default function TaekniPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.taekni" descriptionKey="pages.taekni.description" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {itStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0">
            <p className="text-sm font-medium tracking-wide text-foreground-muted">
              {t(stat.labelKey)}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums">
              {stat.id === 'systemsUp' ? `${stat.value}%` : stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card elevated padding="lg" className="min-h-0 min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t('it.ticketsTitle')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">{t('it.ticketsSubtitle')}</p>
            </div>
            <p className="text-sm text-foreground-muted">
              {t('it.ticketsCount', { count: itTickets.length })}
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-card border border-border">
            <div className="md:hidden">
              {itTickets.map((ticket) => (
                <article
                  key={ticket.id}
                  className="space-y-2 border-b border-border px-4 py-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-xs tracking-wide text-foreground-muted">
                        {ticket.serial}
                      </p>
                      <h3 className="mt-1 font-semibold tracking-tight">
                        {t(`it.tickets.${ticket.titleKey}`)}
                      </h3>
                    </div>
                    <Badge className={priorityClass[ticket.priority]}>
                      {t(`it.priority.${ticket.priority}`)}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground-muted">{ticket.requester}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={ticketStatusClass[ticket.status]}>
                      {t(`it.ticketStatus.${ticket.status}`)}
                    </Badge>
                    <time className="text-xs text-foreground-muted">
                      {formatDate(ticket.openedAt, locale)}
                    </time>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden min-w-0 md:block">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <colgroup>
                  <col className="w-[12%]" />
                  <col className="w-[28%]" />
                  <col className="w-[22%]" />
                  <col className="w-[12%]" />
                  <col className="w-[14%]" />
                  <col className="w-[12%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-border bg-surface-muted">
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('it.columns.serial')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('it.columns.ticket')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('it.columns.requester')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('it.columns.priority')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('it.columns.status')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('it.columns.opened')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                    >
                      <td className="px-2 py-3 align-top font-mono text-xs text-foreground-muted">
                        {ticket.serial}
                      </td>
                      <td className="px-2 py-3 align-top font-medium wrap-break-word">
                        {t(`it.tickets.${ticket.titleKey}`)}
                      </td>
                      <td className="px-2 py-3 align-top wrap-break-word">{ticket.requester}</td>
                      <td className="px-2 py-3 align-top">
                        <Badge className={priorityClass[ticket.priority]}>
                          {t(`it.priority.${ticket.priority}`)}
                        </Badge>
                      </td>
                      <td className="px-2 py-3 align-top">
                        <Badge className={ticketStatusClass[ticket.status]}>
                          {t(`it.ticketStatus.${ticket.status}`)}
                        </Badge>
                      </td>
                      <td className="px-2 py-3 align-top wrap-break-word">
                        {formatDate(ticket.openedAt, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card elevated padding="lg" className="min-h-0">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {t('it.systemsTitle')}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">{t('it.systemsSubtitle')}</p>
          </div>

          <ul className="mt-8 divide-y divide-border border-t border-border">
            {itSystems.map((system) => (
              <li
                key={system.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight">
                    {t(`it.systems.${system.nameKey}`)}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {t('it.uptime', { value: system.uptime })}
                  </p>
                </div>
                <Badge className={systemStatusClass[system.status]}>
                  {t(`it.systemStatus.${system.status}`)}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
