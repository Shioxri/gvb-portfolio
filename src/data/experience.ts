export type Role = {
  title: string
  organisation: string
  /** e.g. "June 2025 - Aug 2025" */
  period: string
  /** Employment type or setting, e.g. "Internship · Remote". */
  kind: string
  /** What you actually did. Two or three lines is plenty. */
  points: readonly string[]
  url?: string
  /** Path under `public/`. */
  logo?: string
}

/** Reverse-chronological. The section's count and empty state follow from this array. */
export const roles: readonly Role[] = [
  {
    title: 'Software Engineering Intern',
    organisation: 'Springboard Philippines',
    period: 'May 2026 - July 2026',
    kind: 'Internship · Manila, PH (Hybrid)',
    points: [
      'Designed the PostgreSQL schema and the 28 controllers behind LEDGR, a double-entry accounting system with six journal types, invoicing, and a catalogue of around sixty reports, with account balances kept in sync by Postgres triggers.',
      'Built the Discord ingestion pipeline and RAG chatbot backend for HopSpring, covering scraping, chat, summaries, DMs, and scheduled digests, with image captioning and a Pinecone vector store.',
      'Built the backend for CompassDesk, an AI-assisted ticketing platform where the AI handles simple tickets in real time and escalates the rest to a human agent.',
    ],
    url: 'https://springboard.com.ph/',
    logo: 'assets/about/springboard.svg',
  },
]
