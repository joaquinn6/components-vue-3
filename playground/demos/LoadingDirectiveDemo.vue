<script setup lang="ts">
import { ref } from "vue";
import {
  BaseCard,
  BaseSwitch,
  BaseText,
  loading as vLoading,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const isLoading = ref(false);

const t = useMessages({
  en: {
    description:
      "Directive that overlays a loading indicator and sets aria-busy on the container.",
    title: 'Usage · v-loading="boolean"',
    toggle: "Show loading",
    summary: "Order summary",
    order: "Order HTK-1042 · Standard shipping",
    note: "This surface uses the directive exported by the library.",
  },
  es: {
    description:
      "Directiva que superpone un indicador de carga y marca aria-busy en el contenedor.",
    title: 'Uso · v-loading="boolean"',
    toggle: "Mostrar carga",
    summary: "Resumen del pedido",
    order: "Pedido HTK-1042 · Envío estándar",
    note: "Esta superficie usa la directiva exportada por la biblioteca.",
  },
});

const code = `<script setup>
import { ref } from "vue";
import { loading as vLoading } from "@joaquinn6/jnv-ui-components";

const isLoading = ref(false);
<\/script>

<template>
  <BaseSwitch id="loading-example" v-model="isLoading" label="Show loading" />
  <section v-loading="isLoading" aria-label="Order summary">
    <BaseCard elevation="none">…</BaseCard>
  </section>
</template>`;
</script>

<template>
  <DemoSection id="v-loading" name="v-loading" :description="t.description">
    <DemoExample :title="t.title" :code="code">
      <div class="demo-stack">
        <BaseSwitch
          id="loading-example"
          v-model="isLoading"
          :label="t.toggle"
        />
        <section v-loading="isLoading" :aria-label="t.summary">
          <BaseCard elevation="none" surface="page" outlined>
            <div class="demo-stack">
              <BaseText variant="label" color="heading" weight="bold">
                {{ t.summary }}
              </BaseText>
              <BaseText>{{ t.order }}</BaseText>
              <BaseText>{{ t.note }}</BaseText>
            </div>
          </BaseCard>
        </section>
      </div>
    </DemoExample>
  </DemoSection>
</template>
