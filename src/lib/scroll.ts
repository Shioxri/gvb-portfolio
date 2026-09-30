const EXTRA_OFFSET = 28

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Height of the docked header, read from the token rather than duplicated. */
function headerOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    '--header-height-docked',
  )
  const parsed = Number.parseFloat(raw)
  return (Number.isFinite(parsed) ? parsed : 62) + EXTRA_OFFSET
}

/**
 * Scrolls a section under the header. Used by the nav rather than plain hash
 * links so the heading never ends up hidden behind the docked bar.
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id)
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset()
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
