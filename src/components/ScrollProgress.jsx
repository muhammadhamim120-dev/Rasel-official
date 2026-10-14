import { useEffect, useRef } from 'react'

// Film-timeline progress bar with a running timecode.
export default function ScrollProgress() {
  const bar = useRef(null), tc = useRef(null)
  useEffect(() => {
    let raf = 0
    const pad = (n, l = 2) => String(n).padStart(l, '0')
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - innerHeight
      const p = max > 0 ? Math.min(scrollY / max, 1) : 0
      bar.current.style.transform = `scaleX(${p})`
      const total = p * 180 // map the page to a 3-minute "film"
      tc.current.textContent = `${pad(Math.floor(total / 60))}:${pad(Math.floor(total % 60))}:${pad(Math.floor((total % 1) * 24))}`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return (
    <>
      <div className="progress"><i ref={bar} /></div>
      <div className="timecode glass"><b /> <span ref={tc}>00:00:00</span></div>
    </>
  )
}
