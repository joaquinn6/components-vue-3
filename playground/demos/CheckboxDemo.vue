<script setup lang="ts">
import { ref } from "vue";
import { BaseCheckbox } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const accepted = ref(true);
const returnsAccepted = ref(false);
const partial = ref(false);
const topLabel = ref(false);

const typesCode = `<BaseCheckbox v-model="accepted" label="Primary" type="primary" />
<BaseCheckbox v-model="partial" label="Selección parcial" type="secondary" indeterminate />
<BaseCheckbox label="Success" type="success" :model-value="true" />
<BaseCheckbox
  label="Opción con error"
  type="danger"
  invalid
  error="Texto de error de ejemplo"
/>`;

const positionCode = `<!-- Predeterminado: etiqueta a la derecha -->
<BaseCheckbox v-model="accepted" label="Etiqueta a la derecha" />

<!-- Etiqueta encima solo si se indica -->
<BaseCheckbox v-model="accepted" label="Etiqueta encima" label-position="top" />`;

const slotCode = `<BaseCheckbox v-model="accepted" type="primary">
  <template #label>
    Acepto las <a href="#">condiciones de devolución</a>
  </template>
</BaseCheckbox>`;
</script>

<template>
  <DemoSection
    id="base-checkbox"
    name="BaseCheckbox"
    description="Casilla con tipos de color, posición de etiqueta, estado indeterminado y error. La etiqueta va a la derecha por defecto."
  >
    <DemoExample
      title="Tipos y estados · type, indeterminate, invalid"
      :code="typesCode"
    >
      <div class="demo-stack">
        <BaseCheckbox
          id="checkbox-primary"
          v-model="accepted"
          label="Primary"
          type="primary"
        />
        <BaseCheckbox
          id="checkbox-partial"
          v-model="partial"
          label="Selección parcial"
          type="secondary"
          indeterminate
        />
        <BaseCheckbox
          id="checkbox-success"
          label="Success"
          type="success"
          :model-value="true"
        />
        <BaseCheckbox
          id="checkbox-error"
          label="Opción con error"
          type="danger"
          invalid
          error="Texto de error de ejemplo"
        />
      </div>
    </DemoExample>

    <DemoExample
      title="Posición de la etiqueta · labelPosition"
      description='"end" (predeterminado) coloca la etiqueta a la derecha; "top" la coloca encima.'
      :code="positionCode"
    >
      <div class="demo-row">
        <BaseCheckbox
          id="checkbox-position-end"
          v-model="topLabel"
          label="Etiqueta a la derecha"
        />
        <BaseCheckbox
          id="checkbox-position-top"
          v-model="topLabel"
          label="Etiqueta encima"
          label-position="top"
        />
      </div>
    </DemoExample>

    <DemoExample title="Etiqueta con enlace · #label" :code="slotCode">
      <BaseCheckbox id="checkbox-slot" v-model="returnsAccepted" type="primary">
        <template #label>
          Acepto las <a href="#base-checkbox">condiciones de devolución</a>
        </template>
      </BaseCheckbox>
    </DemoExample>
  </DemoSection>
</template>
