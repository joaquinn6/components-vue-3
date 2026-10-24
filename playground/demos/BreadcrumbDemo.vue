<script setup lang="ts">
import { computed } from "vue";
import { BaseBreadcrumb } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description:
      "Navigation path compatible with RouterLink; the last item is the current page.",
    title: "Divider and size · divider, size, weight",
    ariaLabel: "Breadcrumb",
    compactAriaLabel: "Compact breadcrumb",
    home: "Home",
    settings: "Settings",
    addresses: "Addresses",
    editAddress: "Edit address",
  },
  es: {
    description:
      "Ruta de navegación compatible con RouterLink; el último elemento es la página actual.",
    title: "Separador y tamaño · divider, size, weight",
    ariaLabel: "Ruta de navegación",
    compactAriaLabel: "Ruta de navegación compacta",
    home: "Inicio",
    settings: "Configuración",
    addresses: "Direcciones",
    editAddress: "Editar dirección",
  },
});

const breadcrumbs = computed(() => [
  { name: t.value.home, to: { name: "home" } },
  { name: t.value.settings, to: { path: "/settings" } },
  {
    name: t.value.addresses,
    to: { name: "address-book", query: { page: 1 } },
  },
  { name: t.value.editAddress },
]);

const code = `<script setup>
const breadcrumbs = [
  { name: "Home", to: { name: "home" } },
  { name: "Settings", to: { path: "/settings" } },
  { name: "Addresses", to: { name: "address-book", query: { page: 1 } } },
  { name: "Edit address" }, // last item: current page, no link
];
<\/script>

<template>
  <BaseBreadcrumb :value="breadcrumbs" divider="/" size="md" weight="semibold" aria-label="Breadcrumb" />
  <BaseBreadcrumb :value="breadcrumbs" divider="›" size="sm" aria-label="Compact breadcrumb" />
</template>`;
</script>

<template>
  <DemoSection
    id="base-breadcrumb"
    name="BaseBreadcrumb"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <div class="demo-stack">
        <BaseBreadcrumb
          :value="breadcrumbs"
          divider="/"
          size="md"
          weight="semibold"
          :aria-label="t.ariaLabel"
        />
        <BaseBreadcrumb
          :value="breadcrumbs"
          divider="›"
          size="sm"
          :aria-label="t.compactAriaLabel"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
