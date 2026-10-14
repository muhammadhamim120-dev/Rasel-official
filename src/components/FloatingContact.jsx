import { CONTACT } from '../data'
import { useLang } from '../i18n'

export default function FloatingContact() {
  const { t } = useLang()
  return (
    <div className="fab">
      <a className="fab-btn call" href={`tel:${CONTACT.tel}`} aria-label={t('Call', 'কল করুন')}>📞</a>
      <a className="fab-btn wa glass" href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t('Hello Rasel, I have a question.', 'আসসালামু আলাইকুম রাসেল ভাই, আমার একটি প্রশ্ন আছে।'))}`}
        target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.13.56 4.2 1.62 6.02L4 29l8.17-1.58a12 12 0 0 0 3.87.64C22.67 28.06 28 22.66 28 16.03 28 9.4 22.68 3 16.04 3Zm0 22.02c-1.2 0-2.37-.2-3.5-.6l-.5-.2-4.85.94.96-4.72-.22-.52a9.93 9.93 0 0 1-.98-4.2c0-5.5 4.5-9.97 10.04-9.97 5.54 0 10.04 4.47 10.04 9.97 0 5.5-4.5 9.3-10 9.3Zm5.5-7.5c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.25-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.2 5.1 4.48.7.3 1.27.5 1.7.62.72.23 1.37.2 1.88.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z"/></svg>
      </a>
    </div>
  )
}
