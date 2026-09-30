import { useCallback, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Ambient } from '~/components/layout/Ambient'
import { Preloader } from '~/components/layout/Preloader'
import { ScrollManager } from '~/components/layout/ScrollManager'
import { SiteFooter } from '~/components/layout/SiteFooter'
import { SiteHeader } from '~/components/layout/SiteHeader'
import { useLockBodyScroll } from '~/hooks/useLockBodyScroll'
import { IntroContext, markIntroPlayed, shouldPlayIntro } from '~/lib/intro'
import HomePage from '~/routes/HomePage'
import NotFoundPage from '~/routes/NotFoundPage'
import ProjectPage from '~/routes/ProjectPage'
import ProjectsPage from '~/routes/ProjectsPage'
import styles from './App.module.css'

export default function App() {
  const location = useLocation()

  // Read once on mount: the intro is a property of this visit, not of state
  // that should change underneath a running animation.
  const [playingIntro, setPlayingIntro] = useState(shouldPlayIntro)

  useLockBodyScroll(playingIntro)

  const onIntroFinished = useCallback(() => {
    markIntroPlayed()
    setPlayingIntro(false)
  }, [])

  return (
    <IntroContext.Provider value={!playingIntro}>
      <Ambient />
      <ScrollManager />
      {playingIntro ? <Preloader onFinished={onIntroFinished} /> : null}

      <div className={styles.app}>
        <SiteHeader />

        <main className={styles.main} id="main">
          <div className={styles.page} key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>

        <SiteFooter />
      </div>
    </IntroContext.Provider>
  )
}
