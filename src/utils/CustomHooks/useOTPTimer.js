import { useState, useEffect } from 'react'

export function useFriendStatus() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(59)

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    return () => clearInterval(interval)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  return {
    minutes: minutes,
    seconds: seconds,
  }
}
