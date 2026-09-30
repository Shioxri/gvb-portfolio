import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_KEY = 'gvb:theme'

/**
 * The site is light by design, so that is the default. A stored choice wins,
 * and the inline script in index.html has already applied whatever this
 * returns before React mounts. Reading it back here just keeps the toggle in
 * step rather than re-deciding.
 */
function readTheme(): Theme {
  const applied = document.documentElement.dataset['theme']
  if (applied === 'dark' || applied === 'light') return applied
  return 'light'
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset['theme'] = theme
    try {
      window.localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* Private browsing can refuse storage; the choice just will not persist. */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return [theme, toggle]
}
