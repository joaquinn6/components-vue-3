<script setup lang="ts">
import { BaseCard, BaseHeading, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const surfacesCode = `<BaseCard padding="comfortable" elevation="sm" outlined>
  <BaseHeading as="h3" variant="md">Tarjeta de página</BaseHeading>
  <BaseText>Superficie predeterminada, borde y elevación suave.</BaseText>
</BaseCard>

<BaseCard surface="primary" padding="comfortable" radius="lg">
  <BaseHeading as="h3" variant="md">Superficie primaria</BaseHeading>
  <BaseText color="heading">Útil para destacar contenido relevante.</BaseText>
</BaseCard>

<BaseCard surface="inverse" padding="compact" elevation="md">
  <BaseHeading as="h3" variant="sm" color="inverse">Tarjeta inversa</BaseHeading>
  <BaseText color="inverse-muted">Contraste para fondos destacados.</BaseText>
</BaseCard>`;
</script>

<template>
  <DemoSection
    id="base-card"
    name="BaseCard"
    description="Superficie contenedora con variantes de fondo, relleno, radio y elevación."
  >
    <DemoExample
      title="Superficies · surface, padding, radius, elevation, outlined"
      :code="surfacesCode"
    >
      <div class="demo-grid demo-grid--three">
        <BaseCard padding="comfortable" elevation="sm" outlined>
          <BaseHeading as="h3" variant="md">Tarjeta de página</BaseHeading>
          <BaseText
            >Superficie predeterminada, borde y elevación suave.</BaseText
          >
        </BaseCard>
        <BaseCard surface="primary" padding="comfortable" radius="lg">
          <BaseHeading as="h3" variant="md">Superficie primaria</BaseHeading>
          <BaseText color="heading"
            >Útil para destacar contenido relevante.</BaseText
          >
        </BaseCard>
        <BaseCard surface="inverse" padding="compact" elevation="md">
          <BaseHeading as="h3" variant="sm" color="inverse">
            Tarjeta inversa
          </BaseHeading>
          <BaseText color="inverse-muted"
            >Contraste para fondos destacados.</BaseText
          >
        </BaseCard>
      </div>
    </DemoExample>
  </DemoSection>
</template>
