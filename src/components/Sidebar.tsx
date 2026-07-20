import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { navItems } from '../config/navigation'
import { cn } from '../lib/utils'
import { Button, Icon } from './ui'

export default function Sidebar() {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-full shrink-0 flex-col self-stretch overflow-hidden border-r border-border bg-surface transition-[width] duration-200 ease-in-out',
        collapsed ? 'w-20' : 'w-56',
      )}
    >
      <div className="flex border-b border-border p-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          aria-expanded={!collapsed}
          title={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          <Icon icon={collapsed ? PanelLeftOpen : PanelLeftClose} size="md" />
        </Button>
      </div>

      <nav className="flex flex-1 flex-col gap-4 p-2" aria-label={t('common.mainNav')}>
        {navItems.map(({ to, labelKey, icon }) => {
          const label = t(labelKey)

          return (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex cursor-pointer items-center gap-3 rounded-control p-3 text-lg whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-foreground/10 font-bold text-foreground'
                    : 'text-foreground-muted font-medium hover:bg-foreground/5 hover:text-foreground',
                )
              }
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center">
                <Icon icon={icon} size="md" aria-hidden />
              </span>
              <span
                className={cn(
                  'pr-3 transition-opacity duration-150',
                  collapsed ? 'opacity-0' : 'opacity-100',
                )}
                aria-hidden={collapsed}
              >
                {label}
              </span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
