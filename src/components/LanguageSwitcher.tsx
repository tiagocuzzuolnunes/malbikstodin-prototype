import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'
import { Button } from './ui'
import type { SupportedLocale } from '../i18n'

const LOCALE_STORAGE_KEY = 'malbikstodin-locale'

type LanguageSwitcherProps = {
  compact?: boolean
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()
  const current = (i18n.resolvedLanguage ?? i18n.language).startsWith('is') ? 'is' : 'en'
  const nextLocale: SupportedLocale = current === 'en' ? 'is' : 'en'

  return (
    <Button
      variant="muted"
      size="icon"
      onClick={() => {
        void i18n.changeLanguage(nextLocale)
        try {
          localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
        } catch {
          // Ignore storage failures in private mode.
        }
        document.documentElement.lang = nextLocale
      }}
      aria-label={t('language.switchTo', { language: t(`language.names.${nextLocale}`) })}
      title={t('language.switchTo', { language: t(`language.names.${nextLocale}`) })}
      className={cn(
        'transition-all duration-300 ease-out',
        compact ? 'p-2' : 'p-2 md:p-3',
      )}
    >
      <span
        className={cn(
          'font-semibold tracking-wide',
          compact ? 'text-xs' : 'text-xs md:text-sm',
        )}
      >
        {nextLocale.toUpperCase()}
      </span>
    </Button>
  )
}
