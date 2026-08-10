import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type SectionPageProps = {
  titleKey: string
  descriptionKey: string
  actions?: ReactNode
}

export default function SectionPage({
  titleKey,
  descriptionKey,
  actions,
}: SectionPageProps) {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-title">{t(titleKey)}</h1>
        <p className="mt-2 line-clamp-2 text-sm text-foreground-muted sm:line-clamp-none sm:text-body">
          {t(descriptionKey)}
        </p>
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {actions}
        </div>
      ) : null}
    </section>
  )
}
