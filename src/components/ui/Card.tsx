import type { HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const cardVariants = cva('rounded-card bg-surface text-foreground', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
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

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>

export function Card({ className, padding, elevated, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ padding, elevated }), className)} {...props} />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-2xl font-semibold tracking-tight', className)} {...props} />
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-lg text-foreground-muted', className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-8 text-base', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-8 flex flex-wrap items-center gap-3', className)} {...props} />
}

export type CardShellProps = {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  elevated?: boolean
  className?: string
  size?: 'default' | 'compact'
}

export function CardShell({
  title,
  description,
  children,
  footer,
  elevated = true,
  className,
  size = 'default',
}: CardShellProps) {
  const compact = size === 'compact'

  return (
    <Card
      elevated={elevated}
      padding={compact ? 'md' : 'lg'}
      className={cn(compact ? 'min-h-0' : 'min-h-56', className)}
    >
      <CardHeader className={cn(compact && 'gap-1')}>
        <CardTitle className={cn(compact && 'text-lg')}>{title}</CardTitle>
        {description ? (
          <CardDescription className={cn(compact && 'text-sm')}>{description}</CardDescription>
        ) : null}
      </CardHeader>
      {children ? (
        <CardContent className={cn(compact && 'mt-4 text-sm')}>{children}</CardContent>
      ) : null}
      {footer ? <CardFooter className={cn(compact && 'mt-4 gap-2')}>{footer}</CardFooter> : null}
    </Card>
  )
}
