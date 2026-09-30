import styles from './Ambient.module.css'

export function Ambient() {
  return (
    <div className={styles.field} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.aura} ${styles.auraOne}`} />
      <div className={`${styles.aura} ${styles.auraTwo}`} />
      <div className={styles.grain} />
    </div>
  )
}
