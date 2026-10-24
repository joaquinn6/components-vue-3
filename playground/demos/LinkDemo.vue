<script setup lang="ts">
import { BaseCard, BaseLink } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const variantsCode = `<BaseLink href="#base-input">Ir a BaseInput</BaseLink>
<BaseLink href="#base-icon" variant="body" underline="always">Ver iconos</BaseLink>
<BaseLink href="https://example.com" target="_blank" variant="muted">
  Abrir enlace externo
</BaseLink>

<!-- inverse: sobre superficies invertidas -->
<BaseCard surface="inverse" padding="compact">
  <BaseLink href="#base-card" variant="inverse">Enlace inverso</BaseLink>
</BaseCard>`;

const sizesCode = `<BaseLink href="#base-link" size="sm">Pequeño</BaseLink>
<BaseLink href="#base-link" size="md">Mediano</BaseLink>
<BaseLink href="#base-link" size="lg" underline="none">Grande sin subrayado</BaseLink>`;
</script>

<template>
  <DemoSection
    id="base-link"
    name="BaseLink"
    description="Enlaces con variantes de color, tamaño y política de subrayado."
  >
    <DemoExample
      title="Variantes · variant, underline, target"
      :code="variantsCode"
    >
      <div class="demo-row">
        <BaseLink href="#base-input">Ir a BaseInput</BaseLink>
        <BaseLink href="#base-icon" variant="body" underline="always"
          >Ver iconos</BaseLink
        >
        <BaseLink href="https://example.com" target="_blank" variant="muted">
          Abrir enlace externo
        </BaseLink>
      </div>
      <BaseCard class="inverse-sample" surface="inverse" padding="compact">
        <BaseLink href="#base-card" variant="inverse">Enlace inverso</BaseLink>
      </BaseCard>
    </DemoExample>

    <DemoExample title="Tamaños · size" :code="sizesCode">
      <div class="demo-row">
        <BaseLink href="#base-link" size="sm">Pequeño</BaseLink>
        <BaseLink href="#base-link" size="md">Mediano</BaseLink>
        <BaseLink href="#base-link" size="lg" underline="none">
          Grande sin subrayado
        </BaseLink>
      </div>
    </DemoExample>
  </DemoSection>
</template>
