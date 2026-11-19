import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Brand Guideline v8.7: only the brand palette (Canvas, Midnight, white and the
 * 12-step Neutral, Periwinkle, Teal and Gold scales) plus the guideline's
 * semantic Sí/No colors. WhatsApp keeps its own greens by product decision.
 */
const SCALES = {
  base: ['f4f6ff', '0a0c1a', 'ffffff'],
  neutral: ['f2f3f6', 'edeff5', 'e3e5ef', 'd9dcea', 'd1d5e5', 'c8cce0', 'bbc1d9', 'a7adcc', '7a7f9c', '6f7591', '525770', '1c1e2e'],
  periwinkle: ['f9faff', 'eef0fd', 'e1e4fd', 'd2d7fc', 'c3c9fc', 'b4bafc', 'a5abfc', '969bfc', '8a8ef9', '777ae3', '5a5bb6', '303163'],
  teal: ['f6fbfb', 'eaf8f6', 'dbf4f0', 'c9f0eb', 'b5ebe5', '9fe7df', '85e2d8', '66ddd2', '44d4c8', '21bfb4', '007872', '004441'],
  gold: ['fcfaf5', 'fcf6ea', 'fcf0db', 'fdebc9', 'fde4b5', 'fedea0', 'ffd688', 'ffcf70', 'f9c24d', 'e8aa36', '9a6000', '593600'],
  semantic: ['9b1c1c', 'fde2e2', '14532d', 'dff3e6'],
};
const PALETTE = new Set(Object.values(SCALES).flat());
const WHATSAPP = new Set(['25d366', '075e54', 'd9fdd3', 'e7fce9']);

const ROOT = path.resolve(process.cwd());
const SRC = path.join(ROOT, 'src');

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    if (!/\.(tsx|ts|css)$/.test(entry.name) || /\.(spec|test)\.tsx?$/.test(entry.name)) return [];
    return [full];
  });
}

const FILES = [...sourceFiles(SRC), path.join(ROOT, 'index.html')];

describe('paleta del brand book', () => {
  it('solo usa colores de la paleta (más los verdes de WhatsApp)', () => {
    const offenders: string[] = [];
    for (const file of FILES) {
      const text = fs.readFileSync(file, 'utf8');
      const isWhatsApp = file.endsWith('WhatsAppWidget.tsx');
      for (const match of text.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
        const hex = match[1].toLowerCase();
        if (PALETTE.has(hex) || (isWhatsApp && WHATSAPP.has(hex))) continue;
        offenders.push(`${path.relative(ROOT, file)}: #${hex}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('no aclara textos con opacidad (genera tonos fuera de paleta)', () => {
    const offenders: string[] = [];
    for (const file of FILES) {
      const text = fs.readFileSync(file, 'utf8');
      for (const match of text.matchAll(/text-\[#[0-9a-fA-F]{6}\]\/\d+/g)) {
        offenders.push(`${path.relative(ROOT, file)}: ${match[0]}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
