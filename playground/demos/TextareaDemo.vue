<script setup lang="ts">
import { ref } from "vue";
import { BaseTextarea } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const notes = ref("Los componentes pueden probarse sin publicar el paquete.");

const code = `<BaseTextarea
  v-model="notes"
  label="Notas"
  :rows="4"
  :max-length="160"
  max-length-visible
/>`;
</script>

<template>
  <DemoSection
    id="base-textarea"
    name="BaseTextarea"
    description="Texto multilínea con límite de caracteres y contador visible opcional."
  >
    <DemoExample
      title="Contador · rows, maxLength, maxLengthVisible"
      :code="code"
    >
      <BaseTextarea
        id="textarea-notes"
        v-model="notes"
        label="Notas"
        :rows="4"
        :max-length="160"
        max-length-visible
      />
    </DemoExample>
  </DemoSection>
</template>
