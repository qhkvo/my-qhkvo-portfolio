// Generates flat-colour SVG placeholders into public/images.
// Run with `npm run placeholders`. Safe to delete once real photos exist.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const C = {
  blue: '#2f5bd3', sky: '#3a86d6', red: '#d8261c', green: '#1f8a3b',
  black: '#111111', wood: '#8a5a2b', cream: '#efe9dc', grey: '#cfcfcf', white: '#ffffff',
};

let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>\n`;

const label = (w, h, text, color) =>
  `<text x="${w * 0.06}" y="${h * 0.92}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(h * 0.045)}" fill="${color}">${text}</text>`;

const motifs = {
  sunburst(w, h, bg, fg) {
    let s = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
    const cx = w / 2, cy = h * 0.45, R = Math.max(w, h);
    for (let i = 0; i < 90; i++) {
      const a = (i / 90) * Math.PI * 2;
      s += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * R}" y2="${cy + Math.sin(a) * R}" stroke="${fg}" stroke-width="2" opacity="0.55"/>`;
    }
    return s + `<circle cx="${cx}" cy="${cy}" r="${w * 0.04}" fill="${fg}"/>`;
  },
  wood(w, h) {
    let s = `<rect width="${w}" height="${h}" fill="${C.wood}"/>`;
    const tones = ['#5b3518', '#a8743f', '#3e2410', '#c48d52', '#704220'];
    for (let x = 0; x < w; ) {
      const bw = 6 + rand() * 30;
      s += `<rect x="${x}" y="0" width="${bw}" height="${h}" fill="${tones[Math.floor(rand() * tones.length)]}"/>`;
      x += bw;
    }
    return s + `<rect x="${w * 0.12}" y="${h * 0.38}" width="${w * 0.76}" height="${h * 0.5}" fill="${C.cream}"/>`
      + `<rect x="${w * 0.3}" y="${h * 0.46}" width="${w * 0.4}" height="${h * 0.34}" fill="#2a2a2a"/>`;
  },
  grid(w, h, bg, fg) {
    let s = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
    const n = 4, size = Math.min(w, h) * 0.6, cell = size / n, ox = (w - size) / 2, oy = (h - size) / 2;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++)
      s += `<rect x="${ox + c * cell + 4}" y="${oy + r * cell + 4}" width="${cell - 8}" height="${cell - 8}" fill="${fg}" opacity="${0.5 + rand() * 0.5}"/>`;
    return s;
  },
  circle(w, h, bg, fg) {
    return `<rect width="${w}" height="${h}" fill="${bg}"/><circle cx="${w / 2}" cy="${h * 0.45}" r="${Math.min(w, h) * 0.28}" fill="${fg}"/>`;
  },
  bars(w, h, bg, fg) {
    let s = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
    for (let i = 0; i < 7; i++) {
      const bh = h * (0.15 + rand() * 0.55);
      s += `<rect x="${w * (0.12 + i * 0.11)}" y="${h * 0.8 - bh}" width="${w * 0.07}" height="${bh}" fill="${fg}"/>`;
    }
    return s;
  },
  band(w, h, bg, fg) {
    return `<rect width="${w}" height="${h}" fill="${bg}"/><rect x="${w * 0.45}" y="${h * 0.08}" width="${w * 0.1}" height="${h * 0.6}" fill="${fg}"/><circle cx="${w * 0.08}" cy="${h * 0.08}" r="${w * 0.025}" fill="${fg}"/>`;
  },
};

const palettes = [
  ['sunburst', C.blue, C.white], ['grid', C.black, C.white], ['band', C.green, C.black],
  ['circle', C.red, C.cream], ['wood'], ['bars', C.sky, C.white], ['circle', C.black, C.red],
  ['grid', C.cream, C.blue], ['sunburst', C.red, C.cream], ['bars', C.green, C.cream],
];

function make(path, w, h, i, text) {
  const [m, bg, fg] = palettes[i % palettes.length];
  const textColor = bg === C.cream || bg === C.white ? C.black : C.white;
  const out = `public/images/${path}`;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg(w, h, motifs[m](w, h, bg, fg) + (text ? label(w, h, text, m === 'wood' ? C.cream : textColor) : '')));
}

// Projects: portrait covers (3:4) + landscape gallery (3:2)
const projects = [
  ['transit-routing-engine', 'Transit Routing', 6],
  ['ai-test-coverage-analyzer', 'AI Test Coverage', 0],
  ['safe-walkie', 'Safe Walkie', 2],
  ['fighter-drones', 'Fighter Drones', 1],
  ['little-eye', 'Little Eye', 8],
  ['autograder', 'Autograder', 4],
];
projects.forEach(([slug, title, start]) => {
  make(`projects/${slug}/cover.svg`, 600, 800, start, title);
  for (let g = 1; g <= 3; g++) make(`projects/${slug}/gallery-${g}.svg`, 1200, 800, start + g, `${title} - ${g}`);
});

// Experience: 4 co-ops × 4 photos (3:2)
[['ciena-2026', 'Ciena']].forEach(([id, name], k) => {
  for (let p = 1; p <= 4; p++) make(`experience/${id}/${p}.svg`, 1200, 800, k * 3 + p, `${name} - photo ${p}`);
});

// Uni life (4:3), 3 photos per item
['uottahack8', 'technolhack2025', 'quantum-society', 'visa', 'teaching-assistant', 'student-ambassador'].forEach((id, k) => {
  for (let n = 1; n <= 3; n++) make(`uni-life/${id}/${n}.svg`, 1200, 900, k * 3 + n, `${id} - ${n}`);
});


console.log('Placeholders written to public/images/');
