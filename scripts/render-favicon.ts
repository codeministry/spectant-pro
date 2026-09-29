// Renders public/favicon.ico (16, 32 and 48 px) from public/favicon.svg, the bare living ring on transparent.
// Chrome draws the SVG so the gradient matches the browser exactly; ImageMagick packs the sizes into the .ico.
// Needs Google Chrome and ImageMagick (`magick`).
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const CHROME =
  process.env.CHROME_BIN ??
  (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');

const svg = resolve(import.meta.dir, '../public/favicon.svg');
const out = resolve(import.meta.dir, '../public/favicon.ico');

const dir = await mkdtemp(join(tmpdir(), 'spectant-favicon-'));
const page = join(dir, 'favicon.html');
const raw = join(dir, 'favicon.png');

await Bun.write(
  page,
  `<!doctype html><html><head><style>html, body { margin: 0; background: transparent; }
img { display: block; width: 256px; height: 256px; }</style></head>
<body><img src="file://${svg}"></body></html>`,
);

const chrome = Bun.spawn(
  [
    CHROME,
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    '--default-background-color=00000000',
    '--window-size=256,256',
    `--screenshot=${raw}`,
    `file://${page}`,
  ],
  { stdout: 'ignore', stderr: 'ignore' },
);
if ((await chrome.exited) !== 0) throw new Error('chrome failed');

const ico = Bun.spawn(['magick', raw, '-define', 'icon:auto-resize=48,32,16', out]);
if ((await ico.exited) !== 0) throw new Error('magick failed');
console.log(`wrote ${out}`);
