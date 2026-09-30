import { usePageMeta } from '~/hooks/usePageMeta'
import { ActionLink } from '~/components/ui/ActionLink'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  usePageMeta('Page not found')

  return (
    <div className={styles.page}>
      <div className="shell">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>That page isn&apos;t here.</h1>
        <p className={styles.lede}>
          The link may be out of date, or the page may have moved. The project archive is
          probably what you were after.
        </p>
        <div className={styles.actions}>
          <ActionLink variant="solid" to="/projects">
            Browse the projects
          </ActionLink>
          <ActionLink to="/" showArrow={false}>
            Back to home
          </ActionLink>
        </div>
      </div>
    </div>
  )
}
