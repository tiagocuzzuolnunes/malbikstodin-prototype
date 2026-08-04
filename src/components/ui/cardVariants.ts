import { cva, type VariantProps } from 'class-variance-authority'

export const cardVariants = cva('rounded-card bg-surface text-foreground', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-4 sm:p-6',
      lg: 'p-4 sm:p-6 lg:p-8',
    },
    elevated: {
      true: 'shadow-card',
      false: 'border border-border',
    },
  },
  defaultVariants: {
    padding: 'lg',
    elevated: false,
  },
})

export type CardVariantProps = VariantProps<typeof cardVariants>
