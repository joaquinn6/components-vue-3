<script setup lang="ts">
import { ref } from "vue";
import { BaseDateInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";

const { isDark } = usePlaygroundTheme();
const date = ref<Date | null>(new Date());
const today = new Date();

const code = `<BaseDateInput
  v-model="date"
  label="Fecha"
  placeholder="Selecciona una fecha"
  help="Selector sin hora."
  :dark="isDark"
/>

<BaseDateInput
  label="Solo fechas futuras"
  placeholder="Desde hoy"
  :min-date="new Date()"
  :dark="isDark"
/>

<BaseDateInput label="Fecha deshabilitada" placeholder="No editable" disabled :dark="isDark" />`;
</script>

<template>
  <DemoSection
    id="base-date-input"
    name="BaseDateInput"
    description="Selector de fecha sin hora. Requiere @vuepic/vue-datepicker; dark sincroniza el calendario con el tema."
  >
    <DemoExample
      title="Uso y restricciones · v-model, minDate, disabled, dark"
      :code="code"
    >
      <div class="demo-grid demo-grid--three">
        <BaseDateInput
          id="date-basic"
          v-model="date"
          label="Fecha"
          placeholder="Selecciona una fecha"
          help="Selector sin hora."
          :dark="isDark"
        />
        <BaseDateInput
          id="date-min"
          label="Solo fechas futuras"
          placeholder="Desde hoy"
          :min-date="today"
          :dark="isDark"
        />
        <BaseDateInput
          id="date-disabled"
          label="Fecha deshabilitada"
          placeholder="No editable"
          disabled
          :dark="isDark"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
