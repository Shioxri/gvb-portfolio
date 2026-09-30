import { useEffect } from 'react'

/**
 * Freezes page scrolling while an overlay owns the screen. No scrollbar
 * compensation is needed: `scrollbar-gutter: stable` on the root already
 * reserves the space whether or not the bar is showing.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    document.body.dataset['locked'] = 'true'
    return () => {
      delete document.body.dataset['locked']
    }
  }, [locked])
}
