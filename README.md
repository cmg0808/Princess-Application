# Princess Kingdom 👑

An enchanting fairytale kingdom of activities for toddlers ages 2–5 — a Royal
Tea Party & bakery, Royal Pet Spa, Magic Wand glitter sky, Shape & Gem
Sorter, Royal Ball dance floor, an interactive storybook, a crown decorator,
a coloring book with a Royal Art Gallery, dress-up, memory-matching puzzles,
bubble pop, a sparkle harp, and reward stickers — all playable **100%
offline** once installed.

## Activities

- 🎨 **Coloring Room** — fill, brush, and stamp fairytale scenes, then save
  finished pieces to the **Royal Art Gallery**
- 🖼️ **Royal Art Gallery** — browse, favorite, re-color, frame, and download
  saved coloring pages
- 👗 **Dress Up** — mix hair, dresses, tiaras, wands, pets, shoes and scenes
- 🧠 **Matching Puzzles**, 🫧 **Bubble Pop**, 🎵 **Sparkle Harp**
- 💃 **Royal Ball**, 📖 **Interactive Storybook**, 👑 **Crown Decorator**
- 🫖 **Tea Party**, 🐾 **Pet Spa**, 🪄 **Magic Wand**, 🔷 **Shape Sorter**
- ⭐ **Sticker Album** — earn stars and unlock collectible stickers across
  every activity

## Tech

- React 19 + TypeScript, built with Vite 6
- Tailwind CSS v4
- `vite-plugin-pwa` for offline support (installable, service-worker cached)
- Per-activity code-splitting (`React.lazy`) so the first paint only ships
  the home screen — each game downloads on demand and is cached for offline
  play afterward
- All progress (stickers, stars, saved gallery art) is stored locally via
  `localStorage` — no account, no network calls, no tracking

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:3000`).

## Build

```bash
npm run build   # production build to dist/
npm run preview # preview the production build locally
```

## Type-check

```bash
npm run lint
```
