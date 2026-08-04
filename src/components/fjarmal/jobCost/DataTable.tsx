import type { ReactNode } from 'react'
import { cn } from '../../../lib/utils'

type DataTableProps = {
  minWidthClassName?: string
  header: ReactNode
  body: ReactNode
  footer?: ReactNode
  mobile: ReactNode
}

/** Shared desktop/mobile table shell used by job-cost registers. */
export function DataTable({
  minWidthClassName = 'min-w-[56rem]',
  header,
  body,
  footer,
  mobile,
}: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
      <div className="md:hidden">{mobile}</div>
      <div className="hidden overflow-x-auto md:block">
        <table className={cn('w-full table-fixed text-left text-sm', minWidthClassName)}>
          <thead className="bg-surface-muted text-foreground-muted">{header}</thead>
          <tbody>{body}</tbody>
          {footer ? <tfoot>{footer}</tfoot> : null}
        </table>
      </div>
    </div>
  )
}
