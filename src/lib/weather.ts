/** WMO weather interpretation codes → i18n key suffix under home.weather.conditions.* */
export function weatherCodeToKey(code: number): string {
  if (code === 0) return 'clear'
  if (code === 1 || code === 2) return 'partlyCloudy'
  if (code === 3) return 'overcast'
  if (code === 45 || code === 48) return 'fog'
  if (code >= 51 && code <= 57) return 'drizzle'
  if (code >= 61 && code <= 67) return 'rain'
  if (code >= 71 && code <= 77) return 'snow'
  if (code >= 80 && code <= 82) return 'showers'
  if (code >= 85 && code <= 86) return 'snowShowers'
  if (code >= 95) return 'thunder'
  return 'unknown'
}

export type ReykjavikWeather = {
  temperature: number
  windSpeed: number
  conditionKey: string
}

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number
    weather_code?: number
    wind_speed_10m?: number
  }
}

const REYKJAVIK = {
  latitude: 64.1466,
  longitude: -21.9426,
}

const WEATHER_CACHE_KEY = 'malbikstodin-reykjavik-weather'
/** Fresh enough to show without blocking; background refresh still runs. */
export const WEATHER_TTL_MS = 10 * 60 * 1000

type CachedWeather = {
  data: ReykjavikWeather
  fetchedAt: number
}

function readWeatherCache(): CachedWeather | null {
  try {
    const raw = sessionStorage.getItem(WEATHER_CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedWeather
    if (
      !parsed?.data ||
      typeof parsed.fetchedAt !== 'number' ||
      typeof parsed.data.temperature !== 'number'
    ) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function writeWeatherCache(data: ReykjavikWeather) {
  try {
    const payload: CachedWeather = { data, fetchedAt: Date.now() }
    sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(payload))
  } catch {
    // Ignore quota / private mode failures.
  }
}

export function getCachedReykjavikWeather(): CachedWeather | null {
  return readWeatherCache()
}

export function isWeatherFresh(fetchedAt: number, now = Date.now()): boolean {
  return now - fetchedAt < WEATHER_TTL_MS
}

async function fetchReykjavikWeatherNetwork(
  signal?: AbortSignal,
): Promise<ReykjavikWeather> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(REYKJAVIK.latitude))
  url.searchParams.set('longitude', String(REYKJAVIK.longitude))
  url.searchParams.set('current', 'temperature_2m,weather_code,wind_speed_10m')
  url.searchParams.set('timezone', 'Atlantic/Reykjavik')
  url.searchParams.set('wind_speed_unit', 'ms')

  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Weather request failed (${response.status})`)
  }

  const data = (await response.json()) as OpenMeteoResponse
  const current = data.current

  if (
    current?.temperature_2m == null ||
    current.weather_code == null ||
    current.wind_speed_10m == null
  ) {
    throw new Error('Weather response missing current conditions')
  }

  return {
    temperature: Math.round(current.temperature_2m),
    windSpeed: Math.round(current.wind_speed_10m),
    conditionKey: weatherCodeToKey(current.weather_code),
  }
}

/**
 * Returns cached weather when present; refreshes in the background when stale
 * (stale-while-revalidate). Network-only when the cache is empty.
 */
export async function fetchReykjavikWeather(
  signal?: AbortSignal,
): Promise<{ data: ReykjavikWeather; fromCache: boolean }> {
  const cached = readWeatherCache()

  if (cached && isWeatherFresh(cached.fetchedAt)) {
    return { data: cached.data, fromCache: true }
  }

  if (cached) {
    // Stale: return immediately and refresh without blocking callers that
    // already received the promise — callers should use the hook for SWR.
    void fetchReykjavikWeatherNetwork()
      .then(writeWeatherCache)
      .catch(() => {})
    return { data: cached.data, fromCache: true }
  }

  const data = await fetchReykjavikWeatherNetwork(signal)
  writeWeatherCache(data)
  return { data, fromCache: false }
}

/** Force a network refresh and update the session cache. */
export async function refreshReykjavikWeather(
  signal?: AbortSignal,
): Promise<ReykjavikWeather> {
  const data = await fetchReykjavikWeatherNetwork(signal)
  writeWeatherCache(data)
  return data
}
