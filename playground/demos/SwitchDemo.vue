<script setup lang="ts">
import { ref } from "vue";
import { BaseSwitch } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const notifications = ref(true);
const newsletter = ref(false);

const code = `<BaseSwitch id="notifications" v-model="notifications" label="Recibir notificaciones" />
<BaseSwitch id="newsletter" v-model="newsletter" label="Etiqueta al final" label-position="end" />
<BaseSwitch id="disabled-switch" label="Switch deshabilitado" label-position="end" disabled />
<BaseSwitch id="error-switch" label="Switch con error" error="Corrige esta opción antes de continuar." />`;
</script>

<template>
  <DemoSection
    id="base-switch"
    name="BaseSwitch"
    description="Interruptor booleano con posición de etiqueta, estado deshabilitado y error."
  >
    <DemoExample title="Estados · labelPosition, disabled, error" :code="code">
      <div class="demo-stack">
        <BaseSwitch
          id="notifications"
          v-model="notifications"
          label="Recibir notificaciones"
        />
        <BaseSwitch
          id="newsletter"
          v-model="newsletter"
          label="Etiqueta al final"
          label-position="end"
        />
        <BaseSwitch
          id="disabled-switch"
          label="Switch deshabilitado"
          label-position="end"
          disabled
        />
        <BaseSwitch
          id="error-switch"
          label="Switch con error"
          error="Corrige esta opción antes de continuar."
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
