# Full-screen liquid-glass portfolio

Light macOS-inspired web interpretation, not a native interface or exact OS replica.

## Active implementation
- `src/components/AmbientBackground.jsx`: one fixed, viewport-sized WebGL canvas behind the entire site. Procedurally shaded pearl/ice/silver folds, fine reflective edges, soft moving light and gently eased pointer response. No decorative footage or background media downloads.
- `src/App.jsx`: shared ambient provider outside the hero; the same wallpaper remains visible and animated through films, photos, about, services, commissions, contact and footer.
- `src/components/Hero.jsx`: retains authentic still preview and on-demand film viewing. Its pause button shares state with a persistent bilingual pause control accessible while scrolling.
- `src/liquid-glass.css`: sole active stylesheet. Glass panels, system typography and a CSS fallback when WebGL is unavailable. Existing no-blur/reduced-transparency treatments retained.
- Reduced motion and save-data disable motion initially; changing to reduced motion stops rendering. Hidden-page and open film/gallery overlay states suspend the background. Scrolling past the hero does not suspend it.
- Rendering uses a single triangle, bounded pixel density, an approximately 30fps scheduling ceiling, no per-frame React updates, and explicit resource cleanup/context-restoration handling. Actual frame rate depends on GPU and glass compositing; 60fps is not claimed.
- Backup: `backups/before-fullscreen-liquid.zip`.

## Verification
Production build passed. Chrome browser suite against port 4173 passed **82/82** assertions after restoring discoverable services and clearly labelled sample BDT pricing; report: `screenshots/pricing-qa.json`. See `PRICING.md` for rates requiring approval.

Verified:
- Shader compilation, rendered pixel changes and advancing frames.
- Full viewport coverage and continued animation at six sections below the hero.
- Pause/resume synchronization, frame suspension while paused, live reduced-motion changes, film-dialog suspension and no-WebGL fallback.
- Mobile coverage and persistent 44px pause control.
- Original gallery, film collection, native-dialog cleanup, keyboard focus, language switch, responsive widths, client images, form validation and commission selection.
- No app exceptions, failed local asset responses or MP4/WebM background requests.

Reviewed desktop/mobile hero and settled mobile gallery screenshots. Scroll assertions wait for actual frame progress rather than assuming a new frame within 150ms; screenshots wait for reveal transitions to settle. Headless Intel GPU probes showed variable performance under backdrop-filter load; performance is not certified across devices.

No WhatsApp message sent. Facebook iframe mounting does not verify full remote playback. Tested in Chrome, not Safari or every device. No deployment performed.

Preview: http://127.0.0.1:5173/
Production preview: http://127.0.0.1:4173/
