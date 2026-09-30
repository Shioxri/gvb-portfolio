import { useEffect, useRef, useState } from 'react'
import { site } from '~/data/site'
import { useAssetPreload } from '~/hooks/useAssetPreload'
import { asset } from '~/lib/asset'
import styles from './Preloader.module.css'

const EXIT_MS = 900

const CRITICAL = [asset(site.portrait)]

const NAME_WORDS = site.name.split(' ')

/** What the counter is actually waiting on, in the order it gets there. */
function statusFor(progress: number): string {
  if (progress < 0.34) return 'Loading typefaces'
  if (progress < 0.7) return 'Loading imagery'
  if (progress < 1) return 'Preparing layout'
  return 'Ready'
}

type PreloaderProps = {
  onFinished: () => void
}

export function Preloader({ onFinished }: PreloaderProps) {
  const { progress, complete } = useAssetPreload(CRITICAL)
  const [exiting, setExiting] = useState(false)

  // The real figure jumps in steps as each asset lands. Easing toward it keeps
  // the counter climbing continuously, which is the only way it reads as a
  // measurement rather than a decoration.
  const [shown, setShown] = useState(0)
  const shownRef = useRef(0)

  useEffect(() => {
    let frame = 0

    const step = () => {
      const delta = progress - shownRef.current
      if (Math.abs(delta) < 0.001) {
        shownRef.current = progress
        setShown(progress)
        frame = 0
        return
      }

      shownRef.current += delta * 0.08
      setShown(shownRef.current)
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(frame)
    }
  }, [progress])

  // Only start the wipe once the counter has caught up to 100.
  useEffect(() => {
    if (complete && shown >= 0.995) setExiting(true)
  }, [complete, shown])

  // Kept separate: `shown` ticks every frame, and folding it into this effect
  // would cancel and reschedule the hand-off on every one of them.
  useEffect(() => {
    if (!exiting) return
    const timer = window.setTimeout(onFinished, EXIT_MS)
    return () => {
      window.clearTimeout(timer)
    }
  }, [exiting, onFinished])

  const percent = Math.round(shown * 100)

  return (
    <div
      className={styles.overlay}
      data-exiting={exiting ? 'true' : 'false'}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${percent} percent`}
    >
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <span className={styles.mark}>{site.shortName}</span>
          <span>Portfolio</span>
        </div>

        <div>
          <p className={styles.name}>
            {NAME_WORDS.map((word, index) => (
              <span
                key={word}
                className={styles.word}
                style={{ '--index': index }}
                aria-hidden="true"
              >
                <span>{word}</span>
              </span>
            ))}
            <span className="sr-only">{site.name}</span>
          </p>
          <p className={styles.role}>{site.role}</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.readout}>
            <span className={styles.status}>{statusFor(shown)}</span>
            <span className={styles.count} aria-hidden="true">
              {percent}
              <span className={styles.percent}>%</span>
            </span>
          </div>
          <div className={styles.track}>
            <span className={styles.bar} style={{ '--progress': shown }} />
          </div>
        </div>
      </div>
    </div>
  )
}
