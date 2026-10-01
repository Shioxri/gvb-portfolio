import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navItems, pageNavItems, site } from '~/data/site'
import { useActiveSection } from '~/hooks/useActiveSection'
import { useLockBodyScroll } from '~/hooks/useLockBodyScroll'
import { useScrollState } from '~/hooks/useScrollState'
import { scrollToSection, scrollToTop } from '~/lib/scroll'
import { ThemeToggle } from './ThemeToggle'
import styles from './SiteHeader.module.css'

const SECTION_IDS = navItems.map((item) => item.section)
const FOOTER_IDS = ['contact']

/**
 * "Gerard Vito Belardo" as [initial, rest] pairs for the collapsing wordmark.
 * The word gap rides at the end of each rest, so it folds away with it.
 */
const NAME_PARTS = site.name
  .split(' ')
  .map((word, index, words) => [
    word.charAt(0),
    word.slice(1) + (index < words.length - 1 ? ' ' : ''),
  ] as const)

type Box = { x: number; width: number }

/** The segmented control's thumb while it is being dragged. */
type Drag = {
  pointerId: number
  startX: number
  lastX: number
  moved: boolean
  /** Thumb box, in px from the nav's left edge. */
  x: number
  width: number
  /** Horizontal stretch from drag speed, 1 at rest. */
  stretch: number
}

/** How long a tapped section holds the thumb while the page scrolls to it. */
const PENDING_MS = 1400

