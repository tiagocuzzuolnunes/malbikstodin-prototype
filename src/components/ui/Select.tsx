import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { scrollOverlayIntoView } from '../../lib/scrollOverlayIntoView'
import { inputVariants, type InputVariantProps } from './inputVariants'

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = InputVariantProps & {
  id?: string
  value: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  /** Cap visible options; extra items scroll. Defaults to uncapped (max-h-72). */
  maxVisibleOptions?: number
  onChange: (value: string) => void
}

export function Select({
  id,
  value,
  options,
  placeholder,
  disabled = false,
  required = false,
  className,
  size = 'lg',
  maxVisibleOptions,
  onChange,
}: SelectProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)
  const selected = options.find((option) => option.value === value)
  const displayLabel = selected?.label ?? placeholder ?? ''
  // ~2.75rem per option (py + text) + 0.5rem list padding
  const listMaxHeight =
    maxVisibleOptions != null
      ? `calc(${maxVisibleOptions} * 2.75rem + 0.5rem)`
      : undefined

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open || !listRef.current) return
    scrollOverlayIntoView(listRef.current)
  }, [open])

  function selectValue(next: string) {
    onChange(next)
    setOpen(false)
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div ref={rootRef} className={cn('relative w-full', className)}>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-required={required || undefined}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((current) => !current)
        }}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          inputVariants({ size }),
          'group flex items-center justify-between gap-3 pr-3 text-left',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          !selected && 'text-foreground-muted',
        )}
      >
        <span className="min-w-0 flex-1 truncate">{displayLabel}</span>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-accent transition-colors',
            !disabled &&
              'group-hover:bg-interactive-hover group-focus-visible:bg-interactive-hover',
          )}
        >
          <ChevronDown
            className={cn('h-5 w-5 stroke-[2.25] transition-transform', open && 'rotate-180')}
            aria-hidden
          />
        </span>
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          style={listMaxHeight ? { maxHeight: listMaxHeight } : undefined}
          className={cn(
            'absolute z-40 mt-2 w-full overflow-y-auto overscroll-y-contain rounded-control border border-border bg-surface py-2 shadow-card',
            listMaxHeight ? undefined : 'max-h-72',
          )}
        >
          {placeholder ? (
            <li role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={!value}
                  className={cn(
                    'flex w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors sm:px-3.5 sm:py-2.5 sm:text-base',
                    !value
                      ? 'bg-accent/10 font-medium text-accent'
                      : 'text-foreground-muted hover:bg-interactive-hover',
                  )}
                onClick={() => selectValue('')}
              >
                {placeholder}
              </button>
            </li>
          ) : null}
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    'flex w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors sm:px-3.5 sm:py-2.5 sm:text-base',
                    isSelected
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-interactive-hover',
                  )}
                  onClick={() => selectValue(option.value)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
