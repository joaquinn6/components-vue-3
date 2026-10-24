<script setup lang="ts">
import { BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const variantsCode = `<BaseText variant="xl">Texto destacado de tamaño XL.</BaseText>
<BaseText>Texto de cuerpo para contenidos habituales.</BaseText>
<BaseText variant="sm">Texto pequeño.</BaseText>
<BaseText variant="label">Etiqueta</BaseText>`;

const colorCode = `<BaseText color="heading" weight="bold">Color heading, peso bold</BaseText>
<BaseText color="muted">Texto secundario (muted)</BaseText>
<BaseText color="brand" weight="semibold">Texto de marca</BaseText>
<BaseText color="danger">Texto de error</BaseText>
<BaseText color="warning">Texto de advertencia</BaseText>`;
</script>

<template>
  <DemoSection
    id="base-text"
    name="BaseText"
    description="Texto de cuerpo con tamaños, colores semánticos y pesos."
  >
    <DemoExample title="Variantes · variant" :code="variantsCode">
      <div class="demo-stack">
        <BaseText variant="xl">Texto destacado de tamaño XL.</BaseText>
        <BaseText>Texto de cuerpo para contenidos habituales.</BaseText>
        <BaseText variant="sm">Texto pequeño.</BaseText>
        <BaseText variant="label">Etiqueta</BaseText>
      </div>
    </DemoExample>

    <DemoExample title="Color y peso · color, weight" :code="colorCode">
      <div class="demo-stack">
        <BaseText color="heading" weight="bold"
          >Color heading, peso bold</BaseText
        >
        <BaseText color="muted">Texto secundario (muted)</BaseText>
        <BaseText color="brand" weight="semibold">Texto de marca</BaseText>
        <BaseText color="danger">Texto de error</BaseText>
        <BaseText color="warning">Texto de advertencia</BaseText>
      </div>
    </DemoExample>
  </DemoSection>
</template>
