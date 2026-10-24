<script setup lang="ts">
import {
  BaseCheckbox,
  BaseFormColumns,
  BaseFormRow,
  BaseFormSection,
  BaseInput,
  BaseSwitch,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description:
      "Standard form layout. BaseFormRow accepts 1 to 4 columns with CSS widths (1fr, 2fr, minmax(10rem, 1fr)…) and stacks on narrow screens.",
    title: "Sections and columns · columns, columnWidths, titleAs",
    sectionTitle: "Shipping details",
    sectionDescription: "Groups related fields under a semantic heading.",
    fullWidth: "Full-width field",
    fullValue: "Full value",
    first: "First column",
    second: "Second column",
    third: "Third column",
    sampleValue: "Sample value",
    otherValue: "Another value",
    thirdValue: "Third value",
    half1: "Column 1 of 2",
    half2: "Column 2 of 2",
    left: "Left",
    right: "Right",
    alignTitle:
      "Alignment and equal columns · alignItems, BaseFormColumns, stretch",
    reference: "Reference",
    notify: "Notify by email",
    urgent: "Urgent",
    contactTitle: "Contact",
    contactDescription: "Stretched section to match its neighbour.",
    email: "Email",
    phone: "Phone",
    preferencesTitle: "Preferences",
    newsletter: "Receive newsletter",
  },
  es: {
    description:
      "Layout estándar de formularios. BaseFormRow admite de 1 a 4 columnas con anchos CSS (1fr, 2fr, minmax(10rem, 1fr)…) y se apila en pantallas estrechas.",
    title: "Secciones y columnas · columns, columnWidths, titleAs",
    sectionTitle: "Datos de envío",
    sectionDescription: "Agrupa campos relacionados con un título semántico.",
    fullWidth: "Campo a ancho completo",
    fullValue: "Valor completo",
    first: "Primera columna",
    second: "Segunda columna",
    third: "Tercera columna",
    sampleValue: "Valor de ejemplo",
    otherValue: "Otro valor",
    thirdValue: "Tercer valor",
    half1: "Columna 1 de 2",
    half2: "Columna 2 de 2",
    left: "Izquierda",
    right: "Derecha",
    alignTitle:
      "Alineación y columnas iguales · alignItems, BaseFormColumns, stretch",
    reference: "Referencia",
    notify: "Avisar por correo",
    urgent: "Urgente",
    contactTitle: "Contacto",
    contactDescription: "Sección estirada para igualar a su vecina.",
    email: "Correo",
    phone: "Teléfono",
    preferencesTitle: "Preferencias",
    newsletter: "Recibir boletín",
  },
});

const alignCode = `<BaseFormRow :columns="3" align-items="center">
  <BaseInput label="Reference" model-value="REF-1042" />
  <BaseCheckbox label="Notify by email" label-position="end" />
  <BaseSwitch id="urgent" label="Urgent" />
</BaseFormRow>

<BaseFormColumns>
  <BaseFormSection title="Contact" description="Stretched section…" stretch>
    <BaseInput label="Email" />
    <BaseInput label="Phone" />
  </BaseFormSection>
  <BaseFormSection title="Preferences" stretch>
    <BaseSwitch id="newsletter" label="Receive newsletter" />
  </BaseFormSection>
</BaseFormColumns>`;

const code = `<BaseFormSection
  title="Shipping details"
  description="Groups related fields under a semantic heading."
  title-as="h3"
>
  <BaseInput label="Full-width field" model-value="Full value" />

  <BaseFormRow :columns="3" :column-widths="['1fr', '2fr', '1fr']">
    <BaseInput label="First column" model-value="Sample value" />
    <BaseInput label="Second column" model-value="Another value" />
    <BaseInput label="Third column" model-value="Third value" />
  </BaseFormRow>

  <BaseFormRow :columns="2">
    <BaseInput label="Column 1 of 2" model-value="Left" />
    <BaseInput label="Column 2 of 2" model-value="Right" />
  </BaseFormRow>
</BaseFormSection>`;
</script>

<template>
  <DemoSection
    id="base-form-layout"
    name="BaseFormSection · BaseFormRow · BaseFormColumns"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <BaseFormSection
        :title="t.sectionTitle"
        :description="t.sectionDescription"
        title-as="h3"
      >
        <BaseInput
          id="layout-full"
          :label="t.fullWidth"
          :model-value="t.fullValue"
        />
        <BaseFormRow :columns="3" :column-widths="['1fr', '2fr', '1fr']">
          <BaseInput
            id="layout-col-1"
            :label="t.first"
            :model-value="t.sampleValue"
          />
          <BaseInput
            id="layout-col-2"
            :label="t.second"
            :model-value="t.otherValue"
          />
          <BaseInput
            id="layout-col-3"
            :label="t.third"
            :model-value="t.thirdValue"
          />
        </BaseFormRow>
        <BaseFormRow :columns="2">
          <BaseInput
            id="layout-half-1"
            :label="t.half1"
            :model-value="t.left"
          />
          <BaseInput
            id="layout-half-2"
            :label="t.half2"
            :model-value="t.right"
          />
        </BaseFormRow>
      </BaseFormSection>
    </DemoExample>

    <DemoExample :title="t.alignTitle" :code="alignCode">
      <div class="demo-stack">
        <BaseFormRow :columns="3" align-items="center">
          <BaseInput
            id="layout-align-reference"
            :label="t.reference"
            model-value="REF-1042"
          />
          <BaseCheckbox
            id="layout-align-notify"
            :label="t.notify"
            label-position="end"
          />
          <BaseSwitch id="layout-align-urgent" :label="t.urgent" />
        </BaseFormRow>
        <BaseFormColumns>
          <BaseFormSection
            :title="t.contactTitle"
            :description="t.contactDescription"
            stretch
          >
            <BaseInput id="layout-columns-email" :label="t.email" />
            <BaseInput id="layout-columns-phone" :label="t.phone" />
          </BaseFormSection>
          <BaseFormSection :title="t.preferencesTitle" stretch>
            <BaseSwitch id="layout-columns-newsletter" :label="t.newsletter" />
          </BaseFormSection>
        </BaseFormColumns>
      </div>
    </DemoExample>
  </DemoSection>
</template>
