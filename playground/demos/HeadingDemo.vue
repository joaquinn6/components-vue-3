<script setup lang="ts">
import { BaseHeading } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const variantsCode = `<BaseHeading as="p" variant="hero">Título hero</BaseHeading>
<BaseHeading as="h2" variant="lg">Título grande</BaseHeading>
<BaseHeading as="h3" variant="md">Título mediano</BaseHeading>
<BaseHeading as="h4" variant="sm">Título pequeño</BaseHeading>
<BaseHeading as="p" variant="xs">Título mínimo</BaseHeading>`;

const colorCode = `<BaseHeading as="p" variant="lg" color="brand">Título de marca</BaseHeading>
<BaseHeading as="p" variant="md" color="body">Título con color de cuerpo</BaseHeading>
<BaseHeading as="p" variant="md" align="center">Título centrado</BaseHeading>`;
</script>

<template>
  <DemoSection
    id="base-heading"
    name="BaseHeading"
    description="Títulos con jerarquía visual independiente de la etiqueta semántica (as)."
  >
    <DemoExample title="Variantes · variant" :code="variantsCode">
      <div class="demo-stack">
        <BaseHeading as="p" variant="hero">Título hero</BaseHeading>
        <BaseHeading as="h2" variant="lg">Título grande</BaseHeading>
        <BaseHeading as="h3" variant="md">Título mediano</BaseHeading>
        <BaseHeading as="h4" variant="sm">Título pequeño</BaseHeading>
        <BaseHeading as="p" variant="xs">Título mínimo</BaseHeading>
      </div>
    </DemoExample>

    <DemoExample title="Color y alineación · color, align" :code="colorCode">
      <div class="demo-stack">
        <BaseHeading as="p" variant="lg" color="brand"
          >Título de marca</BaseHeading
        >
        <BaseHeading as="p" variant="md" color="body">
          Título con color de cuerpo
        </BaseHeading>
        <BaseHeading as="p" variant="md" align="center"
          >Título centrado</BaseHeading
        >
      </div>
    </DemoExample>
  </DemoSection>
</template>
