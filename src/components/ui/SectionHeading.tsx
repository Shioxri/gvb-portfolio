import { type ReactNode } from 'react'
import { Reveal } from './Reveal'
import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  /** Right-hand counter, e.g. "01 / 07". */
  counter?: string | undefined
  children?: ReactNode | undefined
  /** A link or button directly under the title, e.g. "See all projects". */
  action?: ReactNode | undefined
}

export function SectionHeading({ eyebrow, title, counter, children, action }: SectionHeadingProps) {
  return (
    <Reveal className={styles.head}>
      <div className={styles.label}>
        <span className="eyebrow">{eyebrow}</span>
        {counter ? <span className={styles.counter}>{counter}</span> : null}
      </div>
      <h2 className={styles.title}>{title}</h2>
      {action ? <div className={styles.action}>{action}</div> : null}
      {children ? <p className={styles.lede}>{children}</p> : null}
    </Reveal>
  )
}
