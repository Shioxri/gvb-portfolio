# gvb-portfolio

Personal portfolio for Gerard Vito Belardo. React 18 + TypeScript on Vite, CSS
Modules for styling, `react-router-dom` for the project pages. No UI or
animation libraries. The motion is hand-rolled so it can stay cheap and
consistent.

```bash
npm install
npm run dev        # vite dev server
npm run build      # tsc --build && vite build
npm run typecheck  # tsc only
npm run lint       # eslint, type-aware
```

## Layout

```
src/
  components/
    layout/    site chrome: header, footer, intro, theme toggle, background
    home/      the home page sections
    projects/  the shared project list, used by the home page and the archive
    ui/        small primitives: ActionLink, Disclosure, Reveal, SectionHeading
  data/        site copy, projects, skills, education, experience, typed, no JSON
  hooks/       scroll, pointer, theme and intersection behaviour
  lib/         asset paths, scroll helpers, intro state
  routes/      one file per route
  styles/      tokens.css (the design system) and base.css
```

Routes are `/`, `/projects`, and `/projects/:slug`.

## Content

Everything the site says lives in `src/data` and nothing else hard-codes it.

- **`projects.ts`**: append an entry and the home list, the archive, the
  case-study route and the prev/next pager all pick it up. Set
  `featured: true` to surface it on the home page.
- **`experience.ts`**: ships empty on purpose. Add roles in reverse
  chronological order and the Experience disclosure fills in; while it is
  empty the section shows an honest empty state rather than filler.
- **`education.ts`**, **`skills.ts`**, **`site.ts`**: the rest.

## Design system

`src/styles/tokens.css` holds the whole vocabulary. Five source colours carry
the site: `#e8f1f2` porcelain, `#b3efb2` pale mint, `#7a9e7e` sage, `#31493c`
pine, `#001a23` deep teal, with light using porcelain as the ground and dark
swapping it for deep teal.

Token names describe the **role**, not the hue, which is what lets one set of
components serve both themes: `--ink` is text, `--ground` is the page,
`--accent` is the text-safe accent and `--accent-hover` is its emphasis state
(darker in light, lighter in dark). No component reaches for a raw colour:
hover surfaces go through `--wash` / `--wash-strong`, depth through
`--shadow-*`, so retuning the site means editing that one file.

Two contrast notes, since the palette does not give them for free:

- `--accent` is `#44704f` in light rather than the palette's sage, which only
  reaches 2.8:1 on porcelain. The substitute sits between sage and pine at
  4.9:1.
- `--ink-faint`, used for the mono metadata, is tuned to 4.8:1 rather than the
  much lighter grey the reference design uses.

Motion is written against two conventions:

- **Durations and easings** come from `--dur*` / `--ease-*`. The reduced-motion
  media query collapses the durations to `1ms` in one place, so most components
  need no motion query of their own.
- **Scroll reveals** use the `[data-reveal]` / `[data-revealed]` attribute pair
  defined in `base.css`. The `Reveal` component only decides *when*; the CSS
  owns *what*.

## Notable behaviour

- **Theming**: light by default. An inline script in `index.html` stamps
  `data-theme` on the root before first paint, so there is no flash; the header
  toggle writes the choice to `localStorage` and `useTheme` keeps React in step
  rather than re-deciding. To follow the OS instead, default that script to
  `matchMedia('(prefers-color-scheme: dark)')`.
- **Header**: fixed, and docks on scroll. The panel slides down from above
  onto its own mint-tinted surface, the bar shrinks, the full name collapses,
  and a progress rule tracks the page. A pill follows hover while an accent
  rule tracks the section you are actually in, so the two never contradict
  each other.
- **Intro**: the counter is driven by real asset and font loading
  (`useAssetPreload`), not a fake timer, and it plays once per session.
- **Portrait**: `usePointerParallax` writes the cursor's position to CSS
  custom properties; the frame, the photo and the caption each consume them at
  different depths. The rAF loop parks itself when nothing is moving.

Everything above is disabled or reduced under `prefers-reduced-motion`.

## Assets

Static files live in `public/assets` and are referenced through `lib/asset.ts`,
which resolves them against `import.meta.env.BASE_URL` so a sub-path deploy
keeps working.

## Deploying

The router uses real paths, so the host must serve `index.html` for unknown
routes. `public/_redirects` covers Netlify and `vercel.json` covers Vercel. For
GitHub Pages you would additionally need `base` set in `vite.config.ts` and a
`404.html` copy of `index.html`.
