export default function GlassIcon({ name, ...props }) {
  const paths = {
    film: <><rect x="3" y="5" width="14" height="14" rx="4"/><path d="m17 10 4-3v10l-4-3"/></>,
    camera: <><path d="M8 6 9.5 3h5L16 6h3a2 2 0 0 1 2 2v11H3V8a2 2 0 0 1 2-2z"/><circle cx="12" cy="12.5" r="3.5"/></>,
    person: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>,
    message: <><path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0Z"/><path d="M8 10h8M8 14h5"/></>,
    aperture: <><circle cx="12" cy="12" r="9"/><path d="m9 3-3 9 5 8m7-15H9l-5 8m17-1-5-8m-1 17 5-8-5-8m-11 9h9l5 7m-8-1 5-8"/></>,
    receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 7h6M9 11h6M9 15h3"/></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    play: <path d="m9 5 11 7-11 7Z"/>,
  }
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]||paths.camera}</svg>
}
