import { useEffect, useState } from 'react'
import { introActive, INTRO_MS } from '../intro'

// Cinematic intro: aperture blades close, brand appears, then the screen "opens".
export default function Loader() {
  const [phase, setPhase] = useState(introActive ? 'in' : 'gone')
  useEffect(() => {
    if (!introActive) return
    document.documentElement.classList.add('intro-lock')
    const t1 = setTimeout(() => setPhase('out'), INTRO_MS - 700)
    const t2 = setTimeout(() => {
      setPhase('gone')
      document.documentElement.classList.remove('intro-lock')
      try { sessionStorage.setItem('intro-seen', '1') } catch { /* ignore */ }
    }, INTRO_MS + 400)
    return () => { clearTimeout(t1); clearTimeout(t2); document.documentElement.classList.remove('intro-lock') }
  }, [])
  if (phase === 'gone') return null
  return (
    <div className={`loader ${phase}`} aria-hidden="true">
      <svg className="loader-iris" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="100" cy="100" r="92" />
        <circle cx="100" cy="100" r="78" opacity=".4" strokeDasharray="3 6" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2
          const b = ((i + 1) / 8) * Math.PI * 2
          const p = (r, t) => `${100 + r * Math.cos(t)} ${100 + r * Math.sin(t)}`
          return <path key={i} d={`M${p(90, a)} L${p(26, a + 0.5)} L${p(26, b + 0.5)}`} />
        })}
      </svg>
      <div className="loader-brand"><span>R</span><span>A</span><span>S</span><span>E</span><span>L</span></div>
      <div className="loader-sub">CINEMATOGRAPHY · AERIAL · FILM</div>
      <div className="loader-bar"><i /></div>
    </div>
  )
}
