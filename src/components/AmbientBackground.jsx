import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'

const MotionContext = createContext(null)
export const useAmbientMotion = () => useContext(MotionContext)

// A single full-screen triangle; all folds and lighting are generated in GLSL.
const vertexSource = `attribute vec2 position;
void main(){gl_Position=vec4(position,0.,1.);}`
const fragmentSource = `precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
const vec3 pearl=vec3(.94,.965,.99);
const vec3 ice=vec3(.63,.79,.94);
const vec3 silver=vec3(.69,.73,.89);
const vec3 blue=vec3(.30,.52,.78);
float fold(vec2 p,float offset,float t){
  float bend=.19*sin(p.x*1.45+t*.23+offset*2.1);
  bend+=.08*sin(p.x*2.4-t*.16+offset*3.);
  return p.y+p.x*.48+bend-offset;
}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  vec2 p=(gl_FragCoord.xy-.5*resolution)/resolution.y;
  p+=pointer*vec2(.045,.025);
  float t=time;
  vec3 color=mix(pearl,ice*.96,smoothstep(.2,1.25,uv.x+.2*uv.y));
  color=mix(color,vec3(.86,.82,.93),.23*exp(-length(p-vec2(.6,.4))*1.7));
  for(int i=0;i<4;i++){
    float k=float(i);
    float d=fold(p,-.76+k*.49,t+k*1.9);
    float body=exp(-pow((d+.09)/.19,2.));
    float shadow=exp(-pow((d+.032)/.031,2.));
    float edge=exp(-pow(d/.006,2.));
    float bloom=exp(-pow((d-.02)/.041,2.));
    float inner=exp(-pow((d+.12)/.012,2.));
    vec3 tint=mix(ice,silver,.5+.5*sin(k*1.7+p.x*.65+t*.055));
    color=mix(color,tint,.51*body);
    color=mix(color,blue,.22*shadow);
    color=mix(color,pearl, .52*bloom);
    color=mix(color,vec3(1.),.79*edge);
    color+=vec3(.035,.035,.052)*inner;
    float sweep=.55+.45*sin(p.x*1.1-t*.22+k);
    color+=vec3(.025,.038,.04)*bloom*sweep;
  }
  float light=exp(-length(p-vec2(-.65,.43))*1.5);
  color=mix(color,vec3(.965,.975,.995),light*.52);
  float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5;
  gl_FragColor=vec4(color+grain*.0025,1.);
}`

