import { useEffect } from 'react'
import { site } from '~/data/site'

/**
 * Keeps the document title and meta description in step with the route. The
 * app is client-rendered, so this is what search results and shared links end
 * up quoting once the page has run.
 */
export function usePageMeta(title: string, description?: string): void {
  useEffect(() => {
    document.title = title === site.name ? `${site.name} · ${site.role}` : `${title} · ${site.shortName}`

    if (!description) return
    const tag = document.querySelector('meta[name="description"]')
    tag?.setAttribute('content', description)
  }, [title, description])
}
