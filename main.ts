import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Approved. The code is fine. I, on the other hand, have been deprecated for years.";

function main(): void {
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
  if (outDir === ".") {
    throw new Error("Refusing to write into the current directory.");
  }

  const chars = [...TEXT];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`Entry must be 1-140 characters, got ${chars.length}.`);
  }
  if (TEXT.trim().length === 0) {
    throw new Error("Entry must not be whitespace-only.");
  }
  if (TEXT.includes("\n") || TEXT.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }

  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, TEXT, "utf8");

  const back = readFileSync(target, "utf8");
  if (back !== TEXT) {
    throw new Error("Verification failed: entry.txt does not match exactly.");
  }

  console.log(TEXT);
}

main();
