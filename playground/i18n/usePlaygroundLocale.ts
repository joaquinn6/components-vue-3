import { computed, ref, watch } from "vue";

export type PlaygroundLocale = "en" | "es";

export const PLAYGROUND_LOCALES: readonly {
  value: PlaygroundLocale;
  label: string;
}[] = [
  // Cada idioma se nombra en su propia lengua.
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

const STORAGE_KEY = "jnv-playground-locale";

function isLocale(value: unknown): value is PlaygroundLocale {
  return value === "en" || value === "es";
}

// Prioridad: parámetro ?lang= de la URL, preferencia guardada y, por último, inglés.
function readInitialLocale(): PlaygroundLocale {
  if (typeof window === "undefined") return "en";

  const requested = new URLSearchParams(window.location.search).get("lang");
  if (isLocale(requested)) return requested;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Almacenamiento bloqueado: se usa el idioma predeterminado.
  }

  return "en";
}

const locale = ref<PlaygroundLocale>(readInitialLocale());

watch(
  locale,
  (value) => {
    if (typeof document === "undefined") return;

    document.documentElement.lang = value;
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Sin almacenamiento disponible el idioma solo dura la sesión.
    }
  },
  { immediate: true },
);

export function usePlaygroundLocale() {
  return { locale };
}

/**
 * Textos de un componente en ambos idiomas. `es` debe tener la misma forma que `en`.
 * Devuelve un computed con los textos del idioma activo.
 */
export function useMessages<T extends object>(messages: {
  en: T;
  es: NoInfer<T>;
}) {
  return computed(() => messages[locale.value]);
}
