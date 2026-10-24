<script setup lang="ts">
import { BaseCard, BaseLink } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description: "Links with color, size and underline variants.",
    variantsTitle: "Variants · variant, underline, target",
    sizesTitle: "Sizes · size",
    goToInput: "Go to BaseInput",
    viewIcons: "View icons",
    external: "Open external link",
    inverse: "Inverse link",
    small: "Small",
    medium: "Medium",
    largeNoUnderline: "Large without underline",
  },
  es: {
    description:
      "Enlaces con variantes de color, tamaño y política de subrayado.",
    variantsTitle: "Variantes · variant, underline, target",
    sizesTitle: "Tamaños · size",
    goToInput: "Ir a BaseInput",
    viewIcons: "Ver iconos",
    external: "Abrir enlace externo",
    inverse: "Enlace inverso",
    small: "Pequeño",
    medium: "Mediano",
    largeNoUnderline: "Grande sin subrayado",
  },
});

const variantsCode = `<BaseLink href="#base-input">Go to BaseInput</BaseLink>
<BaseLink href="#base-icon" variant="body" underline="always">View icons</BaseLink>
<BaseLink href="https://example.com" target="_blank" variant="muted">
  Open external link
</BaseLink>

<!-- inverse: on inverted surfaces -->
<BaseCard surface="inverse" padding="compact">
  <BaseLink href="#base-card" variant="inverse">Inverse link</BaseLink>
</BaseCard>`;

const sizesCode = `<BaseLink href="#base-link" size="sm">Small</BaseLink>
<BaseLink href="#base-link" size="md">Medium</BaseLink>
<BaseLink href="#base-link" size="lg" underline="none">Large without underline</BaseLink>`;
</script>

<template>
  <DemoSection id="base-link" name="BaseLink" :description="t.description">
    <DemoExample :title="t.variantsTitle" :code="variantsCode">
      <div class="demo-row">
        <BaseLink href="#base-input">{{ t.goToInput }}</BaseLink>
        <BaseLink href="#base-icon" variant="body" underline="always">
          {{ t.viewIcons }}
        </BaseLink>
        <BaseLink href="https://example.com" target="_blank" variant="muted">
          {{ t.external }}
        </BaseLink>
      </div>
      <BaseCard class="inverse-sample" surface="inverse" padding="compact">
        <BaseLink href="#base-card" variant="inverse">{{ t.inverse }}</BaseLink>
      </BaseCard>
    </DemoExample>

    <DemoExample :title="t.sizesTitle" :code="sizesCode">
      <div class="demo-row">
        <BaseLink href="#base-link" size="sm">{{ t.small }}</BaseLink>
        <BaseLink href="#base-link" size="md">{{ t.medium }}</BaseLink>
        <BaseLink href="#base-link" size="lg" underline="none">
          {{ t.largeNoUnderline }}
        </BaseLink>
      </div>
    </DemoExample>
  </DemoSection>
</template>
