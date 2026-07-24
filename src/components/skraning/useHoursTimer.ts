import { useEffect, useState } from 'react'
import { msToHours } from './hoursUtils'

export function useHoursTimer() {
  const [runId, setRunId] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const startedAt = Date.now()
    const id = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAt)
    }, 1000)

    return () => window.clearInterval(id)
  }, [isRunning, runId])

  function start() {
    setElapsedMs(0)
    setIsRunning(true)
    setRunId((id) => id + 1)
  }

  function reset() {
    setIsRunning(false)
    setElapsedMs(0)
  }

  function finishHours() {
    return msToHours(elapsedMs)
  }

  return {
    isRunning,
    elapsedMs,
    fieldsLocked: isRunning,
    start,
    reset,
    finishHours,
  }
}
