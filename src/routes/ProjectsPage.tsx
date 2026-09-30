import { Link } from 'react-router-dom'
import { projects } from '~/data/projects'
import { usePageMeta } from '~/hooks/usePageMeta'
import { Arrow } from '~/components/ui/Arrow'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { ProjectCard } from '~/components/projects/ProjectCard'
import { Reveal } from '~/components/ui/Reveal'
import styles from './ProjectsPage.module.css'

export default function ProjectsPage() {
  usePageMeta(
    'Projects',
    'Every project Gerard Vito Belardo has built: coursework, team builds and personal experiments.',
  )

  return (
    <div className={styles.page}>
      <div className="shell">
        <Link className={styles.back} to="/">
          <Arrow direction="left" />
          Back to home
        </Link>

        <SectionHeading
          eyebrow="Archive"
          title="Everything I've built, highlights first."
          counter={`${String(projects.length).padStart(2, '0')} total`}
        >
          A mix of coursework from De La Salle University, a couple of team projects, and a few
          personal experiments. Open any of them for more detail.
        </SectionHeading>

        <ul className={styles.grid}>
          {projects.map((project, index) => (
            <Reveal
              as="li"
              key={project.slug}
              className={styles.cell}
              delay={Math.min(index, 8) * 55}
            >
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  )
}
