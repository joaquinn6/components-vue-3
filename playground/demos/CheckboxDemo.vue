<script setup lang="ts">
import { ref } from "vue";
import { BaseCheckbox } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const accepted = ref(true);
const returnsAccepted = ref(false);
const partial = ref(false);
const positionExample = ref(false);

const t = useMessages({
  en: {
    description:
      "Checkbox with color types, label position, indeterminate state and error. The label goes on the right by default.",
    typesTitle: "Types and states · type, indeterminate, invalid",
    positionTitle: "Label position · labelPosition",
    positionDescription:
      '"end" (default) places the label on the right; "top" places it above.',
    slotTitle: "Label with a link · #label",
    primary: "Primary",
    partial: "Partial selection",
    success: "Success",
    withError: "Option with error",
    errorText: "Sample error text",
    labelRight: "Label on the right",
    labelTop: "Label on top",
    acceptThe: "I accept the",
    returnPolicy: "return conditions",
  },
  es: {
    description:
      "Casilla con tipos de color, posición de etiqueta, estado indeterminado y error. La etiqueta va a la derecha por defecto.",
    typesTitle: "Tipos y estados · type, indeterminate, invalid",
    positionTitle: "Posición de la etiqueta · labelPosition",
    positionDescription:
      '"end" (predeterminado) coloca la etiqueta a la derecha; "top" la coloca encima.',
    slotTitle: "Etiqueta con enlace · #label",
    primary: "Primary",
    partial: "Selección parcial",
    success: "Success",
    withError: "Opción con error",
    errorText: "Texto de error de ejemplo",
    labelRight: "Etiqueta a la derecha",
    labelTop: "Etiqueta encima",
    acceptThe: "Acepto las",
    returnPolicy: "condiciones de devolución",
  },
});

const typesCode = `<BaseCheckbox v-model="accepted" label="Primary" type="primary" />
<BaseCheckbox v-model="partial" label="Partial selection" type="secondary" indeterminate />
<BaseCheckbox label="Success" type="success" :model-value="true" />
<BaseCheckbox
  label="Option with error"
  type="danger"
  invalid
  error="Sample error text"
/>`;

const positionCode = `<!-- Default: label on the right -->
<BaseCheckbox v-model="accepted" label="Label on the right" />

<!-- Label on top only when requested -->
<BaseCheckbox v-model="accepted" label="Label on top" label-position="top" />`;

const slotCode = `<BaseCheckbox v-model="accepted" type="primary">
  <template #label>
    I accept the <a href="#">return conditions</a>
  </template>
</BaseCheckbox>`;
</script>

<template>
  <DemoSection
    id="base-checkbox"
    name="BaseCheckbox"
    :description="t.description"
  >
    <DemoExample :title="t.typesTitle" :code="typesCode">
      <div class="demo-stack">
        <BaseCheckbox
          id="checkbox-primary"
          v-model="accepted"
          :label="t.primary"
          type="primary"
        />
        <BaseCheckbox
          id="checkbox-partial"
          v-model="partial"
          :label="t.partial"
          type="secondary"
          indeterminate
        />
        <BaseCheckbox
          id="checkbox-success"
          :label="t.success"
          type="success"
          :model-value="true"
        />
        <BaseCheckbox
          id="checkbox-error"
          :label="t.withError"
          type="danger"
          invalid
          :error="t.errorText"
        />
      </div>
    </DemoExample>

    <DemoExample
      :title="t.positionTitle"
      :description="t.positionDescription"
      :code="positionCode"
    >
      <div class="demo-row">
        <BaseCheckbox
          id="checkbox-position-end"
          v-model="positionExample"
          :label="t.labelRight"
        />
        <BaseCheckbox
          id="checkbox-position-top"
          v-model="positionExample"
          :label="t.labelTop"
          label-position="top"
        />
      </div>
    </DemoExample>

    <DemoExample :title="t.slotTitle" :code="slotCode">
      <BaseCheckbox id="checkbox-slot" v-model="returnsAccepted" type="primary">
        <template #label>
          {{ t.acceptThe }}
          <a href="#base-checkbox">{{ t.returnPolicy }}</a>
        </template>
      </BaseCheckbox>
    </DemoExample>
  </DemoSection>
</template>
