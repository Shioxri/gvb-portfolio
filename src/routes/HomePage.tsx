import { About } from '~/components/home/About'
import { Hero } from '~/components/home/Hero'
import { ProjectsSection } from '~/components/home/ProjectsSection'
import { site } from '~/data/site'
import { usePageMeta } from '~/hooks/usePageMeta'

export default function HomePage() {
  usePageMeta(
    site.name,
    `${site.name} (${site.nickname}) is a computer science student and software developer based in ${site.location}.`,
  )

  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
    </>
  )
}
