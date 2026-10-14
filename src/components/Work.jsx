import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { useLang } from '../i18n'
import { WORK, FILTERS } from '../data'

function Art({ item, alt, className = 'art' }) {
  return <img className={className} src={item.src} alt={alt} loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
}

export default function Work() {
  const { t, L } = useLang()
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const dialog = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!active) return
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.querySelector('.lb-x')?.focus()
    const trap = (event) => {
      if (event.key !== 'Tab') return
      const elements = [...dialog.current.querySelectorAll('button, a[href], iframe, [tabindex="0"]')]
      const first = elements[0], last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', trap)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', trap)
      previous?.focus()
    }
  }, [active])

  const typeLabel = (x) => (x === 'Film' ? t('Film', 'ফিল্ম') : t('Photo', 'ছবি'))

  return (
    <section id="work">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{t('02 / Photographic journal', '০২ / ছবির দিনলিপি')}</span>
          <h2>{t('Behind the', 'প্রতিটি ফ্রেমের')} <span className="grad">{t('frame.', 'পেছনে।')}</span></h2><p className="lead">{t('Production diaries, on-location moments and photographs from Rasel’s public collection.', 'রাসেলের প্রকাশ্য সংকলন থেকে প্রোডাকশনের দিনলিপি, লোকেশনের মুহূর্ত ও ছবি।')}</p>
        </Reveal>
        <Reveal className="filters">
          {FILTERS.map(f => (
            <button key={f.id} className={`chip ${filter === f.id ? 'active' : ''}`} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{L(f.label)}</button>
          ))}
        </Reveal>
        <Reveal className="gallery" data-filter={filter}>
          {WORK.map((w, i) => (
            <figure key={i} className={`shot ${filter !== 'all' && w.cat !== filter ? 'hide' : ''}`} role="button" tabIndex={0} aria-label={L(w.title)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(w) } }} onClick={() => setActive(w)}>
              <Art item={w} alt={L(w.title)} />
              {w.type === 'Film' && <div className="play">▶</div>}
              <div className="cap"><span>{L(w.title)}</span><small>{typeLabel(w.type)}</small></div>
            </figure>
          ))}
        </Reveal>
      </div>

      {active && (
        <div ref={dialog} role="dialog" aria-modal="true" aria-label={L(active.title)} className="lb open" onClick={(e) => e.target === e.currentTarget && setActive(null)}>
          <div className="glass lb-card">
            {active.reel ? (
              <div className="lb-reel">
                <iframe
                  title={L(active.title)}
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${active.reel}/`)}&show_text=false&width=400&autoplay=true`}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen scrolling="no"
                />
              </div>
            ) : (
              <div className="lb-art"><Art item={active} alt={L(active.title)} /></div>
            )}
            <div className="lb-bar">
              <div><b>{L(active.title)}</b><br /><small style={{ color: 'var(--muted)' }}>{typeLabel(active.type)}</small></div>
              <button className="lb-x" aria-label="Close" onClick={() => setActive(null)}>✕</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
