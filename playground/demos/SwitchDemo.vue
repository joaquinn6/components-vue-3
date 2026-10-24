<script setup lang="ts">
import { ref } from "vue";
import { BaseSwitch } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const notifications = ref(true);
const newsletter = ref(false);
const smallSize = ref(true);
const mediumSize = ref(true);

const t = useMessages({
  en: {
    description:
      "Boolean toggle with label position, size, disabled state and error.",
    title: "States · labelPosition, disabled, error",
    sizesTitle: "Sizes · size",
    notifications: "Receive notifications",
    labelTop: "Label on top",
    disabled: "Disabled switch",
    withError: "Switch with error",
    errorText: "Fix this option before continuing.",
    small: "Small (sm, default)",
    medium: "Medium (md)",
  },
  es: {
    description:
      "Interruptor booleano con posición de etiqueta, tamaño, estado deshabilitado y error.",
    title: "Estados · labelPosition, disabled, error",
    sizesTitle: "Tamaños · size",
    notifications: "Recibir notificaciones",
    labelTop: "Etiqueta encima",
    disabled: "Switch deshabilitado",
    withError: "Switch con error",
    errorText: "Corrige esta opción antes de continuar.",
    small: "Pequeño (sm, predeterminado)",
    medium: "Mediano (md)",
  },
});

const code = `<!-- labelPosition defaults to "end" -->
<BaseSwitch id="notifications" v-model="notifications" label="Receive notifications" />
<BaseSwitch id="newsletter" v-model="newsletter" label="Label on top" label-position="top" />
<BaseSwitch id="disabled-switch" label="Disabled switch" disabled />
<BaseSwitch id="error-switch" label="Switch with error" error="Fix this option before continuing." />`;

const sizesCode = `<BaseSwitch id="switch-sm" v-model="smallSize" label="Small (sm, default)" />
<BaseSwitch id="switch-md" v-model="mediumSize" label="Medium (md)" size="md" />`;
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
          :label="t.labelTop"
          label-position="top"
        />
        <BaseSwitch id="disabled-switch" :label="t.disabled" disabled />
        <BaseSwitch
          id="error-switch"
          :label="t.withError"
          :error="t.errorText"
        />
      </div>
    </DemoExample>

    <DemoExample :title="t.sizesTitle" :code="sizesCode">
      <div class="demo-stack">
        <BaseSwitch id="switch-sm" v-model="smallSize" :label="t.small" />
        <BaseSwitch
          id="switch-md"
          v-model="mediumSize"
          :label="t.medium"
          size="md"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
