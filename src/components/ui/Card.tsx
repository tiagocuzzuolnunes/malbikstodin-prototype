import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { cardVariants, type CardVariantProps } from './cardVariants'

export type CardProps = HTMLAttributes<HTMLDivElement> & CardVariantProps

export function Card({ className, padding, elevated, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ padding, elevated }), className)} {...props} />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-xl font-semibold tracking-tight sm:text-2xl', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-foreground-muted sm:text-lg', className)} {...props} />
  )
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-base', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-wrap items-center gap-3', className)} {...props} />
}

export type CardShellProps = {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  elevated?: boolean
  className?: string
  size?: 'default' | 'compact'
  /** Pin children to the bottom when cards share a taller stretch height. */
  contentAlign?: 'start' | 'end'
}

export function CardShell({
  title,
  description,
  children,
  footer,
  elevated = true,
  className,
  size = 'default',
  contentAlign = 'start',
}: CardShellProps) {
  const compact = size === 'compact'
  const contentSpacing =
    contentAlign === 'end'
      ? compact
        ? 'mt-auto pt-4'
        : 'mt-auto pt-8'
      : compact
        ? 'mt-4'
        : 'mt-8'

  return (
    <Card
      elevated={elevated}
      padding={compact ? 'md' : 'lg'}
      className={cn('flex h-full flex-col', compact ? 'min-h-0' : 'min-h-56', className)}
    >
      <CardHeader className={cn(compact && 'gap-1')}>
        <CardTitle className={cn(compact && 'truncate')}>{title}</CardTitle>
        {description ? (
          <CardDescription className={cn(compact && 'line-clamp-3')}>
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      {children ? (
        <CardContent className={cn(contentSpacing, compact && 'text-sm')}>{children}</CardContent>
      ) : null}
      {footer ? (
        <CardFooter
          className={cn(
            children ? (compact ? 'mt-4' : 'mt-8') : contentSpacing,
            compact && 'gap-2',
          )}
        >
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  )
}
