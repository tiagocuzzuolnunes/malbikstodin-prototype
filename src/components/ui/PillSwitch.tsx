import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type PillSwitchOption = {
  value: string
  content: ReactNode
}

export type PillSwitchProps = {
  label: string
  value: string
  options: PillSwitchOption[]
  onChange: (value: string) => void
  /** Tailwind min-width class for each option button. Defaults to min-w-28. */
  optionMinWidthClassName?: string
}

export function PillSwitch({
  label,
  value,
  options,
  onChange,
  optionMinWidthClassName = 'min-w-28',
}: PillSwitchProps) {
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
              'relative z-10 inline-flex h-9 cursor-pointer items-center justify-center rounded-pill px-4 text-sm font-semibold tracking-wide transition-colors duration-200',
              optionMinWidthClassName,
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
