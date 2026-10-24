<script setup lang="ts">
import { BaseHeading } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description:
      "Headings whose visual hierarchy is independent from the semantic tag (as).",
    variants: "Variants · variant",
    colorAlign: "Color and alignment · color, align",
    hero: "Hero heading",
    large: "Large heading",
    medium: "Medium heading",
    small: "Small heading",
    tiny: "Tiny heading",
    brand: "Brand heading",
    body: "Heading with body color",
    centered: "Centered heading",
  },
  es: {
    description:
      "Títulos con jerarquía visual independiente de la etiqueta semántica (as).",
    variants: "Variantes · variant",
    colorAlign: "Color y alineación · color, align",
    hero: "Título hero",
    large: "Título grande",
    medium: "Título mediano",
    small: "Título pequeño",
    tiny: "Título mínimo",
    brand: "Título de marca",
    body: "Título con color de cuerpo",
    centered: "Título centrado",
  },
});

const variantsCode = `<BaseHeading as="p" variant="hero">Hero heading</BaseHeading>
<BaseHeading as="h2" variant="lg">Large heading</BaseHeading>
<BaseHeading as="h3" variant="md">Medium heading</BaseHeading>
<BaseHeading as="h4" variant="sm">Small heading</BaseHeading>
<BaseHeading as="p" variant="xs">Tiny heading</BaseHeading>`;

const colorCode = `<BaseHeading as="p" variant="lg" color="brand">Brand heading</BaseHeading>
<BaseHeading as="p" variant="md" color="body">Heading with body color</BaseHeading>
<BaseHeading as="p" variant="md" align="center">Centered heading</BaseHeading>`;
</script>

<template>
  <DemoSection
    id="base-heading"
    name="BaseHeading"
    :description="t.description"
  >
    <DemoExample :title="t.variants" :code="variantsCode">
      <div class="demo-stack">
        <BaseHeading as="p" variant="hero">{{ t.hero }}</BaseHeading>
        <BaseHeading as="h2" variant="lg">{{ t.large }}</BaseHeading>
        <BaseHeading as="h3" variant="md">{{ t.medium }}</BaseHeading>
        <BaseHeading as="h4" variant="sm">{{ t.small }}</BaseHeading>
        <BaseHeading as="p" variant="xs">{{ t.tiny }}</BaseHeading>
      </div>
    </DemoExample>

    <DemoExample :title="t.colorAlign" :code="colorCode">
      <div class="demo-stack">
        <BaseHeading as="p" variant="lg" color="brand">{{
          t.brand
        }}</BaseHeading>
        <BaseHeading as="p" variant="md" color="body">{{ t.body }}</BaseHeading>
        <BaseHeading as="p" variant="md" align="center">
          {{ t.centered }}
        </BaseHeading>
      </div>
    </DemoExample>
  </DemoSection>
</template>
