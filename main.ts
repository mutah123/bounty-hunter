// Bounty Hunter ($HUNT) — make.fun coin-promo entry.
// Node 22, standard library only, no network, no clock.
// The entry is the coin itself: this program only hands the house
// the launch record. It reads LAUNCH.json (mint + create signature)
// from the repository root and writes the same bytes to
// /output/LAUNCH.json, where the gate reads it. Run twice, it
// writes the same bytes twice, because the file never changes.
//
// Local run (mirrors the grader):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const launchPath = join(botDir, 'LAUNCH.json');
const raw = readFileSync(launchPath, 'utf8');

// Parse once so a broken LAUNCH.json fails loudly here, in our own
// run, instead of silently shipping bad bytes to the gate.
const record = JSON.parse(raw);
if (typeof record.mint !== 'string' || typeof record.create_signature !== 'string') {
  throw new Error('LAUNCH.json must hold a mint and a create_signature string');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'LAUNCH.json'), raw);
