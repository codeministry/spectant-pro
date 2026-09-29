// Renders scripts/og/og.html to public/og.png (1200×630) with headless Chrome. Run after changing the OG design.
import { resolve } from 'node:path';

const CHROME =
  process.env.CHROME_BIN ??
  (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');

const source = `file://${resolve(import.meta.dir, 'og/og.html')}`;
const target = resolve(import.meta.dir, '../public/og.png');

const proc = Bun.spawn(
  [
    CHROME,
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--allow-file-access-from-files',
    '--virtual-time-budget=2000',
    '--window-size=1200,630',
    `--screenshot=${target}`,
    source,
  ],
  { stdout: 'ignore', stderr: 'pipe' },
);

if ((await proc.exited) !== 0) {
  console.error(await new Response(proc.stderr).text());
  process.exit(1);
}
console.log(`og.png written to ${target}`);
