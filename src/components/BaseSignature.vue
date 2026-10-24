<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  id: { type: String, default: "signature" },
  label: { type: String, default: "Firma" },
  help: { type: String, default: "" },
  error: { type: String, default: "" },
  clearAriaLabel: { type: String, default: "Limpiar firma" },
  drawingInstructions: {
    type: String,
    default: "Dibuje con puntero táctil, lápiz o ratón.",
  },
  width: { type: Number, default: 250 },
  height: { type: Number, default: 100 },
  required: Boolean,
  disabled: Boolean,
});

const signature = defineModel({ type: String, default: null });
const canvas = ref(null);
const isDrawing = ref(false);
const canvasCursor = ref("crosshair");
const hasSignature = computed(() => Boolean(signature.value));
const message = computed(() => props.error || props.help);
const messageId = computed(() => `${props.id}-message`);
let context;
// Trazos propios en coordenadas del canvas para poder repintarlos al cambiar el tema.
let strokes = [];
let lastEmittedSignature = null;
let themeObserver = null;

function drawGuide() {
  if (!context || !canvas.value) return;

  context.save();
  context.strokeStyle = getCanvasColor("--jnv-signature-guide-color");
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(10, canvas.value.height - 15);
  context.lineTo(canvas.value.width - 10, canvas.value.height - 15);
  context.stroke();
  context.restore();
}

function resetCanvas() {
  if (!context || !canvas.value) return;

  context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  context.fillStyle = getCanvasColor("--jnv-signature-canvas-background");
  context.fillRect(0, 0, canvas.value.width, canvas.value.height);
  drawGuide();
}

function drawImage(value) {
  if (!context || !canvas.value || !value) return;

  const image = new Image();
  image.onload = () => {
    resetCanvas();
    context.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);
    drawGuide();
  };
  image.src = value;
}

function syncCanvas(value) {
  if (!context) return;
  resetCanvas();
  if (value) drawImage(value);
}

function applyInkColor() {
  context.strokeStyle = getCanvasColor("--jnv-signature-ink-color");
  updateCanvasCursor();
}

// El cursor nativo `crosshair` lo pinta el sistema y no sigue el tema; se genera con los tokens.
function updateCanvasCursor() {
  const ink = getCanvasColor("--jnv-signature-ink-color");
  const outline = getCanvasColor("--jnv-signature-canvas-background");
  const path = "M12 2v20M2 12h20";
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">` +
    `<path d="${path}" stroke="${outline}" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="${path}" stroke="${ink}" stroke-width="2" stroke-linecap="round"/></svg>`;
  canvasCursor.value = `url("data:image/svg+xml,${encodeURIComponent(svg)}") 12 12, crosshair`;
}

function drawStrokes() {
  strokes.forEach((points) => {
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    context.stroke();
  });
}

function repaintForTheme() {
  if (!context || isDrawing.value) return;

  applyInkColor();
  if (strokes.length) {
    resetCanvas();
    drawStrokes();
  } else {
    syncCanvas(signature.value);
  }
}

function getCanvasPosition(event) {
  const rect = canvas.value.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.value.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.value.height,
  };
}

function getCanvasColor(token) {
  return (
    getComputedStyle(canvas.value).getPropertyValue(token).trim() ||
    "transparent"
  );
}

function startDrawing(event) {
  if (props.disabled || !context) return;

  isDrawing.value = true;
  canvas.value.setPointerCapture?.(event.pointerId);
  const position = getCanvasPosition(event);
  strokes.push([position]);
  context.beginPath();
  context.moveTo(position.x, position.y);
}

function draw(event) {
  if (!isDrawing.value || !context) return;

  const position = getCanvasPosition(event);
  strokes.at(-1)?.push(position);
  context.lineTo(position.x, position.y);
  context.stroke();
}

function stopDrawing(event) {
  if (!isDrawing.value) return;

  isDrawing.value = false;
  if (canvas.value.hasPointerCapture?.(event.pointerId)) {
    canvas.value.releasePointerCapture(event.pointerId);
  }
  context.closePath();
  lastEmittedSignature = canvas.value.toDataURL("image/png");
  signature.value = lastEmittedSignature;
}

