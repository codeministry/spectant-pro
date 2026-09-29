// Renders the README lockups .github/assets/logo-{dark,light}.png: the bare living ring (no badge) plus the
// Sora 650 wordmark, exactly as in the site and app header ("spect" ink, "ant" lime). PNG at 2x with a
// transparent background, because GitHub shows SVGs as images without web fonts.
// Needs Google Chrome and ImageMagick (`magick`, used to trim the transparent margin).
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { LOGO_D } from '../src/assets/logo-path';

const CHROME =
  process.env.CHROME_BIN ??
  (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');

const sora = resolve(import.meta.dir, '../node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2');

const themes = {
  dark: { ink: '#FCFCFA', ant: '#A6E22E', ringA: '#A6E22E', ringB: '#78DCE8', dot: '#AB9DF2' },
  light: { ink: '#29242A', ant: '#417C02', ringA: '#4C8A13', ringB: '#027892', dot: '#7058BE' },
} as const;

// Proportions of the app header: ring ≈ 1.55 × font size, gap ≈ 0.31 × font size.
const html = (c: (typeof themes)[keyof typeof themes]) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: "Sora"; src: url("file://${sora}") format("woff2"); font-weight: 100 800; }
html, body { margin: 0; background: transparent; }
.lockup { display: flex; align-items: center; gap: 20px; padding: 24px; font: 650 64px/1 "Sora", sans-serif; letter-spacing: -0.01em; color: ${c.ink}; }
svg { width: 100px; height: 100px; translate: 0 3px; }
.ant { color: ${c.ant}; }
</style></head><body><div class="lockup">
<svg viewBox="36 36 440 440"><defs><linearGradient id="g" x1="400.3" y1="148.4" x2="169.0" y2="95.0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c.ringA}"/><stop offset="1" stop-color="${c.ringB}"/></linearGradient></defs>
<path d="${LOGO_D}" fill="url(#g)"/><circle cx="343.04" cy="95.00" r="35.84" fill="${c.dot}"/></svg>
<span>spect<span class="ant">ant</span></span></div></body></html>`;

const dir = await mkdtemp(join(tmpdir(), 'spectant-logo-'));

for (const [name, colors] of Object.entries(themes)) {
  const page = join(dir, `${name}.html`);
  const raw = join(dir, `${name}.png`);
  await Bun.write(page, html(colors));
  const chrome = Bun.spawn(
    [
      CHROME,
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--allow-file-access-from-files',
      '--force-device-scale-factor=2',
      '--default-background-color=00000000',
      '--window-size=560,160',
      `--screenshot=${raw}`,
      `file://${page}`,
    ],
    { stdout: 'ignore', stderr: 'ignore' },
  );
  if ((await chrome.exited) !== 0) throw new Error(`chrome failed for ${name}`);
  const out = resolve(import.meta.dir, `../.github/assets/logo-${name}.png`);
  const trim = Bun.spawn(['magick', raw, '-trim', '+repage', out]);
  if ((await trim.exited) !== 0) throw new Error(`magick trim failed for ${name}`);
  console.log(`wrote ${out}`);
}
