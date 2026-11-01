<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useId,
  watch,
} from "vue";
import BaseFieldInfo from "./BaseFieldInfo.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  id: { type: String, default: "" },
  label: { type: String, default: "" },
  info: { type: String, default: "" },
  infoAriaLabel: { type: String, default: "Información adicional" },
  infoType: {
    type: String,
    default: "",
    validator: (value) =>
      ["", "primary", "secondary", "success", "danger"].includes(value),
  },
  name: { type: String, default: "" },
  placeholder: { type: String, default: "Seleccionar color" },
  swatches: { type: Array, default: () => [] },
  size: {
    type: String,
    default: "sm",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  state: {
    type: String,
    default: "default",
    validator: (value) => ["default", "error", "success"].includes(value),
  },
  help: { type: String, default: "" },
  error: { type: String, default: "" },
  success: { type: String, default: "" },
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  tone: {
    type: String,
    default: "default",
    validator: (value) => ["default", "inverse"].includes(value),
  },
  inputAriaLabel: {
    type: String,
    default: "Código hexadecimal del color",
  },
  toggleAriaLabel: { type: String, default: "Abrir selector de color" },
  panelAriaLabel: { type: String, default: "Selector de color" },
  saturationLabel: { type: String, default: "Saturación" },
  brightnessLabel: { type: String, default: "Brillo" },
  hueAriaLabel: { type: String, default: "Tono" },
  swatchesAriaLabel: { type: String, default: "Colores predefinidos" },
});

const emit = defineEmits(["blur", "change", "open", "close"]);
const model = defineModel({ type: String, default: "" });

const generatedId = useId();
const pickerId = computed(() => props.id || `color-picker-${generatedId}`);
const panelId = computed(() => `${pickerId.value}-panel`);
const messageId = computed(() => `${pickerId.value}-message`);
const rootElement = ref(null);
const inputElement = ref(null);
const toggleElement = ref(null);
const panelElement = ref(null);
const areaElement = ref(null);
const isOpen = ref(false);
const opensAbove = ref(false);
const hexText = ref("");
const isEditingText = ref(false);
const isDraggingArea = ref(false);

// Estado HSV propio: conserva el tono aunque el color sea gris, blanco o negro.
const hue = ref(0);
const saturation = ref(0);
const brightness = ref(0);
let lastEmittedValue = null;
let lastCommittedValue = "";

const currentState = computed(() => {
  if (props.error || props.state === "error") return "error";
  if (props.success || props.state === "success") return "success";
  return "default";
});
const message = computed(() => props.error || props.success || props.help);
const hasInfo = computed(() => Boolean(props.info.trim()));
const isInteractive = computed(() => !props.disabled && !props.readonly);
const selectedHex = computed(() => parseHex(model.value));
const hueHex = computed(() => hsvToHex(hue.value, 1, 1));
const normalizedSwatches = computed(() => [
  ...new Set(props.swatches.map(parseHex).filter(Boolean)),
]);
const saturationPercent = computed(() => Math.round(saturation.value * 100));
const brightnessPercent = computed(() => Math.round(brightness.value * 100));
const areaValueText = computed(
  () =>
    `${props.saturationLabel} ${saturationPercent.value}%, ${props.brightnessLabel} ${brightnessPercent.value}%`,
);

// Los degradados describen el espacio de color HSV, no la apariencia del tema: se calculan con el
// mismo modelo de color para que el área y la barra de tono representen valores exactos.
const PURE_WHITE = hsvToHex(0, 0, 1);
const PURE_BLACK = hsvToHex(0, 0, 0);
const areaStyle = computed(() => ({
  background: `linear-gradient(to top, ${PURE_BLACK}, transparent), linear-gradient(to right, ${PURE_WHITE}, transparent), ${hueHex.value}`,
}));
const hueStyle = computed(() => ({
  background: `linear-gradient(to right, ${[0, 60, 120, 180, 240, 300, 360]
    .map((stop) => hsvToHex(stop, 1, 1))
    .join(", ")})`,
}));
const areaThumbStyle = computed(() => ({
  left: `${saturation.value * 100}%`,
  top: `${(1 - brightness.value) * 100}%`,
  backgroundColor: hsvToHex(hue.value, saturation.value, brightness.value),
}));

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseHex(value) {
  const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(String(value ?? "").trim());
  if (!match) return null;

  const digits =
    match[1].length === 3
      ? [...match[1]].map((digit) => digit + digit).join("")
      : match[1];
  return `#${digits.toLowerCase()}`;
}

