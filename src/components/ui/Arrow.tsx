type ArrowProps = {
  /** 'right' for in-page movement, 'out' for links that leave the site. */
  direction?: 'right' | 'left' | 'out' | 'down' | undefined
  className?: string | undefined
}

const PATHS: Record<NonNullable<ArrowProps['direction']>, string> = {
  right: 'M3 10h14M12 5l5 5-5 5',
  left: 'M17 10H3M8 5l-5 5 5 5',
  out: 'M6 14L14 6M7 6h7v7',
  down: 'M10 3v14M5 12l5 5 5-5',
}

export function Arrow({ direction = 'right', className }: ArrowProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[direction]} />
    </svg>
  )
}
