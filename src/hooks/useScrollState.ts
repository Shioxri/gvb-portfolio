import { useEffect, useState } from 'react'

export type ScrollState = {
  /** Past the docking threshold, the header collapses to its compact form. */
  docked: boolean
  /** True while the page is scrolled to the very top. */
  atTop: boolean
  /** 0–1 through the scrollable height, for the header's progress rule. */
  progress: number
}

const DOCK_AT = 24

/**
 * One rAF-throttled scroll listener for the whole app. The header reads it to
 * decide whether to dock; nothing else needs its own scroll handler.
 */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    docked: false,
    atTop: true,
    progress: 0,
  })

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const y = window.scrollY
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0

      setState((previous) => {
        const next: ScrollState = {
          docked: y > DOCK_AT,
          atTop: y <= 2,
          progress,
        }

        // Progress changes every frame; the booleans rarely do. Bail out unless
        // something moved enough to be worth a render.
        const same =
          previous.docked === next.docked &&
          previous.atTop === next.atTop &&
          Math.abs(previous.progress - next.progress) < 0.002

        return same ? previous : next
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return state
}