function clear() {
  isDrawing.value = false;
  strokes = [];
  lastEmittedSignature = null;
  resetCanvas();
  signature.value = null;
  nextTick(() => canvas.value?.focus());
}

onMounted(() => {
  context = canvas.value.getContext("2d");
  context.lineWidth = 2;
  context.lineCap = "round";
  context.lineJoin = "round";
  applyInkColor();
  resetCanvas();
  if (signature.value) drawImage(signature.value);

  // El tema se activa con atributos en la raíz; el canvas no hereda CSS y debe repintarse.
  if (typeof MutationObserver !== "undefined") {
    themeObserver = new MutationObserver(repaintForTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class", "style"],
    });
  }
});

onBeforeUnmount(() => {
  themeObserver?.disconnect();
  themeObserver = null;
  context = null;
});

watch(
  () => signature.value,
  (value, previousValue) => {
    if (!context || value === previousValue || isDrawing.value) return;
    if (value === lastEmittedSignature) return;
    // Valor externo: no hay trazos propios que repintar.
    strokes = [];
    lastEmittedSignature = null;
    syncCanvas(value);
  },
);
</script>

<template>
  <div class="base-signature" :class="{ 'base-signature--error': error }">
    <div class="base-signature__label-row">
      <label class="base-signature__label" :for="id">
        {{ label }}<span v-if="required" aria-hidden="true"> *</span>
      </label>
    </div>
    <div class="base-signature__canvas-wrapper">
      <canvas
        :id="id"
        ref="canvas"
        class="base-signature__canvas"
        :style="{ cursor: canvasCursor }"
        :width="width"
        :height="height"
        role="application"
        :aria-label="`${label}. ${drawingInstructions}`"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="message ? messageId : undefined"
        :tabindex="disabled ? -1 : 0"
        :aria-disabled="disabled ? 'true' : undefined"
        @pointerdown.prevent="startDrawing"
        @pointermove.prevent="draw"
        @pointerup.prevent="stopDrawing"
        @pointercancel.prevent="stopDrawing"
      ></canvas>
      <BaseButton
        v-if="hasSignature"
        class="base-signature__clear"
        variant="ghost"
        size="sm"
        type="button"
        :aria-label="clearAriaLabel"
        :disabled="disabled"
        @click="clear"
      >
        <BaseIcon name="close" size="sm" decorative />
      </BaseButton>
    </div>
    <span
      :id="messageId"
      class="base-signature__message"
      :class="{ 'base-signature__message--visible': message }"
      :aria-hidden="message ? undefined : 'true'"
      :role="error ? 'alert' : undefined"
    >
      {{ message }}
    </span>
  </div>
</template>

<style scoped>
.base-signature {
  display: grid;
  min-width: var(--space-0);
  gap: var(--jnv-field-gap, var(--space-2));
}

.base-signature__label {
  color: var(--jnv-color-text-body);
  font-size: var(--jnv-form-label-size);
  font-weight: var(--text-label-weight);
  line-height: var(--text-label-leading);
}

.base-signature__canvas-wrapper {
  position: relative;
  width: min(100%, calc(v-bind(width) * 1px));
  max-width: 100%;
}

.base-signature__canvas {
  display: block;
  width: 100%;
  max-width: 100%;
  height: calc(v-bind(height) * 1px);
  border: var(--border-width-thin) solid var(--jnv-color-border-strong);
  border-radius: var(--radius-md);
  background: var(--jnv-color-surface-page);
  cursor: crosshair;
  touch-action: none;
}

.base-signature__canvas:focus-visible {
  outline: var(--focus-outline-width) solid var(--jnv-color-focus-ring);
  outline-offset: var(--focus-outline-offset);
}

.base-signature__clear {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  min-width: var(--space-8);
  min-height: var(--space-8);
  padding: var(--space-1);
}

.base-signature--error .base-signature__canvas {
  border-color: var(--jnv-color-state-error);
  background: var(--jnv-color-state-error-surface);
}

.base-signature__message {
  min-height: var(--jnv-field-message-min-height);
  color: var(--jnv-color-text-muted);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-heading);
  visibility: hidden;
}

.base-signature__message--visible {
  visibility: visible;
}

.base-signature--error .base-signature__message {
  color: var(--jnv-color-state-error);
}
</style>
