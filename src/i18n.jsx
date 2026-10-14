import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
const BN_DIGITS = '০১২৩৪৫৬৭৮৯'

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'en' } catch { return 'en' }
  })
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch { /* private mode */ }
  }, [lang])

  // t('English', 'বাংলা') for inline strings; L({en, bn}) for data objects.
  const t = useCallback((en, bn) => (lang === 'bn' ? bn : en), [lang])
  const L = useCallback((v) => (v && typeof v === 'object' ? v[lang] ?? v.en : v), [lang])
  const digits = useCallback((s) => (lang === 'bn' ? String(s).replace(/\d/g, d => BN_DIGITS[d]) : String(s)), [lang])

  return <Ctx.Provider value={{ lang, setLang, t, L, digits }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
