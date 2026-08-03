import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pencil, Plus } from 'lucide-react'
import {
  countEmployeesForMode,
  createAccessModes,
  createBlankAccessMode,
  createEmployeeAccess,
  resolveAccessModeStatus,
  type AccessMode,
} from '../../data/accessControls'
import { employees } from '../../data/employees'
import { Button, PillSwitch } from '../ui'
import { LevelEditModal } from './access/LevelEditModal'
import { StaffEditModal } from './access/StaffEditModal'
import { AccessStatusBadge } from './access/status'

type AccessTab = 'levels' | 'staff'

export default function AccessControlMatrix() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<AccessTab>('levels')
  const [modes, setModes] = useState(() => createAccessModes())
  const [assignments, setAssignments] = useState(() => createEmployeeAccess())

  const [editingLevelId, setEditingLevelId] = useState<string | null>(null)
  const [creatingLevel, setCreatingLevel] = useState(false)
  const [draftNewLevel, setDraftNewLevel] = useState<AccessMode | null>(null)
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null)

  const modeById = useMemo(
    () => Object.fromEntries(modes.map((mode) => [mode.id, mode])),
    [modes],
  )

  const editingLevel =
    creatingLevel && draftNewLevel
      ? draftNewLevel
      : editingLevelId
        ? (modeById[editingLevelId] ?? null)
        : null

  function openCreateLevel() {
    setCreatingLevel(true)
    setEditingLevelId(null)
    setDraftNewLevel(createBlankAccessMode())
  }

  function closeLevelModal() {
    setEditingLevelId(null)
    setCreatingLevel(false)
    setDraftNewLevel(null)
  }

  function handleSaveLevel(mode: AccessMode) {
    setModes((current) => {
      const exists = current.some((item) => item.id === mode.id)
      if (exists) {
        return current.map((item) => (item.id === mode.id ? mode : item))
      }
      return [...current, mode]
    })
  }

  function handleDeleteLevel(modeId: string) {
    if (modes.length <= 1) return
    const remaining = modes.filter((mode) => mode.id !== modeId)
    const fallbackId = remaining[0]?.id
    setModes(remaining)
    if (fallbackId) {
      setAssignments((current) => {
        const next = { ...current }
        for (const [employeeId, assigned] of Object.entries(next)) {
          if (assigned === modeId) next[employeeId] = fallbackId
        }
        return next
      })
    }
  }

  function handleSaveStaff(employeeId: string, modeId: string) {
    setAssignments((current) => ({ ...current, [employeeId]: modeId }))
  }

  const editingEmployeeModeId =
    editingEmployeeId != null
      ? (assignments[editingEmployeeId] ?? modes[0]?.id ?? '')
      : ''

  return (
    <section className="space-y-4" aria-label={t('accessControls.title')}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PillSwitch
          label={t('accessControls.tabsLabel')}
          value={tab}
          onChange={(next) => setTab(next as AccessTab)}
          options={[
            {
              value: 'levels',
              content: t('accessControls.tabs.levels'),
            },
            {
              value: 'staff',
              content: t('accessControls.tabs.staff'),
            },
          ]}
        />

        {tab === 'levels' ? (
          <Button type="button" variant="secondary" size="md" onClick={openCreateLevel}>
            <Plus className="h-4 w-4" aria-hidden />
            {t('accessControls.addMode')}
          </Button>
        ) : null}
      </div>

      {tab === 'levels' ? (
        <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-lg border-collapse text-left text-sm">
              <caption className="sr-only">{t('accessControls.levelsCaption')}</caption>
              <thead>
                <tr className="border-b border-border bg-surface-muted/60">
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.level')}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.employees')}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.status')}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {modes.map((mode) => {
                  const employeeCount = countEmployeesForMode(mode.id, assignments)
                  const status = resolveAccessModeStatus(mode, assignments)

                  return (
                    <tr key={mode.id} className="hover:bg-interactive-hover/40">
                      <th
                        scope="row"
                        className="border-b border-border px-4 py-3 font-semibold tracking-tight"
                      >
                        {mode.name}
                      </th>
                      <td className="border-b border-border px-4 py-3 tabular-nums text-foreground-muted">
                        {employeeCount}
                      </td>
                      <td className="border-b border-border px-4 py-3">
                        <AccessStatusBadge status={status} />
                      </td>
                      <td className="border-b border-border px-4 py-3 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="md"
                          onClick={() => {
                            setCreatingLevel(false)
                            setDraftNewLevel(null)
                            setEditingLevelId(mode.id)
                          }}
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                          {t('accessControls.edit')}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-xl border-collapse text-left text-sm">
              <caption className="sr-only">{t('accessControls.staffCaption')}</caption>
              <thead>
                <tr className="border-b border-border bg-surface-muted/60">
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.employee')}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.email')}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.sector')}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.level')}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                    {t('accessControls.columns.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  const modeId = assignments[employee.id] ?? modes[0]?.id
                  const mode = modeId ? modeById[modeId] : undefined

                  return (
                    <tr key={employee.id} className="hover:bg-interactive-hover/40">
                      <th
                        scope="row"
                        className="border-b border-border px-4 py-3 font-semibold tracking-tight"
                      >
                        {employee.name}
                      </th>
                      <td className="border-b border-border px-4 py-3 text-foreground-muted">
                        {employee.email}
                      </td>
                      <td className="border-b border-border px-4 py-3 text-foreground-muted">
                        {t(`hr.departments.${employee.department}`)}
                      </td>
                      <td className="border-b border-border px-4 py-3">{mode?.name ?? '—'}</td>
                      <td className="border-b border-border px-4 py-3 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="md"
                          onClick={() => setEditingEmployeeId(employee.id)}
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                          {t('accessControls.edit')}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <LevelEditModal
        open={!!editingLevel}
        mode={editingLevel}
        isNew={creatingLevel}
        onClose={closeLevelModal}
        onSave={handleSaveLevel}
        onDelete={creatingLevel ? undefined : handleDeleteLevel}
        canDelete={modes.length > 1}
      />

      <StaffEditModal
        open={editingEmployeeId != null}
        employeeId={editingEmployeeId}
        modes={modes}
        modeId={editingEmployeeModeId}
        assignments={assignments}
        onClose={() => setEditingEmployeeId(null)}
        onSave={handleSaveStaff}
      />
    </section>
  )
}
