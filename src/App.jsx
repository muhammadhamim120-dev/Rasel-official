import { useLang } from './i18n'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Reels from './components/Reels'
import Work from './components/Work'
import Process from './components/Process'
import Packages from './components/Packages'
import Contact from './components/Contact'
import AmbientProvider from './components/AmbientBackground'

export default function App() {
  const { t } = useLang()
  return (
    <AmbientProvider>
      <Nav />
      <main id="top">
        <Hero />
        <Services />
        <Packages />
        <Reels />
        <Work />
        <About />
        <Process />
        <Contact />
      </main>
      <footer>
        <div className="wrap">
          <a href="#top" className="footer-wordmark" aria-label="Back to top">rasel<span>↗</span></a>
          <p>{t('Cinematography · Aerial · Photography · Events', 'সিনেমাটোগ্রাফি · এরিয়াল · ফটোগ্রাফি · ইভেন্ট')}</p>
          <p style={{ marginTop: 8 }}>© {new Date().getFullYear()} Rasel. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}</p>
          <p style={{ marginTop: 8, fontSize: '.78rem', opacity: .7 }}>{t('Photos & films from', 'ছবি ও ফিল্ম')} <a href="https://www.facebook.com/raselofficialid" target="_blank" rel="noreferrer">Rasel Hossain ↗</a></p>
        </div>
      </footer>
    </AmbientProvider>
  )
}
