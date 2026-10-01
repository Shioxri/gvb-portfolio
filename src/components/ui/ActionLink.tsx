import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from './Arrow'
import styles from './ActionLink.module.css'

type Variant = 'outline' | 'solid' | 'quiet'
type Shape = 'pill' | 'sharp'

type CommonProps = {
  children: ReactNode
  variant?: Variant | undefined
  /** Pill by default; sharp trades the round ends for near-square corners. */
  shape?: Shape | undefined
  /** Hidden by default on the quiet variant, where the rule does the work. */
  showArrow?: boolean | undefined
  className?: string | undefined
}

type ActionLinkProps = CommonProps &
  (
    | { to: string; href?: never; onClick?: never }
    | { href: string; to?: never; onClick?: never; download?: string }
    | { onClick: () => void; to?: never; href?: never }
  )

/**
 * The single call-to-action element on the site. It renders as a router link,
 * an anchor or a button depending on what it is given, so the styling stays in
 * one place while the semantics stay correct.
 */
export function ActionLink({
  children,
  variant = 'outline',
  shape = 'pill',
  showArrow = true,
  className,
  ...rest
}: ActionLinkProps) {
  const isExternal = 'href' in rest && typeof rest.href === 'string' && /^https?:/.test(rest.href)

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {showArrow ? (
        <Arrow className={styles.arrow} direction={isExternal ? 'out' : 'right'} />
      ) : null}
    </>
  )

  const shared = {
    className: [styles.link, className].filter(Boolean).join(' '),
    'data-variant': variant,
    'data-shape': shape,
    'data-external': isExternal ? 'true' : 'false',
  }

  if ('to' in rest && rest.to) {
    return (
      <Link {...shared} to={rest.to}>
        {content}
      </Link>
    )
  }

  if ('href' in rest && rest.href) {
    return (
      <a
        {...shared}
        href={rest.href}
        {...(rest.download ? { download: rest.download } : {})}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button {...shared} type="button" onClick={rest.onClick}>
      {content}
    </button>
  )
}
