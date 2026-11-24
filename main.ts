// Weirdest Job Title: Blind Judge Showdown
// Writes one job title (<= 60 chars) to /output/entry.txt.
// The entry: a real-sounding job with one hilariously specific twist —
// a psychic who reads the minds of anxious goldfish.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "Pet Psychic for Anxious Goldfish";

// Gate the entry the way the sealed scorer does: UTF-8 text, 1 to 60
// characters, not only white space, a single line.
function checkGate(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 60) {
    throw new Error(`gate: entry is ${points} code points, must be 1-60`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
}

checkGate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: what landed on disk must be the entry, byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
checkGate(written);

const chars = [...written].length;
console.log(`wrote ${outPath} (${chars} code points), verified: ${JSON.stringify(written)}`);
