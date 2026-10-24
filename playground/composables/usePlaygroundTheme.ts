import { computed, ref, watch } from "vue";

export type PlaygroundTheme = "light" | "dark";

const STORAGE_KEY = "jnv-playground-theme";

function isTheme(value: unknown): value is PlaygroundTheme {
  return value === "light" || value === "dark";
}

// Prioridad: parámetro ?theme= de la URL, preferencia guardada y, por último, tema oscuro.
function readInitialTheme(): PlaygroundTheme {
  if (typeof window === "undefined") return "dark";

  const requested = new URLSearchParams(window.location.search).get("theme");
  if (isTheme(requested)) return requested;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // Almacenamiento bloqueado: se usa el tema predeterminado.
  }

  return "dark";
}

const theme = ref<PlaygroundTheme>(readInitialTheme());

watch(
  theme,
  (value) => {
    if (typeof document === "undefined") return;

    if (value === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;

    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Sin almacenamiento disponible el tema solo dura la sesión.
    }
  },
  { immediate: true },
);

export function usePlaygroundTheme() {
  const isDark = computed({
    get: () => theme.value === "dark",
    set: (value: boolean) => {
      theme.value = value ? "dark" : "light";
    },
  });

  return { theme, isDark };
}
