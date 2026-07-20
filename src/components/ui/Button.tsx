import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'rounded-control bg-accent text-accent-foreground hover:bg-accent-hover',
        muted:
          'rounded-pill bg-control text-foreground hover:bg-control-hover',
        ghost:
          'rounded-control bg-transparent text-foreground-muted hover:bg-interactive-hover hover:text-foreground',
        secondary:
          'rounded-control border border-border bg-surface-muted text-foreground hover:bg-interactive-hover-strong hover:border-foreground/25',
        danger:
          'rounded-control bg-danger text-danger-foreground hover:bg-danger-hover',
        warning:
          'rounded-control bg-warning text-warning-foreground hover:bg-warning-hover',
        alert:
          'rounded-control bg-alert text-alert-foreground hover:bg-alert-hover',
        success:
          'rounded-control bg-success text-success-foreground hover:bg-success-hover',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-5 text-base',
        icon: 'p-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
