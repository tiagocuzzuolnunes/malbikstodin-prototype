import { useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Pencil, Plus } from 'lucide-react'
import {
  countEmployeesForMode,
  createAccessModes,
  createBlankAccessMode,
  createEmployeeAccess,
  resolveAccessModeStatus,
  systemAreas,
  type AccessMode,
  type AccessModeStatus,
  type EmployeeAccessAssignment,
} from '../../data/accessControls'
import { employees } from '../../data/employees'
import { cn } from '../../lib/utils'
import { Button, Input, Label, Modal, Select } from '../ui'

type AccessTab = 'levels' | 'staff'

const statusClass: Record<AccessModeStatus, string> = {
  active: 'bg-success/15 text-success ring-1 ring-success/25',
  inactive: 'bg-danger/10 text-danger ring-1 ring-danger/20',
}

const statusDotClass: Record<AccessModeStatus, string> = {
  active: 'bg-success',
  inactive: 'bg-danger',
}

function SegmentedControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string; content: ReactNode }[]
  onChange: (value: string) => void
}) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  return (
    <div
      role="group"
      aria-label={label}
      className="relative inline-grid grid-cols-2 rounded-pill bg-control p-1"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-pill bg-surface shadow-sm ring-1 ring-border transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
      />

      {options.map((option) => {
        const active = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 inline-flex h-9 min-w-28 cursor-pointer items-center justify-center rounded-pill px-4 text-sm font-semibold tracking-wide transition-colors duration-200',
              active
                ? 'text-foreground'
                : 'text-foreground-muted hover:bg-interactive-hover hover:text-foreground',
            )}
          >
            {option.content}
          </button>
        )
      })}
    </div>
  )
}

function StatusBadge({ status }: { status: AccessModeStatus }) {
  const { t } = useTranslation()

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-control px-2.5 py-1 text-xs font-semibold tracking-wide',
        statusClass[status],
      )}
    >
      <span
        aria-hidden
        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', statusDotClass[status])}
      />
      {t(`accessControls.status.${status}`)}
    </span>
  )
}

function LevelEditModal({
  open,
  mode,
  isNew,
  onClose,
  onSave,
  onDelete,
  canDelete,
}: {
  open: boolean
  mode: AccessMode | null
  isNew: boolean
  onClose: () => void
  onSave: (mode: AccessMode) => void
  onDelete?: (modeId: string) => void
  canDelete: boolean
}) {
  if (!open || !mode) return null

  return (
    <LevelEditModalForm
      key={mode.id}
      mode={mode}
      isNew={isNew}
      onClose={onClose}
      onSave={onSave}
      onDelete={onDelete}
      canDelete={canDelete}
    />
  )
}

function LevelEditModalForm({
  mode,
  isNew,
  onClose,
  onSave,
  onDelete,
  canDelete,
}: {
  mode: AccessMode
  isNew: boolean
  onClose: () => void
  onSave: (mode: AccessMode) => void
  onDelete?: (modeId: string) => void
  canDelete: boolean
}) {
  const { t } = useTranslation()
  const [draft, setDraft] = useState<AccessMode>(() => ({
    ...mode,
    access: { ...mode.access },
  }))

  return (
    <Modal open onClose={onClose} title={t('accessControls.editLevelTitle')} className="max-w-xl">
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="level-name">{t('accessControls.columns.level')}</Label>
          <Input
            id="level-name"
            value={draft.name}
            placeholder={t('accessControls.namePlaceholder')}
            onChange={(event) =>
              setDraft((current) => ({ ...current, name: event.target.value }))
            }
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground-muted">
            {t('accessControls.areasLegend')}
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {systemAreas.map((areaId) => {
              const checkboxId = `level-area-${areaId}`
              return (
                <label
                  key={areaId}
                  htmlFor={checkboxId}
                  className="flex cursor-pointer items-center gap-3 rounded-control border border-border px-3 py-2.5 hover:bg-interactive-hover/50"
                >
                  <input
                    id={checkboxId}
                    type="checkbox"
                    checked={draft.access[areaId]}
                    onChange={(event) => {
                      const allowed = event.target.checked
                      setDraft((current) => ({
                        ...current,
                        access: { ...current.access, [areaId]: allowed },
                      }))
                    }}
                    className="h-4 w-4 cursor-pointer accent-accent"
                  />
                  <span className="text-sm font-medium">
                    {t(`accessControls.areas.${areaId}`)}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          {onDelete && canDelete ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="text-danger"
              onClick={() => {
                onDelete(draft.id)
                onClose()
              }}
            >
              {t('accessControls.removeMode')}
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="md" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => {
                const trimmed = draft.name.trim()
                if (!trimmed) return
                onSave({ ...draft, name: trimmed })
                onClose()
              }}
            >
              {isNew ? t('accessControls.addMode') : t('common.saveChanges')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

function StaffEditModal({
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
        <SegmentedControl
          label={t('accessControls.tabsLabel')}
          value={tab}
          onChange={(next) => setTab(next as AccessTab)}
          options={[
            {
              value: 'levels',
              label: t('accessControls.tabs.levels'),
              content: t('accessControls.tabs.levels'),
            },
            {
              value: 'staff',
              label: t('accessControls.tabs.staff'),
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
                        <StatusBadge status={status} />
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
