import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { HERO_REEL } from '../data'
import GlassIcon from './GlassIcon'
import { useAmbientMotion } from './AmbientBackground'

export default function Hero() {
  const { t } = useLang()
  const dialog = useRef(null)
  const { motion, setMotion } = useAmbientMotion()
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [playing])
  const openFilm = () => { setPlaying(true); dialog.current.showModal() }
  const closeFilm = () => { dialog.current.close(); setPlaying(false) }
  return <>
    <section className="cinema-hero" aria-labelledby="hero-title">
      <div className="wrap glass-hero-layout">
        <div className="cinema-copy">
          <span className="hero-pill"><GlassIcon name="camera"/>{t('Photo. Film. A different feeling.', 'ছবি। ফিল্ম। এক ভিন্ন অনুভূতি।')}</span>
          <h1 id="hero-title">{t('Your story.', 'আপনার গল্প।')}<br/><span>{t('Beautifully', 'সুন্দরভাবে')}<br/>{t('in focus.', 'ফোকাসে।')}</span></h1>
          <p>{t('Photography, films and aerial perspectives. Made to bring you back to the feeling.', 'ফটোগ্রাফি, ফিল্ম ও আকাশ থেকে ভিন্ন দৃষ্টিভঙ্গি। সেই অনুভূতিতে ফিরিয়ে নিয়ে যেতে।')}</p>
          <div className="cinema-actions"><button className="watch-film" onClick={openFilm}><GlassIcon name="play"/>{t('Watch the film', 'ফিল্ম দেখুন')}</button><a href="#work" className="text-link">{t('Explore photos', 'ছবি দেখুন')} <GlassIcon name="arrow"/></a></div>
          <div className="hero-quick-links"><a href="#services">{t('View services', 'সেবাসমূহ দেখুন')}</a><span aria-hidden="true">·</span><a href="#packages">{t('Packages & BDT pricing', 'প্যাকেজ ও টাকায় মূল্য')} ↗</a></div>
          <div className="hero-signature"><span className="signature-avatar">R</span><span><b>Rasel Hossain</b><small>{t('Photographer & cinematographer', 'ফটোগ্রাফার ও সিনেমাটোগ্রাফার')}</small></span></div>
        </div>
        <div className="hero-desktop">
          <div className="media-window glass-panel">
            <div className="window-toolbar"><span className="window-label"><GlassIcon name="film"/>{t('Selected film', 'বাছাই করা ফিল্ম')}</span><button className="motion-toggle" onClick={()=>setMotion(m=>!m)} aria-pressed={motion}>{motion?t('Ⅱ Pause background','Ⅱ ব্যাকগ্রাউন্ড থামান'):t('▶ Play background','▶ ব্যাকগ্রাউন্ড চালান')}</button></div>
            <div className="window-film">
              <div className="window-still" aria-hidden="true"><img src="/photos/rasel/aerial-hero.jpg" alt=""/></div>
              <button className="window-play" onClick={openFilm} aria-label={t('Watch featured aerial film','বাছাই করা এরিয়াল ফিল্ম দেখুন')}><GlassIcon name="play"/></button>
              <div className="window-film-caption"><small>{t('AERIAL PERSPECTIVES','আকাশ থেকে দৃশ্য')}</small><strong>{t('Above the city','শহরের আকাশে')}</strong></div>
            </div>
            <div className="window-status"><span>{t('A film by Rasel Hossain','রাসেল হোসেনের নির্মাণে')}</span><span>HashTag Eventography</span></div>
          </div>
          <a href="#work" className="photo-widget glass-panel"><img src="/photos/rasel/4500003163562549.webp" alt={t('Waterfront at dusk','গোধূলির জলতীর')}/><span><GlassIcon name="camera"/><b>{t('Life. In stills.','জীবন। স্থিরচিত্রে।')}</b><GlassIcon name="arrow"/></span></a>
          <a href="#contact" className="hello-widget glass-panel"><span className="hello-icon"><GlassIcon name="message"/></span><span><small>{t('HAVE A STORY IN MIND?','মনে কোনো গল্প আছে?')}</small><b>{t('Let’s make it happen.','চলুন, বাস্তবে নিয়ে আসি।')}</b></span><GlassIcon name="arrow"/></a>
        </div>
      </div>
      <div className="discipline-strip wrap"><span>{t('A fresh perspective. Every time.','প্রতিবার। এক নতুন দৃষ্টিভঙ্গি।')}</span><a href="#reels">{t('Cinematography','সিনেমাটোগ্রাফি')} ↗</a><a href="#work">{t('Photography','ফটোগ্রাফি')} ↗</a><a href="#services">{t('Aerial','এরিয়াল')} ↗</a></div>
    </section>
    <dialog ref={dialog} className="showreel-dialog" aria-labelledby="film-title" onClose={()=>setPlaying(false)} onClick={e=>{if(e.target===e.currentTarget)closeFilm()}}>
      <div className="showreel-head"><span id="film-title">{t('Rasel / The film','রাসেল / ফিল্ম')}</span><button aria-label={t('Close film','ফিল্ম বন্ধ করুন')} onClick={closeFilm}>✕</button></div>
      {playing&&<iframe title="Rasel showreel" src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${HERO_REEL}/`)}&show_text=false&width=500`} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen/>}
      <a href={`https://www.facebook.com/reel/${HERO_REEL}/`} target="_blank" rel="noreferrer">{t('Film not loading? Watch on Facebook ↗','ফিল্ম লোড হচ্ছে না? ফেসবুকে দেখুন ↗')}</a>
    </dialog>
  </>
}
