import { useTranslation } from 'react-i18next'
import { Label } from '../ui'
import { cn } from '../../lib/utils'
import { fieldLabelClassName, fieldRowClassName } from './hoursStyles'
import { formatElapsed } from './hoursUtils'

type HoursTimerFieldProps = {
  isRunning: boolean
  elapsedMs: number
}

export function HoursTimerField({ isRunning, elapsedMs }: HoursTimerFieldProps) {
  const { t } = useTranslation()

  return (
    <div className={fieldRowClassName}>
      <Label className={fieldLabelClassName}>{t('hours.timer.label')}</Label>
      <div className="flex flex-wrap items-center gap-4">
        <p
          className={cn(
            'min-w-40 font-semibold tracking-tight tabular-nums text-3xl',
            isRunning ? 'text-accent' : 'text-foreground-muted',
          )}
          aria-live="polite"
        >
          {formatElapsed(elapsedMs)}
        </p>
        {isRunning ? (
          <p className="text-base text-foreground-muted">{t('hours.timer.running')}</p>
        ) : null}
      </div>
    </div>
  )
}
