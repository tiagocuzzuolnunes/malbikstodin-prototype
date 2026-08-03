import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { systemAreas, type AccessMode } from '../../../data/accessControls'
import { Button, Input, Label, Modal } from '../../ui'

export function LevelEditModal({
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
