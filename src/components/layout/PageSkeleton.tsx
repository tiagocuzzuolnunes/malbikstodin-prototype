import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/utils'

function Bone({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-control bg-foreground/10', className)}
      aria-hidden
    />
  )
}

export default function PageSkeleton() {
  const { t } = useTranslation()

  return (
    <div
      className="mx-auto w-full max-w-6xl space-y-6 px-0 py-2"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={t('common.loading')}
    >
      <div className="space-y-2">
        <Bone className="h-3 w-40" />
        <Bone className="h-8 w-64 max-w-full" />
        <Bone className="h-4 w-full max-w-md" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Bone className="h-28 w-full" />
        <Bone className="h-28 w-full" />
        <Bone className="h-28 w-full sm:col-span-2 lg:col-span-1" />
      </div>

      <Bone className="h-48 w-full" />
    </div>
  )
}
