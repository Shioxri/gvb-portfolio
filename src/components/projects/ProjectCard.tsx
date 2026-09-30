import { Link } from 'react-router-dom'
import { projectNumber, type Project } from '~/data/projects'
import { asset } from '~/lib/asset'
import { Arrow } from '~/components/ui/Arrow'
import styles from './ProjectCard.module.css'

type ProjectCardProps = {
  project: Project
  index: number
}

/** What goes in the fake address bar: the real place the project lives. */
function addressFor(project: Project): string {
  const url = project.liveUrl ?? project.repoUrl
  if (url) return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return `gvb / projects / ${project.slug}`
}

/**
 * The tile used on the full archive grid, drawn as a small browser window:
 * a title bar with window dots and an address, the screenshot as the page. The home page uses the denser
 * `ProjectList` row instead; a grid of these would be too heavy for a page
 * that also has to fit a hero and an about section above it.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link className={styles.card} to={`/projects/${project.slug}`}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.address}>{addressFor(project)}</span>
        <span className={styles.index}>{projectNumber(index)}</span>
      </div>

      <div className={styles.media}>
        {project.image ? (
          <img
            className={styles.image}
            src={asset(project.image)}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={styles.plate} aria-hidden="true">
            {project.shortTitle}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span>{project.category}</span>
          <span aria-hidden="true">/</span>
          <span>{project.context}</span>
        </p>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.stack}>
          {project.stack.slice(0, 3).map((item) => (
            <li key={item} className={styles.tag}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Arrow className={styles.chevron} />
    </Link>
  )
}
