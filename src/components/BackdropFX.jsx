import { useEffect, useRef, useState } from 'react'

// Thin-line cinema scenery behind the page. Pure SVG + CSS, no images.
function Iris() {
  const pts = (r, off = 0) => Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + off
    return [100 + r * Math.cos(a), 100 + r * Math.sin(a)]
  })
  const outer = pts(92), inner = pts(34, Math.PI / 8)
  return (
    <svg viewBox="0 0 200 200" className="fx-svg">
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="86" opacity=".5" />
      <circle cx="100" cy="100" r="60" opacity=".35" strokeDasharray="2 5" />
      {outer.map(([x, y], i) => {
        const [ix, iy] = inner[i], [jx, jy] = inner[(i + 1) % 8]
        return <path key={i} d={`M${x} ${y} L${ix} ${iy} L${jx} ${jy}`} />
      })}
      <polygon points={inner.map(p => p.join(',')).join(' ')} />
    </svg>
  )
}

function Drone({ beam = false, id = 'd' }) {
  return (
    <svg viewBox="0 0 220 110" className="fx-svg fx-drone">
      {beam && (
        <>
          <defs>
            <linearGradient id={`beam-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd9a0" stopOpacity=".55" />
              <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon className="beam" points="106,88 114,88 210,360 10,360" fill={`url(#beam-${id})`} stroke="none" />
        </>
      )}
      <path d="M86 46 L34 30 M134 46 L186 30 M90 54 L44 70 M130 54 L176 70" />
      <rect x="84" y="38" width="52" height="22" rx="10" />
      <path d="M96 38 Q110 28 124 38" />
      <circle cx="110" cy="49" r="3" />
      {[[34, 28], [186, 28], [44, 68], [176, 68]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y + 2} r="3" />
          <ellipse className="rotor" cx={x} cy={y} rx="26" ry="3.2" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * -0.03}s` }} />
        </g>
      ))}
      <path d="M110 60 L110 70" />
      <circle cx="110" cy="78" r="8" />
      <circle cx="110" cy="78" r="3.5" />
      <path d="M92 60 L84 82 M128 60 L136 82 M78 82 L90 82 M130 82 L142 82" />
      <circle className="nav-light red" cx="34" cy="30" r="2.6" stroke="none" />
      <circle className="nav-light green" cx="186" cy="30" r="2.6" stroke="none" />
    </svg>
  )
}

function Camera() {
  return (
    <svg viewBox="0 0 260 150" className="fx-svg">
      {/* film magazines */}
      <circle cx="82" cy="28" r="24" /><circle cx="82" cy="28" r="6" />
      <circle cx="132" cy="24" r="20" /><circle cx="132" cy="24" r="5" />
      <path d="M82 4 L132 4 M82 52 L82 62 M132 44 L132 62" opacity=".6" />
      {/* body */}
      <rect x="52" y="58" width="132" height="62" rx="9" />
      <path d="M52 78 L184 78" opacity=".5" />
      <rect x="64" y="88" width="30" height="20" rx="3" opacity=".7" />
      {/* lens */}
      <rect x="184" y="68" width="30" height="42" rx="4" />
      <rect x="214" y="62" width="30" height="54" rx="6" />
      <circle cx="244" cy="89" r="14" opacity=".0" />
      <path d="M222 70 L222 108 M230 70 L230 108" opacity=".5" />
      {/* viewfinder + handle */}
      <path d="M52 100 L22 100 L22 118 L52 118" />
      <path d="M96 58 L96 48 L150 48 L150 58" />
      {/* tripod */}
      <path d="M118 120 L96 146 M118 120 L140 146 M118 120 L118 146" opacity=".6" />
    </svg>
  )
}

function FilmStrip() {
  return (
    <svg className="fx-strip-svg" viewBox="0 0 1600 90" preserveAspectRatio="none">
      <defs>
        <pattern id="frames" width="150" height="90" patternUnits="userSpaceOnUse">
          <rect x="22" y="18" width="106" height="54" rx="4" />
          <rect x="6" y="6" width="10" height="7" rx="2" fill="currentColor" stroke="none" />
          <rect x="6" y="77" width="10" height="7" rx="2" fill="currentColor" stroke="none" />
          <rect x="134" y="6" width="10" height="7" rx="2" fill="currentColor" stroke="none" />
          <rect x="134" y="77" width="10" height="7" rx="2" fill="currentColor" stroke="none" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="1600" height="90" fill="url(#frames)" />
      <path d="M0 2 H1600 M0 88 H1600" />
    </svg>
  )
}

// Soft cinematic bokeh + dust. Near particles are big and drift faster; mouse adds depth parallax.
function Bokeh() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const COLORS = ['255,190,100', '255,226,170', '110,200,130', '255,255,255', '242,154,46']
    let w = 0, h = 0, ps = [], raf = 0, mx = 0, my = 0, tx = 0, ty = 0

    const make = () => {
      const z = Math.random()
      return {
        x: Math.random() * w, y: Math.random() * h, z,
        r: 3 + z * z * 62, vy: -(0.05 + z * 0.3), vx: (Math.random() - 0.5) * 0.12,
        a: 0.05 + (1 - z) * 0.2 + Math.random() * 0.05, ph: Math.random() * 6.28, sp: 0.4 + Math.random() * 1.2,
        col: COLORS[(Math.random() * COLORS.length) | 0], hex: z > 0.5 && Math.random() < 0.45,
      }
    }
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = innerWidth; h = innerHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ps = Array.from({ length: Math.round(Math.min(52, (w * h) / 26000)) }, make)
    }
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05
      for (const p of ps) {
        if (!reduce) {
          p.y += p.vy; p.x += p.vx
          if (p.y < -p.r * 2) { p.y = h + p.r * 2; p.x = Math.random() * w }
          if (p.x < -p.r * 2) p.x = w + p.r; else if (p.x > w + p.r * 2) p.x = -p.r
        }
        const x = p.x + mx * p.z * 46, y = p.y + my * p.z * 30
        const tw = 0.65 + 0.35 * Math.sin(t * 0.001 * p.sp + p.ph)
        const a = p.a * tw
        if (p.hex) {
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const ang = (i / 6) * 6.283 + 0.5
            ctx[i ? 'lineTo' : 'moveTo'](x + p.r * Math.cos(ang), y + p.r * Math.sin(ang))
          }
          ctx.closePath()
          ctx.fillStyle = `rgba(${p.col},${a * 0.55})`; ctx.fill()
          ctx.strokeStyle = `rgba(${p.col},${a * 1.1})`; ctx.lineWidth = 1; ctx.stroke()
        } else {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.r)
          g.addColorStop(0, `rgba(${p.col},${a})`)
          g.addColorStop(0.7, `rgba(${p.col},${a * 0.5})`)
          g.addColorStop(1, `rgba(${p.col},0)`)
          ctx.fillStyle = g
          ctx.beginPath(); ctx.arc(x, y, p.r, 0, 6.283); ctx.fill()
        }
      }
    }
    const loop = (t) => { draw(t); raf = requestAnimationFrame(loop) }
    const onMove = (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5 }
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) raf = requestAnimationFrame(loop) }

    resize(); draw(0)
    if (!reduce) raf = requestAnimationFrame(loop)
    addEventListener('resize', resize)
    addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize); removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])
  return <canvas ref={ref} className="fx-bokeh" />
}

// A camera autofocus box that hunts around the frame, then locks on.
function FocusReticle() {
  const [pos, setPos] = useState({ x: 62, y: 34 })
  const [locked, setLocked] = useState(false)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t1, t2
    const hop = () => {
      setLocked(false)
      setPos({ x: 8 + Math.random() * 74, y: 14 + Math.random() * 66 })
      t1 = setTimeout(() => setLocked(true), 1300)
      t2 = setTimeout(hop, 5200)
    }
    t2 = setTimeout(hop, 1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  return (
    <div className={`fx-focus ${locked ? 'locked' : ''}`} style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M6 28 V6 H28 M72 6 H94 V28 M94 72 V94 H72 M28 94 H6 V72" />
        <path d="M50 42 V58 M42 50 H58" opacity=".7" />
      </svg>
      <span>{locked ? 'AF ●' : 'AF'}</span>
    </div>
  )
}

export default function BackdropFX() {
  const root = useRef(null)

  // Parallax: each layer moves at its own depth with scroll and (eased) mouse movement.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const layers = [...root.current.querySelectorAll('[data-depth]')]
    let raf = 0, mx = 0, my = 0, tx = 0, ty = 0
    const frame = () => {
      mx += (tx - mx) * 0.06; my += (ty - my) * 0.06
      const y = window.scrollY
      layers.forEach(l => {
        const d = +l.dataset.depth
        l.style.transform = `translate3d(${mx * d * 160}px, ${-y * d + my * d * 110}px, 0)`
      })
      raf = Math.abs(tx - mx) + Math.abs(ty - my) > 0.001 ? requestAnimationFrame(frame) : 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }
    const onMove = (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; kick() }
    frame()
    addEventListener('scroll', kick, { passive: true })
    addEventListener('pointermove', onMove, { passive: true })
    return () => { removeEventListener('scroll', kick); removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="fx" ref={root} aria-hidden="true">
      <div className="fx-rays" />
      <Bokeh />
      <div className="fx-layer" data-depth="0.05" style={{ top: '4%', right: '-8vmax' }}>
        <div className="fx-iris"><Iris /></div>
      </div>
      <div className="fx-layer" data-depth="0.12" style={{ top: '62%', left: '-6vmax' }}>
        <div className="fx-iris small"><Iris /></div>
      </div>

      <div className="fx-layer" data-depth="0.08" style={{ top: '14%', left: 0, width: '100%' }}>
        <div className="fx-fly">
          <div className="fx-fly-y"><Drone beam id="a" /></div>
          <span className="fx-trail" />
        </div>
      </div>

      <div className="fx-layer" data-depth="0.04" style={{ top: '60%', left: 0, width: '100%' }}>
        <div className="fx-fly far">
          <div className="fx-fly-y"><Drone id="b" /></div>
        </div>
      </div>

      <div className="fx-layer" data-depth="0.18" style={{ top: '38%', left: '4%' }}>
        <div className="fx-camera"><Camera /></div>
      </div>
      <div className="fx-layer" data-depth="0.25" style={{ top: '78%', right: '5%' }}>
        <div className="fx-camera alt"><Camera /></div>
      </div>

      <div className="fx-layer" data-depth="0.1" style={{ top: '52%', left: '-10%', width: '120%' }}>
        <div className="fx-strip"><FilmStrip /></div>
      </div>

      <FocusReticle />
      <span className="fx-flare f1" /><span className="fx-flare f2" />
      <div className="fx-vignette" />
    </div>
  )
}
