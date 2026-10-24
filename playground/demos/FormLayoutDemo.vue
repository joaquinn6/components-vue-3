<script setup lang="ts">
import { BaseFormRow, BaseFormSection, BaseInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const code = `<BaseFormSection
  title="Datos de envío"
  description="Agrupa campos relacionados con un título semántico."
  title-as="h3"
>
  <BaseInput label="Campo a ancho completo" model-value="Valor completo" />

  <BaseFormRow :columns="3" :column-widths="['1fr', '2fr', '1fr']">
    <BaseInput label="Primera columna" model-value="Valor de ejemplo" />
    <BaseInput label="Segunda columna" model-value="Otro valor" />
    <BaseInput label="Tercera columna" model-value="Tercer valor" />
  </BaseFormRow>

  <BaseFormRow :columns="2">
    <BaseInput label="Columna 1 de 2" model-value="Izquierda" />
    <BaseInput label="Columna 2 de 2" model-value="Derecha" />
  </BaseFormRow>
</BaseFormSection>`;
</script>

<template>
  <DemoSection
    id="base-form-layout"
    name="BaseFormSection · BaseFormRow"
    description="Layout estándar de formularios. BaseFormRow admite de 1 a 4 columnas con anchos CSS (1fr, 2fr, minmax(10rem, 1fr)…) y se apila en pantallas estrechas."
  >
    <DemoExample
      title="Secciones y columnas · columns, columnWidths, titleAs"
      :code="code"
    >
      <BaseFormSection
        title="Datos de envío"
        description="Agrupa campos relacionados con un título semántico."
        title-as="h3"
      >
        <BaseInput
          id="layout-full"
          label="Campo a ancho completo"
          model-value="Valor completo"
        />
        <BaseFormRow :columns="3" :column-widths="['1fr', '2fr', '1fr']">
          <BaseInput
            id="layout-col-1"
            label="Primera columna"
            model-value="Valor de ejemplo"
          />
          <BaseInput
            id="layout-col-2"
            label="Segunda columna"
            model-value="Otro valor"
          />
          <BaseInput
            id="layout-col-3"
            label="Tercera columna"
            model-value="Tercer valor"
          />
        </BaseFormRow>
        <BaseFormRow :columns="2">
          <BaseInput
            id="layout-half-1"
            label="Columna 1 de 2"
            model-value="Izquierda"
          />
          <BaseInput
            id="layout-half-2"
            label="Columna 2 de 2"
            model-value="Derecha"
          />
        </BaseFormRow>
      </BaseFormSection>
    </DemoExample>
  </DemoSection>
</template>
