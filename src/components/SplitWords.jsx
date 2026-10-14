import { Fragment } from 'react'
import { INTRO_MS } from '../intro'

// Reveals text word by word (blur → sharp). `start` is the delay in ms after the intro.
export default function SplitWords({ text, className = '', start = 0 }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={`${text}-${i}`}>
      <span className={`word ${className}`} style={{ '--d': INTRO_MS + start + i * 90 }}>{w}</span>{' '}
    </Fragment>
  ))
}
