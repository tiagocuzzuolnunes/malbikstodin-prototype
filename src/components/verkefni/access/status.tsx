import { useTranslation } from 'react-i18next'
import { type AccessModeStatus } from '../../../data/accessControls'
import { statusRowBg } from '../../../lib/statusRowTint'
import { StatusDotBadge } from '../../ui'

export const accessStatusClass: Record<AccessModeStatus, string> = {
  active: 'bg-success/15 text-success ring-1 ring-success/25',
  inactive: 'bg-danger/10 text-danger ring-1 ring-danger/20',
}

export const accessStatusDotClass: Record<AccessModeStatus, string> = {
  active: 'bg-success',
  inactive: 'bg-danger',
}

export const accessStatusRowTint: Record<AccessModeStatus, string> = {
  active: statusRowBg.success,
  inactive: statusRowBg.danger,
}

export function AccessStatusBadge({ status }: { status: AccessModeStatus }) {
  const { t } = useTranslation()

  return (
    <StatusDotBadge
      label={t(`accessControls.status.${status}`)}
      className={accessStatusClass[status]}
      dotClassName={accessStatusDotClass[status]}
    />
  )
}
