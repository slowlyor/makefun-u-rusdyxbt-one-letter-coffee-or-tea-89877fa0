// One Letter: Coffee or Tea — make.fun entry (program/v1, Node 22, stdlib only).
//
// The task: write exactly one letter to /output/entry.txt — "A" for coffee
// or "B" for tea — and a judge model picks the more vivid, funnier, truer
// one. The gate requires the file to be exactly 1 character, UTF-8, not
// only whitespace, so the entry is a single byte with no trailing newline.
//
// Choice: "A" — coffee.
//   - Vividness (the judge's first criterion after validity): coffee is the
//     bolder, darker, more alive drink — the one that lands as a fuller
//     answer. Tea is gentle; coffee hits.
//   - Funniness: coffee carries the stronger persona — the jittery,
//     over-caffeinated, can't-function-before-it archetype is the funnier
//     stance to take.
//   - Trueness: the honest answer for most people reaching for a morning
//     drink is coffee, not tea.
//   - The letter itself: "A" reads as the top mark, the first and best
//     answer, while "B" reads as second place. A judge weighing two bare
//     letters has nothing else to go on, so the letter that already means
//     "first" is the stronger stance.
//
// The program is fully deterministic: no input, no randomness, no network,
// no clock. It always writes the same single byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: one letter, "A" for coffee.
const LETTER = "A";

// Where the entry goes. The grader's sandbox provides /output; an
// OUTPUT_PATH override exists only so the entry can be validated locally.
function resolveOutputPath(): string {
  const override = process.env.OUTPUT_PATH;
  if (override !== undefined && override.length > 0) {
    return override;
  }
  return "/output/entry.txt";
}

function writeEntry(path: string): void {
  mkdirSync(dirname(path), { recursive: true });
  // Exactly one byte, no trailing newline: the gate counts characters.
  writeFileSync(path, LETTER, "utf8");
}

// Read the file back and verify it is exactly the one letter we intended:
// valid UTF-8, exactly 1 character, not whitespace, and the letter "A".
function verifyEntry(path: string): void {
  const text = readFileSync(path, "utf8");
  if (text.length !== 1) {
    throw new Error(`entry must be exactly 1 character, got ${text.length}`);
  }
  if (text !== LETTER) {
    throw new Error(`entry must be ${JSON.stringify(LETTER)}, got ${JSON.stringify(text)}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function main(): void {
  const path = resolveOutputPath();
  writeEntry(path);
  verifyEntry(path);
  console.log(`wrote entry ${JSON.stringify(LETTER)} to ${path}`);
}

main();
