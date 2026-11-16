# date.

Minimal first-date journal, accessible at https://cydpixl.github.io/source-tester/date/.

## Features
- First-visit username and an interactive, blurred-background guided tour
- Unlimited-length story field, date, location and separate address
- Autosave with IndexedDB for full story and a shorter localStorage fallback
- Photos, videos, audio notes, drawings and other attachments, up to 50 per selection
- 5 GiB **file selection cap** (actual persistence is governed by browser available storage)
- Paste images, drag and drop files, capture photos/video from the camera
- Front/rear flip and available camera list from browser MediaDevices
- Browser speech recognition for dictation, and real mic voice notes
- GIF search through Wikimedia Commons API (option to enter a user-owned GIPHY API key), plus direct GIF URL
- Embedded YouTube, Vimeo and Spotify; other links are clickable cards
- Export/import JSON backups (media <=8MB per file, <=30MB total included)
- Responsive light, neutral UI with an interactive tutorial

## Data / privacy / storage
This is a **client-side browser journal**, not a shared cloud database. Nothing is uploaded to GitHub Pages or a server. Each device/browser has its own story, username and attachments. Clearing website data can delete these records; export backups frequently. Large attachments are excluded from the JSON backup. The browser may reject files long before 5 GiB due to quota or memory limits.

A genuinely shared cross-device journal and reliable 5GB remote uploads require a backend and object storage. For that, use a secured Cloudflare R2 Worker with resumable multipart upload, access controls/rate limits, and a database. GitHub Pages alone cannot provide those features.

## Camera compatibility
Camera access needs HTTPS and user permission. iOS Safari decides which physical lenses it exposes to the web; no web app can guarantee that all iPhone lenses are independently addressable. Device selector lists available MediaDevices entries after permission.

## Deployment
Static files. On a separate repository named `date`, publish its root with GitHub Pages to obtain `https://cydpixl.github.io/date/`.
