import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { buttonVariants } from '../components/ui'
import { cn } from '../lib/utils'
import asphalt from '../assets/asphalt.png'
import clouds from '../assets/clouds.png'
import logo from '../assets/logo.png'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-surface-muted px-4 py-16 text-center',
        'pt-[max(4rem,env(safe-area-inset-top))]',
        'pb-[max(4rem,env(safe-area-inset-bottom))]',
        'pl-[max(1rem,env(safe-area-inset-left))]',
        'pr-[max(1rem,env(safe-area-inset-right))]',
      )}
    >
      <Link
        to="/"
        className={cn(
          'not-found-fade not-found-delay-1 absolute top-0 left-0 z-20 flex items-center gap-2 p-4 md:gap-3 md:p-7',
          'pt-[max(1rem,env(safe-area-inset-top))]',
          'pl-[max(1rem,env(safe-area-inset-left))]',
        )}
      >
        <img
          className="h-8 w-auto object-contain md:h-10"
          src={logo}
          alt={t('brand.logoAlt')}
        />
        <span className="hidden font-black tracking-tight text-foreground sm:inline">
          {t('brand.header')}
        </span>
      </Link>

      <img
        src={asphalt}
        alt=""
        aria-hidden
        className={cn(
          'not-found-fade-bg pointer-events-none absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover',
          'lg:h-[55dvh] lg:w-[70dvw] lg:max-h-full lg:max-w-full',
          'w-[85%]',
          'md:w-[85%]',
        )}
      />

      <div
        className={cn(
          'not-found-fade not-found-delay-2 relative z-10 mx-auto flex w-full flex-col items-center justify-center overflow-hidden rounded-card text-center',
          'min-h-[min(24rem,62dvh)] max-w-full px-5 py-12',
          'sm:min-h-[min(28rem,60dvh)] sm:max-w-5xl sm:px-8 sm:py-16',
          'md:min-h-112 md:max-w-5xl md:px-14 md:py-20',
          'lg:min-h-128 lg:max-w-6xl lg:px-16 lg:py-24',
        )}
      >
        <img
          src={clouds}
          alt=""
          aria-hidden
          className={cn(
            'not-found-fade-bg not-found-delay-3 pointer-events-none absolute inset-0 size-full object-cover object-center',
            'scale-125 sm:scale-110 md:scale-125',
            'dark:inset-auto dark:top-1/2 dark:left-1/2 dark:size-[38%] dark:max-w-none dark:-translate-x-1/2 dark:-translate-y-1/2 dark:scale-100 dark:object-contain dark:sm:size-[32%] dark:md:size-[28%]',
          )}
        />
        <div className="relative z-10 max-w-full">
          <h1 className="not-found-fade not-found-delay-4 text-2xl font-semibold tracking-tight text-foreground wrap-break-word sm:text-3xl md:text-4xl">
            {t('pages.notFound.title')}
          </h1>
          <p className="not-found-fade not-found-delay-5 mt-3 text-sm text-foreground-muted wrap-break-word sm:text-body">
            {t('pages.notFound.description')}
          </p>
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: 'primary', size: 'lg' }),
              'not-found-fade not-found-delay-6 mt-8 inline-flex min-h-11 px-5',
            )}
          >
            {t('pages.notFound.backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