function hexToHsv(hex) {
  const [red, green, blue] = [1, 3, 5].map(
    (start) => parseInt(hex.slice(start, start + 2), 16) / 255,
  );
  const max = Math.max(red, green, blue);
  const delta = max - Math.min(red, green, blue);
  let nextHue = 0;

  if (delta) {
    if (max === red) nextHue = ((green - blue) / delta) % 6;
    else if (max === green) nextHue = (blue - red) / delta + 2;
    else nextHue = (red - green) / delta + 4;
  }

  return {
    h: (nextHue * 60 + 360) % 360,
    s: max ? delta / max : 0,
    v: max,
  };
}

function hsvToHex(h, s, v) {
  const channel = (offset) => {
    const k = (offset + h / 60) % 6;
    const value = v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    return Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(5)}${channel(3)}${channel(1)}`;
}

function syncFromHex(hex) {
  if (hex === hsvToHex(hue.value, saturation.value, brightness.value)) return;

  const next = hexToHsv(hex);
  // Sin saturación o sin brillo el tono es indeterminado: se conserva el actual.
  if (next.s && next.v) hue.value = next.h;
  saturation.value = next.s;
  brightness.value = next.v;
}

function emitValue(value) {
  lastEmittedValue = value;
  if (model.value !== value) model.value = value;
}

function commitChange() {
  const value = selectedHex.value ?? "";
  if (value === lastCommittedValue) return;

  lastCommittedValue = value;
  emit("change", value);
}

function setHsv(h, s, v) {
  hue.value = clamp(h, 0, 360);
  saturation.value = clamp(s, 0, 1);
  brightness.value = clamp(v, 0, 1);
  const hex = hsvToHex(hue.value, saturation.value, brightness.value);
  hexText.value = hex;
  emitValue(hex);
}

watch(
  () => model.value,
  (value) => {
    const hex = parseHex(value);
    if (hex) syncFromHex(hex);
    if (!isEditingText.value) hexText.value = hex ?? value ?? "";
    // Un valor externo no es un cambio confirmado por el usuario.
    if (value !== lastEmittedValue) lastCommittedValue = hex ?? "";
  },
  { immediate: true },
);

function handleTextInput() {
  const hex = parseHex(hexText.value);
  if (!hex) return;

  syncFromHex(hex);
  emitValue(hex);
}

function commitText() {
  const raw = hexText.value.trim();
  if (!raw) {
    emitValue("");
  } else {
    const hex = parseHex(raw);
    if (hex) {
      syncFromHex(hex);
      emitValue(hex);
    }
  }
  hexText.value = selectedHex.value ?? model.value ?? "";
  commitChange();
}

function handleTextBlur(event) {
  isEditingText.value = false;
  commitText();
  emit("blur", event);
}

function updateAreaFromPointer(event) {
  const rect = areaElement.value?.getBoundingClientRect();
  if (!rect?.width || !rect.height) return;

  setHsv(
    hue.value,
    (event.clientX - rect.left) / rect.width,
    1 - (event.clientY - rect.top) / rect.height,
  );
}

function handleAreaPointerDown(event) {
  if (!isInteractive.value) return;

  isDraggingArea.value = true;
  areaElement.value.setPointerCapture?.(event.pointerId);
  areaElement.value.focus();
  updateAreaFromPointer(event);
}

function handleAreaPointerMove(event) {
  if (isDraggingArea.value) updateAreaFromPointer(event);
}

function handleAreaPointerUp(event) {
  if (!isDraggingArea.value) return;

  isDraggingArea.value = false;
  if (areaElement.value?.hasPointerCapture?.(event.pointerId)) {
    areaElement.value.releasePointerCapture(event.pointerId);
  }
  commitChange();
}

function handleAreaKeydown(event) {
  const step = event.shiftKey ? 0.1 : 0.01;
  const moves = {
    ArrowLeft: [-step, 0],
    ArrowRight: [step, 0],
    ArrowUp: [0, step],
    ArrowDown: [0, -step],
  };
  const move = moves[event.key];
  if (!move) return;

  event.preventDefault();
  setHsv(hue.value, saturation.value + move[0], brightness.value + move[1]);
  commitChange();
}

function handleHueInput(event) {
  setHsv(Number(event.target.value), saturation.value, brightness.value);
}

function selectSwatch(hex) {
  syncFromHex(hex);
  hexText.value = hex;
  emitValue(hex);
  commitChange();
}

function updatePlacement() {
  const controlRect = rootElement.value
    ?.querySelector(".base-color-picker__control")
    ?.getBoundingClientRect();
  const panelHeight = panelElement.value?.offsetHeight ?? 0;
  if (!controlRect || typeof window === "undefined") return;

  const spaceBelow = window.innerHeight - controlRect.bottom;
  opensAbove.value =
    spaceBelow < panelHeight + 8 && controlRect.top > spaceBelow;
}

function openPanel() {
  if (!isInteractive.value || isOpen.value) return;

  isOpen.value = true;
  emit("open");
  nextTick(() => {
    updatePlacement();
    areaElement.value?.focus();
  });
}

function closePanel(restoreFocus = false) {
  if (!isOpen.value) return;

  isOpen.value = false;
  isDraggingArea.value = false;
  opensAbove.value = false;
  commitChange();
  emit("close");
  if (restoreFocus) nextTick(() => toggleElement.value?.focus());
}

function togglePanel() {
  if (isOpen.value) closePanel();
  else openPanel();
}

function handleRootKeydown(event) {
  if (event.key !== "Escape" || !isOpen.value) return;

  event.preventDefault();
  const focusInPanel = panelElement.value?.contains(document.activeElement);
  closePanel(focusInPanel);
}

function handleRootFocusOut(event) {
  if (
    isOpen.value &&
    event.relatedTarget &&
    !rootElement.value?.contains(event.relatedTarget)
  ) {
    closePanel();
  }
}

function handleDocumentPointerDown(event) {
  if (isOpen.value && !rootElement.value?.contains(event.target)) closePanel();
}

watch(
  () => isInteractive.value,
  (interactive) => {
    if (!interactive) closePanel();
  },
);

onMounted(() => {
  document.addEventListener("pointerdown", handleDocumentPointerDown);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
});

defineExpose({
  focus: () => inputElement.value?.focus(),
  open: openPanel,
  close: () => closePanel(),
});
</script>

<template>
  <div
    ref="rootElement"
    class="base-color-picker"
    :class="[
      `base-color-picker--${currentState}`,
      `base-color-picker--${tone}`,
    ]"
    @keydown="handleRootKeydown"
    @focusout="handleRootFocusOut"
  >
    <div v-if="label" class="base-color-picker__label-row">
      <label class="base-color-picker__label" :for="pickerId">
        {{ label }}<span v-if="required" aria-hidden="true"> *</span>
      </label>
      <BaseFieldInfo
        v-if="hasInfo"
        :text="info"
        :type="infoType"
        :aria-label="infoAriaLabel"
      />
    </div>
    <div class="base-color-picker__control">
      <button
        ref="toggleElement"
        class="base-color-picker__toggle"
        :class="`base-color-picker__toggle--${size}`"
        type="button"
        :disabled="!isInteractive"
        :aria-label="toggleAriaLabel"
        aria-haspopup="dialog"
        :aria-expanded="isOpen"
        :aria-controls="isOpen ? panelId : undefined"
        @click="togglePanel"
      >
        <span
          class="base-color-picker__swatch"
          :class="{ 'base-color-picker__swatch--empty': !selectedHex }"
          :style="selectedHex ? { backgroundColor: selectedHex } : undefined"
          aria-hidden="true"
        />
      </button>
      <input
        :id="pickerId"
        ref="inputElement"
        v-bind="$attrs"
        v-model="hexText"
        class="base-color-picker__input"
        :class="`base-color-picker__input--${size}`"
        type="text"
        inputmode="text"
        autocomplete="off"
        spellcheck="false"
        maxlength="7"
        :name="name || undefined"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :aria-label="label ? undefined : inputAriaLabel"
        :aria-invalid="currentState === 'error' ? 'true' : undefined"
        :aria-describedby="message ? messageId : undefined"
        @focus="isEditingText = true"
        @input="handleTextInput"
        @blur="handleTextBlur"
        @keydown.enter="commitText"
      />

      <div
        v-if="isOpen"
        :id="panelId"
        ref="panelElement"
        class="base-color-picker__panel"
        :class="{ 'base-color-picker__panel--above': opensAbove }"
        role="dialog"
        :aria-label="panelAriaLabel"
      >
        <div
          ref="areaElement"
          class="base-color-picker__area"
          :style="areaStyle"
          role="slider"
          tabindex="0"
          :aria-label="`${saturationLabel}, ${brightnessLabel}`"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="saturationPercent"
          :aria-valuetext="areaValueText"
          @pointerdown.prevent="handleAreaPointerDown"
          @pointermove="handleAreaPointerMove"
          @pointerup="handleAreaPointerUp"
          @pointercancel="handleAreaPointerUp"
          @keydown="handleAreaKeydown"
        >
          <span
            class="base-color-picker__area-thumb"
            :style="areaThumbStyle"
            aria-hidden="true"
          />
        </div>
        <input
          class="base-color-picker__hue"
          :style="hueStyle"
          type="range"
          min="0"
          max="360"
          step="1"
          :value="Math.round(hue)"
          :aria-label="hueAriaLabel"
          :aria-valuetext="`${Math.round(hue)}°`"
          @input="handleHueInput"
          @change="commitChange"
        />
        <div
          v-if="normalizedSwatches.length"
          class="base-color-picker__swatches"
          role="group"
          :aria-label="swatchesAriaLabel"
        >
          <button
            v-for="swatch in normalizedSwatches"
            :key="swatch"
            class="base-color-picker__swatch-option"
            :class="{
              'base-color-picker__swatch-option--selected':
                swatch === selectedHex,
            }"
            type="button"
            :style="{ backgroundColor: swatch }"
            :aria-label="swatch"
            :aria-pressed="swatch === selectedHex"
            @click="selectSwatch(swatch)"
          />
        </div>
      </div>
    </div>
    <span
      :id="messageId"
      class="base-color-picker__message"
      :class="{ 'base-color-picker__message--visible': message }"
      :aria-hidden="message ? undefined : 'true'"
      :role="currentState === 'error' ? 'alert' : undefined"
    >
      {{ message }}
    </span>
  </div>
</template>

<style scoped>
.base-color-picker {
  display: grid;
  min-width: var(--space-0);
  gap: var(--jnv-field-gap, var(--base-field-gap, var(--space-2)));
}

.base-color-picker__label-row {
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: var(--space-1);
  flex-wrap: wrap;
}

.base-color-picker__label {
  color: var(--jnv-form-label-color);
  font-size: var(--jnv-form-label-size);
  font-weight: var(--text-label-weight);
  line-height: var(--text-label-leading);
}

.base-color-picker--inverse .base-color-picker__label {
  color: var(--jnv-color-text-inverse-muted);
}

.base-color-picker__control {
  position: relative;
  min-width: 0;
}

.base-color-picker__toggle {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: var(--space-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-0);
  border: var(--space-0);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  transform: translateY(-50%);
}

.base-color-picker__toggle:focus-visible {
  outline: var(--focus-outline-width) solid var(--jnv-color-focus-ring);
  outline-offset: var(--border-width-accent);
}

.base-color-picker__toggle:disabled {
  cursor: not-allowed;
  opacity: var(--opacity-disabled);
}

.base-color-picker__swatch {
  display: block;
  width: var(--jnv-color-picker-swatch-size);
  height: var(--jnv-color-picker-swatch-size);
  box-sizing: border-box;
  border: var(--border-width-thin) solid var(--jnv-color-border-strong);
  border-radius: var(--radius-sm);
}

.base-color-picker__toggle--sm .base-color-picker__swatch {
  width: var(--space-5);
  height: var(--space-5);
}

.base-color-picker__swatch--empty {
  border-style: dashed;
  background: var(--jnv-color-surface-muted);
}

.base-color-picker__input {
  width: 100%;
  min-width: var(--space-0);
  box-sizing: border-box;
  border: var(--border-width-thin) solid var(--jnv-control-border);
  border-radius: var(--radius-md);
  color: var(--jnv-form-value-color);
  background: var(--jnv-control-background);
  font: inherit;
  font-variant-numeric: tabular-nums;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    background-color var(--transition-fast);
}

.base-color-picker__input::placeholder {
  color: var(--jnv-color-text-muted);
}

.base-color-picker__input:hover:not(:disabled):not(:focus) {
  border-color: var(--jnv-control-hover-border);
}

.base-color-picker__input:focus {
  border-color: var(--jnv-control-focus-border);
  outline: none;
  background: var(--jnv-control-focus-background);
  box-shadow: 0 0 0 var(--space-1) var(--jnv-control-focus-shadow);
}

.base-color-picker__input:disabled {
  cursor: not-allowed;
  background: var(--jnv-control-disabled-background);
  border-color: var(--jnv-control-disabled-border);
}

.base-color-picker__input--sm {
  height: var(--control-height-sm);
  padding-inline: var(--space-10) var(--space-3);
  font-size: var(--font-size-xs);
}

.base-color-picker__input--md {
  height: var(--control-height-md);
  padding-inline: var(--space-10) var(--space-4);
  font-size: var(--font-size-sm);
}

.base-color-picker__input--lg {
  height: var(--control-height-lg);
  padding-inline: var(--space-12) var(--space-4);
  font-size: var(--font-size-md);
}

.base-color-picker__toggle--lg {
  left: var(--space-3);
}

.base-color-picker--error .base-color-picker__input {
  border-color: var(--jnv-color-state-error);
  background: var(--jnv-color-state-error-surface);
}

.base-color-picker--success .base-color-picker__input {
  border-color: var(--jnv-color-state-success);
  background: var(--jnv-color-state-success-surface);
}

.base-color-picker__panel {
  position: absolute;
  z-index: 2;
  top: calc(100% + var(--space-1));
  left: 0;
  display: grid;
  width: var(--jnv-color-picker-panel-width);
  max-width: calc(100vw - var(--space-8));
  box-sizing: border-box;
  gap: var(--space-3);
  padding: var(--space-3);
  border: var(--border-width-thin) solid var(--jnv-control-border);
  border-radius: var(--radius-md);
  background: var(--jnv-overlay-background);
  box-shadow: var(--shadow-md);
}

.base-color-picker__panel--above {
  top: auto;
  bottom: calc(100% + var(--space-1));
}

.base-color-picker__area {
  position: relative;
  height: var(--jnv-color-picker-area-height);
  border-radius: var(--radius-sm);
  cursor: crosshair;
  touch-action: none;
}

.base-color-picker__area:focus-visible {
  outline: var(--focus-outline-width) solid var(--jnv-color-focus-ring);
  outline-offset: var(--border-width-accent);
}

.base-color-picker__area-thumb {
  position: absolute;
  width: var(--jnv-color-picker-thumb-size);
  height: var(--jnv-color-picker-thumb-size);
  box-sizing: border-box;
  border: var(--border-width-accent) solid var(--jnv-color-picker-thumb-border);
  border-radius: var(--radius-round);
  box-shadow: 0 0 0 var(--border-width-thin)
    var(--jnv-color-picker-thumb-shadow);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.base-color-picker__hue {
  width: 100%;
  height: var(--jnv-color-picker-hue-height);
  margin: var(--space-0);
  border-radius: var(--radius-round);
  cursor: pointer;
  appearance: none;
}

.base-color-picker__hue:focus-visible {
  outline: var(--focus-outline-width) solid var(--jnv-color-focus-ring);
  outline-offset: var(--border-width-accent);
}

.base-color-picker__hue::-webkit-slider-thumb {
  width: var(--jnv-color-picker-thumb-size);
  height: var(--jnv-color-picker-thumb-size);
  box-sizing: border-box;
  border: var(--border-width-accent) solid var(--jnv-color-picker-thumb-border);
  border-radius: var(--radius-round);
  background: transparent;
  box-shadow: 0 0 0 var(--border-width-thin)
    var(--jnv-color-picker-thumb-shadow);
  appearance: none;
}

.base-color-picker__hue::-moz-range-thumb {
  width: var(--jnv-color-picker-thumb-size);
  height: var(--jnv-color-picker-thumb-size);
  box-sizing: border-box;
  border: var(--border-width-accent) solid var(--jnv-color-picker-thumb-border);
  border-radius: var(--radius-round);
  background: transparent;
  box-shadow: 0 0 0 var(--border-width-thin)
    var(--jnv-color-picker-thumb-shadow);
}

.base-color-picker__hue::-moz-range-track {
  background: transparent;
}

.base-color-picker__swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.base-color-picker__swatch-option {
  width: var(--jnv-color-picker-swatch-size);
  height: var(--jnv-color-picker-swatch-size);
  padding: var(--space-0);
  border: var(--border-width-thin) solid var(--jnv-color-border-strong);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: box-shadow var(--transition-fast);
}

.base-color-picker__swatch-option:hover {
  box-shadow: 0 0 0 var(--border-width-accent) var(--jnv-control-hover-border);
}

.base-color-picker__swatch-option:focus-visible {
  outline: var(--focus-outline-width) solid var(--jnv-color-focus-ring);
  outline-offset: var(--border-width-accent);
}

.base-color-picker__swatch-option--selected {
  box-shadow: 0 0 0 var(--border-width-accent) var(--jnv-color-brand-primary);
}

.base-color-picker__message {
  margin-top: calc(var(--space-2) * -0.5);
  min-height: var(
    --jnv-field-message-min-height,
    var(
      --base-field-message-min-height,
      calc(var(--font-size-xs) * var(--line-height-heading))
    )
  );
  color: var(--jnv-color-text-muted);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-heading);
  visibility: hidden;
}

.base-color-picker__message--visible {
  visibility: visible;
}

.base-color-picker--error .base-color-picker__message {
  color: var(--jnv-color-state-error);
}

.base-color-picker--success .base-color-picker__message {
  color: var(--jnv-color-state-success);
}
</style>
