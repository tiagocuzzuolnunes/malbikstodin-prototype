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

export async function fetchReykjavikWeather(signal?: AbortSignal): Promise<ReykjavikWeather> {
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
