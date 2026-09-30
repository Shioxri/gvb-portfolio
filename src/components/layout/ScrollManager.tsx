import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '~/lib/scroll'

/**
 * Route changes land at the top of the new page; a hash lands on its section.
 * The browser's own restoration is disabled because the router swaps content
 * after the scroll position has already been reapplied.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    // One frame for the incoming route to lay out before measuring it.
    const frame = requestAnimationFrame(() => {
      scrollToSection(hash.slice(1))
    })
    return () => {
      cancelAnimationFrame(frame)
    }
  }, [pathname, hash])

  return null
}
