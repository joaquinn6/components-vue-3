import type { BaseImageViewerTexts } from "../public-types";

/** Textos predeterminados (español) de `BaseImageViewer` y `BaseImageLightbox`. */
export const defaultImageViewerTexts: Required<BaseImageViewerTexts> = {
  edit: "Editar imagen",
  delete: "Eliminar imagen",
  expand: "Ver imagen ampliada",
  download: "Descargar imagen",
  open: "Ver imagen",
  actionsLabel: "Acciones de la imagen",
  loadError: "No se pudo cargar la imagen",
  dialogLabel: "Visor de imagen",
  close: "Cerrar visor",
  zoomIn: "Acercar",
  zoomOut: "Alejar",
  resetZoom: "Restablecer zoom",
  zoomLevel: "Nivel de zoom",
  copy: "Copiar imagen",
  copied: "Imagen copiada",
  copyError: "No se pudo copiar la imagen",
  downloadError: "No se pudo descargar la imagen",
};

export function resolveImageViewerTexts(
  texts: BaseImageViewerTexts | undefined,
): Required<BaseImageViewerTexts> {
  const resolved = { ...defaultImageViewerTexts };
  for (const key of Object.keys(resolved) as (keyof BaseImageViewerTexts)[]) {
    const value = texts?.[key];
    if (typeof value === "string" && value) resolved[key] = value;
  }
  return resolved;
}
