import { cn } from '../../lib/utils'
import { inputVariants } from '../ui'

/** Shared label→control gap on stacked fields (overrides Label’s default mb-2). */
export const fieldStackClassName = 'flex flex-col gap-2'

export const textareaClassName = cn(
  inputVariants({ size: 'lg' }),
  'h-auto min-h-24 resize-y',
)

export const fieldListClassName = 'divide-y divide-foreground/5'

export const fieldRowClassName =
  'grid items-start gap-x-4 gap-y-2 py-4 first:pt-1 last:pb-1 sm:items-center sm:gap-x-6 sm:py-5 sm:grid-cols-[minmax(11rem,16rem)_minmax(0,1fr)]'

/** Neutralize Label’s default margin so spacing comes only from the parent gap. */
export const fieldLabelClassName = '!mb-0 text-sm font-medium text-foreground'

export const actionButtonClassName =
  'min-h-11 w-full px-5 text-sm sm:min-h-11 sm:w-auto sm:min-w-36 sm:px-6 sm:text-base'
