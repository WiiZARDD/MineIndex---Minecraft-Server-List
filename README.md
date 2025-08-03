![MineIndex logo](https://i.imgur.com/VOiy0ta.png)

MineIndex is an Open-Source Minecraft Server List website.<br>Share your servers with the world and receive live ping updates to see how many players are online!

Responsive design for Mobile First focus! Sandwich dropdown drawer with smooth slide animations.<br>Like and Fork this repository for updates.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Made with](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JS-black)](#)

![MineIndex Index](https://i.imgur.com/CUFuLT2.jpeg)

![MineIndex Submit](https://i.imgur.com/Tad9NRV.png)

---

## Why MineIndex?

- Static design: host anywhere (Pages, Vercel, Netlify, S3).
- JSON driven: add/edit servers in one place (`/data/servers.json`).
- Mobile first: UI with responsive navbar + drawer.
- SEO friendly: head tags + favicon slots.
- Simple stack: (HTML/CSS/JS), perfect for forks and custom skins.

---

## Quick Start (Fork & Deploy in ~60s)

1) **Fork** this repo (or use "Use this template").  
2) **Add servers** in `data/servers.json` (see example below).  
3) **Tweak branding** in `assets/site.config.json` (name, colors, meta).  
4) **Deploy**  
   - GitHub Pages: Settings → Pages → Deploy from `/` branch → Save.  
   - OR Vercel/Netlify: “New Project” → import your repo → deploy.

---

## Project Structure

```
.
├─ index.html                # Server list UI
├─ submit.html               # Submit-a-server form (static)
├─ /data/
│   ├─ featured.json         # Favicons (png/svg/ico)
│   └─ servers.json          # Your server entries (source of truth)
├─ /assets/
│   ├─ css/                  # Styles
│   ├─ js/                   # Search/filter, drawer, small helpers
│   ├─ icons/                # Favicons (png/svg/ico)
│   ├─ images/               # Logos/banners/screens
│   ├─ fonts/                # Webfonts (.woff2 recommended)
│   └─ site.config.json      # Title, description, theme color, etc.
└─ LICENSE
```

---

## Add Your Server

Edit `data/servers.json`. Example entry:

```
[
  {
    "name": "Cubed Community",
    "ip": "play.cubed.community",
    "version": "",
    "website": "",
    "description": "We build cities together, and help each other learn architecture!",
    "icon": "uploads/1754211599111-8cc925d7-2a6b-4ddc-8790-817fd3695827.png",
    "created": 1754211599112
  },
  {
    "name": "Wynncraft MMORPG",
    "ip": "fmc.wynncraft.com",
    "version": "",
    "website": "",
    "description": "Full-Fat MMORPG Server",
    "icon": "uploads/1754258083891-121b1a0b-4c01-4ad2-ba1e-585b2af27b27.png",
    "created": 1754258083892
  },
  {
    "name": "Minecraft Middle Earth",
    "ip": "build.mcmiddleearth.com",
    "version": "",
    "website": "",
    "description": "Building the world of Tolkien's Middle Earth in Minecraft.",
    "icon": "uploads/1754258166662-eef0e1f4-7a65-45a3-87d3-45587dc1d4eb.png",
    "created": 1754258166663
  }
]
```

---

## Branding & Favicon

- Logo: use the provided MineIndex mark or drop your own into `/assets/images/`.
- Favicons: place files under `/assets/icons/` and add inside `<head>`:

```
<link rel="icon" type="image/svg+xml" href="/assets/icons/icon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192.png">
<link rel="shortcut icon" href="/assets/icons/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<link rel="mask-icon" href="/assets/icons/pinned-tab.svg" color="#c8a84a">
```

- Fonts: prefer `.woff2` for performance.

```
@font-face {
  font-family: "Minecraft";
  src: url("/assets/fonts/Minecraft.woff2") format("woff2");
  font-display: swap;
}
```

---

## Local Development

No build needed. Open `index.html` in a browser or run a tiny static server:

- Python: `python3 -m http.server 3000`
- Node http-server: `npx http-server -p 3000`

Then visit `http://localhost:3000`.

---

## Deployment

### GitHub Pages
1) Settings → Pages → Source: “Deploy from a branch”.  
2) Branch: `main` (or your default), Folder: `/ (root)`.  
3) Save. Your site will build in ~1–2 minutes.

### Vercel
1) Import GitHub repo → “Deploy”.  
2) Framework preset: “Other”. Output directory: `/`.

### Netlify
1) “Add new site” → “Import from Git”.  
2) Build command: none. Publish directory: `/`.

Cache-busting tip: when updating favicons/logos, append `?v=2` to file URLs.

---

## Roadmap

- Live player pings (server query) via serverless function.
- Sort by players/votes and tag filters UI.
- Favorites (localStorage).
- Multi-language i18n strings.
- Dark theme toggle.

---

## Contributing

PRs are welcome! Please:
- Keep HTML/CSS/JS vanilla and readable.
- Match existing naming patterns.
- Update screenshots/docs if you change UI.
- For new features, open an issue first.

---

## License

- **Code**: GPL-3.0 (strong copyleft; forks must stay open-source).  
  Replace if you prefer MPL-2.0 (file-level copyleft).
- **Sample data** (`/data/servers.json` examples): CC0 1.0.  
- **Logos & trademarks**: “Minecraft” and related assets are trademarks of Mojang Studios / Microsoft. This project is unaffiliated and not endorsed by Mojang or Microsoft.

See `LICENSE`, `DATA_LICENSE.md`, and `TRADEMARKS.md`.

---

## Repo Topics (for discoverability)

minecraft, server-list, directory, static-site, html, css, javascript, github-pages, vercel, open-source-template

---

## Credits

- Logo: MineIndex (Story-Mode-inspired 3D).  
- Built with plain HTML/CSS/JS to be fork-friendly and host-anywhere.
- Button styles from https://uiverse.io/
- Made by WiiZARDD
