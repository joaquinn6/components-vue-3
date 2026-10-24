<script setup lang="ts">
import { ref } from "vue";
import { BaseDateTimeInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { usePlaygroundTheme } from "../composables/usePlaygroundTheme";

const { isDark } = usePlaygroundTheme();
const dateTime = ref<Date | null>(new Date());

const code = `<BaseDateTimeInput
  v-model="dateTime"
  label="Fecha y hora"
  placeholder="Selecciona fecha y hora"
  :dark="isDark"
/>`;
</script>

<template>
  <DemoSection
    id="base-date-time-input"
    name="BaseDateTimeInput"
    description="Fecha con hora; admite además minTime, maxTime, disabledTimes y timeConfig."
  >
    <DemoExample title="Uso básico · v-model, dark" :code="code">
      <BaseDateTimeInput
        id="date-time-example"
        v-model="dateTime"
        label="Fecha y hora"
        placeholder="Selecciona fecha y hora"
        :dark="isDark"
      />
    </DemoExample>
  </DemoSection>
</template>
