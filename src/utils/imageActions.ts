/** Nombre del archivo al final de la URL, o `fallback` si no se puede deducir. */
export function fileNameFromSrc(src: string, fallback = "imagen") {
  try {
    const base =
      typeof window === "undefined" ? "http://localhost" : window.location.href;
    const url = new URL(src, base);
    if (url.protocol === "data:" || url.protocol === "blob:") return fallback;
    const last = url.pathname.split("/").filter(Boolean).at(-1);
    return last ? decodeURIComponent(last) : fallback;
  } catch {
    return fallback;
  }
}

function clickLink(href: string, fileName: string, newTab = false) {
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  if (newTab) {
    link.target = "_blank";
    link.rel = "noopener";
  }
  link.style.display = "none";
  document.body.append(link);
  link.click();
  link.remove();
}

/**
 * Descarga la imagen. Intenta obtenerla con `fetch` para forzar la descarga con `fileName`; si el
 * servidor no lo permite (CORS), abre un enlace directo y el navegador decide cómo tratarlo.
 */
export async function downloadImage(src: string, fileName: string) {
  if (typeof document === "undefined") return false;
  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const url = URL.createObjectURL(await response.blob());
    clickLink(url, fileName);
    // Algunos navegadores inician la descarga de forma asíncrona tras el click.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    try {
      clickLink(src, fileName, true);
      return true;
    } catch {
      return false;
    }
  }
}

/** Indica si el navegador permite copiar imágenes al portapapeles. */
export function canCopyImages() {
  return (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    typeof navigator.clipboard?.write === "function" &&
    "ClipboardItem" in window
  );
}

async function toPngBlob(src: string): Promise<Blob> {
  const response = await fetch(src);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const blob = await response.blob();
  if (blob.type === "image/png") return blob;

  // El portapapeles solo admite PNG de forma general: se convierte con un canvas.
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (png) => (png ? resolve(png) : reject(new Error("PNG"))),
      "image/png",
    ),
  );
}

/** Copia la imagen al portapapeles como PNG. Requiere que la imagen permita CORS. */
export async function copyImage(src: string) {
  if (!canCopyImages()) return false;
  try {
    // Se pasa la promesa directamente para conservar la activación del usuario (Safari).
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": toPngBlob(src) }),
    ]);
    return true;
  } catch {
    return false;
  }
}
