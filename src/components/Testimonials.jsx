import Reveal from './Reveal'
import { useLang } from '../i18n'
import { QUOTES } from '../data'

export default function Testimonials() {
  const { t, L } = useLang()
  return (
    <section>
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{t('Kind words', 'ক্লায়েন্টদের কথা')}</span>
          <h2>{t('Loved by', 'ভালোবাসা পান')} <span className="grad">{t('hosts and guests.', 'আয়োজক ও অতিথিদের কাছ থেকে।')}</span></h2>
        </Reveal>
        <div className="grid3">
          {QUOTES.map((q, i) => (
            <Reveal key={i} delay={i * 90} className="glass quote lift">
              <div className="stars">★★★★★</div>
              <p>“{L(q.text)}”</p>
              <div className="who"><i /><div>{L(q.who)}<small>{L(q.role)}</small></div></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
