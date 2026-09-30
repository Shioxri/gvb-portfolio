/**
 * Resolves a path inside `public/` against the deployed base path, so the site
 * keeps working when it is served from a sub-directory.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
