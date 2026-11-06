# Wachael's Birthday Site
Static HTML/CSS/JS. No build step, no backend.

## Structure
- `index.html` page content · `css/style.css` design · `js/main.js` carousel, lightbox, fireworks, midnight unlock
- `images/` photos (photo-01.jpg …) · `assets/og.jpg` link-preview image

## Preview locally
Open `index.html`, or run `python3 -m http.server` in this folder and visit http://localhost:8000.
Add `?open` to the URL to preview the midnight surprise early.

## Change things (top of `js/main.js`)
- Name: `NAME` (the letter and title text live in `index.html`)
- Midnight unlock: `UNLOCK_AT` (viewer's local time, e.g. `2026-11-07T00:00:00`)
- Footer sign-off and the book cover text ("Happy Birthday / Click to open"): `index.html`. The handwriting font is Kalam (a Bradley Hand lookalike); change it in `.page` in `css/style.css`.
- Photos: put new files in `images/` as photo-17.jpg etc. and raise `PHOTO_COUNT`
- Colors: CSS variables at the top of `css/style.css` · Fonts: the Google Fonts link in `index.html`
- Music: not included. Add an `<audio>` element and a mute button if you want it.
- Link preview: in `index.html`, change `assets/og.jpg` in `og:image` to the full URL, e.g. `https://yourdomain.com/assets/og.jpg`.

## Resizing new photos
`mogrify -resize 1200x1600\> -quality 80 images/*.jpg` (ImageMagick), keeping each under about 400KB.

## Hosting on your domain
1. **Netlify / Cloudflare Pages:** drag this folder onto the dashboard, then Domain settings → add your domain. Add the DNS records they show (usually an A record for the root and a CNAME for `www`). HTTPS turns on automatically.
2. **GitHub Pages:** push the folder to a repo, Settings → Pages → deploy from `main`, add the custom domain, then add a CNAME record pointing to `<user>.github.io` and tick Enforce HTTPS.
3. **cPanel:** upload the contents to `public_html` via File Manager or FTP, then enable AutoSSL/Let's Encrypt.

## Sharing at midnight
Deploy the day before, set `UNLOCK_AT` to her birthday at 00:00, and send the link just before midnight. The surprise page opens by itself when the countdown ends.
