import { useTranslation } from 'react-i18next'
import type { LucideIcon } from 'lucide-react'
import { Briefcase, Layers, Road, Truck, Wrench } from 'lucide-react'
import { Icon } from '../ui'
import { cn } from '../../lib/utils'
import { hourCategories, type HourCategory } from '../../data/hours'

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
    <div className="mb-12 flex flex-col">
      <div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
        role="group"
        aria-labelledby="hours-category-label"
      >
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
                'flex min-h-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-control border px-5 py-8 text-center text-xl font-semibold tracking-tight transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50',
                isActive
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-surface-muted text-foreground hover:border-foreground/25 hover:bg-interactive-hover',
              )}
            >
              <Icon icon={categoryIcons[value]} size="xl" aria-hidden />
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
