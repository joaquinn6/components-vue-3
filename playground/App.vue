<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

import { BaseButton, BaseIcon, BaseSwitch, BaseText } from "../src/index";
import PlaygroundNav from "./components/PlaygroundNav.vue";
import { useActiveSection } from "./composables/useActiveSection";
import { usePlaygroundTheme } from "./composables/usePlaygroundTheme";
import { demos } from "./demos/registry";

const MENU_TOGGLE_ID = "playground-menu-toggle";
// Debe coincidir con el breakpoint de teléfono de playground.css.
const PHONE_QUERY = "(max-width: 640px)";
const MENU_OPEN_CLASS = "playground-menu-open";
let phoneMedia: MediaQueryList | null = null;

const { isDark } = usePlaygroundTheme();
const { activeId, setActive } = useActiveSection(demos.map((demo) => demo.id));
const menuOpen = ref(false);

function handleNavigate(id: string) {
  setActive(id);
  closeMenu({ restoreFocus: false });
}

function focusToggle() {
  nextTick(() => document.getElementById(MENU_TOGGLE_ID)?.focus());
}

function closeMenu({ restoreFocus = true } = {}) {
  if (!menuOpen.value) return;
  menuOpen.value = false;
  if (restoreFocus) focusToggle();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeMenu();
}

// Si la pantalla deja de tener tamaño de teléfono, el panel deja de existir y se cierra.
function handlePhoneChange(event: MediaQueryListEvent) {
  if (!event.matches) closeMenu({ restoreFocus: false });
}

watch(menuOpen, (open) => {
  if (typeof document === "undefined") return;

  document.documentElement.classList.toggle(MENU_OPEN_CLASS, open);
  if (open) {
    document.addEventListener("keydown", handleKeydown);
    nextTick(() => document.getElementById("playground-nav-search")?.focus());
  } else {
    document.removeEventListener("keydown", handleKeydown);
  }
});

onMounted(() => {
  phoneMedia = window.matchMedia(PHONE_QUERY);
  phoneMedia.addEventListener("change", handlePhoneChange);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.documentElement.classList.remove(MENU_OPEN_CLASS);
  phoneMedia?.removeEventListener("change", handlePhoneChange);
  phoneMedia = null;
});
</script>

<template>
  <a class="skip-link" href="#playground-main">Saltar al contenido</a>

  <!-- Con el panel móvil abierto, el resto de la página queda inerte para que el foco no escape. -->
  <header class="playground-topbar" :inert="menuOpen">
    <div class="playground-topbar__brand">
      <BaseText as="span" variant="label" color="brand" weight="bold"
        >JNV UI</BaseText
      >
      <BaseText as="span" color="heading" weight="semibold"
        >Playground</BaseText
      >
      <BaseText
        as="span"
        variant="sm"
        color="muted"
        class="playground-topbar__count"
      >
        {{ demos.length }} secciones
      </BaseText>
    </div>

    <div class="playground-topbar__actions">
      <span class="playground-topbar__theme">
        <BaseSwitch
          id="dark-theme"
          v-model="isDark"
          label="Tema oscuro"
          label-position="end"
        />
      </span>
      <!-- El contenedor controla la visibilidad: los estilos scoped de BaseButton fijan su display. -->
      <span class="playground-topbar__menu">
        <BaseButton
          :id="MENU_TOGGLE_ID"
          variant="ghost"
          size="icon"
          aria-label="Abrir índice de componentes"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="playground-index"
          @click="menuOpen = true"
        >
          <BaseIcon name="menu" size="sm" decorative />
        </BaseButton>
      </span>
    </div>
  </header>

  <div class="playground-layout">
    <main
      id="playground-main"
      class="playground-main"
      tabindex="-1"
      :inert="menuOpen"
    >
      <component :is="demo.component" v-for="demo in demos" :key="demo.id" />
    </main>

    <div
      v-if="menuOpen"
      class="playground-backdrop"
      aria-hidden="true"
      @click="closeMenu()"
    ></div>

    <aside
      id="playground-index"
      class="playground-aside"
      :class="{ 'playground-aside--open': menuOpen }"
      :role="menuOpen ? 'dialog' : undefined"
      :aria-modal="menuOpen ? 'true' : undefined"
      :aria-labelledby="menuOpen ? 'playground-index-title' : undefined"
    >
      <!-- Cabecera solo visible en el panel móvil. -->
      <div class="playground-aside__header">
        <BaseText
          id="playground-index-title"
          as="span"
          color="heading"
          weight="bold"
        >
          Componentes
        </BaseText>
        <BaseButton
          variant="ghost"
          size="icon"
          aria-label="Cerrar índice de componentes"
          @click="closeMenu()"
        >
          <BaseIcon name="close" size="sm" decorative />
        </BaseButton>
      </div>
      <PlaygroundNav
        :items="demos"
        :active-id="activeId"
        @navigate="handleNavigate"
      />
    </aside>
  </div>
</template>
