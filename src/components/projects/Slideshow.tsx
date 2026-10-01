import { useEffect, useState, type KeyboardEvent } from 'react'
import type { Shot } from '~/data/projects'
import { asset } from '~/lib/asset'
import { Arrow } from '~/components/ui/Arrow'
import styles from './Slideshow.module.css'

/** Long enough to actually look at a screenshot before it moves on. */
const ADVANCE_MS = 6000

type SlideshowProps = {
  slides: readonly Shot[]
  label: string
}

/**
 * The cover on a project page. With one slide it is a plain frame; with more,
 * it advances on its own, and previous and next step through them and wrap at
 * either end. Autoplay pauses on hover or focus and is off for reduced motion.
 */
export function Slideshow({ slides, label }: SlideshowProps) {
  const [current, setCurrent] = useState(0)
  const count = slides.length
  const many = count > 1
  const [paused, setPaused] = useState(false)

  // Keyed on `current` so a manual step restarts the countdown.
  useEffect(() => {
    if (!many || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => setCurrent((index) => (index + 1) % count), ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [current, count, many, paused])

  const go = (step: number) => setCurrent((index) => (index + step + count) % count)

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') go(-1)
    else if (event.key === 'ArrowRight') go(1)
    else return
    event.preventDefault()
  }

  return (
    <section
      className={styles.slideshow}
      aria-roledescription={many ? 'carousel' : undefined}
      aria-label={label}
      onKeyDown={many ? onKeyDown : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <div className={styles.frame}>
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            className={styles.image}
            src={asset(slide.src)}
            alt={slide.alt}
            data-active={index === current}
            aria-hidden={index !== current}
            loading={index === 0 ? undefined : 'lazy'}
            decoding="async"
          />
        ))}
      </div>

      {many ? (
        <div className={styles.controls}>
          <button className={styles.button} type="button" onClick={() => go(-1)} aria-label="Previous screenshot">
            <Arrow direction="left" />
          </button>
          <p className={styles.counter} aria-live="polite">
            <span className="sr-only">Screenshot </span>
            {String(current + 1).padStart(2, '0')}
            <span className={styles.total}> / {String(count).padStart(2, '0')}</span>
          </p>
          <button className={styles.button} type="button" onClick={() => go(1)} aria-label="Next screenshot">
            <Arrow direction="right" />
          </button>
        </div>
      ) : null}
    </section>
  )
}
