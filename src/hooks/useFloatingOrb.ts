import { useEffect, useRef, type RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

/** Radius of the idle drift, in px. */
const ORBIT = 12
/** Pull back toward the drift path while idling. */
const SPRING = 0.014
/** Velocity kept per frame while idling. */
const DAMPING = 0.9
/**
 * After a release: a stiffer, bouncier spring, like letting go of a rubber
 * band. Roughly 0.35 damping ratio, so it overshoots once or twice and settles
 * in well under a second.
 */
const RETURN_SPRING = 0.055
const RETURN_DAMPING = 0.86
/** How far past the orb's edge the cursor starts to push, in px. */
const PUSH_REACH = 150
/** Peak push acceleration when the cursor is right at the edge. */
const PUSH_FORCE = 2.6
/** Furthest the orb may be pushed or dragged from home, in px. */
const MAX_OFFSET = 240

type Vec = { x: number; y: number }

/**
 * Drives a draggable, floating orb with a small spring simulation:
 *
 * - at rest it drifts along a slow Lissajous loop around its home spot,
 * - a nearby mouse pushes it away, harder the closer it gets,
 * - it can be grabbed and thrown, and springs back once released.
 *
 * The position is written straight to the element's transform each frame,
 * and `--energy` (0–1, from speed) is exposed for CSS. The loop parks itself
 * while the orb is off screen.
 */
export function useFloatingOrb<T extends HTMLElement = HTMLDivElement>(): RefObject<T> {
  const orbRef = useRef<T>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = orbRef.current
    if (!element || reducedMotion) return

    const pos: Vec = { x: 0, y: 0 }
    const vel: Vec = { x: 0, y: 0 }
    const grab: Vec = { x: 0, y: 0 }
    const lastDragPos: Vec = { x: 0, y: 0 }
    let mouse: Vec | null = null
    let dragging = false
    // Set on release and cleared once the orb has settled back into its
    // drift. The cursor's push is off meanwhile: it is still sitting right on
    // top of the orb, and pushing there is what made the release stall.
    let returning = false
    let dragPointer = -1
    let time = 0
    let last = performance.now()
    let frame = 0

    /** Centre of the orb's resting box, ignoring the offset we applied. */
    const home = () => {
      const box = element.getBoundingClientRect()
      return {
        x: box.left + box.width / 2 - pos.x,
        y: box.top + box.height / 2 - pos.y,
        radius: box.width / 2,
      }
    }

    const clampOffset = () => {
      const length = Math.hypot(pos.x, pos.y)
      if (length > MAX_OFFSET) {
        pos.x *= MAX_OFFSET / length
        pos.y *= MAX_OFFSET / length
      }
    }

    const render = (now: number) => {
      // Normalise to 60fps steps so high refresh rates do not speed it up.
      const step = Math.min((now - last) / (1000 / 60), 3)
      last = now
      time += step / 60

      if (dragging) {
        // Velocity is measured per frame, smoothed, so a release after
        // holding still throws nothing and a flick throws with its real speed.
        vel.x = vel.x * 0.5 + (pos.x - lastDragPos.x) * 0.5
        vel.y = vel.y * 0.5 + (pos.y - lastDragPos.y) * 0.5
        lastDragPos.x = pos.x
        lastDragPos.y = pos.y
      } else {
        const target = {
          x: Math.cos(time * 0.55) * ORBIT,
          y: Math.sin(time * 0.8) * ORBIT * 0.75,
        }
        const spring = returning ? RETURN_SPRING : SPRING
        const damping = returning ? RETURN_DAMPING : DAMPING
        let ax = (target.x - pos.x) * spring
        let ay = (target.y - pos.y) * spring

        if (returning) {
          const settled =
            Math.hypot(target.x - pos.x, target.y - pos.y) < 1.5 &&
            Math.hypot(vel.x, vel.y) < 0.3
          if (settled) returning = false
        } else if (mouse) {
          const origin = home()
          const dx = origin.x + pos.x - mouse.x
          const dy = origin.y + pos.y - mouse.y
          const distance = Math.hypot(dx, dy) || 1
          const reach = origin.radius + PUSH_REACH
          if (distance < reach) {
            const strength = (1 - distance / reach) ** 2 * PUSH_FORCE
            ax += (dx / distance) * strength
            ay += (dy / distance) * strength
          }
        }

        vel.x = (vel.x + ax * step) * damping ** step
        vel.y = (vel.y + ay * step) * damping ** step
        pos.x += vel.x * step
        pos.y += vel.y * step
        clampOffset()
      }

      const speed = Math.hypot(vel.x, vel.y)
      const tilt = Math.max(-8, Math.min(8, vel.x * 0.7))
      element.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg)`
      element.style.setProperty('--energy', Math.min(speed / 10, 1).toFixed(3))

      frame = requestAnimationFrame(render)
    }

    const start = () => {
      if (frame) return
      last = performance.now()
      frame = requestAnimationFrame(render)
    }

    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerDown = (event: PointerEvent) => {
      // Touch keeps scrolling the page; only mouse and pen can grab the orb.
      if (event.pointerType === 'touch' || event.button !== 0) return
      event.preventDefault()
      dragging = true
      dragPointer = event.pointerId
      grab.x = event.clientX - pos.x
      grab.y = event.clientY - pos.y
      vel.x = 0
      vel.y = 0
      lastDragPos.x = pos.x
      lastDragPos.y = pos.y
      returning = false
      element.setPointerCapture(event.pointerId)
      element.dataset.dragging = 'true'
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') mouse = { x: event.clientX, y: event.clientY }
      if (!dragging || event.pointerId !== dragPointer) return
      pos.x = event.clientX - grab.x
      pos.y = event.clientY - grab.y
      clampOffset()
    }

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== dragPointer) return
      dragging = false
      dragPointer = -1
      returning = true
      delete element.dataset.dragging
    }

    const onLeave = () => {
      mouse = null
    }

    // No point simulating an orb nobody can see.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start()
      else stop()
    })
    observer.observe(element)

    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointerup', onPointerUp)
    element.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      stop()
      observer.disconnect()
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointerup', onPointerUp)
      element.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onLeave)
      element.style.removeProperty('transform')
      element.style.removeProperty('--energy')
      delete element.dataset.dragging
    }
  }, [reducedMotion])

  return orbRef
}
