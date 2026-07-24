import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
  'w-full rounded-control border border-border bg-surface text-foreground outline-none transition-colors placeholder:text-foreground-muted focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-sm placeholder:text-sm',
        md: 'h-9 px-3 text-sm placeholder:text-sm',
        lg: 'h-14 px-4 text-2xl placeholder:text-2xl',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
)

export type InputVariantProps = VariantProps<typeof inputVariants>
