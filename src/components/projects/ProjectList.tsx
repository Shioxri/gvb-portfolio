import { Link } from 'react-router-dom'
import { projectNumber, type Project } from '~/data/projects'
import { asset } from '~/lib/asset'
import { Arrow } from '~/components/ui/Arrow'
import { Reveal } from '~/components/ui/Reveal'
import styles from './ProjectList.module.css'

type ProjectListProps = {
  projects: readonly Project[]
  /** Numbering continues from the full catalogue, not the visible subset. */
  offset?: number | undefined
}

export function ProjectList({ projects, offset = 0 }: ProjectListProps) {
  return (
    <ul className={styles.list}>
      {projects.map((project, index) => (
        <Reveal
          as="li"
          key={project.slug}
          className={styles.item}
          delay={Math.min(index, 4) * 70}
        >
          <Link className={styles.row} to={`/projects/${project.slug}`}>
            <span className={styles.number}>{projectNumber(offset + index)}</span>

            <div className={styles.thumb}>
              {project.image ? (
                <img
                  className={styles.thumbImage}
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

            <div className={styles.text}>
              <p className={styles.meta}>
                <span>{project.category}</span>
                <span aria-hidden="true">/</span>
                <span>{project.context}</span>
              </p>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>
              <ul className={styles.stack}>
                {project.stack.slice(0, 4).map((item) => (
                  <li key={item} className={styles.tag}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Arrow className={styles.chevron} />
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