export function SiteHeader() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onHome = pathname === '/'

  const { docked, progress } = useScrollState()
  const items = onHome ? navItems : pageNavItems
  const scrolledSection = useActiveSection(SECTION_IDS, onHome)
  // Off the home page the only section to spy on is the footer; otherwise the
  // route decides, and the archive and every case study live under Projects.
  const footerInView = useActiveSection(FOOTER_IDS, !onHome) === 'contact'
  const activeSection = onHome
    ? scrolledSection
    : footerInView
      ? 'contact'
      : pathname.startsWith('/projects')
        ? 'projects'
        : null

  const [menuOpen, setMenuOpen] = useState(false)

  useLockBodyScroll(menuOpen)

  // Close the panel whenever the route changes underneath it.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef(new Map<string, HTMLElement>())
  const [boxes, setBoxes] = useState<ReadonlyMap<string, Box>>(new Map())
  const [drag, setDrag] = useState<Drag | null>(null)
  const dragRef = useRef<Drag | null>(null)
  // A tapped section holds the thumb while the page scrolls to it, so it does
  // not flick back through the sections it passes on the way.
  const [pending, setPending] = useState<string | null>(null)
  // Pointer releases already select; this stops the click that follows from
  // selecting twice, while keyboard clicks still go through.
  const suppressClickUntil = useRef(0)

  const registerItem = useCallback((section: string, node: HTMLElement | null) => {
    if (node) itemRefs.current.set(section, node)
    else itemRefs.current.delete(section)
  }, [])

  const measure = useCallback(() => {
    const next = new Map<string, Box>()
    for (const [section, node] of itemRefs.current) {
      next.set(section, { x: node.offsetLeft, width: node.offsetWidth })
    }
    setBoxes(next)
  }, [])

  // Measured synchronously: the docked transition changes the bar height, and
  // a frame of the thumb sitting at a stale offset is very visible.
  // Also re-measured when the item set swaps between the home and page navs.
  useLayoutEffect(measure, [measure, docked, onHome])

  useEffect(() => {
    if (!pending) return
    if (activeSection === pending) {
      setPending(null)
      return
    }
    const timer = window.setTimeout(() => {
      setPending(null)
    }, PENDING_MS)
    return () => {
      window.clearTimeout(timer)
    }
  }, [pending, activeSection])

  useEffect(() => {
    const nav = navRef.current
    if (!nav || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(nav)
    return () => {
      observer.disconnect()
    }
  }, [measure])

  const goToSection = useCallback(
    (section: string) => {
      setMenuOpen(false)
      if (onHome) {
        setPending(section)
        scrollToSection(section)
        window.history.replaceState(null, '', `#${section}`)
        return
      }

      // Project pages: Home is the only route change. Projects is the page
      // you're already on, so it scrolls back to the top, and Contact scrolls
      // to this page's own footer.
      if (section === 'contact') {
        setPending('contact')
        scrollToSection('contact')
      } else if (section === 'home') {
        navigate('/')
      } else {
        setPending('projects')
        scrollToTop()
      }
    },
    [onHome, navigate],
  )

  /** The segment whose centre is closest to `centre` (px from the nav's left). */
  const nearestSection = (centre: number): string | null => {
    let best: string | null = null
    let bestDistance = Infinity
    for (const [section, box] of boxes) {
      const distance = Math.abs(box.x + box.width / 2 - centre)
      if (distance < bestDistance) {
        best = section
        bestDistance = distance
      }
    }
    return best
  }

  const onNavPointerDown = (event: PointerEvent<HTMLElement>) => {
    const nav = navRef.current
    if (!nav || event.button !== 0) return
    const left = nav.getBoundingClientRect().left
    const under = nearestSection(event.clientX - left)
    const current = boxes.get(pending ?? activeSection ?? '') ?? (under ? boxes.get(under) : undefined)
    if (!current) return

    nav.setPointerCapture(event.pointerId)
    const next: Drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      moved: false,
      x: current.x,
      width: current.width,
      stretch: 1,
    }
    dragRef.current = next
    setDrag(next)
  }

  const onNavPointerMove = (event: PointerEvent<HTMLElement>) => {
    const nav = navRef.current
    const state = dragRef.current
    if (!nav || !state || event.pointerId !== state.pointerId) return

    const moved = state.moved || Math.abs(event.clientX - state.startX) > 4
    if (!moved) return

    // The thumb's centre follows the pointer, clamped to the first and last
    // segment centres, and takes the width of whichever segment it is over.
    const all = [...boxes.values()]
    const first = all[0]
    const last = all[all.length - 1]
    if (!first || !last) return
    const left = nav.getBoundingClientRect().left
    const centre = Math.min(
      Math.max(event.clientX - left, first.x + first.width / 2),
      last.x + last.width / 2,
    )
    const over = boxes.get(nearestSection(centre) ?? '') ?? first
    const speed = Math.abs(event.clientX - state.lastX)

    const next: Drag = {
      ...state,
      moved: true,
      lastX: event.clientX,
      width: over.width,
      x: centre - over.width / 2,
      stretch: 1 + Math.min(speed * 0.012, 0.22),
    }
    dragRef.current = next
    setDrag(next)
  }

  const onNavPointerUp = (event: PointerEvent<HTMLElement>) => {
    const nav = navRef.current
    const state = dragRef.current
    if (!nav || !state || event.pointerId !== state.pointerId) return
    dragRef.current = null
    setDrag(null)
    suppressClickUntil.current = performance.now() + 400

    const centre = state.moved
      ? state.x + state.width / 2
      : event.clientX - nav.getBoundingClientRect().left
    const section = nearestSection(centre)
    if (section) goToSection(section)
  }

  const onNavPointerCancel = () => {
    dragRef.current = null
    setDrag(null)
  }

  const selected = pending ?? activeSection
  const resting = selected ? boxes.get(selected) : undefined
  const thumb = drag ?? (resting ? { ...resting, stretch: 1 } : null)

  const onBrandClick = (event: MouseEvent) => {
    if (!onHome) return
    event.preventDefault()
    scrollToTop()
    window.history.replaceState(null, '', '/')
  }

  return (
    <>
      <header className={styles.header} data-docked={docked ? 'true' : 'false'}>
        <a className={styles.skip} href="#main">
          Skip to content
        </a>

        <div className={styles.backdrop} aria-hidden="true" />
        <div
          className={styles.progress}
          style={{ '--progress': progress }}
          aria-hidden="true"
        />

        <div className={`shell ${styles.inner}`}>
          {/* Full name at the top of the page; once the bar docks, every
              letter but the initials folds away and GVB closes up. */}
          <Link className={styles.brand} to="/" onClick={onBrandClick} aria-label={site.name}>
            {NAME_PARTS.map(([initial, rest]) => (
              <span key={initial + rest} className={styles.namePart} aria-hidden="true">
                <span className={styles.initial}>{initial}</span>
                <span className={styles.rest}>
                  <span>{rest}</span>
                </span>
              </span>
            ))}
          </Link>

          {/* A segmented control in the style of iOS: the thumb springs to the
              current section, and can be pressed and dragged between them. */}
          <nav
            className={styles.nav}
            ref={navRef}
            aria-label="Sections"
            data-pressed={drag ? 'true' : 'false'}
            data-dragging={drag?.moved ? 'true' : 'false'}
            onPointerDown={onNavPointerDown}
            onPointerMove={onNavPointerMove}
            onPointerUp={onNavPointerUp}
            onPointerCancel={onNavPointerCancel}
          >
            <span
              className={styles.thumb}
              aria-hidden="true"
              style={{
                '--thumb-x': `${thumb?.x ?? 0}px`,
                '--thumb-width': `${thumb?.width ?? 0}px`,
                '--thumb-opacity': thumb ? 1 : 0,
                '--thumb-stretch': thumb?.stretch ?? 1,
              }}
            />

            {items.map((item) => (
              <button
                key={item.section}
                type="button"
                ref={(node) => {
                  registerItem(item.section, node)
                }}
                className={styles.navItem}
                data-active={selected === item.section ? 'true' : 'false'}
                aria-current={activeSection === item.section ? 'true' : undefined}
                onClick={() => {
                  if (performance.now() < suppressClickUntil.current) return
                  goToSection(item.section)
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => {
                setMenuOpen((open) => !open)
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        className={styles.panel}
        data-open={menuOpen ? 'true' : 'false'}
        inert={menuOpen ? undefined : ''}
      >
        {items.map((item, index) => (
          <button
            key={item.section}
            type="button"
            className={styles.panelItem}
            style={{ '--index': index }}
            onClick={() => {
              goToSection(item.section)
            }}
          >
            <span className={styles.panelIndex}>{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </button>
        ))}
      </div>
    </>
  )
}
