import { site } from '~/data/site'
import { useFloatingOrb } from '~/hooks/useFloatingOrb'
import { asset } from '~/lib/asset'
import styles from './Portrait.module.css'

type Puff = {
  /** Centre, as a percentage of the aura box. */
  x: number
  y: number
  /** Diameter, as a percentage of the aura box. */
  size: number
  /** How far it wanders, in % of its own size. */
  dx: number
  dy: number
  /** Seconds per drift. Mismatched on purpose, so the outline never repeats. */
  duration: number
  delay: number
}

/*
 * The aura is a cloud of soft puffs clustered around the orb's rim. Each one
 * drifts and swells on its own clock, so the silhouette keeps billowing.
 */
const puffs: readonly Puff[] = [
  // Core: fills the middle so the cloud reads as a body, not a ring, when it
  // trails away from the orb.
  { x: 50, y: 50, size: 62, dx: 4, dy: -4, duration: 8, delay: -1.5 },
  { x: 42, y: 58, size: 44, dx: -8, dy: 6, duration: 6.8, delay: -4.5 },
  { x: 60, y: 42, size: 40, dx: 8, dy: -6, duration: 5.8, delay: -2.2 },
  { x: 28, y: 30, size: 46, dx: -10, dy: -8, duration: 5.5, delay: -2 },
  { x: 52, y: 18, size: 42, dx: 2, dy: -14, duration: 4.5, delay: -2.5 },
  { x: 74, y: 28, size: 46, dx: 12, dy: -10, duration: 6.5, delay: -4 },
  { x: 84, y: 52, size: 40, dx: 15, dy: 3, duration: 5, delay: -1 },
  { x: 72, y: 76, size: 46, dx: 10, dy: 12, duration: 7.5, delay: -3 },
  { x: 48, y: 84, size: 42, dx: -2, dy: 15, duration: 6.2, delay: -0.5 },
  { x: 26, y: 72, size: 46, dx: -12, dy: 10, duration: 6, delay: -5 },
  { x: 16, y: 50, size: 38, dx: -15, dy: -2, duration: 5.2, delay: -3.5 },
]

export function Portrait() {
  const orb = useFloatingOrb<HTMLDivElement>()

  return (
    <div className={styles.anchor}>
      {/* The aura is the orb's sibling, not its child: it stays put behind the
          orb's home spot while the orb itself drifts, gets pushed, or is dragged. */}
      <div className={styles.body}>
        <span className={styles.aura} aria-hidden="true">
          {puffs.map((puff) => (
            <span
              key={`${puff.x}-${puff.y}`}
              className={styles.puff}
              style={{
                '--x': `${puff.x}%`,
                '--y': `${puff.y}%`,
                '--size': `${puff.size}%`,
                '--dx': `${puff.dx}%`,
                '--dy': `${puff.dy}%`,
                '--duration': `${puff.duration}s`,
                '--delay': `${puff.delay}s`,
              }}
            />
          ))}
        </span>
        <div className={styles.orb} ref={orb}>
          <div className={styles.circle}>
            <img
              className={styles.photo}
              src={asset(site.portrait)}
              alt={`${site.name}, ${site.role}`}
              width={800}
              height={1000}
              decoding="async"
              draggable={false}
            />
          </div>
          <span className={styles.caption}>
            <span className={styles.dot} />
            {site.location}
          </span>
        </div>
      </div>

      <p className={styles.degree}>
        <span>BS Computer Science</span>
        <span>De La Salle University</span>
      </p>
    </div>
  )
}
