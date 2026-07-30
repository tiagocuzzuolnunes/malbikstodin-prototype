import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { buttonVariants } from '../components/ui'
import { cn } from '../lib/utils'
import asphalt from '../assets/asphalt.png'
import clouds from '../assets/clouds.png'

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
      <img
        src={asphalt}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 scale-[0.85] object-cover"
      />

      <div
        className="relative z-10 mx-auto flex min-h-112 w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-card px-8 py-20 sm:min-h-128 sm:max-w-6xl sm:px-16 sm:py-24"
      >
        <img
          src={clouds}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t('pages.notFound.title')}
          </h1>
          <p className="mt-3 text-sm text-foreground-muted sm:text-body">
            {t('pages.notFound.description')}
          </p>
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: 'primary', size: 'lg' }),
              'mt-8 inline-flex min-h-11 px-5',
            )}
          >
            {t('pages.notFound.backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
