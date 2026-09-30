export type Skill = {
  name: string
  /** Path under `public/`. Concepts with no logo (RAG, CI/CD) leave it out. */
  icon?: string | undefined
  /** Dark single-colour logo that needs flipping in dark mode to stay visible. */
  mono?: boolean | undefined
}

export type SkillGroup = {
  title: string
  items: readonly Skill[]
}

/** Mirrors the skills section of the general resume. */
export const skillGroups: readonly SkillGroup[] = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', icon: 'assets/skills/python.svg' },
      { name: 'JavaScript', icon: 'assets/skills/javascript.svg' },
      { name: 'TypeScript', icon: 'assets/skills/typescript.svg' },
      { name: 'Java', icon: 'assets/skills/java.svg' },
      { name: 'C', icon: 'assets/skills/c.svg' },
      { name: 'C++', icon: 'assets/skills/cplusplus.svg' },
      { name: 'Kotlin', icon: 'assets/skills/kotlin.svg' },
      { name: 'Ruby', icon: 'assets/skills/ruby.svg' },
    ],
  },
  {
    title: 'Web',
    items: [
      { name: 'React', icon: 'assets/skills/react.svg' },
      { name: 'Node.js', icon: 'assets/skills/node.svg' },
      { name: 'Express.js', icon: 'assets/skills/express.svg', mono: true },
      { name: 'PostgreSQL', icon: 'assets/skills/postgresql.svg' },
      { name: 'MongoDB', icon: 'assets/skills/mongodb.svg' },
      { name: 'MySQL', icon: 'assets/skills/mysql.svg', mono: true },
      { name: 'Prisma', icon: 'assets/skills/prisma.svg', mono: true },
      { name: 'Supabase', icon: 'assets/skills/supabase.svg' },
    ],
  },
  {
    title: 'AI / Data',
    items: [
      { name: 'RAG' },
      { name: 'Embeddings' },
      { name: 'LLM APIs' },
      { name: 'PineconeDB' },
      { name: 'Hugging Face', icon: 'assets/skills/huggingface.svg' },
      { name: 'Google Generative AI', icon: 'assets/skills/googlegemini.svg' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', icon: 'assets/skills/git.svg' },
      { name: 'Docker', icon: 'assets/skills/docker.svg' },
      { name: 'GitHub Actions', icon: 'assets/skills/githubactions.svg' },
      { name: 'CI/CD' },
      { name: 'Jest', icon: 'assets/skills/jest.svg' },
      { name: 'Playwright', icon: 'assets/skills/playwright.svg' },
    ],
  },
]
