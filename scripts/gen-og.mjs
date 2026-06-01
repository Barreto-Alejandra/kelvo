// One-off: rasterize the social share image to public/og.png.
// Run with: node scripts/gen-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0e1117"/>
      <stop offset="1" stop-color="#1b1430"/>
    </linearGradient>
    <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#818cf8"/>
      <stop offset="1" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g transform="translate(90,210)">
    <rect width="92" height="92" rx="22" fill="url(#logo)"/>
    <path d="M52 16 L26 56 H44 L42 84 L68 42 H50 Z" fill="#fff"/>
  </g>
  <text x="206" y="252" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="74" font-weight="800" fill="#ffffff">Kelvo</text>
  <text x="92" y="368" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="40" font-weight="600" fill="#c7cdff">Tiny web tools that just work.</text>
  <text x="92" y="430" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="29" fill="#9aa5b4">No signup · No upload · No tracking · 100% in your browser</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, 'public', 'og.png'));
console.log('Wrote public/og.png');
