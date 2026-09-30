import { createContext, useContext } from 'react'

/**
 * True once the intro has handed the page over. The hero waits on this so its
 * entrance does not play behind the overlay and finish unseen.
 */
export const IntroContext = createContext(true)

export function useIntroReady(): boolean {
  return useContext(IntroContext)
}

const SESSION_KEY = 'gvb:intro-played'

/** The intro is a greeting, not a toll booth. Once per session is enough. */
export function shouldPlayIntro(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === null
  } catch {
    // Private browsing modes can throw on storage access.
    return true
  }
}

export function markIntroPlayed(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* Nothing to do. The intro simply plays again next time. */
  }
}
