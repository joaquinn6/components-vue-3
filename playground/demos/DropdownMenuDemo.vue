<script setup lang="ts">
import { ref } from "vue";
import { BaseDropdownMenu, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const lastSelection = ref("Todavía no se ha elegido ninguna opción.");

const menuGroups = [
  [
    { label: "Editar", event: "edit" },
    { label: "Duplicar", event: "duplicate", color: "info" as const },
  ],
  [
    { label: "Archivar", event: "archive", color: "success" as const },
    {
      label: "Eliminar",
      event: "delete",
      color: "danger" as const,
      tooltip: "Acción irreversible",
    },
    { label: "No disponible", event: "disabled", disabled: true },
  ],
];

function handleSelect(payload: { item: { label: string; event: string } }) {
  lastSelection.value = `Evento select: ${payload.item.label} (${payload.item.event})`;
}

const code = `<script setup>
const menuGroups = [
  [
    { label: "Editar", event: "edit" },
    { label: "Duplicar", event: "duplicate", color: "info" },
  ],
  [
    { label: "Archivar", event: "archive", color: "success" },
    { label: "Eliminar", event: "delete", color: "danger", tooltip: "Acción irreversible" },
    { label: "No disponible", event: "disabled", disabled: true },
  ],
];

function handleSelect({ item }) {
  console.log(item.event);
}
<\/script>

<template>
  <BaseDropdownMenu icon="menu" :groups="menuGroups" @select="handleSelect" />
</template>`;
</script>

<template>
  <DemoSection
    id="base-dropdown-menu"
    name="BaseDropdownMenu"
    description="Menú de acciones agrupadas con colores semánticos, tooltips y opciones deshabilitadas."
  >
    <DemoExample title="Grupos y colores · groups, icon, @select" :code="code">
      <div class="demo-row">
        <BaseDropdownMenu
          icon="menu"
          :groups="menuGroups"
          @select="handleSelect"
        />
        <BaseDropdownMenu
          icon="moreVertical"
          :groups="menuGroups"
          @select="handleSelect"
        />
      </div>
      <BaseText variant="sm" color="muted" aria-live="polite">{{
        lastSelection
      }}</BaseText>
    </DemoExample>
  </DemoSection>
</template>
