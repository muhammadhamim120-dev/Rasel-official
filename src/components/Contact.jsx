import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { useLang } from '../i18n'
import { CONTACT, PACKAGES } from '../data'

const EVENT_TYPES = [
  ['Wedding', 'বিয়ে'], ['Corporate', 'কর্পোরেট'], ['Concert / Festival', 'কনসার্ট / ফেস্টিভ্যাল'],
  ['Private party', 'ব্যক্তিগত পার্টি'], ['Other', 'অন্যান্য'],
]
const NEEDS = [
  ['Cinematography + photography', 'সিনেমাটোগ্রাফি + ফটোগ্রাফি'], ['Drone / aerial filming', 'ড্রোন / এরিয়াল ফিল্মিং'],
  ['Photography only', 'শুধু ফটোগ্রাফি'], ['Video only', 'শুধু ভিডিও'], ['Event management + photo + video', 'ইভেন্ট ম্যানেজমেন্ট + ছবি + ভিডিও'],
]

export default function Contact() {
  const { t, L } = useLang()
  const [pkg, setPkg] = useState('')
  const [sent, setSent] = useState(false)

  // "Choose <package>" buttons pre-select it here.
  useEffect(() => {
    const on = (e) => setPkg(e.detail)
    window.addEventListener('choose-package', on)
    return () => window.removeEventListener('choose-package', on)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    const lines = [
      t('Hello Rasel, I would like to book a shoot.', 'আসসালামু আলাইকুম রাসেল ভাই, আমি একটি শুটের জন্য বুকিং করতে চাই।'),
      `${t('Name', 'নাম')}: ${f.name}`,
      f.phone && `${t('Phone', 'ফোন')}: ${f.phone}`,
      `${t('Event', 'ইভেন্ট')}: ${f.type}${f.date ? ` (${f.date})` : ''}`,
      `${t('Needs', 'প্রয়োজন')}: ${f.need}`,
      f.package && `${t('Package', 'প্যাকেজ')}: ${f.package}`,
      f.msg && `${t('Details', 'বিস্তারিত')}: ${f.msg}`,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="glass contact">
          <div className="contact-info">
            <span className="eyebrow">{t('Let’s talk', 'কথা বলি')}</span>
            <h2>{t('Your next', 'আপনার পরের')}<br /><span className="grad">{t('great story.', 'অসাধারণ গল্প।')}</span></h2>
            <p>{t('Fill in a few details and your enquiry opens in WhatsApp, ready to send. We reply as soon as we can.', 'কয়েকটি তথ্য দিন, আপনার বার্তা তৈরি অবস্থায় হোয়াটসঅ্যাপে খুলবে। আমরা দ্রুত উত্তর দেব।')}</p>
            <a className="info-row" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>WhatsApp {CONTACT.phone}</a>
            <div className="info-row"><span aria-hidden="true">—</span>{L(CONTACT.place)}</div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="row2">
              <input required name="name" placeholder={t('Your name', 'আপনার নাম')} aria-label={t('Your name', 'আপনার নাম')} />
              <input name="phone" type="tel" placeholder={t('Phone number', 'ফোন নম্বর')} aria-label={t('Phone number', 'ফোন নম্বর')} />
            </div>
            <div className="row2">
              <select name="type" aria-label={t('Event type', 'ইভেন্টের ধরন')}>
                {EVENT_TYPES.map(([en, bn]) => <option key={en} value={en}>{t(en, bn)}</option>)}
              </select>
              <input type="date" name="date" aria-label={t('Event date', 'ইভেন্টের তারিখ')} />
            </div>
            <select name="need" aria-label={t('What do you need', 'কী প্রয়োজন')}>
              {NEEDS.map(([en, bn]) => <option key={en} value={en}>{t(en, bn)}</option>)}
            </select>
            <select name="package" value={pkg} onChange={(e) => setPkg(e.target.value)} aria-label={t('Package', 'প্যাকেজ')}>
              <option value="">{t('Package (optional)', 'প্যাকেজ (ঐচ্ছিক)')}</option>
              {PACKAGES.map(p => <option key={p.id} value={p.id}>{L(p.name)}</option>)}
            </select>
            <textarea aria-label={t("Project details", "প্রজেক্টের বিবরণ")} name="msg" placeholder={t('Tell us about your vision…', 'আপনার ভাবনা সম্পর্কে লিখুন…')} />
            <button className="btn primary" type="submit" style={{ justifyContent: 'center' }}>{t('Send on WhatsApp →', 'হোয়াটসঅ্যাপে পাঠান →')}</button>
            {sent && <div className="ok" style={{ display: 'block' }}>{t('✓ WhatsApp opened with your enquiry. Press send there to finish.', '✓ আপনার বার্তাসহ হোয়াটসঅ্যাপ খুলেছে। সেখানে সেন্ড চাপলেই সম্পন্ন।')}</div>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
