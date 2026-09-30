import { type ElementType, type ReactNode } from 'react'
import { useInView } from '~/hooks/useInView'

type RevealProps = {
  children: ReactNode
  /** Stagger in milliseconds. */
  delay?: number | undefined
  as?: ElementType | undefined
  className?: string | undefined
}

/**
 * Reveals its child when it scrolls into view. The animation itself lives in
 * the `[data-reveal]` rule in base.css, so this only owns the timing.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal=""
      data-revealed={inView ? 'true' : 'false'}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
