// Shared client-side helpers for the image tools. All processing is local —
// files are read via object URLs and drawn to a <canvas>; nothing is uploaded.

export interface LoadedImage {
  file: File;
  img: HTMLImageElement;
  url: string;
}

/** Wire a dropzone + hidden file input. Calls onImage once an image is loaded. */
export function setupDropzone(
  dz: HTMLElement,
  input: HTMLInputElement,
  onImage: (data: LoadedImage) => void,
): void {
  const open = () => input.click();
  dz.addEventListener('click', open);
  dz.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });
  ['dragover', 'dragenter'].forEach((ev) =>
    dz.addEventListener(ev, (e) => {
      e.preventDefault();
      dz.classList.add('drag');
    }),
  );
  ['dragleave', 'dragend'].forEach((ev) =>
    dz.addEventListener(ev, () => dz.classList.remove('drag')),
  );
  dz.addEventListener('drop', (e: DragEvent) => {
    e.preventDefault();
    dz.classList.remove('drag');
    const f = e.dataTransfer?.files?.[0];
    if (f) handle(f);
  });
  input.addEventListener('change', () => {
    const f = input.files?.[0];
    if (f) handle(f);
  });

  function handle(file: File) {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => onImage({ file, img, url });
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

/** Draw an image to a canvas at the given size and return it. */
export function renderCanvas(
  img: HTMLImageElement,
  w: number,
  h: number,
  background?: string,
): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  const ctx = c.getContext('2d')!;
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, c.width, c.height);
  }
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, c.width, c.height);
  return c;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
      type,
      quality,
    );
  });
}

export function triggerDownload(href: string, name: string): void {
  const a = document.createElement('a');
  a.href = href;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Strip the extension from a file name. */
export function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, '');
}

export const EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};
