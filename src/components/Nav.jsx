import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import GlassIcon from './GlassIcon'

const LINKS = [['reels', 'Films', 'ফিল্ম','film'], ['work', 'Photos', 'ছবি','camera'], ['services', 'Services', 'সেবাসমূহ','aperture'], ['packages', 'Pricing', 'মূল্য','receipt'], ['about', 'About', 'পরিচিতি','person'], ['contact', 'Contact', 'যোগাযোগ','message']]
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active,setActive] = useState('reels')
  const menu = useRef(null)
  const { lang, setLang, t } = useLang()
  useEffect(() => {
    const key = e => { if (e.key === 'Escape') {setOpen(false); if (open) menu.current?.focus()} }
    window.addEventListener('keydown',key)
    return () => window.removeEventListener('keydown',key)
  }, [open])
  useEffect(()=>{
    const sections=LINKS.map(([id])=>document.getElementById(id)).filter(Boolean)
    const io=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)
      if(visible[0])setActive(visible[0].target.id)
    },{rootMargin:'-15% 0px -35% 0px',threshold:0})
    sections.forEach(s=>io.observe(s));return()=>io.disconnect()
  },[])
  return <header className={open?'menu-open':''}>
    <nav aria-label="Main navigation">
      <a href="#top" className="logo" aria-label="Rasel home"><span className="brand-symbol"><GlassIcon name="aperture" /></span><span className="brand-name">rasel<span>{t('Photography & film', 'ফটোগ্রাফি ও ফিল্ম')}</span></span></a>
      <span className="nav-description">{t('A different perspective.', 'এক ভিন্ন দৃষ্টিভঙ্গি।')}</span>
      <div id="navigation-links" className={`links ${open?'open':''}`}>
        {LINKS.map(([id,en,bn,icon])=><a href={`#${id}`} key={id} className={active===id?'active':''} aria-current={active===id?'location':undefined} onClick={()=>{setOpen(false);setActive(id)}}><span className={`dock-icon dock-${icon}`}><GlassIcon name={icon}/></span><span>{t(en,bn)}</span><i aria-hidden="true"/></a>)}
      </div>
      <div className="nav-right"><div className="lang" role="group" aria-label="Language"><button className={lang==='en'?'on':''} onClick={()=>setLang('en')}>EN</button><button className={lang==='bn'?'on':''} onClick={()=>setLang('bn')}>বাং</button></div><a href="#contact" className="book">{t('Let’s talk', 'কথা বলি')} <GlassIcon name="arrow"/></a><button ref={menu} className={`burger ${open?'is-open':''}`} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="navigation-links" onClick={()=>setOpen(o=>!o)}><span/><span/></button></div>
    </nav>
  </header>
}
