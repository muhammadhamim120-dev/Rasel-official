import Reveal from './Reveal'
import { useLang } from '../i18n'
import { PACKAGES, PAYMENT_METHODS } from '../data'

export default function Packages() {
  const { t, L, digits } = useLang()
  const choose = id => window.dispatchEvent(new CustomEvent('choose-package', { detail: id }))
  return <section id="packages" aria-labelledby="pricing-title">
    <div className="wrap">
      <Reveal className="section-head split-head">
        <div><span className="eyebrow">{t('Pricing · Bangladeshi taka', 'মূল্য · বাংলাদেশি টাকা')}</span><h2 id="pricing-title">{t('Packages &', 'প্যাকেজ ও')}<br/><span className="grad">{t('pricing.', 'মূল্য।')}</span></h2></div>
        <p className="lead">{t('Compare photography, film and complete production packages. All sample prices below are in BDT (৳).', 'ফটোগ্রাফি, ফিল্ম ও সম্পূর্ণ প্রোডাকশন প্যাকেজের তুলনা করুন। নিচের সব নমুনা মূল্য বাংলাদেশি টাকায়—BDT (৳)।')}</p>
      </Reveal>
      <p className="pricing-notice" id="pricing-notice"><strong>{t('Sample prices — not confirmed rates.', 'নমুনা মূল্য — চূড়ান্ত রেট নয়।')}</strong> {t('These amounts and package inclusions are for preview. Confirm availability, coverage and the final quote before booking.', 'এই মূল্য ও প্যাকেজের বিবরণ প্রিভিউয়ের জন্য। বুকিংয়ের আগে সময়, কাভারেজ ও চূড়ান্ত মূল্য নিশ্চিত করুন।')}</p>
      <div className="pricing-options">
        {PACKAGES.map(p => <Reveal as="article" key={p.id} className={`price-card glass-panel ${p.featured ? 'price-card-featured' : ''}`}>
          <span className="price-category">{p.id === 'Essential' ? t('Photography', 'ফটোগ্রাফি') : p.id === 'Signature' ? t('Photo & film', 'ছবি ও ফিল্ম') : t('Complete production', 'সম্পূর্ণ প্রোডাকশন')}</span>
          <h3>{L(p.name)}</h3>
          <div className="package-price" aria-describedby="pricing-notice"><small>{t('Sample price', 'নমুনা মূল্য')}</small><strong>৳{digits(new Intl.NumberFormat('en-BD').format(p.price))}</strong><span>BDT</span></div>
          <p className="coverage-label">{t('Example coverage', 'নমুনা কাভারেজ')}</p>
          <ul>{p.items.map((item, i) => <li key={i}>{L(item)}</li>)}</ul>
          <a href="#contact" className={`btn ${p.featured ? 'primary' : ''}`} onClick={() => choose(p.id)} aria-label={`${t('Choose', 'বেছে নিন:')} ${L(p.name)}`}>{t('Enquire about this package', 'এই প্যাকেজ সম্পর্কে জানুন')} <span aria-hidden="true">↗</span></a>
        </Reveal>)}
      </div>
      <Reveal className="pay"><span>{t('Final pricing depends on your project requirements.', 'চূড়ান্ত মূল্য আপনার প্রজেক্টের চাহিদার ওপর নির্ভর করবে।')}</span><div className="pay-list">{PAYMENT_METHODS.map((method, i) => <b key={i}>{L(method)}</b>)}</div></Reveal>
    </div>
  </section>
}
