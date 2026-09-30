export const site = {
  name: 'Gerard Vito Belardo',
  shortName: 'GVB',
  nickname: 'Troy',
  role: 'Software Developer',
  location: 'Manila, Philippines',
  email: 'gv.belardo@gmail.com',
  github: 'https://github.com/Shioxri',
  linkedin: 'https://www.linkedin.com/in/gvbelardo/',
  resume: 'assets/about/Belardo_GerardVito_Resume.pdf',
  portrait: 'assets/hero/heroNewImg.jpg',
} as const

export type ResumeVariant = {
  label: string
  file: string
}

/** Role-specific cuts of the resume, offered under the main download. */
export const resumeVariants: readonly ResumeVariant[] = [
  { label: 'Backend', file: 'assets/about/Belardo_GerardVito_Resume_Backend.pdf' },
  { label: 'Data', file: 'assets/about/Belardo_GerardVito_Resume_Data.pdf' },
  { label: 'Frontend', file: 'assets/about/Belardo_GerardVito_Resume_Frontend.pdf' },
]

export type NavItem = {
  label: string
  /** Section id on the home page. */
  section: string
}

export const navItems: readonly NavItem[] = [
  { label: 'About', section: 'about' },
  { label: 'Projects', section: 'projects' },
  { label: 'Contact', section: 'contact' },
]

/**
 * The nav on the project pages. `home` and `projects` are routes there rather
 * than sections; `contact` is still the footer, which every page has.
 */
export const pageNavItems: readonly NavItem[] = [
  { label: 'Home', section: 'home' },
  { label: 'Projects', section: 'projects' },
  { label: 'Contact', section: 'contact' },
]
