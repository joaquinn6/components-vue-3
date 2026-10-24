<script setup lang="ts">
import { ref } from "vue";
import { BaseDatePicker } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";
import { useDateFieldMessages } from "../i18n/dates";
import { useMessages } from "../i18n/usePlaygroundLocale";

const { isDark } = usePlaygroundTheme();
const lowLevelDate = ref<Date | null>(null);
const field = useDateFieldMessages();

const t = useMessages({
  en: {
    description: "Low-level wrapper on which the other date fields are built.",
    title: "Configuration · pickerProps, inputIcon",
    placeholder: "Low-level wrapper",
    info: "Lets you pass compatible configuration through pickerProps.",
  },
  es: {
    description:
      "Wrapper de bajo nivel sobre el que se construyen los demás campos de fecha.",
    title: "Configuración · pickerProps, inputIcon",
    placeholder: "Wrapper de bajo nivel",
    info: "Permite pasar configuración compatible mediante pickerProps.",
  },
});

const code = `<BaseDatePicker
  v-model="date"
  label="BaseDatePicker"
  placeholder="Low-level wrapper"
  :picker-props="{ autoApply: true }"
  input-icon="calendar"
  info="Lets you pass compatible configuration through pickerProps."
  clear-aria-label="Clear date"
  info-aria-label="More information"
  :dark="isDark"
/>`;
</script>

<template>
  <DemoSection
    id="base-date-picker"
    name="BaseDatePicker"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <BaseDatePicker
        id="date-picker-example"
        v-model="lowLevelDate"
        label="BaseDatePicker"
        :placeholder="t.placeholder"
        :picker-props="{ autoApply: true }"
        input-icon="calendar"
        :info="t.info"
        :clear-aria-label="field.clear"
        :info-aria-label="field.info"
        :dark="isDark"
      />
    </DemoExample>
  </DemoSection>
</template>
