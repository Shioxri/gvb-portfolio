import { resumeVariants, site } from '~/data/site'
import { useIntroReady } from '~/lib/intro'
import { asset } from '~/lib/asset'
import { scrollToSection } from '~/lib/scroll'
import { ActionLink } from '~/components/ui/ActionLink'
import { Arrow } from '~/components/ui/Arrow'
import { Portrait } from './Portrait'
import styles from './Hero.module.css'

export function Hero() {
  const ready = useIntroReady()

  return (
    <section className={styles.hero} data-ready={ready ? 'true' : 'false'}>
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={`eyebrow ${styles.eyebrow} ${styles.stage}`} style={{ '--index': 0 }}>
              <span>{site.role}</span>
              <span className={styles.eyebrowDot} aria-hidden="true">
                ·
              </span>
              <span>{site.location}</span>
            </p>

            <h1 className={`${styles.title} ${styles.stage}`} style={{ '--index': 1 }}>
              <span className={styles.name}>{site.name}</span>{' '}
              <span className={styles.predicate}>
                builds software that&apos;s meant to be used, not just demoed.
              </span>
            </h1>

            <div className={`${styles.lede} ${styles.stage}`} style={{ '--index': 2 }}>
              <p>
                I&apos;m {site.nickname}, a computer science student at De La Salle University
                majoring in software technology.
              </p>
              <p>
                I like building things that actually work, not just things that look good in a
                demo. Most of what&apos;s on this site started as coursework, a team project, or
                something I built to learn a new tool.
              </p>
            </div>

            <div className={`${styles.actions} ${styles.stage}`} style={{ '--index': 3 }}>
              <ActionLink
                variant="solid"
                href={asset(site.resume)}
                download="Gerard Vito Belardo - CV.pdf"
              >
                Download CV
              </ActionLink>
              <ActionLink href={`mailto:${site.email}`} showArrow={false}>
                Get in touch
              </ActionLink>
            </div>

            <p className={`${styles.variants} ${styles.stage}`} style={{ '--index': 3 }}>
              Also tailored for:{' '}
              {resumeVariants.map((variant, position) => (
                <span key={variant.file}>
                  {position > 0 ? <span aria-hidden="true"> · </span> : null}
                  <a
                    className={styles.variantLink}
                    href={asset(variant.file)}
                    download={`Gerard Vito Belardo - CV (${variant.label}).pdf`}
                  >
                    {variant.label}
                  </a>
                </span>
              ))}
            </p>
          </div>

          <div className={`${styles.portraitSlot} ${styles.stage}`} style={{ '--index': 2 }}>
            <Portrait />
          </div>
        </div>

        <div className={`${styles.rail} ${styles.stage}`} style={{ '--index': 4 }}>
          <button
            type="button"
            className={styles.scrollCue}
            onClick={() => {
              scrollToSection('about')
            }}
          >
            <Arrow direction="down" />
            Scroll for more
          </button>
        </div>
      </div>
    </section>
  )
}
