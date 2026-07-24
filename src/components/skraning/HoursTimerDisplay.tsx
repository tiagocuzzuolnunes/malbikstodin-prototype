import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/utils'
import { formatElapsed } from './hoursUtils'

type HoursTimerDisplayProps = {
  isRunning: boolean
  elapsedMs: number
  className?: string
}

export function HoursTimerDisplay({
  isRunning,
  elapsedMs,
  className,
}: HoursTimerDisplayProps) {
  const { t } = useTranslation()

  return (
    <div className={cn('flex flex-wrap items-center gap-3 sm:gap-4', className)}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground-muted">{t('hours.timer.label')}</p>
        <p
          className={cn(
            'font-semibold tracking-tight tabular-nums text-xl sm:text-2xl',
            isRunning ? 'text-accent' : 'text-foreground-muted',
          )}
          aria-live="polite"
        >
          {formatElapsed(elapsedMs)}
        </p>
      </div>
      {isRunning ? (
        <p className="text-sm text-foreground-muted">{t('hours.timer.running')}</p>
      ) : null}
    </div>
  )
}
