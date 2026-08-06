import { useLayoutEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { navItems } from '../../config/navigation'
import { prefetchRoute } from '../../lib/prefetchRoute'
import { cn } from '../../lib/utils'
import { Button, Icon } from '../ui'

const EXPANDED_WIDTH_REM = 14
const COLLAPSED_WIDTH_REM = 5

export default function Sidebar() {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const shellRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const shell = shellRef.current
    const content = contentRef.current
    if (!shell || !content) return

    const updateScale = () => {
      const available = shell.clientHeight
      // transform: scale does not affect layout metrics — this is the design-size height
      const needed = content.scrollHeight
      if (available <= 0 || needed <= 0) return

      const next = Math.min(1, available / needed)
      setScale((current) => (Math.abs(current - next) < 0.001 ? current : next))
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)
    observer.observe(shell)
    observer.observe(content)
    window.addEventListener('resize', updateScale)

    void document.fonts?.ready?.then(updateScale)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [collapsed])

  const designWidthRem = collapsed ? COLLAPSED_WIDTH_REM : EXPANDED_WIDTH_REM

  return (
    <aside
      ref={shellRef}
      className="hidden h-full min-h-0 shrink-0 self-stretch overflow-hidden border-r border-border bg-surface transition-[width] duration-200 ease-in-out md:block"
      style={{ width: `calc(${designWidthRem}rem * ${scale})` }}
    >
      <div
        ref={contentRef}
        className="flex flex-col bg-surface"
        style={{
          width: `${designWidthRem}rem`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
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

        <nav className="flex flex-col gap-4 p-2" aria-label={t('common.mainNav')}>
          {navItems.map(({ to, labelKey, icon }) => {
            const label = t(labelKey)

            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                title={collapsed ? label : undefined}
                onMouseEnter={() => prefetchRoute(to)}
                onFocus={() => prefetchRoute(to)}
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
      </div>
    </aside>
  )
}
