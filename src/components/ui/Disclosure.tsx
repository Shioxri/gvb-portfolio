import { useId, useState, type ReactNode } from 'react'
import styles from './Disclosure.module.css'

type DisclosureProps = {
  title: string
  /** Short summary shown on the trigger, e.g. a count. */
  hint?: string | undefined
  defaultOpen?: boolean | undefined
  children: ReactNode
}

export function Disclosure({ title, hint, defaultOpen = false, children }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <div className={styles.row} data-open={open ? 'true' : 'false'}>
      <h3>
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen((value) => !value)
          }}
        >
          <span className={styles.title}>{title}</span>
          <span className={styles.hint}>
            {hint ? <span>{hint}</span> : null}
            <span className={styles.glyph} aria-hidden="true" />
          </span>
        </button>
      </h3>

      {/* Kept in the DOM so the panel can animate, and hidden from assistive
          tech and tab order while it is closed. */}
      <div className={styles.panel} id={panelId} inert={open ? undefined : ''}>
        <div className={styles.panelInner}>
          <div className={styles.panelBody}>{children}</div>
        </div>
      </div>
    </div>
  )
}
