import Reveal from './Reveal'
import { useLang } from '../i18n'
import { SERVICES } from '../data'

export default function Services() {
  const { t, L } = useLang()
  return (
    <section id="services">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{t('Services', 'সেবাসমূহ')}</span>
          <h2>{t('Planning, photo and film.', 'পরিকল্পনা, ছবি ও ফিল্ম।')}<br /><span className="grad">{t('Under one roof.', 'সবকিছু এক ছাদের নিচে।')}</span></h2>
          <p className="lead">{t('No juggling vendors. One accountable team handles the logistics while another captures the story as it unfolds.', 'আলাদা আলাদা ভেন্ডরের ঝামেলা নেই। এক টিম সব আয়োজন সামলায়, আরেক টিম গল্পটা ক্যামেরাবন্দী করে।')}</p>
          <a className="text-link" href="#packages">{t('See packages & BDT pricing', 'প্যাকেজ ও টাকায় মূল্য দেখুন')} ↗</a>
        </Reveal>
        <div className="grid3">
          {SERVICES.map((s, i) => (
            <Reveal as="article" key={i} delay={(i % 3) * 90} className="glass card lift">
              <span className="service-number">0{i + 1}</span><h3>{L(s.title)}</h3><p>{L(s.text)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
