import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultLocale = 'en'
export const supportedLocales = ['en', 'is'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

export const LOCALE_STORAGE_KEY = 'malbikstodin-locale'

/**
 * Emit locales as static `.json` assets (via `?url`) instead of JS modules.
 * Keeps inactive languages out of the JS bundle budget while preserving lazy load.
 */
const localeUrls: Record<SupportedLocale, string> = {
  en: new URL('./locales/en.json', import.meta.url).href,
  is: new URL('./locales/is.json', import.meta.url).href,
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

async function fetchLocaleTranslation(
  locale: SupportedLocale,
): Promise<Record<string, unknown>> {
  const response = await fetch(localeUrls[locale])
  if (!response.ok) {
    throw new Error(`Failed to load locale "${locale}" (${response.status})`)
  }
  return (await response.json()) as Record<string, unknown>
}

async function loadLocaleResources(
  locale: SupportedLocale,
  { force = false }: { force?: boolean } = {},
) {
  if (!force && i18n.hasResourceBundle(locale, 'translation')) return

  const translation = await fetchLocaleTranslation(locale)
  i18n.addResourceBundle(locale, 'translation', translation, true, true)
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
  const translation = await fetchLocaleTranslation(initialLocale)

  await i18n.use(initReactI18next).init({
    resources: {
      [initialLocale]: { translation },
    },
    lng: initialLocale,
    // Only the active locale is loaded at boot; missing keys stay as keys.
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
    // Bust browser cache for HMR by appending a query after re-resolve.
    for (const locale of supportedLocales) {
      localeUrls[locale] = new URL(
        `./locales/${locale}.json`,
        import.meta.url,
      ).href
    }
    await Promise.all(
      supportedLocales.map((locale) => loadLocaleResources(locale, { force: true })),
    )
  })
}

export default i18n
