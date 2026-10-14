import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { useLang } from '../i18n'
import { REELS, FB_PAGE } from '../data'

export default function Reels() {
  const { t, L, digits } = useLang()
  const [active, setActive] = useState(null)
  const player = useRef(null)
  const [videoError, setVideoError] = useState(false)
  const dialog = useRef(null)
  useEffect(() => {
    if (!active) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [active])
  useEffect(() => {
    const video = player.current
    const hide = () => { if (document.hidden) video?.pause() }
    document.addEventListener('visibilitychange', hide)
    return () => { video?.pause(); document.removeEventListener('visibilitychange', hide) }
  }, [active])
  const openFilm = reel => { setVideoError(false); setActive(reel); dialog.current.showModal() }
  return <section id="reels">
    <div className="wrap">
      <Reveal className="section-head split-head"><div><span className="eyebrow">{t('01 / Selected films', '০১ / বাছাই করা ফিল্ম')}</span><h2>{t('Stories in motion.', 'চলমান গল্প।')}<br /><span className="grad">{t('Feeling in every frame.', 'প্রতি ফ্রেমে অনুভূতি।')}</span></h2></div><p className="lead">{t('An invitation to see beyond the obvious. Aerial perspectives, celebrations and stories from behind the lens.', 'চেনা দৃশ্যের বাইরে দেখার আমন্ত্রণ। আকাশ থেকে ভিন্ন দৃষ্টিভঙ্গি, উদযাপন ও লেন্সের নেপথ্যের গল্প।')}</p></Reveal>
      <div className="reels film-posters" id="film-collection">
        {REELS.map((reel,i) => <Reveal key={reel.id} className={`reel ${i===0?'feature-film':''}`}>
          <button className="reel-launch" onClick={() => openFilm(reel)} aria-label={`${t('Play film','ফিল্ম চালান')}: ${L(reel.title)}`}><img src={reel.poster} alt="" loading="lazy" /><span className="film-play" aria-hidden="true">▶</span><span className="film-watch">{t('Watch film', 'ফিল্ম দেখুন')}</span></button>
          <div className="film-caption"><span className="reel-number">{digits(`0${i+1}`)}</span><div><small>{L(reel.category)}</small><strong>{L(reel.title)}</strong></div><a className="reel-external" href={`https://www.facebook.com/reel/${reel.id}/`} target="_blank" rel="noreferrer" aria-label={`${L(reel.title)} — Facebook`}>↗</a></div>
        </Reveal>)}
      </div>
      <div className="collection-bottom"><span className="collection-count">{digits(REELS.length)} {t('films · explore the collection', 'ফিল্ম · সংকলনটি দেখুন')}</span><a href={FB_PAGE+'/reels'} target="_blank" rel="noreferrer">{t('More films on Facebook', 'ফেসবুকে আরও ফিল্ম')} ↗</a></div>
    </div>
    <dialog ref={dialog} className="showreel-dialog" aria-label={active?L(active.title):t('Film player','ফিল্ম প্লেয়ার')} onClose={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close()}}>
      <div className="showreel-head"><span>{active&&L(active.title)}</span><button onClick={()=>dialog.current.close()} aria-label={t('Close film','ফিল্ম বন্ধ করুন')}>×</button></div>
      {active&&<>
        {active.localVideo ? <video ref={player} className="portfolio-video" src={active.localVideo} poster={active.poster} controls autoPlay playsInline preload="metadata" aria-label={L(active.title)} onError={()=>setVideoError(true)}/> : <iframe title={L(active.title)} src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${active.id}/`)}&show_text=false&width=500`} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen />}
        {videoError&&<p role="status">{t('Video unavailable here. Open the original below.', 'এখানে ভিডিওটি চলছে না। নিচের লিংকে মূল ভিডিওটি দেখুন।')}</p>}
        <a href={`https://www.facebook.com/reel/${active.id}/`} target="_blank" rel="noreferrer">{t('Watch on Facebook', 'ফেসবুকে দেখুন')} ↗</a>
      </>}
    </dialog>
  </section>
}
