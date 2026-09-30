import { useTheme } from '~/hooks/useTheme'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className={styles.toggle}
      data-theme={theme}
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <svg
        className={`${styles.icon} ${styles.moon}`}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" />
      </svg>

      <svg
        className={`${styles.icon} ${styles.sun}`}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="3.6" />
        <path d="M10 1.5v1.8M10 16.7v1.8M18.5 10h-1.8M3.3 10H1.5M16 4l-1.3 1.3M5.3 14.7 4 16M16 16l-1.3-1.3M5.3 5.3 4 4" />
      </svg>
    </button>
  )
}
