import { cn } from '../../lib/utils'
import { inputVariants } from '../ui'

export const textareaClassName = cn(
  inputVariants({ size: 'lg' }),
  'h-auto min-h-28 resize-y py-3',
)

export const fieldListClassName = 'divide-y divide-foreground/5'

export const fieldRowClassName =
  'grid items-center gap-x-6 gap-y-2 py-8 first:pt-2 last:pb-2 sm:grid-cols-[minmax(14rem,20rem)_minmax(0,1fr)]'

export const fieldLabelClassName = '!mb-0'

export const actionButtonClassName = 'min-h-16 min-w-48 px-8 text-xl'
