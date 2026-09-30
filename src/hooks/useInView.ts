import { useEffect, useRef, useState, type RefObject } from 'react'

export type InViewOptions = {
  /** Stop observing after the first intersection. Defaults to true. */
  once?: boolean | undefined
  /** Fraction of the element that must be visible. */
  threshold?: number | undefined
  rootMargin?: string | undefined
}

/**
 * Minimal IntersectionObserver wrapper behind the `[data-reveal]` CSS contract
 * in base.css. Elements start hidden and are revealed once they enter view.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: InViewOptions = {},
): [RefObject<T>, boolean] {
  const { once = true, threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Without observer support the content should simply be visible.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [once, threshold, rootMargin])

  return [ref, inView]
}
