import Reveal from './Reveal'
import { useLang } from '../i18n'

export default function About() {
  const { t } = useLang()
  return (
    <section id="about">
      <div className="wrap">
        <Reveal className="glass about">
          <img src="/photos/rasel/4531762740386591.webp" alt="Rasel filming on location for a recycling documentary" loading="lazy" />
          <div>
            <span className="eyebrow">{t('About', 'পরিচিতি')}</span>
            <h2>{t('Behind the', 'লেন্স ও ড্রোনের')} <span className="grad">{t('lens & the drone.', 'পেছনের মানুষ।')}</span></h2>
            <p className="lead">{t(
              'Rasel Hossain is a freelance photographer, cinematographer and aerial cinematographer, shooting events, brand films and documentary work. From sweeping drone shots to close gimbal moves, every frame is built to tell the story of the day.',
              'রাসেল হোসেন একজন ফ্রিল্যান্স ফটোগ্রাফার, সিনেমাটোগ্রাফার ও এরিয়াল সিনেমাটোগ্রাফার। ইভেন্ট, ব্র্যান্ড ফিল্ম ও ডকুমেন্টারির কাজ করেন। আকাশ থেকে ড্রোন শট থেকে শুরু করে জিম্বালের কাছের দৃশ্য, প্রতিটি ফ্রেম সাজানো হয় দিনটির গল্প বলার জন্য।')}</p>
            <ul className="facts">
              <li>{t('Cinematographer & aerial cinematographer', 'সিনেমাটোগ্রাফার ও এরিয়াল সিনেমাটোগ্রাফার')}</li>
              <li>{t('Professional event & portrait photographer', 'পেশাদার ইভেন্ট ও পোর্ট্রেট ফটোগ্রাফার')}</li>
              <li>{t('Photographer, Armed Forces Medical College', 'ফটোগ্রাফার, আর্মড ফোর্সেস মেডিকেল কলেজ')}</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
