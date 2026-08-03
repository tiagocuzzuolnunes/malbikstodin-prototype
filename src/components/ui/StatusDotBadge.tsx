import { cn } from '../../lib/utils'

export type StatusDotBadgeProps = {
  label: string
  className: string
  dotClassName: string
}

/** Colored status chip with a leading dot. Pass domain-specific class maps. */
export function StatusDotBadge({
  label,
  className,
  dotClassName,
}: StatusDotBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-control px-2.5 py-1 text-xs font-semibold tracking-wide',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotClassName)}
      />
      {label}
    </span>
  )
}
