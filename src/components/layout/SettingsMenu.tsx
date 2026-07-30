import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Moon, Settings, Sun } from 'lucide-react'
import { changeAppLocale, type SupportedLocale } from '../../i18n'
import { cn } from '../../lib/utils'
import { useTheme } from '../../theme/ThemeProvider'
import { Button, Modal } from '../ui'

type SettingsMenuProps = {
  compact?: boolean
}

type SegmentOption = {
  value: string
  label: string
  content: ReactNode
}

function SegmentedControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: SegmentOption[]
  onChange: (value: string) => void
}) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  return (
    <div
      role="group"
      aria-label={label}
      className="relative inline-grid grid-cols-2 rounded-pill bg-control p-1"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-pill bg-surface shadow-sm ring-1 ring-border transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
      />

      {options.map((option) => {
        const active = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 inline-flex h-9 min-w-11 cursor-pointer items-center justify-center rounded-pill px-3 text-sm font-semibold tracking-wide transition-colors duration-200',
              active
                ? 'text-foreground'
                : 'text-foreground-muted hover:bg-interactive-hover hover:text-foreground',
            )}
          >
            {option.content}
          </button>
        )
      })}
    </div>
  )
}

export default function SettingsMenu({ compact = false }: SettingsMenuProps) {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const currentLocale: SupportedLocale =
    (i18n.resolvedLanguage ?? i18n.language).startsWith('is') ? 'is' : 'en'

  function setLocale(nextLocale: SupportedLocale) {
    if (nextLocale === currentLocale) return
    void changeAppLocale(nextLocale)
  }

  return (
    <>
      <Button
        variant="muted"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={t('settings.open')}
        title={t('settings.open')}
        className={cn(
          'transition-all duration-300 ease-out',
          compact ? 'p-2' : 'p-3',
        )}
      >
        <Settings
          className={cn(
            'shrink-0 transition-all duration-300 ease-out',
            compact ? 'h-5 w-5' : 'h-6 w-6',
          )}
        />
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t('settings.title')}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground-muted">
              {t('theme.label')}
            </p>
            <SegmentedControl
              label={t('theme.label')}
              value={theme}
              onChange={(next) => setTheme(next as 'light' | 'dark')}
              options={[
                {
                  value: 'light',
                  label: t('theme.switchToLight'),
                  content: <Sun className="h-4 w-4" aria-hidden />,
                },
                {
                  value: 'dark',
                  label: t('theme.switchToDark'),
                  content: <Moon className="h-4 w-4" aria-hidden />,
                },
              ]}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground-muted">
              {t('language.label')}
            </p>
            <SegmentedControl
              label={t('language.label')}
              value={currentLocale}
              onChange={(next) => setLocale(next as SupportedLocale)}
              options={[
                {
                  value: 'is',
                  label: t('language.switchTo', { language: t('language.names.is') }),
                  content: 'IS',
                },
                {
                  value: 'en',
                  label: t('language.switchTo', { language: t('language.names.en') }),
                  content: 'EN',
                },
              ]}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
