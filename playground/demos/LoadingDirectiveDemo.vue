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

const isLoading = ref(false);

const code = `<script setup>
import { ref } from "vue";
import { loading as vLoading } from "@joaquinn6/jnv-ui-components";

const isLoading = ref(false);
<\/script>

<template>
  <BaseSwitch id="loading-example" v-model="isLoading" label="Mostrar carga" />
  <section v-loading="isLoading" aria-label="Resumen del pedido">
    <BaseCard elevation="none">…</BaseCard>
  </section>
</template>`;
</script>

<template>
  <DemoSection
    id="v-loading"
    name="v-loading"
    description="Directiva que superpone un indicador de carga y marca aria-busy en el contenedor."
  >
    <DemoExample title='Uso · v-loading="boolean"' :code="code">
      <div class="demo-stack">
        <BaseSwitch
          id="loading-example"
          v-model="isLoading"
          label="Mostrar carga"
        />
        <section v-loading="isLoading" aria-label="Resumen del pedido">
          <BaseCard elevation="none" surface="page" outlined>
            <div class="demo-stack">
              <BaseText variant="label" color="heading" weight="bold">
                Resumen del pedido
              </BaseText>
              <BaseText>Pedido HTK-1042 · Envío estándar</BaseText>
              <BaseText
                >Esta superficie usa la directiva exportada por la
                biblioteca.</BaseText
              >
            </div>
          </BaseCard>
        </section>
      </div>
    </DemoExample>
  </DemoSection>
</template>
