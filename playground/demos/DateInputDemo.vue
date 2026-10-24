<script setup lang="ts">
import { ref } from "vue";
import { BaseDateInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";
import { useDateFieldMessages } from "../i18n/dates";
import { useMessages } from "../i18n/usePlaygroundLocale";

const { isDark } = usePlaygroundTheme();
const date = ref<Date | null>(new Date());
const today = new Date();
const field = useDateFieldMessages();

const t = useMessages({
  en: {
    description:
      "Date picker without time. Requires @vuepic/vue-datepicker; dark syncs the calendar with the theme.",
    title: "Usage and restrictions · v-model, minDate, disabled, dark",
    date: "Date",
    datePlaceholder: "Select a date",
    dateHelp: "Picker without time.",
    future: "Future dates only",
    futurePlaceholder: "From today",
    disabled: "Disabled date",
    disabledPlaceholder: "Not editable",
  },
  es: {
    description:
      "Selector de fecha sin hora. Requiere @vuepic/vue-datepicker; dark sincroniza el calendario con el tema.",
    title: "Uso y restricciones · v-model, minDate, disabled, dark",
    date: "Fecha",
    datePlaceholder: "Selecciona una fecha",
    dateHelp: "Selector sin hora.",
    future: "Solo fechas futuras",
    futurePlaceholder: "Desde hoy",
    disabled: "Fecha deshabilitada",
    disabledPlaceholder: "No editable",
  },
});

const code = `<BaseDateInput
  v-model="date"
  label="Date"
  placeholder="Select a date"
  help="Picker without time."
  clear-aria-label="Clear date"
  :dark="isDark"
/>

<BaseDateInput
  label="Future dates only"
  placeholder="From today"
  :min-date="new Date()"
  :dark="isDark"
/>

<BaseDateInput label="Disabled date" placeholder="Not editable" disabled :dark="isDark" />`;
</script>

<template>
  <DemoSection
    id="base-date-input"
    name="BaseDateInput"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <div class="demo-grid demo-grid--three">
        <BaseDateInput
          id="date-basic"
          v-model="date"
          :label="t.date"
          :placeholder="t.datePlaceholder"
          :help="t.dateHelp"
          :clear-aria-label="field.clear"
          :info-aria-label="field.info"
          :dark="isDark"
        />
        <BaseDateInput
          id="date-min"
          :label="t.future"
          :placeholder="t.futurePlaceholder"
          :min-date="today"
          :clear-aria-label="field.clear"
          :info-aria-label="field.info"
          :dark="isDark"
        />
        <BaseDateInput
          id="date-disabled"
          :label="t.disabled"
          :placeholder="t.disabledPlaceholder"
          :clear-aria-label="field.clear"
          :info-aria-label="field.info"
          disabled
          :dark="isDark"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
