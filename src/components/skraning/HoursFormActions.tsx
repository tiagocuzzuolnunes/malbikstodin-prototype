import { useTranslation } from 'react-i18next'
import { Play, Square } from 'lucide-react'
import { Button, Icon } from '../ui'
import { actionButtonClassName } from './hoursStyles'
import { HoursTimerDisplay } from './HoursTimerDisplay'

type HoursFormActionsProps = {
  isRunning: boolean
  elapsedMs: number
  canStart: boolean
  submittedNotice: boolean
  submittedByName: string
  onToggle: () => void
  onCancel: () => void
}

export function HoursFormActions({
  isRunning,
  elapsedMs,
  canStart,
  submittedNotice,
  submittedByName,
  onToggle,
  onCancel,
}: HoursFormActionsProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-foreground-muted">
          {t('hours.fields.submittedBy', { name: submittedByName })}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Button
          type="button"
          variant={isRunning ? 'danger' : 'primary'}
          size="lg"
          className={actionButtonClassName}
          disabled={!isRunning && !canStart}
          onClick={onToggle}
        >
          <Icon icon={isRunning ? Square : Play} size="md" aria-hidden />
          {isRunning ? t('hours.timer.finish') : t('hours.timer.start')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className={actionButtonClassName}
          onClick={onCancel}
        >
          {t('hours.timer.cancel')}
        </Button>
        <HoursTimerDisplay isRunning={isRunning} elapsedMs={elapsedMs} />
        {submittedNotice ? (
          <p className="text-sm text-foreground-muted" role="status">
            {t('hours.submitted')}
          </p>
        ) : null}
      </div>
    </>
  )
}
