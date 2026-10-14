import { useEffect, useRef, useState } from 'react'

// Adds `.in` when the element scrolls into view.
export function useReveal(delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); setTimeout(() => { el.style.transitionDelay = '' }, 1400) }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, style: { transitionDelay: `${delay}ms` } }
}

// Cursor-following specular sheen on any .glass element.
export function useGlassSheen() {
  useEffect(() => {
    const move = (e) => {
      const g = e.target.closest?.('.glass')
      if (!g) return
      const r = g.getBoundingClientRect()
      g.style.setProperty('--mx', `${e.clientX - r.left}px`)
      g.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', move)
    return () => document.removeEventListener('pointermove', move)
  }, [])
}

export function useCountUp(target, suffix = '') {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (n) => {
        const p = Math.min((n - t0) / 1400, 1)
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [target])
  const done = val === target
  return [ref, `${val}${suffix || (done ? '+' : '')}`]
}
