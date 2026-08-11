import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { i18nReady } from './i18n'
import { syncShellScale } from './hooks/useShellScale'
import './index.css'
import { ThemeProvider } from './theme/ThemeProvider'
import AppRouter from './router.jsx'

syncShellScale()

void i18nReady.then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </StrictMode>,
  )
})
