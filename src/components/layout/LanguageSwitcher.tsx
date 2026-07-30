import { useTranslation } from 'react-i18next'
import { changeAppLocale, type SupportedLocale } from '../../i18n'
import { cn } from '../../lib/utils'
import { Button } from '../ui'

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
        void changeAppLocale(nextLocale)
      }}
      aria-label={t('language.switchTo', { language: t(`language.names.${nextLocale}`) })}
      title={t('language.switchTo', { language: t(`language.names.${nextLocale}`) })}
      className={cn(
        'aspect-square rounded-full transition-all duration-300 ease-out',
        compact ? 'h-9 w-9 p-0' : 'h-9 w-9 p-0 md:h-11 md:w-11',
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
