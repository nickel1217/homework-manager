import { useCallback, useEffect, useRef, useState } from 'react'

interface TimerProps {
  onStop: (durationMinutes: number) => void
  disabled?: boolean
}

type TimerStatus = 'idle' | 'running' | 'paused'

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}

function Timer({ onStop, disabled = false }: TimerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [status, setStatus] = useState<TimerStatus>('idle')
  const intervalRef = useRef<number | null>(null)

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const handleStart = useCallback(() => {
    if (disabled) {
      return
    }

    setStatus('running')
  }, [disabled])

  const handlePause = useCallback(() => {
    setStatus('paused')
  }, [])

  const handleStop = useCallback(() => {
    const durationMinutes = Math.max(1, Math.ceil(elapsedSeconds / 60))

    clearTimerInterval()
    onStop(durationMinutes)
    setElapsedSeconds(0)
    setStatus('idle')
  }, [clearTimerInterval, elapsedSeconds, onStop])

  useEffect(() => {
    if (status !== 'running' || disabled) {
      clearTimerInterval()
      return
    }

    intervalRef.current = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1)
    }, 1000)

    return () => {
      clearTimerInterval()
    }
  }, [clearTimerInterval, disabled, status])

  useEffect(() => {
    if (disabled && status !== 'idle') {
      clearTimerInterval()
      setStatus('idle')
      setElapsedSeconds(0)
    }
  }, [clearTimerInterval, disabled, status])

  const showStartButton = status === 'idle' || status === 'paused'
  const showPauseButton = status === 'running'
  const showStopButton = status === 'running' || status === 'paused'

  return (
    <div className="rounded-3xl bg-white/90 p-6 text-center shadow-lg ring-4 ring-sky-100">
      <div className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
        Homework Timer
      </div>
      <div className="mb-6 text-5xl font-black tracking-wide text-slate-800 sm:text-6xl">
        {formatTime(elapsedSeconds)}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {showStartButton ? (
          <button
            type="button"
            onClick={handleStart}
            disabled={disabled}
            className="min-h-14 min-w-14 rounded-[1.75rem] bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 px-7 py-4 text-lg font-black text-white shadow-lg shadow-sky-200 transition hover:scale-[1.02] hover:from-indigo-400 hover:via-sky-400 hover:to-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:from-slate-300 disabled:via-slate-300 disabled:to-slate-300 disabled:shadow-none"
          >
            ▶️ Start
          </button>
        ) : null}

        {showPauseButton ? (
          <button
            type="button"
            onClick={handlePause}
            disabled={disabled}
            className="min-h-14 min-w-14 rounded-full bg-yellow-500 px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-yellow-300"
          >
            ⏸️ Pause
          </button>
        ) : null}

        {showStopButton ? (
          <button
            type="button"
            onClick={handleStop}
            disabled={disabled}
            className="min-h-14 min-w-14 rounded-full bg-red-500 px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-300"
          >
            ⏹️ Stop
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Timer
