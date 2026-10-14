import { useReveal } from '../hooks'

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const { ref, style } = useReveal(delay)
  return <Tag ref={ref} style={style} className={`reveal ${className}`} {...rest}>{children}</Tag>
}
