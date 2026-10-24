<script setup lang="ts">
import { ref } from "vue";
import { BaseYearInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";
import { useDateFieldMessages } from "../i18n/dates";
import { useMessages } from "../i18n/usePlaygroundLocale";

const { isDark } = usePlaygroundTheme();
const year = ref<number | null>(new Date().getFullYear());
const field = useDateFieldMessages();

const t = useMessages({
  en: {
    description: "Year picker with a numeric model.",
    title: "Basic usage · v-model, dark",
    label: "Year",
    placeholder: "Select a year",
  },
  es: {
    description: "Selector de año con modelo numérico.",
    title: "Uso básico · v-model, dark",
    label: "Año",
    placeholder: "Selecciona un año",
  },
});

const code = `<BaseYearInput
  v-model="year"
  label="Year"
  placeholder="Select a year"
  clear-aria-label="Clear date"
  :dark="isDark"
/>`;
</script>

<template>
  <DemoSection
    id="base-year-input"
    name="BaseYearInput"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <BaseYearInput
        id="year-example"
        v-model="year"
        :label="t.label"
        :placeholder="t.placeholder"
        :clear-aria-label="field.clear"
        :info-aria-label="field.info"
        :dark="isDark"
      />
      <pre class="demo-model">year: {{ JSON.stringify(year) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
