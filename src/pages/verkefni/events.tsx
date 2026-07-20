import { useTranslation } from 'react-i18next'
import { companyEvents } from '../../data/events'
import { OptionCard } from '../../components/ui'

export default function VerkefniEventsPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-title font-semibold tracking-tight">{t('pages.verkefni.eventsTitle')}</h1>
        <p className="mt-2 text-body text-foreground-muted">
          {t('pages.verkefni.eventsDescription')}
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {companyEvents.map((item) => (
          <OptionCard
            key={item.id}
            size="compact"
            variant="date"
            title={t(item.titleKey)}
            description={t(item.descriptionKey)}
            date={item.date}
            meta={
              <p className="font-medium tracking-wide text-foreground-muted uppercase">
                {item.type === 'deadline' ? t('home.events.deadline') : t('home.events.event')}
              </p>
            }
          />
        ))}
      </div>
    </div>
  )
}
