import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import is from './locales/is.json'

export const defaultLocale = 'en'
export const supportedLocales = ['en', 'is'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

const LOCALE_STORAGE_KEY = 'malbikstodin-locale'

function resolveInitialLocale(): SupportedLocale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored && (supportedLocales as readonly string[]).includes(stored)) {
      return stored as SupportedLocale
    }
  } catch {
    // Ignore storage failures in private mode.
  }
  return defaultLocale
}

const initialLocale = resolveInitialLocale()

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    is: { translation: is },
  },
  lng: initialLocale,
  fallbackLng: defaultLocale,
  supportedLngs: [...supportedLocales],
  interpolation: {
    escapeValue: false,
  },
  react: {
    // Translations are bundled; suspense on language change remounts routes and drops form state.
    useSuspense: false,
  },
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLocale
}

export default i18n
