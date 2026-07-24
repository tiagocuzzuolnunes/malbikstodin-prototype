import type { LabelHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const labelVariants = cva('mb-2 block font-medium', {
  variants: {
    tone: {
      default: 'text-sm text-foreground',
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
