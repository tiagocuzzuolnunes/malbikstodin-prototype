import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ClipboardList } from 'lucide-react'
import { latestNews } from '../data/home'
import { companyEvents } from '../data/events'
import { getGreetingPeriod } from '../lib/greeting'
import { useReykjavikWeather } from '../hooks/useReykjavikWeather'
import { cn } from '../lib/utils'
import { buttonVariants, OptionCard } from '../components/ui'

const previewEvents = companyEvents.slice(0, 3)

export default function HeimPage() {
  const { t } = useTranslation()
  const weather = useReykjavikWeather()
  const greeting = t(`home.greeting.${getGreetingPeriod()}`, {
    name: t('home.userName'),
  })

  const weatherText =
    weather.status === 'ready'
      ? t('home.weather.summary', {
          condition: t(`home.weather.conditions.${weather.data.conditionKey}`),
          value: weather.data.temperature,
          speed: weather.data.windSpeed,
        })
      : weather.status === 'loading'
        ? t('home.weather.loading')
        : t('home.weather.error')

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">{greeting}</h1>
        <p className="mt-3 text-lg text-foreground-muted">{weatherText}</p>
        <Link
          to="/skraning/hours"
          className={cn(
            buttonVariants({ variant: 'primary', size: 'lg' }),
            'mt-6 inline-flex min-h-11 px-5',
          )}
        >
          <ClipboardList className="h-5 w-5 shrink-0" aria-hidden />
          {t('home.skraningCta')}
        </Link>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">{t('home.news.title')}</h2>
          <Link
            to="/frettir"
            className={cn(buttonVariants({ variant: 'ghost', size: 'md' }), 'text-sm')}
          >
            {t('home.news.viewAll')}
          </Link>
        </div>

        <div className="-mx-4 -mb-6 overflow-x-auto pb-10 pl-4 sm:-mx-5 sm:pl-5 md:-mx-6 md:pl-6">
          <div className="flex w-max items-stretch gap-4 pt-2">
            {latestNews.map((item, index) => (
              <OptionCard
                key={item.id}
                size="compact"
                variant="date"
                elevated
                className={cn(
                  'h-full min-h-56 w-72 shrink-0',
                  index === latestNews.length - 1 && 'mr-4 sm:mr-5 md:mr-6',
                )}
                title={t(item.titleKey)}
                description={t(item.summaryKey)}
                date={item.publishedAt}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">{t('home.events.title')}</h2>
          <Link
            to="/verkefni/events"
            className={cn(buttonVariants({ variant: 'ghost', size: 'md' }), 'text-sm')}
          >
            {t('home.events.viewAll')}
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {previewEvents.map((item) => (
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
      </section>
    </div>
  )
}
