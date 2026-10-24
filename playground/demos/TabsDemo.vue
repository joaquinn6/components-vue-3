<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseTabs, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const activeTab = ref("overview");

const t = useMessages({
  en: {
    description:
      "Accessible tabs: arrows to move, Home and End to jump to the edges.",
    title: "Basic usage · tabs, v-model, ariaLabel",
    ariaLabel: "Tabs example",
    overview: "Overview",
    activity: "Activity",
    disabled: "Disabled",
    overviewPanel: "Overview panel content.",
    activityPanel: "Activity panel content.",
  },
  es: {
    description:
      "Pestañas accesibles: flechas para moverse, Inicio y Fin para ir a los extremos.",
    title: "Uso básico · tabs, v-model, ariaLabel",
    ariaLabel: "Ejemplo de pestañas",
    overview: "Resumen",
    activity: "Actividad",
    disabled: "Deshabilitada",
    overviewPanel: "Contenido del panel Resumen.",
    activityPanel: "Contenido del panel Actividad.",
  },
});

const tabs = computed(() => [
  {
    label: t.value.overview,
    value: "overview",
    id: "demo-tab-overview",
    panelId: "demo-tab-panel",
  },
  {
    label: t.value.activity,
    value: "activity",
    id: "demo-tab-activity",
    panelId: "demo-tab-panel",
  },
  {
    label: t.value.disabled,
    value: "disabled",
    disabled: true,
    id: "demo-tab-disabled",
    panelId: "demo-tab-panel",
  },
]);

const code = `<script setup>
import { ref } from "vue";

const activeTab = ref("overview");
const tabs = [
  { label: "Overview", value: "overview", id: "tab-overview", panelId: "tab-panel" },
  { label: "Activity", value: "activity", id: "tab-activity", panelId: "tab-panel" },
  { label: "Disabled", value: "disabled", disabled: true },
];
<\/script>

<template>
  <BaseTabs v-model="activeTab" :tabs="tabs" aria-label="Order details" />
  <div id="tab-panel" role="tabpanel" :aria-labelledby="\`tab-\${activeTab}\`">
    …
  </div>
</template>`;
</script>

<template>
  <DemoSection id="base-tabs" name="BaseTabs" :description="t.description">
    <DemoExample :title="t.title" :code="code">
      <BaseTabs v-model="activeTab" :tabs="tabs" :aria-label="t.ariaLabel" />
      <div
        id="demo-tab-panel"
        class="tab-panel"
        role="tabpanel"
        :aria-labelledby="`demo-tab-${activeTab}`"
      >
        <BaseText v-if="activeTab === 'overview'">
          {{ t.overviewPanel }}
        </BaseText>
        <BaseText v-else>{{ t.activityPanel }}</BaseText>
      </div>
    </DemoExample>
  </DemoSection>
</template>
