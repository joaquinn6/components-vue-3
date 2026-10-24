<script setup lang="ts">
import { ref } from "vue";
import { BaseTabs, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const activeTab = ref("overview");
const tabs = [
  {
    label: "Resumen",
    value: "overview",
    id: "demo-tab-overview",
    panelId: "demo-tab-panel",
  },
  {
    label: "Actividad",
    value: "activity",
    id: "demo-tab-activity",
    panelId: "demo-tab-panel",
  },
  {
    label: "Deshabilitada",
    value: "disabled",
    disabled: true,
    id: "demo-tab-disabled",
    panelId: "demo-tab-panel",
  },
];

const code = `<script setup>
import { ref } from "vue";

const activeTab = ref("overview");
const tabs = [
  { label: "Resumen", value: "overview", id: "tab-overview", panelId: "tab-panel" },
  { label: "Actividad", value: "activity", id: "tab-activity", panelId: "tab-panel" },
  { label: "Deshabilitada", value: "disabled", disabled: true },
];
<\/script>

<template>
  <BaseTabs v-model="activeTab" :tabs="tabs" aria-label="Detalle del pedido" />
  <div id="tab-panel" role="tabpanel" :aria-labelledby="\`tab-\${activeTab}\`">
    …
  </div>
</template>`;
</script>

<template>
  <DemoSection
    id="base-tabs"
    name="BaseTabs"
    description="Pestañas accesibles: flechas para moverse, Inicio y Fin para ir a los extremos."
  >
    <DemoExample title="Uso básico · tabs, v-model, ariaLabel" :code="code">
      <BaseTabs
        v-model="activeTab"
        :tabs="tabs"
        aria-label="Ejemplo de pestañas"
      />
      <div
        id="demo-tab-panel"
        class="tab-panel"
        role="tabpanel"
        :aria-labelledby="`demo-tab-${activeTab}`"
      >
        <BaseText v-if="activeTab === 'overview'"
          >Contenido del panel Resumen.</BaseText
        >
        <BaseText v-else>Contenido del panel Actividad.</BaseText>
      </div>
    </DemoExample>
  </DemoSection>
</template>
