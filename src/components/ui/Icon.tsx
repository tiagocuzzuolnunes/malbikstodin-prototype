import type { LucideIcon, LucideProps } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type IconProps = LucideProps &
  VariantProps<typeof iconVariants> & {
    icon: LucideIcon
  }

export function Icon({ icon: LucideGlyph, className, size, ...props }: IconProps) {
  return <LucideGlyph className={cn(iconVariants({ size }), className)} {...props} />
}
