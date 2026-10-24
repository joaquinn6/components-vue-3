<script setup lang="ts">
import { ref } from "vue";
import { BaseMonthInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";
import { useDateFieldMessages } from "../i18n/dates";
import { useMessages } from "../i18n/usePlaygroundLocale";

const { isDark } = usePlaygroundTheme();
const month = ref<{ month: number; year: number } | null>(null);
const field = useDateFieldMessages();

const t = useMessages({
  en: {
    description: "Month and year picker with a { month, year } model.",
    title: "Basic usage · v-model, dark",
    label: "Month",
    placeholder: "Select a month",
  },
  es: {
    description: "Selector de mes y año con modelo { month, year }.",
    title: "Uso básico · v-model, dark",
    label: "Mes",
    placeholder: "Selecciona un mes",
  },
});

const code = `<BaseMonthInput
  v-model="month"
  label="Month"
  placeholder="Select a month"
  clear-aria-label="Clear date"
  :dark="isDark"
/>

<!-- month: { month: number, year: number } | null -->`;
</script>

<template>
  <DemoSection
    id="base-month-input"
    name="BaseMonthInput"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <BaseMonthInput
        id="month-example"
        v-model="month"
        :label="t.label"
        :placeholder="t.placeholder"
        :clear-aria-label="field.clear"
        :info-aria-label="field.info"
        :dark="isDark"
      />
      <pre class="demo-model">month: {{ JSON.stringify(month) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
