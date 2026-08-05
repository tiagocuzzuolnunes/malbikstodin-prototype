import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Lock, RefreshCw, Snowflake } from 'lucide-react'
import {
  createSnapshotId,
  initialProjectCostSnapshots,
  jobCostAnalysis,
  labourRates,
  rateHistory,
  type ProjectCostSnapshot,
} from '../../data/jobCost'
import { Button, Card } from '../ui'
import { cn } from '../../lib/utils'
import { CostLinesTable } from './jobCost/CostLinesTable'
import { LabourRatesTable } from './jobCost/LabourRatesTable'
import { RateHistoryTable } from './jobCost/RateHistoryTable'
import { SnapshotsTable } from './jobCost/SnapshotsTable'
import { formatIsk, formatPct } from './jobCost/format'

const views = ['costSheet', 'rateHistory', 'labourRates', 'snapshots'] as const
type JobCostView = (typeof views)[number]

export function JobCostAnalysis() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const job = jobCostAnalysis

  const [view, setView] = useState<JobCostView>('costSheet')
  const [frozen, setFrozen] = useState(false)
  const [loadedNotice, setLoadedNotice] = useState(false)
  const [snapshots, setSnapshots] = useState<ProjectCostSnapshot[]>(
    initialProjectCostSnapshots,
  )

  const actualCost = job.actualCostIsk
  const variance = job.tenderAmountIsk - actualCost
  const variancePct =
    job.tenderAmountIsk === 0 ? 0 : (variance / job.tenderAmountIsk) * 100
  const variancePositive = variance >= 0

  const sortedHistory = useMemo(
    () =>
      [...rateHistory].sort((a, b) => {
        const item = a.itemKey.localeCompare(b.itemKey)
        if (item !== 0) return item
        return b.effectiveFrom.localeCompare(a.effectiveFrom)
      }),
    [],
  )

  function handleFreeze() {
    if (frozen) {
      setFrozen(false)
      return
    }

    const next: ProjectCostSnapshot = {
      id: createSnapshotId(snapshots),
      jobId: job.id,
      frozenAt: new Date().toISOString(),
      frozenByKey: 'jobCost.people.currentUser',
      tenderAmountIsk: job.tenderAmountIsk,
      actualCostIsk: job.actualCostIsk,
      varianceIsk: variance,
      unconfirmedRateLines: job.unconfirmedRateLines,
      totalRateLines: job.totalRateLines,
      noteKey: 'jobCost.snapshotNotes.manualFreeze',
    }

    setSnapshots((current) => [next, ...current])
    setFrozen(true)
    setView('snapshots')
  }

  function handleLoadData() {
    setLoadedNotice(true)
  }

  return (
    <div className="space-y-8">
      <section
        className={cn(
          'flex flex-col gap-4 sm:flex-row sm:items-end',
          frozen || loadedNotice ? 'sm:justify-between' : 'sm:justify-end',
        )}
      >
        {frozen || loadedNotice ? (
          <div className="min-w-0 space-y-2">
            {frozen ? (
              <p className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                <Lock className="h-4 w-4 shrink-0" aria-hidden />
                {t('jobCost.frozenBanner')}
              </p>
            ) : null}
            {loadedNotice ? (
              <p className="text-sm text-success">{t('jobCost.loadedNotice')}</p>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant={frozen ? 'secondary' : 'primary'}
            size="lg"
            className="min-h-11 px-5"
            onClick={handleFreeze}
          >
            <Snowflake className="h-5 w-5 shrink-0" aria-hidden />
            {frozen ? t('jobCost.unfreezeCost') : t('jobCost.freezeCost')}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="min-h-11 px-5"
            disabled={frozen}
            onClick={handleLoadData}
          >
            <RefreshCw className="h-5 w-5 shrink-0" aria-hidden />
            {t('jobCost.loadData')}
          </Button>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card elevated padding="md" className="min-h-0">
          <p className="text-sm font-medium tracking-wide text-foreground-muted">
            {t('jobCost.stats.tender')}
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
            {formatIsk(job.tenderAmountIsk, locale)}
          </p>
        </Card>

        <Card elevated padding="md" className="min-h-0">
          <p className="text-sm font-medium tracking-wide text-foreground-muted">
            {t('jobCost.stats.actual')}
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
            {formatIsk(actualCost, locale)}
          </p>
        </Card>

        <Card elevated padding="md" className="min-h-0">
          <p className="text-sm font-medium tracking-wide text-foreground-muted">
            {t('jobCost.stats.variance')}
          </p>
          <p
            className={cn(
              'mt-3 text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl',
              variancePositive ? 'text-success' : 'text-danger',
            )}
          >
            {formatIsk(variance, locale)}
          </p>
          <p
            className={cn(
              'mt-1 text-sm font-medium tabular-nums',
              variancePositive ? 'text-success' : 'text-danger',
            )}
          >
            {t('jobCost.stats.variancePct', {
              value: formatPct(Math.abs(variancePct), locale),
            })}
          </p>
        </Card>

        <Card elevated padding="md" className="min-h-0">
          <p className="text-sm font-medium tracking-wide text-foreground-muted">
            {t('jobCost.stats.unconfirmed')}
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
            {job.unconfirmedRateLines}
            <span className="text-xl font-medium text-foreground-muted">
              {' '}
              / {job.totalRateLines}
            </span>
          </p>
          <p className="mt-1 text-sm text-foreground-muted">
            {t('jobCost.stats.unconfirmedHint')}
          </p>
        </Card>
      </div>

      <div
        className="flex flex-wrap gap-3"
        role="tablist"
        aria-label={t('jobCost.views.label')}
      >
        {views.map((item) => {
          const isActive = view === item

          return (
            <Button
              key={item}
              type="button"
              role="tab"
              aria-selected={isActive}
              size="md"
              variant={isActive ? 'primary' : 'ghost'}
              className={cn(!isActive && 'text-foreground hover:bg-interactive-hover')}
              onClick={() => setView(item)}
            >
              {t(`jobCost.views.${item}`)}
            </Button>
          )
        })}
      </div>

      {view === 'costSheet' ? (
        <CostLinesTable
          lines={job.lines}
          actualCostIsk={job.actualCostIsk}
          locale={locale}
        />
      ) : null}
      {view === 'rateHistory' ? (
        <RateHistoryTable entries={sortedHistory} locale={locale} />
      ) : null}
      {view === 'labourRates' ? (
        <LabourRatesTable rates={labourRates} locale={locale} />
      ) : null}
      {view === 'snapshots' ? (
        <SnapshotsTable snapshots={snapshots} locale={locale} />
      ) : null}
    </div>
  )
}
