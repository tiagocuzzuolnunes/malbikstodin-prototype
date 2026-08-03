import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  resolveAccessModeStatus,
  type AccessMode,
  type EmployeeAccessAssignment,
} from '../../../data/accessControls'
import { employees } from '../../../data/employees'
import { Button, Label, Modal, Select } from '../../ui'

export function StaffEditModal({
  open,
  employeeId,
  modes,
  modeId,
  assignments,
  onClose,
  onSave,
}: {
  open: boolean
  employeeId: string | null
  modes: AccessMode[]
  modeId: string
  assignments: EmployeeAccessAssignment
  onClose: () => void
  onSave: (employeeId: string, modeId: string) => void
}) {
  if (!open || !employeeId) return null

  return (
    <StaffEditModalForm
      key={employeeId}
      employeeId={employeeId}
      modes={modes}
      modeId={modeId}
      assignments={assignments}
      onClose={onClose}
      onSave={onSave}
    />
  )
}

function StaffEditModalForm({
  employeeId,
  modes,
  modeId,
  assignments,
  onClose,
  onSave,
}: {
  employeeId: string
  modes: AccessMode[]
  modeId: string
  assignments: EmployeeAccessAssignment
  onClose: () => void
  onSave: (employeeId: string, modeId: string) => void
}) {
  const { t } = useTranslation()
  const [selectedModeId, setSelectedModeId] = useState(modeId)
  const employee = employees.find((item) => item.id === employeeId) ?? null

  return (
    <Modal
      open={!!employee}
      onClose={onClose}
      title={t('accessControls.editStaffTitle')}
      contentOverflow="visible"
      className="max-w-xl min-h-96"
    >
      {employee ? (
        <div className="flex min-h-80 flex-col gap-5">
          <div>
            <p className="text-lg font-semibold tracking-tight">{employee.name}</p>
            <p className="mt-1 text-sm text-foreground-muted">{employee.email}</p>
            <p className="mt-0.5 text-sm text-foreground-muted">
              {t(`hr.departments.${employee.department}`)}
            </p>
          </div>

          <div className="min-h-72 space-y-1.5">
            <Label htmlFor="staff-level">{t('accessControls.columns.level')}</Label>
            <Select
              id="staff-level"
              value={selectedModeId}
              maxVisibleOptions={6}
              options={modes.map((mode) => {
                const status = resolveAccessModeStatus(mode, assignments)
                return {
                  value: mode.id,
                  label:
                    status === 'inactive'
                      ? `${mode.name} (${t('accessControls.status.inactive')})`
                      : mode.name,
                }
              })}
              onChange={setSelectedModeId}
            />
          </div>

          <div className="mt-auto flex justify-end gap-2 border-t border-border pt-4">
            <Button type="button" variant="ghost" size="md" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => {
                onSave(employee.id, selectedModeId)
                onClose()
              }}
            >
              {t('common.saveChanges')}
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
