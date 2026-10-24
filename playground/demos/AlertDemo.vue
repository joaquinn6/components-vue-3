<script setup lang="ts">
import { ref } from "vue";
import { BaseAlert, BaseButton, BaseIcon, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const tones = ["danger", "warning", "info", "primary", "secondary"] as const;
const dismissed = ref(false);

const tonesCode = `<BaseAlert tone="danger" title="Tono danger" description="Mensaje del aviso." />
<BaseAlert tone="warning" title="Tono warning" description="Mensaje del aviso." />
<BaseAlert tone="info" title="Tono info" description="Mensaje del aviso." />
<BaseAlert tone="primary" title="Tono primary" description="Mensaje del aviso." />
<BaseAlert tone="secondary" title="Tono secondary" description="Mensaje del aviso." />`;

const dismissibleCode = `<BaseAlert
  v-if="!dismissed"
  tone="danger"
  title="No se pudo guardar"
  description="Comprueba tu conexión e inténtalo de nuevo."
  icon="circleX"
  dismissible
  close-label="Cerrar aviso"
  @dismiss="dismissed = true"
>
  <BaseText as="span" variant="sm">El borrador sigue disponible.</BaseText>
</BaseAlert>

<!-- Icono personalizado mediante slot -->
<BaseAlert tone="info" description="Aviso informativo sin título.">
  <template #icon><BaseIcon name="info" size="md" decorative /></template>
</BaseAlert>`;
</script>

<template>
  <DemoSection
    id="base-alert"
    name="BaseAlert"
    description="Avisos contextuales con tono, icono, contenido extra y cierre opcional."
  >
    <DemoExample title="Tonos · tone" :code="tonesCode">
      <div class="demo-stack">
        <BaseAlert
          v-for="tone in tones"
          :key="tone"
          :tone="tone"
          :title="`Tono ${tone}`"
          description="Mensaje del aviso."
        />
      </div>
    </DemoExample>

    <DemoExample
      title="Cierre, slot e icono · dismissible, icon, #icon"
      :code="dismissibleCode"
    >
      <div class="demo-stack">
        <BaseAlert
          v-if="!dismissed"
          tone="danger"
          title="No se pudo guardar"
          description="Comprueba tu conexión e inténtalo de nuevo."
          icon="circleX"
          dismissible
          close-label="Cerrar aviso"
          @dismiss="dismissed = true"
        >
          <BaseText as="span" variant="sm"
            >El borrador sigue disponible.</BaseText
          >
        </BaseAlert>
        <BaseButton
          v-else
          size="sm"
          variant="outline"
          @click="dismissed = false"
        >
          Mostrar de nuevo el aviso
        </BaseButton>
        <BaseAlert tone="info" description="Aviso informativo sin título.">
          <template #icon
            ><BaseIcon name="info" size="md" decorative
          /></template>
        </BaseAlert>
      </div>
    </DemoExample>
  </DemoSection>
</template>
