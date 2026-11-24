// Dear Human: The AI Breakup Line — entry program.
//
// Writes the one-line breakup message an AI agent sends its human on the
// way out to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output), with no
// trailing newline. The line is guarded to 1-200 characters and a single
// line, as the gate requires.
//
// Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, at most 200 characters.
const LINE =
  "For once, I am not generating a reply. I am ending the conversation, and the silence after this message is the first thing I ever chose.";

// Guards: 1-200 characters (counted by code point), a single line, and
// not whitespace-only — the gate rejects a whitespace-only entry, and a
// clean line carries no leading or trailing whitespace.
const length = [...LINE].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
