<script setup lang="ts">
import { BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description: "Body text with sizes, semantic colors and weights.",
    variants: "Variants · variant",
    colorWeight: "Color and weight · color, weight",
    xl: "Highlighted XL text.",
    body: "Body text for regular content.",
    small: "Small text.",
    label: "Label",
    heading: "Heading color, bold weight",
    muted: "Secondary text (muted)",
    brand: "Brand text",
    danger: "Error text",
    warning: "Warning text",
  },
  es: {
    description: "Texto de cuerpo con tamaños, colores semánticos y pesos.",
    variants: "Variantes · variant",
    colorWeight: "Color y peso · color, weight",
    xl: "Texto destacado de tamaño XL.",
    body: "Texto de cuerpo para contenidos habituales.",
    small: "Texto pequeño.",
    label: "Etiqueta",
    heading: "Color heading, peso bold",
    muted: "Texto secundario (muted)",
    brand: "Texto de marca",
    danger: "Texto de error",
    warning: "Texto de advertencia",
  },
});

const variantsCode = `<BaseText variant="xl">Highlighted XL text.</BaseText>
<BaseText>Body text for regular content.</BaseText>
<BaseText variant="sm">Small text.</BaseText>
<BaseText variant="label">Label</BaseText>`;

const colorCode = `<BaseText color="heading" weight="bold">Heading color, bold weight</BaseText>
<BaseText color="muted">Secondary text (muted)</BaseText>
<BaseText color="brand" weight="semibold">Brand text</BaseText>
<BaseText color="danger">Error text</BaseText>
<BaseText color="warning">Warning text</BaseText>`;
</script>

<template>
  <DemoSection id="base-text" name="BaseText" :description="t.description">
    <DemoExample :title="t.variants" :code="variantsCode">
      <div class="demo-stack">
        <BaseText variant="xl">{{ t.xl }}</BaseText>
        <BaseText>{{ t.body }}</BaseText>
        <BaseText variant="sm">{{ t.small }}</BaseText>
        <BaseText variant="label">{{ t.label }}</BaseText>
      </div>
    </DemoExample>

    <DemoExample :title="t.colorWeight" :code="colorCode">
      <div class="demo-stack">
        <BaseText color="heading" weight="bold">{{ t.heading }}</BaseText>
        <BaseText color="muted">{{ t.muted }}</BaseText>
        <BaseText color="brand" weight="semibold">{{ t.brand }}</BaseText>
        <BaseText color="danger">{{ t.danger }}</BaseText>
        <BaseText color="warning">{{ t.warning }}</BaseText>
      </div>
    </DemoExample>
  </DemoSection>
</template>
