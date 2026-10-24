<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseToast } from "../../src/index";
import type { BaseToastProps } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

type ToastTone = NonNullable<BaseToastProps["tone"]>;
type ToastPosition = NonNullable<BaseToastProps["position"]>;

const tones: ToastTone[] = ["success", "info", "warning", "danger"];
const positions: ToastPosition[] = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
];

const open = ref(false);
const tone = ref<ToastTone>("success");
const position = ref<ToastPosition>("top-right");
const persistentOpen = ref(false);

function showToast(nextTone: ToastTone, nextPosition: ToastPosition) {
  tone.value = nextTone;
  position.value = nextPosition;
  open.value = false;
  // Reabre en el siguiente ciclo para reiniciar el temporizador.
  requestAnimationFrame(() => (open.value = true));
}

const t = useMessages({
  en: {
    description:
      "Brief notification in a window corner, with auto-close and pause on hover.",
    tonesTitle: "Tones and position · tone, position, duration",
    persistentTitle: "No auto-close · duration=0, default slot",
    tone: (value: string) => `Show ${value}`,
    position: (value: string) => `Position: ${value}`,
    titles: {
      success: "Changes saved",
      info: "New version available",
      warning: "Session about to expire",
      danger: "Could not send",
    } as Record<ToastTone, string>,
    message: "This notification closes by itself after 5 seconds.",
    closeLabel: "Close notification",
    showPersistent: "Show persistent notification",
    persistentTitleText: "Export in progress",
    persistentBody: "Close it manually with the button or the Escape key.",
  },
  es: {
    description:
      "Notificación breve en una esquina de la ventana, con autocierre y pausa al pasar el puntero.",
    tonesTitle: "Tonos y posición · tone, position, duration",
    persistentTitle: "Sin autocierre · duration=0, slot predeterminado",
    tone: (value) => `Mostrar ${value}`,
    position: (value) => `Posición: ${value}`,
    titles: {
      success: "Cambios guardados",
      info: "Nueva versión disponible",
      warning: "La sesión está por expirar",
      danger: "No se pudo enviar",
    },
    message: "Esta notificación se cierra sola después de 5 segundos.",
    closeLabel: "Cerrar notificación",
    showPersistent: "Mostrar notificación persistente",
    persistentTitleText: "Exportación en curso",
    persistentBody: "Ciérrala manualmente con el botón o la tecla Escape.",
  },
});

const tonesCode = `<BaseButton @click="open = true">Show success</BaseButton>

<BaseToast
  v-model:open="open"
  tone="success"
  position="top-right"
  title="Changes saved"
  description="This notification closes by itself after 5 seconds."
  close-label="Close notification"
/>`;

const persistentCode = `<BaseToast
  v-model:open="open"
  tone="info"
  position="bottom-right"
  title="Export in progress"
  :duration="0"
>
  Close it manually with the button or the Escape key.
</BaseToast>`;
</script>

<template>
  <DemoSection id="base-toast" name="BaseToast" :description="t.description">
    <DemoExample :title="t.tonesTitle" :code="tonesCode">
      <div class="demo-stack">
        <div class="demo-row">
          <BaseButton
            v-for="item in tones"
            :key="item"
            size="sm"
            variant="outline"
            @click="showToast(item, position)"
          >
            {{ t.tone(item) }}
          </BaseButton>
        </div>
        <div class="demo-row">
          <BaseButton
            v-for="item in positions"
            :key="item"
            size="sm"
            :variant="item === position ? 'primary' : 'ghost'"
            :aria-pressed="item === position"
            @click="showToast(tone, item)"
          >
            {{ t.position(item) }}
          </BaseButton>
        </div>
      </div>
      <BaseToast
        v-model:open="open"
        :tone="tone"
        :position="position"
        :title="t.titles[tone]"
        :description="t.message"
        :close-label="t.closeLabel"
      />
    </DemoExample>

    <DemoExample :title="t.persistentTitle" :code="persistentCode">
      <BaseButton size="sm" variant="outline" @click="persistentOpen = true">
        {{ t.showPersistent }}
      </BaseButton>
      <BaseToast
        v-model:open="persistentOpen"
        tone="info"
        position="bottom-right"
        :title="t.persistentTitleText"
        :close-label="t.closeLabel"
        :duration="0"
      >
        {{ t.persistentBody }}
      </BaseToast>
    </DemoExample>
  </DemoSection>
</template>
