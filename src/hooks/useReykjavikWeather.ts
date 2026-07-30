import { useEffect, useState } from 'react'
import {
  getCachedReykjavikWeather,
  isWeatherFresh,
  refreshReykjavikWeather,
  type ReykjavikWeather,
} from '../lib/weather'

type WeatherState =
  | { status: 'loading' }
  | { status: 'ready'; data: ReykjavikWeather }
  | { status: 'error' }

function getInitialWeatherState(): WeatherState {
  const cached = getCachedReykjavikWeather()
  return cached ? { status: 'ready', data: cached.data } : { status: 'loading' }
}

export function useReykjavikWeather() {
  const [state, setState] = useState<WeatherState>(getInitialWeatherState)

  useEffect(() => {
    const controller = new AbortController()
    const cached = getCachedReykjavikWeather()

    // Fresh cache already applied in initial state — no network this visit.
    if (cached && isWeatherFresh(cached.fetchedAt)) {
      return () => controller.abort()
    }

    void refreshReykjavikWeather(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ status: 'ready', data })
        }
      })
      .catch(() => {
        if (!controller.signal.aborted && !cached) {
          setState({ status: 'error' })
        }
      })

    return () => controller.abort()
  }, [])

  return state
}
