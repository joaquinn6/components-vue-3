<script setup lang="ts">
import { ref } from "vue";
import { BaseDatePicker } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";

const { isDark } = usePlaygroundTheme();
const lowLevelDate = ref<Date | null>(null);

const code = `<BaseDatePicker
  v-model="date"
  label="BaseDatePicker"
  placeholder="Wrapper de bajo nivel"
  :picker-props="{ autoApply: true }"
  input-icon="calendar"
  info="Permite pasar configuración compatible mediante pickerProps."
  :dark="isDark"
/>`;
</script>

<template>
  <DemoSection
    id="base-date-picker"
    name="BaseDatePicker"
    description="Wrapper de bajo nivel sobre el que se construyen los demás campos de fecha."
  >
    <DemoExample title="Configuración · pickerProps, inputIcon" :code="code">
      <BaseDatePicker
        id="date-picker-example"
        v-model="lowLevelDate"
        label="BaseDatePicker"
        placeholder="Wrapper de bajo nivel"
        :picker-props="{ autoApply: true }"
        input-icon="calendar"
        info="Permite pasar configuración compatible mediante pickerProps."
        :dark="isDark"
      />
    </DemoExample>
  </DemoSection>
</template>
