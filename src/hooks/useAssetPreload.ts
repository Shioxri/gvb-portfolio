import { useEffect, useRef, useState } from 'react'

export type PreloadState = {
  /** 0–1, eased toward the real figure so the counter never stalls. */
  progress: number
  /** Everything has loaded and the minimum display time has elapsed. */
  complete: boolean
}

export type PreloadOptions = {
  /** Keep the intro on screen at least this long, so it reads as deliberate. */
  minimumMs?: number | undefined
  /** Give up waiting on the network after this long. */
  timeoutMs?: number | undefined
}

/**
 * Drives the intro counter from real work: the hero image, the web fonts, and
 * the browser's own load event. The number means something, which is the only
 * reason a loading screen is worth showing at all.
 */
export function useAssetPreload(
  sources: readonly string[],
  options: PreloadOptions = {},
): PreloadState {
  const { minimumMs = 900, timeoutMs = 6000 } = options
  const [state, setState] = useState<PreloadState>({ progress: 0, complete: false })
  const key = sources.join('|')
  const startedAt = useRef(performance.now())

  useEffect(() => {
    const list = key.split('|').filter(Boolean)
    // Images, plus one slot for fonts and one for the window load event.
    const total = list.length + 2
    let settled = 0
    let cancelled = false

    const tick = () => {
      if (cancelled) return
      settled += 1
      const ratio = Math.min(1, settled / total)
      setState((previous) => ({ ...previous, progress: ratio }))
      if (ratio >= 1) finish()
    }

    const finish = () => {
      if (cancelled) return
      const elapsed = performance.now() - startedAt.current
      const wait = Math.max(0, minimumMs - elapsed)
      window.setTimeout(() => {
        if (!cancelled) setState({ progress: 1, complete: true })
      }, wait)
    }

    for (const src of list) {
      const image = new Image()
      image.onload = tick
      image.onerror = tick
      image.src = src
      if (image.complete) tick()
    }

    if (document.fonts) {
      void document.fonts.ready.then(tick)
    } else {
      tick()
    }

    if (document.readyState === 'complete') {
      tick()
    } else {
      window.addEventListener('load', tick, { once: true })
    }

    // A slow or dead asset should never trap someone on the intro.
    const bail = window.setTimeout(finish, timeoutMs)

    return () => {
      cancelled = true
      window.clearTimeout(bail)
      window.removeEventListener('load', tick)
    }
  }, [key, minimumMs, timeoutMs])

  return state
}