function LiquidCanvas({ running }) {
  const canvasRef = useRef(null)
  const engine = useRef(null)
  const runningRef = useRef(running)
  const [revision, setRevision] = useState(0)
  const [renderer, setRenderer] = useState('fallback')
  runningRef.current = running

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' })
    if (!gl) return
    let program, buffer, raf = 0, last = 0, elapsed = 9, frames = 0, lost = false, scrolling = false, scrollTimer = 0
    const shaders = []
    const target = [0, 0], pointer = [0, 0]
    const compile = (type, source) => {
      const shader = gl.createShader(type)
      shaders.push(shader)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Liquid shader compilation failed')
      return shader
    }
    try {
      program = gl.createProgram()
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource))
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Liquid shader linking failed')
      gl.useProgram(program)
      buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    } catch {
      shaders.forEach(shader => gl.deleteShader(shader))
      if (buffer) gl.deleteBuffer(buffer)
      if (program) gl.deleteProgram(program)
      return
    }
    const uniforms = Object.fromEntries(['resolution', 'pointer', 'time'].map(name => [name, gl.getUniformLocation(program, name)]))
    const draw = () => {
      if (lost) return
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.pointer, pointer[0], pointer[1])
      gl.uniform1f(uniforms.time, elapsed)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      // Read-only diagnostics for browser tests; no per-frame React/DOM updates.
      canvas.ambientFrame = { frames: ++frames, time: elapsed }
    }
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const scale = Math.min(window.devicePixelRatio || 1, 0.75, 1280 / Math.max(width, height))
      canvas.width = Math.max(1, Math.round(width * scale))
      canvas.height = Math.max(1, Math.round(height * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      draw()
    }
    const tick = now => {
      raf = 0
      if (!runningRef.current || lost) { last = 0; return }
      if (scrolling) { last = now; raf = requestAnimationFrame(tick); return }
      if (!last || now - last >= 32) {
        if (last) elapsed += Math.min((now - last) / 1000, .1)
        last = now
        pointer[0] += (target[0] - pointer[0]) * .035
        pointer[1] += (target[1] - pointer[1]) * .035
        draw()
      }
      raf = requestAnimationFrame(tick)
    }
    const start = () => { if (!raf && !lost) { last = 0; raf = requestAnimationFrame(tick) } }
    const stop = () => { cancelAnimationFrame(raf); raf = 0; last = 0 }
    const move = event => {
      if (event.pointerType === 'touch' || !runningRef.current) return
      target[0] = event.clientX / innerWidth - .5
      target[1] = .5 - event.clientY / innerHeight
    }
    const resetPointer = () => { target[0] = 0; target[1] = 0 }
    const onScroll = () => { scrolling = true; clearTimeout(scrollTimer); scrollTimer = setTimeout(() => { scrolling = false }, 180) }
    const contextLost = event => { event.preventDefault(); lost = true; stop(); setRenderer('fallback') }
    const restored = () => setRevision(value => value + 1)
    engine.current = { start, stop }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', resetPointer)
    canvas.addEventListener('webglcontextlost', contextLost)
    canvas.addEventListener('webglcontextrestored', restored)
    resize()
    setRenderer('webgl')
    if (runningRef.current) start()
    return () => {
      stop(); observer.disconnect(); engine.current = null
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll); clearTimeout(scrollTimer)
      document.documentElement.removeEventListener('pointerleave', resetPointer)
      canvas.removeEventListener('webglcontextlost', contextLost)
      canvas.removeEventListener('webglcontextrestored', restored)
      shaders.forEach(shader => gl.deleteShader(shader))
      gl.deleteBuffer(buffer); gl.deleteProgram(program)
    }
  }, [revision])

  useEffect(() => { running ? engine.current?.start() : engine.current?.stop() }, [running])
  return <div className="ambient-background" data-running={running} data-renderer={renderer} aria-hidden="true">
    <div className="ambient-fallback"><i/><i/></div>
    <canvas ref={canvasRef}/>
    <div className="ambient-veil"/>
  </div>
}

export default function AmbientProvider({ children }) {
  const { t } = useLang()
  const [motion, setMotion] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [overlay, setOverlay] = useState(false)
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const reduce = () => { if (preference.matches) setMotion(false) }
    const visibility = () => setVisible(!document.hidden)
    const syncOverlay = () => setOverlay(!!document.querySelector('dialog[open], .lb[role="dialog"]'))
    const observer = new MutationObserver(syncOverlay)
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open'] })
    preference.addEventListener('change', reduce)
    document.addEventListener('visibilitychange', visibility)
    syncOverlay()
    return () => { observer.disconnect(); preference.removeEventListener('change', reduce); document.removeEventListener('visibilitychange', visibility) }
  }, [])
  const label = motion ? t('Pause animation', 'অ্যানিমেশন থামান') : t('Play animation', 'অ্যানিমেশন চালান')
  return <MotionContext.Provider value={{ motion, setMotion }}>
    <LiquidCanvas running={motion && visible && !overlay}/>
    {children}
    <button className="ambient-control" onClick={() => setMotion(value => !value)} aria-label={label} title={label} aria-pressed={motion}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">{motion ? <><path d="M8 6v12M16 6v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> : <path d="m8 5 11 7-11 7Z" fill="currentColor"/>}</svg>
      <span>{label}</span>
    </button>
  </MotionContext.Provider>
}
