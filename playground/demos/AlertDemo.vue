<script setup lang="ts">
import { ref } from "vue";
import { BaseAlert, BaseButton, BaseIcon, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const tones = ["danger", "warning", "info", "primary", "secondary"] as const;
const dismissed = ref(false);

const t = useMessages({
  en: {
    description:
      "Contextual notices with tone, icon, extra content and optional dismissal.",
    tonesTitle: "Tones · tone",
    dismissTitle: "Dismiss, slot and icon · dismissible, icon, #icon",
    tone: (tone: string) => `${tone} tone`,
    message: "Notice message.",
    saveFailed: "Could not save",
    checkConnection: "Check your connection and try again.",
    closeLabel: "Close notice",
    draftKept: "The draft is still available.",
    showAgain: "Show the notice again",
    untitled: "Informational notice without a title.",
  },
  es: {
    description:
      "Avisos contextuales con tono, icono, contenido extra y cierre opcional.",
    tonesTitle: "Tonos · tone",
    dismissTitle: "Cierre, slot e icono · dismissible, icon, #icon",
    tone: (tone) => `Tono ${tone}`,
    message: "Mensaje del aviso.",
    saveFailed: "No se pudo guardar",
    checkConnection: "Comprueba tu conexión e inténtalo de nuevo.",
    closeLabel: "Cerrar aviso",
    draftKept: "El borrador sigue disponible.",
    showAgain: "Mostrar de nuevo el aviso",
    untitled: "Aviso informativo sin título.",
  },
});

const tonesCode = `<BaseAlert tone="danger" title="Danger tone" description="Notice message." />
<BaseAlert tone="warning" title="Warning tone" description="Notice message." />
<BaseAlert tone="info" title="Info tone" description="Notice message." />
<BaseAlert tone="primary" title="Primary tone" description="Notice message." />
<BaseAlert tone="secondary" title="Secondary tone" description="Notice message." />`;

const dismissibleCode = `<BaseAlert
  v-if="!dismissed"
  tone="danger"
  title="Could not save"
  description="Check your connection and try again."
  icon="circleX"
  dismissible
  close-label="Close notice"
  @dismiss="dismissed = true"
>
  <BaseText as="span" variant="sm">The draft is still available.</BaseText>
</BaseAlert>

<!-- Custom icon through the slot -->
<BaseAlert tone="info" description="Informational notice without a title.">
  <template #icon><BaseIcon name="info" size="md" decorative /></template>
</BaseAlert>`;
</script>

<template>
  <DemoSection id="base-alert" name="BaseAlert" :description="t.description">
    <DemoExample :title="t.tonesTitle" :code="tonesCode">
      <div class="demo-stack">
        <BaseAlert
          v-for="tone in tones"
          :key="tone"
          :tone="tone"
          :title="t.tone(tone)"
          :description="t.message"
          :close-label="t.closeLabel"
        />
      </div>
    </DemoExample>

    <DemoExample :title="t.dismissTitle" :code="dismissibleCode">
      <div class="demo-stack">
        <BaseAlert
          v-if="!dismissed"
          tone="danger"
          :title="t.saveFailed"
          :description="t.checkConnection"
          icon="circleX"
          dismissible
          :close-label="t.closeLabel"
          @dismiss="dismissed = true"
        >
          <BaseText as="span" variant="sm">{{ t.draftKept }}</BaseText>
        </BaseAlert>
        <BaseButton
          v-else
          size="sm"
          variant="outline"
          @click="dismissed = false"
        >
          {{ t.showAgain }}
        </BaseButton>
        <BaseAlert tone="info" :description="t.untitled">
          <template #icon>
            <BaseIcon name="info" size="md" decorative />
          </template>
        </BaseAlert>
      </div>
    </DemoExample>
  </DemoSection>
</template>
