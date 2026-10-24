<script setup lang="ts">
import { BaseCard, BaseHeading, BaseInput, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description:
      "Container surface with background, padding, radius and elevation variants.",
    surfaces: "Surfaces · surface, padding, radius, elevation, outlined",
    pageTitle: "Page card",
    pageText: "Default surface, border and soft elevation.",
    primaryTitle: "Primary surface",
    primaryText: "Useful to highlight relevant content.",
    inverseTitle: "Inverse card",
    inverseText: "Contrast for highlighted backgrounds.",
    titledTitle: "With title · title, titlePosition, titleIcon, titleAs",
    senderTitle: "Sender details",
    integrationsTitle: "Integrations",
    fullName: "Full name",
    storeUrl: "Store URL",
  },
  es: {
    description:
      "Superficie contenedora con variantes de fondo, relleno, radio y elevación.",
    surfaces: "Superficies · surface, padding, radius, elevation, outlined",
    pageTitle: "Tarjeta de página",
    pageText: "Superficie predeterminada, borde y elevación suave.",
    primaryTitle: "Superficie primaria",
    primaryText: "Útil para destacar contenido relevante.",
    inverseTitle: "Tarjeta inversa",
    inverseText: "Contraste para fondos destacados.",
    titledTitle: "Con título · title, titlePosition, titleIcon, titleAs",
    senderTitle: "Datos del remitente",
    integrationsTitle: "Integraciones",
    fullName: "Nombre completo",
    storeUrl: "URL de la tienda",
  },
});

const titledCode = `<BaseCard title="Sender details" title-icon="location" outlined>
  <BaseInput label="Full name" />
</BaseCard>

<BaseCard title="Integrations" title-position="outside" title-icon="settings" outlined>
  <BaseInput label="Store URL" />
</BaseCard>`;

const surfacesCode = `<BaseCard padding="comfortable" elevation="sm" outlined>
  <BaseHeading as="h3" variant="md">Page card</BaseHeading>
  <BaseText>Default surface, border and soft elevation.</BaseText>
</BaseCard>

<BaseCard surface="primary" padding="comfortable" radius="lg">
  <BaseHeading as="h3" variant="md">Primary surface</BaseHeading>
  <BaseText color="heading">Useful to highlight relevant content.</BaseText>
</BaseCard>

<BaseCard surface="inverse" padding="compact" elevation="md">
  <BaseHeading as="h3" variant="sm" color="inverse">Inverse card</BaseHeading>
  <BaseText color="inverse-muted">Contrast for highlighted backgrounds.</BaseText>
</BaseCard>`;
</script>

<template>
  <DemoSection id="base-card" name="BaseCard" :description="t.description">
    <DemoExample :title="t.surfaces" :code="surfacesCode">
      <div class="demo-grid demo-grid--three">
        <BaseCard padding="comfortable" elevation="sm" outlined>
          <BaseHeading as="h3" variant="md">{{ t.pageTitle }}</BaseHeading>
          <BaseText>{{ t.pageText }}</BaseText>
        </BaseCard>
        <BaseCard surface="primary" padding="comfortable" radius="lg">
          <BaseHeading as="h3" variant="md">{{ t.primaryTitle }}</BaseHeading>
          <BaseText color="heading">{{ t.primaryText }}</BaseText>
        </BaseCard>
        <BaseCard surface="inverse" padding="compact" elevation="md">
          <BaseHeading as="h3" variant="sm" color="inverse">
            {{ t.inverseTitle }}
          </BaseHeading>
          <BaseText color="inverse-muted">{{ t.inverseText }}</BaseText>
        </BaseCard>
      </div>
    </DemoExample>

    <DemoExample :title="t.titledTitle" :code="titledCode">
      <div class="demo-grid demo-grid--two">
        <BaseCard :title="t.senderTitle" title-icon="location" outlined>
          <BaseInput id="card-full-name" :label="t.fullName" />
        </BaseCard>
        <BaseCard
          :title="t.integrationsTitle"
          title-position="outside"
          title-icon="settings"
          outlined
        >
          <BaseInput id="card-store-url" :label="t.storeUrl" />
        </BaseCard>
      </div>
    </DemoExample>
  </DemoSection>
</template>
