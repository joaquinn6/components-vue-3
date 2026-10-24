import { useMessages } from "./usePlaygroundLocale";

export type DemoCategory =
  "content" | "actions" | "dialogs" | "forms" | "dates" | "navigation" | "data";

const en = {
  skipToContent: "Skip to content",
  sections: (count: number) => `${count} sections`,
  darkTheme: "Dark theme",
  language: "Language",
  openIndex: "Open component index",
  closeIndex: "Close component index",
  indexTitle: "Components",
  indexNavLabel: "Component index",
  searchLabel: "Search component",
  searchPlaceholder: "e.g. button, date…",
  noMatches: (query: string) => `No components match “${query}”.`,
  codeLabel: "Example code",
  copy: "Copy",
  copied: "Code copied",
  copyFailed: "Could not copy the code",
  categories: {
    content: "Content",
    actions: "Actions",
    dialogs: "Dialogs",
    forms: "Forms",
    dates: "Date and time",
    navigation: "Navigation",
    data: "Data",
  } satisfies Record<DemoCategory, string>,
};

const es: typeof en = {
  skipToContent: "Saltar al contenido",
  sections: (count) => `${count} secciones`,
  darkTheme: "Tema oscuro",
  language: "Idioma",
  openIndex: "Abrir índice de componentes",
  closeIndex: "Cerrar índice de componentes",
  indexTitle: "Componentes",
  indexNavLabel: "Índice de componentes",
  searchLabel: "Buscar componente",
  searchPlaceholder: "Ej. button, fecha…",
  noMatches: (query) => `No hay componentes que coincidan con «${query}».`,
  codeLabel: "Código del ejemplo",
  copy: "Copiar",
  copied: "Código copiado",
  copyFailed: "No se pudo copiar el código",
  categories: {
    content: "Contenido",
    actions: "Acciones",
    dialogs: "Diálogos",
    forms: "Formularios",
    dates: "Fecha y hora",
    navigation: "Navegación",
    data: "Datos",
  },
};

/** Textos de la interfaz del playground (barra, índice y bloque de código). */
export function useUiMessages() {
  return useMessages({ en, es });
}
