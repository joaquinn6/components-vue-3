<script setup lang="ts">
import { ref } from "vue";
import { BaseSignature, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const signature = ref<string | null>(null);

const t = useMessages({
  en: {
    description:
      "Signature capture with pointer, pen or touch. It repaints with the active theme.",
    basicTitle: "Basic usage · v-model, width, height",
    validationTitle: "Validation · required, error",
    label: "Sender signature",
    help: "Draw inside the area using a mouse, pen or touch screen.",
    clear: "Clear signature",
    instructions: "Area to draw a signature",
    captured: (length: number) =>
      `Signature captured (${length} characters of data URL).`,
    empty: "No signature.",
    requiredLabel: "Required signature",
    requiredError: "The signature is required.",
  },
  es: {
    description:
      "Captura de firma con puntero, lápiz o táctil. Se repinta con el tema activo.",
    basicTitle: "Uso básico · v-model, width, height",
    validationTitle: "Validación · required, error",
    label: "Firma del remitente",
    help: "Dibuja dentro del área usando ratón, lápiz o pantalla táctil.",
    clear: "Borrar la firma",
    instructions: "Área para dibujar una firma",
    captured: (length) => `Firma capturada (${length} caracteres de data URL).`,
    empty: "Sin firma.",
    requiredLabel: "Firma obligatoria",
    requiredError: "La firma es obligatoria.",
  },
});

const code = `<BaseSignature
  v-model="signature"
  label="Sender signature"
  help="Draw inside the area using a mouse, pen or touch screen."
  clear-aria-label="Clear signature"
  drawing-instructions="Area to draw a signature"
  :height="180"
/>

<!-- signature holds a PNG data URL or null -->`;

const errorCode = `<BaseSignature
  id="signature-required"
  label="Required signature"
  required
  error="The signature is required."
/>`;
</script>

<template>
  <DemoSection
    id="base-signature"
    name="BaseSignature"
    :description="t.description"
  >
    <DemoExample :title="t.basicTitle" :code="code">
      <BaseSignature
        id="signature-example"
        v-model="signature"
        :label="t.label"
        :help="t.help"
        :clear-aria-label="t.clear"
        :drawing-instructions="t.instructions"
        :height="180"
      />
      <BaseText variant="sm" color="muted" aria-live="polite">
        {{ signature ? t.captured(signature.length) : t.empty }}
      </BaseText>
    </DemoExample>

    <DemoExample :title="t.validationTitle" :code="errorCode">
      <BaseSignature
        id="signature-required"
        :label="t.requiredLabel"
        :clear-aria-label="t.clear"
        :drawing-instructions="t.instructions"
        required
        :error="t.requiredError"
      />
    </DemoExample>
  </DemoSection>
</template>
