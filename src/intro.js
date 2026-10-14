// True only on the first visit of a session (and when motion is allowed).
export const introActive = (() => {
  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !sessionStorage.getItem('intro-seen')
  } catch { return false }
})()
export const INTRO_MS = introActive ? 2100 : 0
