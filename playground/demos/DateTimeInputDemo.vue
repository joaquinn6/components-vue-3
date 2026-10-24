<script setup lang="ts">
import { ref } from "vue";
import { BaseDateTimeInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";
import { useDateFieldMessages } from "../i18n/dates";
import { useMessages } from "../i18n/usePlaygroundLocale";

const { isDark } = usePlaygroundTheme();
const dateTime = ref<Date | null>(new Date());
const field = useDateFieldMessages();

const t = useMessages({
  en: {
    description:
      "Date with time; also accepts minTime, maxTime, disabledTimes and timeConfig.",
    title: "Basic usage · v-model, dark",
    label: "Date and time",
    placeholder: "Select date and time",
  },
  es: {
    description:
      "Fecha con hora; admite además minTime, maxTime, disabledTimes y timeConfig.",
    title: "Uso básico · v-model, dark",
    label: "Fecha y hora",
    placeholder: "Selecciona fecha y hora",
  },
});

const code = `<BaseDateTimeInput
  v-model="dateTime"
  label="Date and time"
  placeholder="Select date and time"
  clear-aria-label="Clear date"
  :dark="isDark"
/>`;
</script>

<template>
  <DemoSection
    id="base-date-time-input"
    name="BaseDateTimeInput"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <BaseDateTimeInput
        id="date-time-example"
        v-model="dateTime"
        :label="t.label"
        :placeholder="t.placeholder"
        :clear-aria-label="field.clear"
        :info-aria-label="field.info"
        :dark="isDark"
      />
    </DemoExample>
  </DemoSection>
</template>
