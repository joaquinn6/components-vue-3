import type { BaseFileUploadTexts } from "../public-types";

/** Textos predeterminados (español) de `BaseFileUpload`. */
export const defaultFileUploadTexts: Required<BaseFileUploadTexts> = {
  select: "Seleccionar archivo",
  selectMultiple: "Seleccionar archivos",
  replace: "Cambiar archivo",
  dropzoneTitle: "Arrastra un archivo aquí",
  dropzoneTitleMultiple: "Arrastra tus archivos aquí",
  dropzoneAction: "o haz clic para seleccionarlo",
  dropzoneActionMultiple: "o haz clic para seleccionarlos",
  dropzoneActive: "Suelta para añadir",
  acceptHint: "Formatos: {types}",
  maxSizeHint: "Tamaño máximo: {size}",
  maxFilesHint: "Máximo {max} archivos",
  listLabel: "Archivos seleccionados",
  remove: "Eliminar {name}",
  clear: "Quitar todos",
  invalidType: "{name}: tipo de archivo no permitido",
  invalidSize: "{name} supera el tamaño máximo de {size}",
  tooMany: "Solo puedes seleccionar hasta {max} archivos",
  single: "Solo puedes seleccionar un archivo",
  duplicate: "{name} ya está en la lista",
  added: "Archivos añadidos: {count}",
  removed: "Archivo eliminado: {name}",
  cleared: "Se quitaron todos los archivos",
};

export function resolveFileUploadTexts(
  texts: BaseFileUploadTexts | undefined,
): Required<BaseFileUploadTexts> {
  const resolved = { ...defaultFileUploadTexts };
  for (const key of Object.keys(resolved) as (keyof BaseFileUploadTexts)[]) {
    const value = texts?.[key];
    if (typeof value === "string" && value) resolved[key] = value;
  }
  return resolved;
}
