import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { i18nReady } from './i18n'
import './index.css'
import { ThemeProvider } from './theme/ThemeProvider'
import AppRouter from './router.jsx'

void i18nReady.then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </StrictMode>,
  )
})
