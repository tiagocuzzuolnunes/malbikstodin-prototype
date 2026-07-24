import { useTranslation } from 'react-i18next'

type SectionPageProps = {
  titleKey: string
  descriptionKey: string
}

export default function SectionPage({ titleKey, descriptionKey }: SectionPageProps) {
  const { t } = useTranslation()

  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-title">{t(titleKey)}</h1>
      <p className="mt-2 text-sm text-foreground-muted sm:text-body">{t(descriptionKey)}</p>
    </section>
  )
}
