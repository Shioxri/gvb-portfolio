import { education } from '~/data/education'
import { roles } from '~/data/experience'
import { skillGroups } from '~/data/skills'
import { asset } from '~/lib/asset'
import { Arrow } from '~/components/ui/Arrow'
import { Disclosure } from '~/components/ui/Disclosure'
import { Reveal } from '~/components/ui/Reveal'
import styles from './About.module.css'

const skillCount = skillGroups.reduce((total, group) => total + group.items.length, 0)

export function About() {
  return (
    <section className={styles.section} id="about">
      <div className="shell">
        <Reveal className={styles.header}>
          <span className="eyebrow">About</span>
        </Reveal>

        <Reveal delay={80}>
          <Disclosure title="Education" hint={`${education.length} entries`} defaultOpen>
            <div className={styles.entries}>
              {education.map((entry) => (
                <article key={entry.institution} className={styles.entry}>
                  <img
                    className={styles.logo}
                    src={asset(entry.logo)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <a
                      className={styles.entryLink}
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <h4 className={styles.institution}>{entry.institution}</h4>
                      <Arrow direction="out" />
                    </a>
                    <p className={styles.qualification}>{entry.qualification}</p>
                    <p className={styles.period}>{entry.period}</p>
                    <ul className={styles.notes}>
                      {entry.notes.map((note) => (
                        <li key={note} className={styles.note}>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Disclosure>

          <Disclosure
            title="Experience"
            hint={
              roles.length > 0
                ? `${roles.length} ${roles.length === 1 ? 'role' : 'roles'}`
                : 'None yet'
            }
          >
            {roles.length > 0 ? (
              <div className={styles.entries}>
                {roles.map((role) => (
                  <article key={`${role.organisation}-${role.title}`} className={styles.entry}>
                    {role.logo ? (
                      <img
                        className={styles.logo}
                        src={asset(role.logo)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span aria-hidden="true" />
                    )}
                    <div>
                      {role.url ? (
                        <a
                          className={styles.entryLink}
                          href={role.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <h4 className={styles.institution}>{role.organisation}</h4>
                          <Arrow direction="out" />
                        </a>
                      ) : (
                        <h4 className={styles.institution}>{role.organisation}</h4>
                      )}
                      <p className={styles.qualification}>{role.title}</p>
                      <p className={styles.period}>
                        {role.period} · {role.kind}
                      </p>
                      <ul className={styles.points}>
                        {role.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className={styles.empty}>
                Nothing here yet. I&apos;m still an undergrad, so the projects below are the best
                picture of what I can do right now.
              </p>
            )}
          </Disclosure>

          <Disclosure title="Skills" hint={`${skillCount} total`}>
            <div className={styles.groups}>
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h4 className={styles.groupTitle}>{group.title}</h4>
                  <ul className={styles.skills}>
                    {group.items.map((skill) => (
                      <li key={skill.name} className={styles.skill}>
                        {skill.icon ? (
                          <img
                            className={styles.skillIcon}
                            data-mono={skill.mono ? 'true' : undefined}
                            src={asset(skill.icon)}
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span className={styles.skillGlyph} aria-hidden="true" />
                        )}
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Disclosure>
        </Reveal>
      </div>
    </section>
  )
}
