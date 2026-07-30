import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LogOut, User } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button, Modal } from '../ui'

type UserMenuProps = {
  compact?: boolean
}

export default function UserMenu({ compact = false }: UserMenuProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="muted"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={t('userMenu.open')}
        title={t('userMenu.open')}
        className={cn(
          'transition-all duration-300 ease-out',
          compact ? 'p-2' : 'p-2 md:p-3',
        )}
      >
        <User
          className={cn(
            'shrink-0 transition-all duration-300 ease-out',
            compact ? 'h-5 w-5' : 'h-6 w-6 md:h-8 md:w-8',
          )}
        />
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t('userMenu.title')}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-control text-foreground">
              <User className="h-7 w-7" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-lg font-semibold tracking-tight">{t('home.userName')}</p>
              <p className="mt-1 text-sm text-foreground-muted">{t('userMenu.role')}</p>
              <p className="mt-0.5 text-sm text-foreground-muted">{t('userMenu.email')}</p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="min-h-11 w-full"
              onClick={() => setOpen(false)}
            >
              <LogOut className="h-5 w-5" aria-hidden />
              {t('userMenu.signOut')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
