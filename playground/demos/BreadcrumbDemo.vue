<script setup lang="ts">
import { BaseBreadcrumb } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const breadcrumbs = [
  { name: "Inicio", to: { name: "home" } },
  { name: "Configuración", to: { path: "/settings" } },
  { name: "Direcciones", to: { name: "address-book", query: { page: 1 } } },
  { name: "Editar dirección" },
];

const code = `<script setup>
const breadcrumbs = [
  { name: "Inicio", to: { name: "home" } },
  { name: "Configuración", to: { path: "/settings" } },
  { name: "Direcciones", to: { name: "address-book", query: { page: 1 } } },
  { name: "Editar dirección" }, // último elemento: página actual, sin enlace
];
<\/script>

<template>
  <BaseBreadcrumb :value="breadcrumbs" divider="/" size="md" weight="semibold" />
  <BaseBreadcrumb :value="breadcrumbs" divider="›" size="sm" />
</template>`;
</script>

<template>
  <DemoSection
    id="base-breadcrumb"
    name="BaseBreadcrumb"
    description="Ruta de navegación compatible con RouterLink; el último elemento es la página actual."
  >
    <DemoExample
      title="Separador y tamaño · divider, size, weight"
      :code="code"
    >
      <div class="demo-stack">
        <BaseBreadcrumb
          :value="breadcrumbs"
          divider="/"
          size="md"
          weight="semibold"
        />
        <BaseBreadcrumb
          :value="breadcrumbs"
          divider="›"
          size="sm"
          aria-label="Ruta de navegación compacta"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
