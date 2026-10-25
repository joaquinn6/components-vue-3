<script setup lang="ts">
import { nextTick, ref } from "vue";
import {
  BaseButton,
  BaseIcon,
  BaseSwitch,
  tooltip as vTooltip,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const PIN_SWITCH_ID = "tooltip-pin-toolbar";
const pinned = ref(false);

// El botón para soltar desaparece al pulsarlo; el foco vuelve al switch que fija la barra.
function unpin() {
  pinned.value = false;
  nextTick(() => document.getElementById(PIN_SWITCH_ID)?.focus());
}

const t = useMessages({
  en: {
    description:
      "Directive that shows an accessible tooltip on hover and keyboard focus. It flips below the element when there is no room above.",
    defaultTitle: 'Default placement · v-tooltip="text"',
    defaultDescription: "Opens above the element when there is room.",
    save: "Save",
    saveTooltip: "Save the changes to this draft",
    edit: "Edit document",
    copy: "Copy link",
    download: "Download PDF",
    bottomTitle: 'Explicit placement · v-tooltip:bottom="text"',
    bottomDescription:
      "The argument sets the preferred side; it only flips when it does not fit.",
    bottom: "Bottom",
    bottomTooltip: "Prefers to open below the element",
    top: "Top",
    topTooltip: "Prefers to open above the element",
    edgeTitle: "Automatic flip at the top edge",
    edgeDescription:
      "Pin the toolbar to the top edge of the window, like a sticky header: its tooltips have no room above and open downward.",
    pin: "Pin toolbar to the top edge",
    unpin: "Unpin",
  },
  es: {
    description:
      "Directiva que muestra un tooltip accesible con hover y con el foco del teclado. Se voltea debajo del elemento cuando no hay espacio arriba.",
    defaultTitle: 'Posición predeterminada · v-tooltip="texto"',
    defaultDescription: "Se abre encima del elemento cuando hay espacio.",
    save: "Guardar",
    saveTooltip: "Guarda los cambios de este borrador",
    edit: "Editar documento",
    copy: "Copiar enlace",
    download: "Descargar PDF",
    bottomTitle: 'Posición explícita · v-tooltip:bottom="texto"',
    bottomDescription:
      "El argumento fija el lado preferido; solo se voltea cuando no cabe.",
    bottom: "Abajo",
    bottomTooltip: "Prefiere abrirse debajo del elemento",
    top: "Arriba",
    topTooltip: "Prefiere abrirse encima del elemento",
    edgeTitle: "Volteo automático en el borde superior",
    edgeDescription:
      "Fija la barra al borde superior de la ventana, como un header sticky: sus tooltips no tienen espacio arriba y se abren hacia abajo.",
    pin: "Fijar la barra al borde superior",
    unpin: "Soltar",
  },
});

const defaultCode = `<script setup>
import { tooltip as vTooltip } from "@joaquinn6/jnv-ui-components";
<\/script>

<template>
  <BaseButton v-tooltip="'Save the changes to this draft'" variant="secondary">
    Save
  </BaseButton>
  <BaseButton v-tooltip="'Edit document'" size="icon" variant="ghost" aria-label="Edit document">
    <BaseIcon name="edit" size="sm" decorative />
  </BaseButton>
</template>`;

const bottomCode = `<BaseButton v-tooltip:bottom="'Prefers to open below the element'" variant="secondary">
  Bottom
</BaseButton>
<BaseButton v-tooltip:top="'Prefers to open above the element'" variant="secondary">
  Top
</BaseButton>`;

const edgeCode = `<!-- Without an argument: flips below when there is no room above. -->
<header class="sticky-header">
  <BaseButton v-tooltip="'Edit document'" size="icon" variant="ghost" aria-label="Edit document">
    <BaseIcon name="edit" size="sm" decorative />
  </BaseButton>
</header>

<style>
.sticky-header {
  position: sticky;
  top: 0;
}
</style>`;
</script>

<template>
  <DemoSection id="v-tooltip" name="v-tooltip" :description="t.description">
    <DemoExample
      :title="t.defaultTitle"
      :description="t.defaultDescription"
      :code="defaultCode"
    >
      <div class="demo-row">
        <BaseButton v-tooltip="t.saveTooltip" variant="secondary">
          {{ t.save }}
        </BaseButton>
        <BaseButton
          v-tooltip="t.edit"
          size="icon"
          variant="ghost"
          :aria-label="t.edit"
        >
          <BaseIcon name="edit" size="sm" decorative />
        </BaseButton>
        <BaseButton
          v-tooltip="t.copy"
          size="icon"
          variant="ghost"
          :aria-label="t.copy"
        >
          <BaseIcon name="copy" size="sm" decorative />
        </BaseButton>
      </div>
    </DemoExample>

    <DemoExample
      :title="t.bottomTitle"
      :description="t.bottomDescription"
      :code="bottomCode"
    >
      <div class="demo-row">
        <BaseButton v-tooltip:bottom="t.bottomTooltip" variant="secondary">
          {{ t.bottom }}
        </BaseButton>
        <BaseButton v-tooltip:top="t.topTooltip" variant="secondary">
          {{ t.top }}
        </BaseButton>
      </div>
    </DemoExample>

    <DemoExample
      :title="t.edgeTitle"
      :description="t.edgeDescription"
      :code="edgeCode"
    >
      <div class="demo-stack">
        <BaseSwitch :id="PIN_SWITCH_ID" v-model="pinned" :label="t.pin" />
        <div
          class="tooltip-demo-toolbar"
          :class="{ 'tooltip-demo-toolbar--pinned': pinned }"
        >
          <BaseButton
            v-tooltip="t.edit"
            size="icon"
            variant="ghost"
            :aria-label="t.edit"
          >
            <BaseIcon name="edit" size="sm" decorative />
          </BaseButton>
          <BaseButton
            v-tooltip="t.copy"
            size="icon"
            variant="ghost"
            :aria-label="t.copy"
          >
            <BaseIcon name="copy" size="sm" decorative />
          </BaseButton>
          <BaseButton
            v-tooltip="t.download"
            size="icon"
            variant="ghost"
            :aria-label="t.download"
          >
            <BaseIcon name="download" size="sm" decorative />
          </BaseButton>
          <BaseButton
            v-if="pinned"
            size="sm"
            variant="secondary"
            @click="unpin"
          >
            {{ t.unpin }}
          </BaseButton>
        </div>
      </div>
    </DemoExample>
  </DemoSection>
</template>
