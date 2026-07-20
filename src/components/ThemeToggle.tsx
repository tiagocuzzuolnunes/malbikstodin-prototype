import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'
import { cn } from '../lib/utils'
import { Button } from './ui'

type ThemeToggleProps = {
  compact?: boolean
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const IconGlyph = isDark ? Sun : Moon

  return (
    <Button
      variant="muted"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      title={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      className={cn(
        'transition-all duration-300 ease-out',
        compact ? 'p-2' : 'p-3',
      )}
    >
      <IconGlyph
        className={cn(
          'shrink-0 transition-all duration-300 ease-out',
          compact ? 'h-5 w-5' : 'h-6 w-6',
        )}
      />
    </Button>
  )
}
