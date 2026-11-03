<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseTextarea } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description: "Multiline text with a character limit and optional counter.",
    title: "Counter · rows, maxLength, maxLengthVisible",
    label: "Notes",
    sample: "Components can be tested without publishing the package.",
    info: "Notes are visible only to your team.",
    infoAriaLabel: "More information",
  },
  es: {
    description:
      "Texto multilínea con límite de caracteres y contador visible opcional.",
    title: "Contador · rows, maxLength, maxLengthVisible",
    label: "Notas",
    sample: "Los componentes pueden probarse sin publicar el paquete.",
    info: "Las notas solo son visibles para tu equipo.",
    infoAriaLabel: "Más información",
  },
});

// Mientras nadie edite el campo, el texto de ejemplo sigue el idioma activo.
const editedNotes = ref<string | null>(null);
const notes = computed({
  get: () => editedNotes.value ?? t.value.sample,
  set: (value: string) => {
    editedNotes.value = value;
  },
});

const code = `<BaseTextarea
  v-model="notes"
  label="Notes"
  info="Notes are visible only to your team."
  :rows="4"
  :max-length="160"
  max-length-visible
/>`;
</script>

<template>
  <DemoSection
    id="base-textarea"
    name="BaseTextarea"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <BaseTextarea
        id="textarea-notes"
        v-model="notes"
        :label="t.label"
        :info="t.info"
        :info-aria-label="t.infoAriaLabel"
        :rows="4"
        :max-length="160"
        max-length-visible
      />
    </DemoExample>
  </DemoSection>
</template>
