<script setup lang="ts">
import { ref } from "vue";
import { BaseColorPicker, BaseFormRow, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const brandColor = ref("#7c3aed");
const committedColor = ref("#7c3aed");
const accentColor = ref("");
const swatches = [
  "#7c3aed",
  "#a78bfa",
  "#0ea5e9",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#111827",
  "#f8fafc",
];

const t = useMessages({
  en: {
    description:
      "Color field with a hexadecimal input and a panel with saturation, brightness, hue and optional swatches.",
    basicTitle: "Basic usage · v-model, swatches, change",
    statesTitle: "Sizes and states · size, error, success, disabled",
    label: "Brand color",
    help: "Type a hex code or pick a color in the panel.",
    placeholder: "Pick a color",
    current: (value: string) => `Current value: ${value || "none"}`,
    committed: (value: string) => `Last change event: ${value || "none"}`,
    accentLabel: "Accent color",
    accentError: "Choose an accent color.",
    successLabel: "Background",
    successMessage: "Good contrast.",
    disabledLabel: "Locked color",
    a11y: {
      inputAriaLabel: "Color hex code",
      toggleAriaLabel: "Open color picker",
      panelAriaLabel: "Color picker",
      saturationLabel: "Saturation",
      brightnessLabel: "Brightness",
      hueAriaLabel: "Hue",
      swatchesAriaLabel: "Preset colors",
    },
  },
  es: {
    description:
      "Campo de color con input hexadecimal y un panel de saturación, brillo, tono y muestras opcionales.",
    basicTitle: "Uso básico · v-model, swatches, change",
    statesTitle: "Tamaños y estados · size, error, success, disabled",
    label: "Color de marca",
    help: "Escribe un código hexadecimal o elige un color en el panel.",
    placeholder: "Seleccionar color",
    current: (value) => `Valor actual: ${value || "ninguno"}`,
    committed: (value) => `Último evento change: ${value || "ninguno"}`,
    accentLabel: "Color de acento",
    accentError: "Elige un color de acento.",
    successLabel: "Fondo",
    successMessage: "Buen contraste.",
    disabledLabel: "Color bloqueado",
    a11y: {
      inputAriaLabel: "Código hexadecimal del color",
      toggleAriaLabel: "Abrir selector de color",
      panelAriaLabel: "Selector de color",
      saturationLabel: "Saturación",
      brightnessLabel: "Brillo",
      hueAriaLabel: "Tono",
      swatchesAriaLabel: "Colores predefinidos",
    },
  },
});

const code = `<BaseColorPicker
  v-model="brandColor"
  label="Brand color"
  help="Type a hex code or pick a color in the panel."
  :swatches="['#7c3aed', '#a78bfa', '#0ea5e9', '#16a34a', '#f59e0b']"
  @change="saveColor"
/>

<!-- brandColor holds "#rrggbb" or "" -->`;

const statesCode = `<BaseColorPicker v-model="accent" label="Accent color" size="sm" required error="Choose an accent color." />
<BaseColorPicker model-value="#0ea5e9" label="Background" size="md" success="Good contrast." />
<BaseColorPicker model-value="#16a34a" label="Locked color" size="lg" disabled />`;
</script>

<template>
  <DemoSection
    id="base-color-picker"
    name="BaseColorPicker"
    :description="t.description"
  >
    <DemoExample :title="t.basicTitle" :code="code">
      <BaseColorPicker
        v-model="brandColor"
        v-bind="t.a11y"
        :label="t.label"
        :help="t.help"
        :placeholder="t.placeholder"
        :swatches="swatches"
        @change="committedColor = $event"
      />
      <BaseText variant="sm" color="muted" aria-live="polite">
        {{ t.current(brandColor) }}
      </BaseText>
      <BaseText variant="sm" color="muted">
        {{ t.committed(committedColor) }}
      </BaseText>
    </DemoExample>

    <DemoExample :title="t.statesTitle" :code="statesCode">
      <BaseFormRow :columns="3">
        <BaseColorPicker
          v-model="accentColor"
          v-bind="t.a11y"
          :label="t.accentLabel"
          :placeholder="t.placeholder"
          :swatches="swatches"
          :error="accentColor ? '' : t.accentError"
          size="sm"
          required
        />
        <BaseColorPicker
          v-bind="t.a11y"
          model-value="#0ea5e9"
          :label="t.successLabel"
          :placeholder="t.placeholder"
          :success="t.successMessage"
          size="md"
        />
        <BaseColorPicker
          v-bind="t.a11y"
          model-value="#16a34a"
          :label="t.disabledLabel"
          :placeholder="t.placeholder"
          size="lg"
          disabled
        />
      </BaseFormRow>
    </DemoExample>
  </DemoSection>
</template>
