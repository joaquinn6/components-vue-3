<script setup lang="ts">
import { ref } from "vue";
import { BaseMonthInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";

const { isDark } = usePlaygroundTheme();
const month = ref<{ month: number; year: number } | null>(null);

const code = `<BaseMonthInput
  v-model="month"
  label="Mes"
  placeholder="Selecciona un mes"
  :dark="isDark"
/>

<!-- month: { month: number, year: number } | null -->`;
</script>

<template>
  <DemoSection
    id="base-month-input"
    name="BaseMonthInput"
    description="Selector de mes y año con modelo { month, year }."
  >
    <DemoExample title="Uso básico · v-model, dark" :code="code">
      <BaseMonthInput
        id="month-example"
        v-model="month"
        label="Mes"
        placeholder="Selecciona un mes"
        :dark="isDark"
      />
      <pre class="demo-model">month: {{ JSON.stringify(month) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
