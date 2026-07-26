import { useTranslation } from 'react-i18next'
import type { LucideIcon } from 'lucide-react'
import { Briefcase, Layers, Road, Truck, Wrench } from 'lucide-react'
import { Icon, Label, Select } from '../ui'
import { cn } from '../../lib/utils'
import { hourCategories, type HourCategory } from '../../data/hours'
import { fieldLabelClassName, fieldStackClassName } from './hoursStyles'

const categoryIcons: Record<HourCategory, LucideIcon> = {
  driverRegistration: Truck,
  underwork: Layers,
  paving: Road,
  repairs: Wrench,
  mvProjects: Briefcase,
}

type HoursCategoryPickerProps = {
  category: HourCategory
  disabled: boolean
  onSelect: (category: HourCategory) => void
}

export function HoursCategoryPicker({
  category,
  disabled,
  onSelect,
}: HoursCategoryPickerProps) {
  const { t } = useTranslation()

  return (
    <div className="mb-6 flex flex-col border-b border-border pb-6 md:mb-8 md:border-b-0 md:pb-0">
      <div className={cn(fieldStackClassName, 'md:hidden')}>
        <Label htmlFor="hours-category" className={fieldLabelClassName}>
          {t('hours.fields.category')}
        </Label>
        <Select
          id="hours-category"
          value={category}
          disabled={disabled}
          required
          options={hourCategories.map((value) => ({
            value,
            label: t(`hours.categories.${value}`),
          }))}
          onChange={(next) => {
            if (!next) return
            onSelect(next as HourCategory)
          }}
        />
      </div>

      <div
        className="hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-5"
        role="group"
        aria-labelledby="hours-category-label"
      >
        <span id="hours-category-label" className="sr-only">
          {t('hours.fields.category')}
        </span>
        {hourCategories.map((value) => {
          const isActive = category === value

          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              disabled={disabled}
              onClick={() => onSelect(value)}
              className={cn(
                'flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-control border px-3 py-4 text-center text-sm font-semibold tracking-tight transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50',
                isActive
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-surface-muted text-foreground hover:border-foreground/25 hover:bg-interactive-hover',
              )}
            >
              <Icon icon={categoryIcons[value]} size="md" aria-hidden />
              <span className="text-balance leading-tight">
                {t(`hours.categories.${value}`)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
