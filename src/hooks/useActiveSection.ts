import { useEffect, useState } from 'react'

/**
 * Reports which of the given section ids currently owns the viewport, so the
 * header indicator can slide to match.
 *
 * The rule is "the last section whose heading has passed the reading line".
 * Nearest-section matching looks equivalent but marks the first section active
 * while the hero is still filling the screen, and largest-intersection
 * matching skips short sections entirely.
 */
export function useActiveSection(ids: readonly string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }

    const sectionIds = key.split('|').filter(Boolean)
    if (sectionIds.length === 0) return

    let frame = 0

    const measure = () => {
      frame = 0
      // The line the reader's eye sits on, roughly a third down the viewport.
      const line = window.innerHeight * 0.34
      let winner: string | null = null
      let best = Number.NEGATIVE_INFINITY

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const { top } = element.getBoundingClientRect()
        if (top <= line && top > best) {
          best = top
          winner = id
        }
      }

      // A short last section (the footer) may never reach the reading line;
      // at the very bottom of the page it wins regardless.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const last = sectionIds[sectionIds.length - 1]
      if (atBottom && last && document.getElementById(last)) winner = last

      setActive(winner)
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
  }, [key, enabled])

  return active
}
