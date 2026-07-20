import { useEffect, useState } from 'react'
import { fetchReykjavikWeather, type ReykjavikWeather } from '../lib/weather'

type WeatherState =
  | { status: 'loading' }
  | { status: 'ready'; data: ReykjavikWeather }
  | { status: 'error' }

export function useReykjavikWeather() {
  const [state, setState] = useState<WeatherState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    void fetchReykjavikWeather(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ status: 'ready', data })
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ status: 'error' })
        }
      })

    return () => controller.abort()
  }, [])

  return state
}
