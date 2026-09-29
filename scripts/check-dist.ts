// Post-build gate: every route and SEO file exists, and no placeholder or TODO leaked into the HTML.
import { Glob } from 'bun';

const DIST = 'dist';
const REQUIRED = [
  'index.html',
  'de/index.html',
  'impressum/index.html',
  'datenschutz/index.html',
  '404.html',
  'sitemap-index.xml',
  'robots.txt',
  'og.png',
  'favicon.svg',
];
const FORBIDDEN = [/\bTODO\b/, /\{\{/, /lorem ipsum/i, /<org>/];

const failures: string[] = [];

for (const file of REQUIRED) {
  if (!(await Bun.file(`${DIST}/${file}`).exists())) failures.push(`missing: ${file}`);
}

for await (const file of new Glob('**/*.html').scan(DIST)) {
  const html = await Bun.file(`${DIST}/${file}`).text();
  for (const pattern of FORBIDDEN) {
    if (pattern.test(html)) failures.push(`${file}: contains ${pattern}`);
  }
  if (!html.includes('http-equiv="content-security-policy"')) failures.push(`${file}: no CSP meta`);
  if (!file.startsWith('404') && !html.includes('rel="canonical"')) failures.push(`${file}: no canonical`);
  // External links open in a new tab; own-domain links stay in the same tab.
  for (const [tag] of html.matchAll(/<a\b[^>]*href="https?:\/\/(?!spectant\.pro)[^"]*"[^>]*>/g)) {
    if (!tag.includes('target="_blank"') || !tag.includes('noopener')) failures.push(`${file}: external link ${tag}`);
  }
}

if (failures.length > 0) {
  console.error(`check:dist failed\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`check:dist ok (${REQUIRED.length} required files, all HTML scanned)`);
