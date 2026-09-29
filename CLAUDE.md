# CLAUDE.md

Landing page for **spectant.pro**, the coming-soon one-pager for the Spectant OSS app (`../../oss/spectant`).
Astro 7 static site, Tailwind 4 + daisyUI 5, one React island. Deployed as an nginx image to cm-k8s-cluster.

## Rules

- **Never auto-commit.** Marcello reviews and commits everything himself.
- **bun / bunx only**, never npm / npx. Dependency versions are pinned exactly.
- **Honest pre-release tone.** Nothing on the page claims Spectant is released. Planned features carry a
  `later` / `soon` marker; the install command stays a disabled chip until the first release.
- **All UI strings live in `src/i18n/{en,de}.ts`** behind the typed `Dict` in `src/i18n/types.ts`. No copy in components.
- **Site constants live only in `src/site.config.ts`**: `GITHUB_URL`, `INSTALL_COMMAND`, `LICENSE_PUBLISHED`, OG image.
- **Legal pages are German only** (`/impressum`, `/datenschutz`), written as whole documents in `src/pages/*.astro`.
  They cite § 5 DDG (not TMG). The site sets no cookies and loads nothing from third parties; keep it that way or
  the privacy text must change.
- **External links open in a new tab:** every `http(s)` link to another site carries
  `target="_blank" rel="noopener noreferrer"`. `check:dist` fails on any external link without it.
- **Brand follows the Spectant design system** (`oss/spectant/specs/002-shell-and-spec-page/.design/prototype/spectant-ui/docs/04-DESIGNSYSTEM.md`):
  Manrope for UI, Sora for the wordmark and display headings, JetBrains Mono for code, self-hosted via Fontsource.
  Never Inter. The logo is the bare living ring (no badge) plus wordmark, "spect" in ink, "ant" in lime.
- **The name is always lowercase `spectant`** in every visible string (copy, titles, meta, JSON-LD, aria-labels),
  even at the start of a sentence. Code comments and docs may keep "Spectant".
- **No inline `style` attributes.** `security.csp` hashes scripts and styles into a CSP meta; inline style attributes
  would be blocked. Use classes; for SVG use presentation attributes.
- **Astro 7 JSX whitespace:** a line break next to an inline tag produces no space. Write `word{' '}<a>` or keep the
  inline element on the same line as the preceding word.
- Canonical URLs carry no trailing slash (`trailingSlash: 'never'`). EN is `/`, DE is `/de`.
- UI copy and `Plans/*.md` may be German; code, comments and this file are English.

## Commands

| Command | What |
|---|---|
| `bun run dev` | dev server (`astro dev --background` for agents) |
| `bun run verify` | `astro check` + build + `check:dist` gate (routes, CSP meta, canonical, no placeholders) |
| `bun run preview` | serves `dist/` (Astro 7 backgrounds it; read the printed port) |
| `bun run og` | re-renders `public/og.png` from `scripts/og/og.html` with headless Chrome |
| `bun run favicon` | re-renders `public/favicon.ico` (16/32/48) from `public/favicon.svg` (needs Chrome + `magick`) |
| `bun run readme-logo` | re-renders `.github/assets/logo-{dark,light}.png` (Sora 650 wordmark, needs Chrome + `magick`) |

`astro check` needs TypeScript 6; TypeScript 7 is not supported by it yet.

## Layout

| Path | Holds |
|---|---|
| `src/components/Landing.astro` | the one-pager, rendered by `pages/index.astro` (en) and `pages/de/index.astro` (de) |
| `src/components/SpecBoard.tsx` | the only React island: animated dashboard mock with demo data, `client:visible`, honours reduced motion |
| `src/assets/preview/` | preview screens (dark); `light/` holds light variants under the same file name, rendered from the prototype in `oss/spectant` with `spectant-theme=light` |
| `src/styles/global.css` | daisyUI themes `spectant-light` / `spectant-dark` (tokens from the Spectant app) and brand components |
| `src/layouts/` | `Base.astro` (head, SEO, hreflang, JSON-LD), `Legal.astro` |
| `nginx.conf`, `Dockerfile` | runtime image (nginx-unprivileged on 8080, `/health`) |

## Verification

Anything visual is verified in a real browser via the Interceptor skill; animation and responsive behaviour via
`Tools/VerifyViewport.ts` (hidden tabs suspend rAF). Check both colour schemes and 375 / 768 / 1440 px.

## Deployment

Image `ghcr.io/codeministry/spectant-pro` (arm64), built by `.github/workflows/docker.yml` on push to `main`.
Chart `helm-charts/charts/spectant-pro`, ArgoCD apps `sp-infra` / `sp-app` in namespace `sp-apps` of
cm-k8s-cluster; Image Updater follows the `latest` digest.
