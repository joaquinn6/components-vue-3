const sizeUnits = ["B", "KB", "MB", "GB", "TB"] as const;

/** Formatea bytes en base 1024 con un decimal como máximo, por ejemplo `1.5 MB`. */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    sizeUnits.length - 1,
  );
  const value = bytes / 1024 ** exponent;
  const rounded = exponent === 0 ? value : Math.round(value * 10) / 10;
  return `${rounded} ${sizeUnits[exponent]}`;
}

/** Tokens del atributo `accept`, en minúsculas y sin vacíos. */
export function parseAccept(accept: string): string[] {
  return accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Comprueba un archivo contra los tokens de `accept`: extensiones (`.pdf`), tipos MIME exactos
 * (`application/pdf`) o comodines (`image/*`). Sin tokens, se acepta cualquier archivo.
 */
export function matchesAccept(file: File, tokens: readonly string[]): boolean {
  if (!tokens.length) return true;

  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();

  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token);
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

/** Clave para detectar el mismo archivo seleccionado dos veces. */
export function fileKey(file: File): string {
  return `${file.name}::${file.size}::${file.lastModified}`;
}

/** Sustituye `{clave}` en una plantilla de texto. */
export function interpolate(
  template: string,
  params: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  );
}
