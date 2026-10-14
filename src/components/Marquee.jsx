import { useLang } from '../i18n'

const WORDS = [
  ['Cinematography', 'সিনেমাটোগ্রাফি'], ['Aerial Drone', 'এরিয়াল ড্রোন'], ['Weddings', 'বিয়ে'], ['Brand Films', 'ব্র্যান্ড ফিল্ম'],
  ['Concerts', 'কনসার্ট'], ['Documentary', 'ডকুমেন্টারি'], ['Photography', 'ফটোগ্রাফি'], ['Live Events', 'লাইভ ইভেন্ট'],
]

function Row({ reverse }) {
  const { t } = useLang()
  const items = [...WORDS, ...WORDS]
  return (
    <div className={`marquee-row ${reverse ? 'rev' : ''}`}>
      <div className="marquee-track">
        {[0, 1].map(k => (
          <div className="marquee-set" key={k}>
            {items.map(([en, bn], i) => <span key={i}>{t(en, bn)}<em>✦</em></span>)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee glass" aria-hidden="true">
      <Row /><Row reverse />
    </div>
  )
}
