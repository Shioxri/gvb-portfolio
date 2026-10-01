import { Link, Navigate, useParams } from 'react-router-dom'
import { findProject, getNeighbours, projectNumber, projects } from '~/data/projects'
import { usePageMeta } from '~/hooks/usePageMeta'
import { ActionLink } from '~/components/ui/ActionLink'
import { Arrow } from '~/components/ui/Arrow'
import { Reveal } from '~/components/ui/Reveal'
import { Slideshow } from '~/components/projects/Slideshow'
import styles from './ProjectPage.module.css'

export default function ProjectPage() {
  const { slug } = useParams<'slug'>()
  const project = findProject(slug)

  // Hooks cannot be skipped, so the meta call happens before the redirect and
  // falls back to a neutral title for an unknown slug.
  usePageMeta(project?.title ?? 'Projects', project?.summary)

  if (!project) return <Navigate to="/projects" replace />

  const index = projects.indexOf(project)
  const { previous, next } = getNeighbours(project.slug)
  const slides = [
    ...(project.image ? [{ src: project.image, alt: `Screenshot from ${project.title}` }] : []),
    ...(project.gallery ?? []),
  ]

  return (
    <article className={styles.page}>
      <div className="shell">
        <Link className={styles.back} to="/projects">
          <Arrow direction="left" />
          All projects
        </Link>

        <header>
          <p className={styles.meta}>
            <span className={styles.number}>{projectNumber(index)}</span>
            <span>{project.category}</span>
            <span aria-hidden="true">/</span>
            <span>{project.context}</span>
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>

          {project.liveUrl || project.repoUrl ? (
            <div className={styles.actions}>
              {project.liveUrl ? (
                <ActionLink variant="solid" href={project.liveUrl}>
                  {project.liveLabel ?? 'Open the live site'}
                </ActionLink>
              ) : null}
              {project.repoUrl ? (
                <ActionLink variant={project.liveUrl ? 'outline' : 'solid'} href={project.repoUrl}>
                  View the repository
                </ActionLink>
              ) : null}
            </div>
          ) : null}
        </header>

        {slides.length ? (
          <Reveal className={styles.cover}>
            <Slideshow key={project.slug} slides={slides} label={`Screenshots from ${project.title}`} />
          </Reveal>
        ) : null}

        <div className={styles.body}>
          <Reveal className={styles.overview}>
            {project.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className={styles.aside} delay={90}>
            <dl className={styles.asideBlock}>
              <dt>Built with</dt>
              <dd>
                <ul className={styles.stack}>
                  {project.stack.map((item) => (
                    <li key={item} className={styles.tag}>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            <dl className={styles.asideBlock}>
              <dt>Context</dt>
              <dd>{project.context}</dd>
            </dl>

            <dl className={styles.asideBlock}>
              <dt>Discipline</dt>
              <dd>{project.category}</dd>
            </dl>
          </Reveal>
        </div>

        <section className={styles.highlights}>
          <Reveal>
            <h2 className={styles.highlightsTitle}>Highlights</h2>
          </Reveal>
          <ul className={styles.highlightList}>
            {project.highlights.map((highlight, position) => (
              <Reveal
                as="li"
                key={highlight.label}
                className={styles.highlight}
                delay={Math.min(position, 3) * 70}
              >
                <span className={styles.highlightIndex}>
                  {String(position + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.highlightLabel}>{highlight.label}</h3>
                <p className={styles.highlightBody}>{highlight.body}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <nav className={styles.pager} aria-label="Other projects">
          {previous ? (
            <Link className={styles.pagerLink} to={`/projects/${previous.slug}`} style={{ '--nudge': '-4px' }}>
              <span className={styles.pagerLabel}>
                <Arrow direction="left" />
                Previous
              </span>
              <span className={styles.pagerTitle}>{previous.shortTitle}</span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link className={styles.pagerLink} to={`/projects/${next.slug}`} data-align="end">
              <span className={styles.pagerLabel}>
                Next
                <Arrow direction="right" />
              </span>
              <span className={styles.pagerTitle}>{next.shortTitle}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  )
}
