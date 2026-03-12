# Personal Website V5

Landing page for [photocat.blue](https://photocat.blue). The site presents two personas — human (programming/career) and furry (photography/fandom) — and lets visitors pick which side they want. Fifth version of the personal site.

## What's in here

```
index.html       main page
404.html         custom error page
style.css        flexbox layout, CSS custom properties for theming
script.js        hover splits, theme switching, language detection, animations
assets/
  languages.json  translations (en, zh-TW, zh-CN)
  img/            favicons, profile photo
devscript/
  screenshot.js   puppeteer script — generates the og:image at build time
  favicon-convert.mjs  svg → png favicon conversion
```

Config files: `eslint.config.js`, `.stylelintrc.json`. No framework, no bundler. Just HTML, CSS, and vanilla JS.

## Run locally

```bash
npx http-server
```

Or just open `index.html` directly in a browser — it works without a server.

## Lint

```bash
npm run lint
```

That runs eslint, htmlhint, and stylelint in sequence. Or individually:

```bash
npx eslint .
npx htmlhint index.html
npx stylelint style.css
```

## Build

```bash
npm run build
```

Minifies HTML, CSS, and JS (terser, clean-css, html-minifier-terser) into `dist/`. The deploy workflow runs this automatically on push to `main`.

## Deploy

GitHub Actions handles it. On push to `main`:

1. Spins up a local http-server
2. Takes a 1200×600 screenshot with Puppeteer (used for og:image)
3. Runs `npm run build`
4. Pushes `dist/` to GitHub Pages

## Features worth noting

**Hover split** — on desktop, hovering the left third expands the human side; the right third expands the furry side. CSS transitions handle the animation.

**Themes** — light, dark, and system. Preference is saved to localStorage. Built with CSS custom properties, so switching is a single class change on the root.

**Language detection** — reads `navigator.language` and maps it to one of three translations (en, zh-TW, zh-CN) stored in `assets/languages.json`. Falls back to English.

**Accessibility** — skip-to-content link, keyboard navigation through the theme dropdown, focus rings, 44px minimum tap targets on mobile, `prefers-reduced-motion` respected throughout.
