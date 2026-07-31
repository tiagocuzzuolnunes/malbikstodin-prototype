import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultLocale = 'en'
export const supportedLocales = ['en', 'is'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

export const LOCALE_STORAGE_KEY = 'malbikstodin-locale'

const localeLoaders: Record<
  SupportedLocale,
  () => Promise<{ default?: Record<string, unknown> } & Record<string, unknown>>
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

function asTranslation(mod: {
  default?: Record<string, unknown>
} & Record<string, unknown>): Record<string, unknown> {
  if (mod.default && typeof mod.default === 'object') return mod.default
  const { default: _ignored, ...rest } = mod
  return rest
}

async function loadLocaleResources(
  locale: SupportedLocale,
  { force = false }: { force?: boolean } = {},
) {
  if (!force && i18n.hasResourceBundle(locale, 'translation')) return

  const mod = await localeLoaders[locale]()
  i18n.addResourceBundle(locale, 'translation', asTranslation(mod), true, true)
}

export async function changeAppLocale(locale: SupportedLocale) {
  await loadLocaleResources(locale)
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
      [initialLocale]: { translation: asTranslation(mod) },
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

if (import.meta.hot) {
  import.meta.hot.accept(['./locales/en.json', './locales/is.json'], async () => {
    await Promise.all(
      supportedLocales.map((locale) => loadLocaleResources(locale, { force: true })),
    )
  })
}

export default i18n
