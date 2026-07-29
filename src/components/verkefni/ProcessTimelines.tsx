import { useTranslation } from 'react-i18next'
import { workProcesses } from '../../data/processes'
import { cn } from '../../lib/utils'

export default function ProcessTimelines() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {workProcesses.map((process) => (
        <section
          key={process.id}
          className="overflow-hidden rounded-card border border-border bg-surface shadow-card"
          aria-labelledby={`process-${process.id}-title`}
        >
          <div className="border-b border-border px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2
                id={`process-${process.id}-title`}
                className="text-xl font-semibold tracking-tight"
              >
                {t(`processes.items.${process.id}.title`)}
              </h2>
              <p className="text-sm text-foreground-muted">
                {t('processes.stepCount', { count: process.stepKeys.length })}
              </p>
            </div>
            <p className="mt-1 text-sm text-foreground-muted">
              {t(`processes.items.${process.id}.description`)}
            </p>
          </div>

          <ol className="relative space-y-0 px-5 py-6 sm:px-6">
            {process.stepKeys.map((stepKey, index) => {
              const isLast = index === process.stepKeys.length - 1
              const stepNumber = index + 1

              return (
                <li key={stepKey} className="relative flex gap-4 pb-8 last:pb-0">
                  {!isLast ? (
                    <span
                      className="absolute top-9 bottom-0 left-4.5 w-px bg-border"
                      aria-hidden
                    />
                  ) : null}

                  <div
                    className={cn(
                      'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-control border text-sm font-semibold tracking-wide',
                      'border-border bg-surface-muted text-foreground',
                    )}
                    aria-hidden
                  >
                    {stepNumber}
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-medium tracking-wide text-foreground-muted uppercase">
                      {t('processes.stepLabel', { number: stepNumber })}
                    </p>
                    <h3 className="mt-1 text-base font-semibold tracking-tight">
                      {t(`processes.items.${process.id}.steps.${stepKey}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {t(`processes.items.${process.id}.steps.${stepKey}.description`)}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}
