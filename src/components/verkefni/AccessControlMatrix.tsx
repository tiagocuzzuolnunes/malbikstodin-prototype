import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  accessLevels,
  createAccessMatrix,
  staffCategories,
  systemAreas,
  type AccessLevel,
  type StaffCategoryId,
  type SystemAreaId,
} from '../../data/accessControls'
import { cn } from '../../lib/utils'
import { Button } from '../ui'

const levelClass: Record<AccessLevel, string> = {
  full: 'border-success/30 bg-success/10 text-success',
  editable: 'border-accent/30 bg-accent/10 text-accent',
  viewer: 'border-border bg-surface text-foreground-muted',
  forbidden: 'border-danger/30 bg-danger/10 text-danger',
}

function AccessCell({
  categoryId,
  areaId,
  value,
  onChange,
}: {
  categoryId: StaffCategoryId
  areaId: SystemAreaId
  value: AccessLevel
  onChange: (categoryId: StaffCategoryId, areaId: SystemAreaId, level: AccessLevel) => void
}) {
  const { t } = useTranslation()
  const labelId = `access-${categoryId}-${areaId}-label`

  return (
    <td className="border-b border-border p-2 align-middle">
      <label id={labelId} className="sr-only">
        {t('accessControls.cellLabel', {
          category: t(`accessControls.categories.${categoryId}`),
          area: t(`accessControls.areas.${areaId}`),
        })}
      </label>
      <select
        aria-labelledby={labelId}
        value={value}
        onChange={(event) =>
          onChange(categoryId, areaId, event.target.value as AccessLevel)
        }
        className={cn(
          'w-full min-w-30 cursor-pointer appearance-none rounded-control border px-2.5 py-1.5 text-center text-xs font-medium tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/40',
          levelClass[value],
        )}
      >
        {accessLevels.map((level) => (
          <option key={level} value={level}>
            {t(`accessControls.levels.${level}`)}
          </option>
        ))}
      </select>
    </td>
  )
}

export default function AccessControlMatrix() {
  const { t } = useTranslation()
  const [matrix, setMatrix] = useState(() => createAccessMatrix())
  const [savedNotice, setSavedNotice] = useState(false)

  function handleChange(
    categoryId: StaffCategoryId,
    areaId: SystemAreaId,
    level: AccessLevel,
  ) {
    setSavedNotice(false)
    setMatrix((current) => ({
      ...current,
      [categoryId]: {
        ...current[categoryId],
        [areaId]: level,
      },
    }))
  }

  function handleReset() {
    setMatrix(createAccessMatrix())
    setSavedNotice(false)
  }

  function handleSave() {
    setSavedNotice(true)
  }

  return (
    <section className="space-y-4" aria-labelledby="access-controls-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="access-controls-heading" className="text-2xl font-semibold tracking-tight">
            {t('accessControls.title')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">{t('accessControls.subtitle')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {savedNotice ? (
            <p className="text-sm text-foreground-muted" role="status">
              {t('accessControls.saved')}
            </p>
          ) : null}
          <Button variant="secondary" size="md" onClick={handleReset}>
            {t('accessControls.reset')}
          </Button>
          <Button variant="primary" size="md" onClick={handleSave}>
            {t('common.saveChanges')}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        {accessLevels.map((level) => (
          <span
            key={level}
            className={cn(
              'inline-flex items-center rounded-control border px-2.5 py-1 font-medium tracking-wide',
              levelClass[level],
            )}
          >
            {t(`accessControls.levels.${level}`)}
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-3xl border-collapse text-left text-sm md:min-w-5xl">
            <caption className="sr-only">{t('accessControls.caption')}</caption>
            <thead>
              <tr className="border-b border-border bg-surface-muted/60">
                <th
                  scope="col"
                  className="sticky left-0 z-10 min-w-44 bg-surface-muted/95 px-4 py-3 text-left text-xs font-semibold tracking-wide text-foreground-muted uppercase backdrop-blur"
                >
                  {t('accessControls.columns.staffCategory')}
                </th>
                {systemAreas.map((areaId) => (
                  <th
                    key={areaId}
                    scope="col"
                    className="min-w-32 px-2 py-3 text-center text-xs font-semibold tracking-wide text-foreground-muted uppercase"
                  >
                    {t(`accessControls.areas.${areaId}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staffCategories.map((categoryId) => (
                <tr key={categoryId} className="hover:bg-interactive-hover/40">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-b border-border bg-surface px-4 py-3 text-left font-semibold tracking-tight backdrop-blur"
                  >
                    {t(`accessControls.categories.${categoryId}`)}
                  </th>
                  {systemAreas.map((areaId) => (
                    <AccessCell
                      key={`${categoryId}-${areaId}`}
                      categoryId={categoryId}
                      areaId={areaId}
                      value={matrix[categoryId][areaId]}
                      onChange={handleChange}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
