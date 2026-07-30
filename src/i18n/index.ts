import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultLocale = 'en'
export const supportedLocales = ['en', 'is'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

export const LOCALE_STORAGE_KEY = 'malbikstodin-locale'

const localeLoaders: Record<
  SupportedLocale,
  () => Promise<{ default: Record<string, unknown> }>
> = {
  en: () => import('./locales/en.json'),
  is: () => import('./locales/is.json'),
}

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

async function ensureLocaleResources(locale: SupportedLocale) {
  if (i18n.hasResourceBundle(locale, 'translation')) return

  const mod = await localeLoaders[locale]()
  i18n.addResourceBundle(locale, 'translation', mod.default, true, true)
}

export async function changeAppLocale(locale: SupportedLocale) {
  await ensureLocaleResources(locale)
  await i18n.changeLanguage(locale)

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Ignore storage failures in private mode.
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
}

async function initI18n() {
  const initialLocale = resolveInitialLocale()
  const mod = await localeLoaders[initialLocale]()

  await i18n.use(initReactI18next).init({
    resources: {
      [initialLocale]: { translation: mod.default },
    },
    lng: initialLocale,
    // Only the active locale is bundled at boot; missing keys stay as keys.
    fallbackLng: false,
    supportedLngs: [...supportedLocales],
    partialBundledLanguages: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      // Avoid Suspense on language change so open forms keep their state.
      useSuspense: false,
    },
  })

  if (typeof document !== 'undefined') {
    document.documentElement.lang = initialLocale
  }

  return i18n
}

export const i18nReady = initI18n()

export default i18n
