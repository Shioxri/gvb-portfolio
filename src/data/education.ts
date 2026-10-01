export type Education = {
  institution: string
  qualification: string
  period: string
  notes: readonly string[]
  logo: string
  url: string
}

export const education: readonly Education[] = [
  {
    institution: 'De La Salle University Manila',
    qualification: 'BS Computer Science, major in Software Technology',
    period: 'Sept 2022 - Dec 2026 (expected)',
    notes: ['Magna Cum Laude', '3.688 CGPA', 'Consistent Dean’s Lister', 'DOST MERIT Scholar'],
    logo: 'assets/about/dlsu.svg',
    url: 'https://www.dlsu.edu.ph',
  },
  {
    institution: 'Cavite Institute',
    qualification: 'Elisea School of Creative Learning, STEM strand',
    period: 'June 2007 - July 2022',
    notes: [
      'Pre-school through senior high school',
      'Consistent High Honors',
      'Graduated With High Honors',
      'Best Researcher Award',
    ],
    logo: 'assets/about/ci.svg',
    url: 'http://www.caviteinstitute.edu.ph',
  },
]
