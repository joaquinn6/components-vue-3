<script setup lang="ts">
import { ref } from "vue";
import { BaseYearInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";

const { isDark } = usePlaygroundTheme();
const year = ref<number | null>(new Date().getFullYear());

const code = `<BaseYearInput
  v-model="year"
  label="Año"
  placeholder="Selecciona un año"
  :dark="isDark"
/>`;
</script>

<template>
  <DemoSection
    id="base-year-input"
    name="BaseYearInput"
    description="Selector de año con modelo numérico."
  >
    <DemoExample title="Uso básico · v-model, dark" :code="code">
      <BaseYearInput
        id="year-example"
        v-model="year"
        label="Año"
        placeholder="Selecciona un año"
        :dark="isDark"
      />
      <pre class="demo-model">year: {{ JSON.stringify(year) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
