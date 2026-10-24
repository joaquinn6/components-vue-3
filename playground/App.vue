<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from "vue";

import { BaseButton, BaseIcon, BaseSwitch, BaseText } from "../src/index";
import PlaygroundNav from "./components/PlaygroundNav.vue";
import { useActiveSection } from "./composables/useActiveSection";
import { usePlaygroundTheme } from "./composables/usePlaygroundTheme";
import { demos } from "./demos/registry";

const MENU_TOGGLE_ID = "playground-menu-toggle";

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

watch(menuOpen, (open) => {
  if (typeof document === "undefined") return;

  if (open) {
    document.addEventListener("keydown", handleKeydown);
    nextTick(() => document.getElementById("playground-nav-search")?.focus());
  } else {
    document.removeEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <a class="skip-link" href="#playground-main">Saltar al contenido</a>

  <header class="playground-topbar">
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
      <BaseSwitch
        id="dark-theme"
        v-model="isDark"
        label="Tema oscuro"
        label-position="end"
      />
      <BaseButton
        :id="MENU_TOGGLE_ID"
        class="playground-topbar__menu"
        variant="ghost"
        size="icon"
        :aria-label="
          menuOpen
            ? 'Cerrar índice de componentes'
            : 'Abrir índice de componentes'
        "
        :aria-expanded="menuOpen ? 'true' : 'false'"
        aria-controls="playground-index"
        @click="menuOpen ? closeMenu() : (menuOpen = true)"
      >
        <BaseIcon :name="menuOpen ? 'close' : 'menu'" size="sm" decorative />
      </BaseButton>
    </div>
  </header>

  <div class="playground-layout">
    <main id="playground-main" class="playground-main" tabindex="-1">
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
    >
      <PlaygroundNav
        :items="demos"
        :active-id="activeId"
        @navigate="handleNavigate"
      />
    </aside>
  </div>
</template>
