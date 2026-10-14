# Expanded client media collection

## Collection
- 16 distinct optimized client photographs: 8 original selections plus 8 additions. Categories: 6 production, 5 documentary, 3 landscape, 2 aerial-production images.
- 8 film cards, all visible without an expansion action: the original 6 plus a garment documentary shoot and a Bangla drama trailer.
- The two new films play locally with native controls, original aspect ratios and audio. They are downloaded only when opened. Existing six films retain on-demand Facebook players. All films retain direct original-source links.
- Local additions: `public/videos/reel-1247393600662005.mp4` and `public/videos/reel-945359991032245.mp4`, H.264/AAC with faststart. Original collaborator/source credits preserved in labels and provenance.
- Full-screen generated liquid-glass animation remains unchanged. The old aerial background file is retained on disk but is not used as background footage.

## Sources and curation
Client-authorized public media from Rasel Hossain's profile; not an exhaustive export. Additional full-size photos inspected from public photo pages and optimized to WebP up to 1600px. Excluded unrelated family/personal and explicitly AI-labelled media. Source URLs, original descriptions, uploader, dimensions and derivatives are recorded in `media-sources.json`. Descriptive film titles are editorial labels, not invented project commissions. The drama source caption names ZRITV; garment-documentary source credits Photo Click.

## Verification
Production build passed; `screenshots/expanded-qa.json`: 73/73 checks passed. Verified all 16 unique gallery assets, all eight visible film cards, both new local videos actually advancing during playback, controls, source links, close/unmount, no eager video downloads, all local image decodes, filters, keyboard lightbox, responsive layouts, language switching, contact form and full-screen animation regression checks. No app exceptions or failed local asset responses.

No WhatsApp message sent. Facebook iframe mounting does not verify complete third-party playback. Tested in Chrome, not all browsers/devices. No deployment performed.

## Recovery
Pre-expansion source and provenance: `backups/before-expanded-media.zip`. Scratch originals and discovery manifests remain outside the deployed site.
