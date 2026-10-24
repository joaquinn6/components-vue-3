<script setup lang="ts">
import { BaseBadge } from "../../src/index";
import type { BaseBadgeTone } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const tones: BaseBadgeTone[] = [
  "neutral",
  "info",
  "success",
  "warning",
  "error",
  "critical",
  "progress",
  "violet",
];

const t = useMessages({
  en: {
    description: "Themeable status label with semantic tones and two sizes.",
    tonesTitle: "Tones · tone",
    sizesTitle: "Size and width · size, width, default slot",
    labels: {
      neutral: "Draft",
      info: "In transit",
      success: "Delivered",
      warning: "Delayed",
      error: "Failed",
      critical: "Incident",
      progress: "Processing",
      violet: "Returned",
    } as Record<BaseBadgeTone, string>,
    small: "Small",
    medium: "Medium",
    auto: "Auto width fits the content",
  },
  es: {
    description:
      "Etiqueta de estado tematizable con tonos semánticos y dos tamaños.",
    tonesTitle: "Tonos · tone",
    sizesTitle: "Tamaño y ancho · size, width, slot predeterminado",
    labels: {
      neutral: "Borrador",
      info: "En tránsito",
      success: "Entregado",
      warning: "Retrasado",
      error: "Fallido",
      critical: "Incidencia",
      progress: "Procesando",
      violet: "Devuelto",
    },
    small: "Pequeño",
    medium: "Mediano",
    auto: "El ancho automático se ajusta al contenido",
  },
});

const tonesCode = `<BaseBadge tone="neutral" label="Draft" />
<BaseBadge tone="info" label="In transit" />
<BaseBadge tone="success" label="Delivered" />
<BaseBadge tone="warning" label="Delayed" />
<BaseBadge tone="error" label="Failed" />
<BaseBadge tone="critical" label="Incident" />
<BaseBadge tone="progress" label="Processing" />
<BaseBadge tone="violet" label="Returned" />`;

const sizesCode = `<BaseBadge tone="success" size="sm" label="Small" />
<BaseBadge tone="success" size="md" label="Medium" />
<BaseBadge tone="info" width="auto">Auto width fits the content</BaseBadge>`;
</script>

<template>
  <DemoSection id="base-badge" name="BaseBadge" :description="t.description">
    <DemoExample :title="t.tonesTitle" :code="tonesCode">
      <div class="demo-row">
        <BaseBadge
          v-for="tone in tones"
          :key="tone"
          :tone="tone"
          :label="t.labels[tone]"
        />
      </div>
    </DemoExample>

    <DemoExample :title="t.sizesTitle" :code="sizesCode">
      <div class="demo-row">
        <BaseBadge tone="success" size="sm" :label="t.small" />
        <BaseBadge tone="success" size="md" :label="t.medium" />
        <BaseBadge tone="info" width="auto">{{ t.auto }}</BaseBadge>
      </div>
    </DemoExample>
  </DemoSection>
</template>
