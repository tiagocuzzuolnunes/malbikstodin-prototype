import type { LabelHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const labelVariants = cva('text-label font-medium', {
  variants: {
    tone: {
      default: 'text-foreground',
      muted: 'text-foreground-muted',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
})

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelVariants>

export function Label({ className, tone, ...props }: LabelProps) {
  return <label className={cn(labelVariants({ tone }), className)} {...props} />
}
