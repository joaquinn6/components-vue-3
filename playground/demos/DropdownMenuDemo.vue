<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseDropdownMenu, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description:
      "Grouped action menu with semantic colors, tooltips and disabled options.",
    title: "Groups and colors · groups, icon, @select",
    noSelection: "No option selected yet.",
    selected: (label: string, event: string) =>
      `select event: ${label} (${event})`,
    edit: "Edit",
    duplicate: "Duplicate",
    archive: "Archive",
    delete: "Delete",
    irreversible: "Irreversible action",
    unavailable: "Unavailable",
  },
  es: {
    description:
      "Menú de acciones agrupadas con colores semánticos, tooltips y opciones deshabilitadas.",
    title: "Grupos y colores · groups, icon, @select",
    noSelection: "Todavía no se ha elegido ninguna opción.",
    selected: (label, event) => `Evento select: ${label} (${event})`,
    edit: "Editar",
    duplicate: "Duplicar",
    archive: "Archivar",
    delete: "Eliminar",
    irreversible: "Acción irreversible",
    unavailable: "No disponible",
  },
});

const lastSelection = ref<{ label: string; event: string } | null>(null);

const menuGroups = computed(() => [
  [
    { label: t.value.edit, event: "edit" },
    { label: t.value.duplicate, event: "duplicate", color: "info" as const },
  ],
  [
    { label: t.value.archive, event: "archive", color: "success" as const },
    {
      label: t.value.delete,
      event: "delete",
      color: "danger" as const,
      tooltip: t.value.irreversible,
    },
    { label: t.value.unavailable, event: "disabled", disabled: true },
  ],
]);

function handleSelect(payload: { item: { label: string; event: string } }) {
  lastSelection.value = payload.item;
}

const code = `<script setup>
const menuGroups = [
  [
    { label: "Edit", event: "edit" },
    { label: "Duplicate", event: "duplicate", color: "info" },
  ],
  [
    { label: "Archive", event: "archive", color: "success" },
    { label: "Delete", event: "delete", color: "danger", tooltip: "Irreversible action" },
    { label: "Unavailable", event: "disabled", disabled: true },
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
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
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
      <BaseText variant="sm" color="muted" aria-live="polite">
        {{
          lastSelection
            ? t.selected(lastSelection.label, lastSelection.event)
            : t.noSelection
        }}
      </BaseText>
    </DemoExample>
  </DemoSection>
</template>
