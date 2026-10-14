import Reveal from './Reveal'
import { useLang } from '../i18n'
import { STEPS } from '../data'

export default function Process() {
  const { t, L, digits } = useLang()
  return (
    <section id="process">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{t('How it works', 'কীভাবে কাজ হয়')}</span>
          <h2>{t('Simple from', 'শুরু থেকে')} <span className="grad">{t('start to screen.', 'স্ক্রিন পর্যন্ত সহজ।')}</span></h2>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 90} className="glass step lift">
              <div className="n">{digits(s.n)}</div><h3>{L(s.title)}</h3><p>{L(s.text)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
