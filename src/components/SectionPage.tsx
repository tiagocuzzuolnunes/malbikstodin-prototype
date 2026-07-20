import { useTranslation } from 'react-i18next'

type SectionPageProps = {
  titleKey: string
  descriptionKey: string
}

export default function SectionPage({ titleKey, descriptionKey }: SectionPageProps) {
  const { t } = useTranslation()

  return (
    <section>
      <h1 className="text-title font-semibold tracking-tight">{t(titleKey)}</h1>
      <p className="mt-2 text-body text-foreground-muted">{t(descriptionKey)}</p>
    </section>
  )
}
