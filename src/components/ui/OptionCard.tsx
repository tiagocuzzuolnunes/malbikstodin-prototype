import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/utils'
import { Button, type ButtonProps } from './Button'
import { CardShell } from './Card'

export type OptionCardAction = {
  label: ReactNode
  onClick?: () => void
  variant?: ButtonProps['variant']
  type?: ButtonProps['type']
}

export type OptionCardChartPoint = {
  label: string
  value: number
}

export type OptionCardDateValue =
  | string
  | Date
  | {
      from: string | Date
      to?: string | Date
    }

type OptionCardBaseProps = {
  title: ReactNode
  description?: ReactNode
  elevated?: boolean
  className?: string
  size?: 'default' | 'compact'
}

export type SimpleOptionCardProps = OptionCardBaseProps & {
  variant?: 'simple'
  meta?: ReactNode
}

export type ActionsOptionCardProps = OptionCardBaseProps & {
  variant: 'actions'
  actions: OptionCardAction[]
  meta?: ReactNode
}

export type ChartOptionCardProps = OptionCardBaseProps & {
  variant: 'chart'
  chart: OptionCardChartPoint[]
  unit?: string
}

export type DateOptionCardProps = OptionCardBaseProps & {
  variant: 'date'
  date: OptionCardDateValue
  meta?: ReactNode
}

export type OptionCardProps =
  | SimpleOptionCardProps
  | ActionsOptionCardProps
  | ChartOptionCardProps
  | DateOptionCardProps

function formatDate(value: string | Date, locale: string) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function formatDateValue(value: OptionCardDateValue, locale: string) {
  if (typeof value === 'string' || value instanceof Date) {
    return formatDate(value, locale)
  }

  const from = formatDate(value.from, locale)
  if (!value.to) return from
  return `${from} – ${formatDate(value.to, locale)}`
}

function MiniBarChart({ data, unit }: { data: OptionCardChartPoint[]; unit?: string }) {
  const max = Math.max(...data.map((point) => point.value), 1)

  return (
    <div className="space-y-4">
      <div className="flex h-36 items-end gap-3">
        {data.map((point) => {
          const height = `${Math.max((point.value / max) * 100, 8)}%`

          return (
            <div key={point.label} className="flex min-w-0 flex-1 flex-col items-center gap-3">
              <div className="flex h-28 w-full items-end justify-center">
                <div
                  className="w-10 rounded-t-md bg-accent/80 transition-[height]"
                  style={{ height }}
                  title={`${point.label}: ${point.value}${unit ? ` ${unit}` : ''}`}
                />
              </div>
              <span className="truncate text-sm text-foreground-muted">{point.label}</span>
            </div>
          )
        })}
      </div>
      {unit ? <p className="text-base text-foreground-muted">{unit}</p> : null}
    </div>
  )
}

export function OptionCard(props: OptionCardProps) {
  const { i18n } = useTranslation()
  const { title, description, elevated, className, size = 'default' } = props
  const locale = i18n.resolvedLanguage ?? i18n.language
  const compact = size === 'compact'

  if (props.variant === 'actions') {
    return (
      <CardShell
        title={title}
        description={description}
        elevated={elevated}
        className={className}
        size={size}
        footer={
          <>
            {props.actions.map((action, index) => (
              <Button
                key={`${String(action.label)}-${index}`}
                type={action.type ?? 'button'}
                size={compact ? 'md' : 'lg'}
                className={cn(!compact && 'min-h-12 px-5 text-base')}
                variant={action.variant ?? (index === 0 ? 'primary' : 'ghost')}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </>
        }
      >
        {props.meta ? (
          <div className={cn('text-foreground-muted', compact ? 'text-sm' : 'text-base')}>
            {props.meta}
          </div>
        ) : null}
      </CardShell>
    )
  }

  if (props.variant === 'chart') {
    return (
      <CardShell
        title={title}
        description={description}
        elevated={elevated}
        className={className}
        size={size}
      >
        <MiniBarChart data={props.chart} unit={props.unit} />
      </CardShell>
    )
  }

  if (props.variant === 'date') {
    return (
      <CardShell
        title={title}
        description={description}
        elevated={elevated}
        className={className}
        size={size}
        contentAlign="end"
      >
        {props.meta ? (
          <div
            className={cn(
              'text-foreground-muted',
              compact ? 'mb-2 text-xs' : 'mb-4 text-base',
            )}
          >
            {props.meta}
          </div>
        ) : null}
        <time
          className={cn(
            'block font-medium text-foreground',
            compact ? 'text-sm' : 'text-lg',
          )}
        >
          {formatDateValue(props.date, locale)}
        </time>
      </CardShell>
    )
  }

  return (
    <CardShell
      title={title}
      description={description}
      elevated={elevated}
      className={className}
      size={size}
    >
      {props.meta ? (
        <div className={cn('text-foreground-muted', compact ? 'text-sm' : 'text-base')}>
          {props.meta}
        </div>
      ) : null}
    </CardShell>
  )
}
