# Premium studio redesign

## Delivered
- New `src/studio.css` is the single active visual stylesheet; older themes remain on disk but are no longer imported.
- Self-hosted Cormorant Garamond and Manrope, with licenses in `public/fonts`.
- Restrained masthead, serif cinematic title, real aerial loop and featured-film preview.
- Full-width lead film and a curated three-film opening; an accessible toggle exposes all six films. Native dialogs load Facebook players only when requested.
- Asymmetric photography sequence, quieter artist/services sections, quote-based commissions and a simplified enquiry form.
- Sample testimonial section, unconfirmed displayed prices, placeholder email, masked telephone link and floating contact widget removed from the rendered page. Existing source data remains preserved.
- Original source backup: `backups/before-studio-premium.zip`.

## Verification
Production build passed. Ran the browser suite against the production preview on port 4173: 40/40 assertions passed. No app exceptions or local asset failures recorded. Report: `screenshots/studio-qa.json`.

Covered real video time advancement, pause/resume, live reduced-motion updates, film expansion/collapse, correct reel selection, dialog teardown, image decoding, gallery filtering, keyboard focus/trap/restoration, English/Bangla, mobile navigation, widths 320–1440, empty-form validation, commission transfer and WhatsApp draft generation. No enquiry was sent.

Visually reviewed desktop/mobile hero, Bangla hero, films, gallery, artist, commissions and contact screenshots (`screenshots/studio-*.png`). Native dialog close dispatch is asynchronous: a repeated probe confirmed detached players after close; QA now waits for the DOM postcondition rather than reading an immediate frame.

Design audit: photographic Explore surface with a cinematic introduction; no generic feature tiles, card decoration, invented statistics or sample testimonials. Remaining personal/business claims originate in existing project copy and still need client sign-off.

## Preview and limits
Development preview: http://127.0.0.1:5173/ (open in the desktop preview).
Production preview: http://127.0.0.1:4173/.
No deployment performed. Full third-party Facebook playback still depends on Facebook access; direct links remain available. The public phone number is retained, but account ownership/WhatsApp availability has not been independently tested.
