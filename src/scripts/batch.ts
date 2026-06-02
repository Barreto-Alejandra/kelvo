// Kelvo Pro — batch image processing + ZIP, 100% in the browser.
// Each image tool supplies a `processOne()` that turns a File into a named Blob.
// This module runs them one at a time (so memory stays bounded even for large
// batches), bundles the outputs into a single ZIP with fflate, and triggers one
// download. Nothing is ever uploaded — same privacy guarantee as the free tools.
import { zipSync } from 'fflate';
import { triggerDownload } from './image-utils';

export interface BatchOutput {
  /** File name to use inside the ZIP. */
  name: string;
  blob: Blob;
}

/** Hard cap so a careless drop of thousands of files can't crash the tab. */
export const MAX_BATCH = 100;

/** Ensure every entry in the ZIP has a unique name (adds -2, -3, … on clash). */
function uniqueName(name: string, used: Set<string>): string {
  if (!used.has(name)) return name;
  const dot = name.lastIndexOf('.');
  const stem = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : '';
  let i = 2;
  while (used.has(`${stem}-${i}${ext}`)) i++;
  return `${stem}-${i}${ext}`;
}

/**
 * Process every file through `processOne`, bundle the outputs into a ZIP and
 * download it. Failures are skipped (one bad file never sinks the batch) and
 * reported via the returned counts.
 */
export async function processToZip(
  files: File[],
  processOne: (file: File) => Promise<BatchOutput>,
  zipName: string,
  onProgress?: (done: number, total: number) => void,
): Promise<{ ok: number; failed: number }> {
  const entries: Record<string, Uint8Array> = {};
  const used = new Set<string>();
  let ok = 0;
  let failed = 0;
  const total = files.length;

  for (let i = 0; i < total; i++) {
    try {
      const out = await processOne(files[i]);
      const name = uniqueName(out.name, used);
      used.add(name);
      entries[name] = new Uint8Array(await out.blob.arrayBuffer());
      ok++;
    } catch {
      failed++;
    }
    onProgress?.(i + 1, total);
    // Yield to the event loop so the progress text can repaint between files.
    await new Promise((r) => setTimeout(r, 0));
  }

  // Images are already compressed, so store (level 0): fast, no wasted CPU.
  const zipped = zipSync(entries, { level: 0 });
  const blob = new Blob([zipped], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, zipName);
  setTimeout(() => URL.revokeObjectURL(url), 4000);

  return { ok, failed };
}
