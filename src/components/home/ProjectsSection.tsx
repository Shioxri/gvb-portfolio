import { useState } from 'react'
import { featuredProjects, projects } from '~/data/projects'
import { ActionLink } from '~/components/ui/ActionLink'
import { ProjectList } from '~/components/projects/ProjectList'
import { Reveal } from '~/components/ui/Reveal'
import { SectionHeading } from '~/components/ui/SectionHeading'
import styles from './ProjectsSection.module.css'

/** Rows on first paint, before "Show more" is even an option. */
const INITIAL_COUNT = 4

export function ProjectsSection() {
  const [expanded, setExpanded] = useState(false)

  const canExpand = !expanded && featuredProjects.length > INITIAL_COUNT
  const visible = canExpand ? featuredProjects.slice(0, INITIAL_COUNT) : featuredProjects

  return (
    <section className={styles.section} id="projects">
      <div className="shell">
        <SectionHeading
          eyebrow="Projects"
          title="A running list of things I've built."
          counter={`${String(visible.length).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
          action={
            <ActionLink to="/projects" shape="sharp">
              See all {projects.length} projects
            </ActionLink>
          }
        >
          A mix of internship work, coursework, and a few things I built just to learn something
          new. Click into any of them for more on how it came together.
        </SectionHeading>

        <ProjectList projects={visible} />

        {/* The full archive is always one click away under the heading; this only
            widens the curated set without leaving the page. */}
        {canExpand ? (
          <Reveal className={styles.actions}>
            <ActionLink
              variant="quiet"
              showArrow={false}
              onClick={() => {
                setExpanded(true)
              }}
            >
              Show {featuredProjects.length - INITIAL_COUNT} more highlights
            </ActionLink>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
