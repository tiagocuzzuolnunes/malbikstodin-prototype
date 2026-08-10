import { useTranslation } from 'react-i18next'
import {
  getJobsByStage,
  jobPipelineStages,
  jobPipelineStats,
  type JobPipelineFlag,
  type JobPipelineJob,
} from '../../data/jobPipeline'
import { cn } from '../../lib/utils'
import { Card, StatusDotBadge } from '../ui'

const flagTone: Record<
  JobPipelineFlag,
  { className: string; dotClassName: string }
> = {
  onTrack: {
    className: 'bg-success/15 text-success',
    dotClassName: 'bg-success',
  },
  deadlineMissing: {
    className: 'bg-danger/10 text-danger',
    dotClassName: 'bg-danger',
  },
  noForeman: {
    className: 'bg-danger/10 text-danger',
    dotClassName: 'bg-danger',
  },
  noScheduleDate: {
    className: 'bg-alert/15 text-alert',
    dotClassName: 'bg-alert',
  },
  unapprovedDays: {
    className: 'bg-alert/15 text-alert',
    dotClassName: 'bg-alert',
  },
  awaitingDocket: {
    className: 'bg-accent/10 text-accent',
    dotClassName: 'bg-accent',
  },
  samplesOutstanding: {
    className: 'bg-alert/15 text-alert',
    dotClassName: 'bg-alert',
  },
  waitingClient: {
    className: 'bg-accent/10 text-accent',
    dotClassName: 'bg-accent',
  },
  rateGap: {
    className: 'bg-danger/10 text-danger',
    dotClassName: 'bg-danger',
  },
  docsMissing: {
    className: 'bg-alert/15 text-alert',
    dotClassName: 'bg-alert',
  },
}

function formatIsk(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatTonnes(amount: number, locale: string) {
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount)} t`
}

function formatAmount(job: JobPipelineJob, locale: string) {
  return job.amountUnit === 'tonnes'
    ? formatTonnes(job.amount, locale)
    : formatIsk(job.amount, locale)
}

function JobCard({ job, locale }: { job: JobPipelineJob; locale: string }) {
  const { t } = useTranslation()
  const tone = flagTone[job.flag]
  const stuck = job.daysInStage >= 14

  return (
    <article className="flex h-36 flex-col rounded-control border border-border bg-surface p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 font-mono text-xs font-semibold tracking-wide text-foreground-muted">
          {job.serial}
        </p>
        <p
          className={cn(
            'shrink-0 text-xs font-semibold tabular-nums',
            stuck ? 'text-danger' : 'text-foreground-muted',
          )}
        >
          {t('jobPipeline.daysInStage', { count: job.daysInStage })}
        </p>
      </div>

      <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug tracking-tight">
        {t(job.clientKey)}
      </h3>

      <p className="mt-1 truncate text-sm font-medium tabular-nums text-foreground">
        {formatAmount(job, locale)}
      </p>

      <div className="mt-auto pt-2">
        <StatusDotBadge
          label={t(`jobPipeline.flags.${job.flag}`)}
          className={cn(tone.className, 'max-w-full')}
          dotClassName={tone.dotClassName}
        />
      </div>
    </article>
  )
}

export default function JobPipeline() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {jobPipelineStats.map((stat) => {
          const isAlert = stat.id === 'stuck' || stat.id === 'pastDeadline'
          const isPositive = stat.id === 'readyToInvoice'

          return (
            <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0 p-3 sm:p-5">
              <p className="text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
                {t(stat.labelKey)}
              </p>
              <p
                className={cn(
                  'mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:mt-3 sm:text-3xl',
                  isAlert && 'text-danger',
                  isPositive && 'text-success',
                )}
              >
                {stat.format === 'isk'
                  ? formatIsk(stat.value, locale)
                  : stat.value.toLocaleString(locale)}
              </p>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-2 xl:gap-3">
        {jobPipelineStages.map((stage) => {
          const jobs = getJobsByStage(stage.id)

          return (
            <section
              key={stage.id}
              className="flex min-w-0 flex-col rounded-card border border-border bg-surface-muted/40"
              aria-labelledby={`pipeline-stage-${stage.id}`}
            >
              <header className="flex items-center justify-between gap-2 border-b border-border px-2.5 py-2.5 lg:px-3 lg:py-3">
                <h2
                  id={`pipeline-stage-${stage.id}`}
                  className="truncate text-sm font-semibold tracking-tight lg:text-base"
                >
                  {t(stage.labelKey)}
                </h2>
                <span className="inline-flex min-w-6 shrink-0 items-center justify-center rounded-pill bg-control px-1.5 py-0.5 text-xs font-semibold tabular-nums text-foreground">
                  {jobs.length}
                </span>
              </header>

              <ul className="flex flex-1 flex-col gap-2 p-2 lg:gap-3 lg:p-3">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <JobCard job={job} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
