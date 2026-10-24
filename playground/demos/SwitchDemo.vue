<script setup lang="ts">
import { ref } from "vue";
import { BaseSwitch } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const notifications = ref(true);
const newsletter = ref(false);

const t = useMessages({
  en: {
    description:
      "Boolean toggle with label position, disabled state and error.",
    title: "States · labelPosition, disabled, error",
    notifications: "Receive notifications",
    labelEnd: "Label at the end",
    disabled: "Disabled switch",
    withError: "Switch with error",
    errorText: "Fix this option before continuing.",
  },
  es: {
    description:
      "Interruptor booleano con posición de etiqueta, estado deshabilitado y error.",
    title: "Estados · labelPosition, disabled, error",
    notifications: "Recibir notificaciones",
    labelEnd: "Etiqueta al final",
    disabled: "Switch deshabilitado",
    withError: "Switch con error",
    errorText: "Corrige esta opción antes de continuar.",
  },
});

const code = `<BaseSwitch id="notifications" v-model="notifications" label="Receive notifications" />
<BaseSwitch id="newsletter" v-model="newsletter" label="Label at the end" label-position="end" />
<BaseSwitch id="disabled-switch" label="Disabled switch" label-position="end" disabled />
<BaseSwitch id="error-switch" label="Switch with error" error="Fix this option before continuing." />`;
</script>

<template>
  <DemoSection id="base-switch" name="BaseSwitch" :description="t.description">
    <DemoExample :title="t.title" :code="code">
      <div class="demo-stack">
        <BaseSwitch
          id="notifications"
          v-model="notifications"
          :label="t.notifications"
        />
        <BaseSwitch
          id="newsletter"
          v-model="newsletter"
          :label="t.labelEnd"
          label-position="end"
        />
        <BaseSwitch
          id="disabled-switch"
          :label="t.disabled"
          label-position="end"
          disabled
        />
        <BaseSwitch
          id="error-switch"
          :label="t.withError"
          :error="t.errorText"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
