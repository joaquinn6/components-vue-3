<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import { resolveImageViewerTexts } from "./imageViewerTexts";
import { useModalDialog } from "../composables/useModalDialog";
import {
  canCopyImages,
  copyImage,
  downloadImage,
  fileNameFromSrc,
} from "../utils/imageActions";
import type { BaseImageViewerTexts } from "../public-types";

const props = defineProps({
  open: { type: Boolean, default: false },
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  caption: { type: String, default: "" },
  downloadable: { type: Boolean, default: true },
  copyable: { type: Boolean, default: false },
  downloadName: { type: String, default: "" },
  maxZoom: { type: Number, default: 4 },
  zoomStep: { type: Number, default: 0.5 },
  texts: {
    type: Object as () => BaseImageViewerTexts,
    default: () => ({}),
  },
});

const emit = defineEmits<{
  "update:open": [open: boolean];
  close: [];
  download: [payload: { src: string }];
  copy: [payload: { success: boolean }];
  zoom: [scale: number];
}>();

const t = computed(() => resolveImageViewerTexts(props.texts));
const generatedId = useId();
const captionId = `base-image-lightbox-caption-${generatedId}`;

const dialogElement = ref<HTMLDialogElement | null>(null);
const closeButton = ref<{ $el: HTMLElement } | null>(null);
const stage = ref<HTMLElement | null>(null);
const image = ref<HTMLImageElement | null>(null);

const scale = ref(1);
const offset = ref({ x: 0, y: 0 });
const dragging = ref(false);
const statusMessage = ref("");
const copySupported = ref(false);

let dragStart: {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
} | null = null;
let statusTimer: ReturnType<typeof setTimeout> | undefined;

const minZoom = 1;
const maxZoom = computed(() => Math.max(minZoom, props.maxZoom));
const zoomStep = computed(() => (props.zoomStep > 0 ? props.zoomStep : 0.5));
const zoomPercent = computed(() => `${Math.round(scale.value * 100)} %`);
const showCopy = computed(() => props.copyable && copySupported.value);
const imageStyle = computed(() => ({
  transform: `translate(${offset.value.x}px, ${offset.value.y}px) scale(${scale.value})`,
}));

const { restoreFocus } = useModalDialog({
  open: () => props.open,
  dialog: dialogElement,
  focusInitial: () => closeButton.value?.$el?.focus(),
});

function clampOffset(x: number, y: number, currentScale = scale.value) {
  const stageEl = stage.value;
  const imageEl = image.value;
  if (!stageEl || !imageEl || currentScale <= 1) return { x: 0, y: 0 };
  const maxX = Math.max(
    0,
    (imageEl.offsetWidth * currentScale - stageEl.clientWidth) / 2,
  );
  const maxY = Math.max(
    0,
    (imageEl.offsetHeight * currentScale - stageEl.clientHeight) / 2,
  );
  return {
    x: Math.min(maxX, Math.max(-maxX, x)),
    y: Math.min(maxY, Math.max(-maxY, y)),
  };
}

/** `origin`: punto relativo al centro del área que debe quedar fijo al hacer zoom. */
function setZoom(value: number, origin?: { x: number; y: number }) {
  const next =
    Math.round(Math.min(maxZoom.value, Math.max(minZoom, value)) * 100) / 100;
  const previous = scale.value;
  if (next === previous) return;

  const point = origin ?? { x: 0, y: 0 };
  const ratio = next / previous;
  scale.value = next;
  offset.value = clampOffset(
    point.x - (point.x - offset.value.x) * ratio,
    point.y - (point.y - offset.value.y) * ratio,
    next,
  );
  emit("zoom", next);
}

function zoomIn(origin?: { x: number; y: number }) {
  setZoom(scale.value + zoomStep.value, origin);
}

function zoomOut(origin?: { x: number; y: number }) {
  setZoom(scale.value - zoomStep.value, origin);
}

function resetZoom() {
  setZoom(minZoom);
  offset.value = { x: 0, y: 0 };
}

function originFromEvent(event: MouseEvent) {
  const rect = stage.value?.getBoundingClientRect();
  if (!rect) return undefined;
  return {
    x: event.clientX - rect.left - rect.width / 2,
    y: event.clientY - rect.top - rect.height / 2,
  };
}

function handleWheel(event: WheelEvent) {
  if (!props.open) return;
  event.preventDefault();
  const origin = originFromEvent(event);
  if (event.deltaY < 0) zoomIn(origin);
  else if (event.deltaY > 0) zoomOut(origin);
}

function handleDoubleClick(event: MouseEvent) {
  if (scale.value > minZoom) resetZoom();
  else setZoom(Math.min(2, maxZoom.value), originFromEvent(event));
}

function handlePointerDown(event: PointerEvent) {
  if (scale.value <= minZoom || event.button !== 0) return;
  event.preventDefault();
  dragging.value = true;
  dragStart = {
    x: event.clientX,
    y: event.clientY,
    offsetX: offset.value.x,
    offsetY: offset.value.y,
  };
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
}

function handlePointerMove(event: PointerEvent) {
  if (!dragging.value || !dragStart) return;
  offset.value = clampOffset(
    dragStart.offsetX + event.clientX - dragStart.x,
    dragStart.offsetY + event.clientY - dragStart.y,
  );
}

function handlePointerUp(event: PointerEvent) {
  if (!dragging.value) return;
  dragging.value = false;
  dragStart = null;
  const target = event.currentTarget as HTMLElement;
  if (target.hasPointerCapture(event.pointerId))
    target.releasePointerCapture(event.pointerId);
}

function pan(dx: number, dy: number) {
  if (scale.value <= minZoom) return;
  offset.value = clampOffset(offset.value.x + dx, offset.value.y + dy);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  const step = (stage.value?.clientWidth ?? 400) * 0.1;
  const actions: Record<string, () => void> = {
    "+": () => zoomIn(),
    "=": () => zoomIn(),
    "-": () => zoomOut(),
    _: () => zoomOut(),
    "0": () => resetZoom(),
    ArrowLeft: () => pan(step, 0),
    ArrowRight: () => pan(-step, 0),
    ArrowUp: () => pan(0, step),
    ArrowDown: () => pan(0, -step),
  };
  const action = actions[event.key];
  if (!action) return;
  if (event.key.startsWith("Arrow") && scale.value <= minZoom) return;
  event.preventDefault();
  action();
}

function announce(message: string) {
  statusMessage.value = "";
  clearTimeout(statusTimer);
  // Se vacía primero para que un mismo mensaje repetido se vuelva a anunciar.
  statusTimer = setTimeout(() => {
    statusMessage.value = message;
    statusTimer = setTimeout(() => {
      statusMessage.value = "";
    }, 3000);
  }, 50);
}

async function handleDownload() {
  emit("download", { src: props.src });
  const ok = await downloadImage(
    props.src,
    props.downloadName || fileNameFromSrc(props.src),
  );
  if (!ok) announce(t.value.downloadError);
}

async function handleCopy() {
  const success = await copyImage(props.src);
  emit("copy", { success });
  announce(success ? t.value.copied : t.value.copyError);
}

// Un click cuyo destino es el propio <dialog> solo puede venir del fondo (::backdrop). Se exige
// que también empiece ahí para no cerrar al soltar fuera un arrastre iniciado dentro del modal.
let pressedOnBackdrop = false;

function handleDialogPointerDown(event: PointerEvent) {
  pressedOnBackdrop = event.target === dialogElement.value;
}

function handleDialogClick(event: MouseEvent) {
  if (pressedOnBackdrop && event.target === dialogElement.value) requestClose();
  pressedOnBackdrop = false;
}

function requestClose() {
  emit("update:open", false);
  emit("close");
}

function onDialogClose() {
  if (props.open) requestClose();
  restoreFocus();
}

function resetView() {
  scale.value = minZoom;
  offset.value = { x: 0, y: 0 };
  dragging.value = false;
  dragStart = null;
}

watch(
  () => props.open,
  (open) => {
    if (!open) resetView();
  },
);
watch(() => props.src, resetView);

watch(stage, (element, previous) => {
  previous?.removeEventListener("wheel", handleWheel);
  element?.addEventListener("wheel", handleWheel, { passive: false });
});

onMounted(() => {
  copySupported.value = canCopyImages();
});

onBeforeUnmount(() => {
  stage.value?.removeEventListener("wheel", handleWheel);
  clearTimeout(statusTimer);
});
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialogElement"
      class="base-image-lightbox"
      :aria-label="caption ? undefined : t.dialogLabel"
      :aria-labelledby="caption ? captionId : undefined"
      @cancel.prevent="requestClose"
      @close="onDialogClose"
      @keydown="handleKeydown"
      @pointerdown="handleDialogPointerDown"
      @click="handleDialogClick"
    >
      <div class="base-image-lightbox__toolbar">
        <p v-if="caption" :id="captionId" class="base-image-lightbox__caption">
          {{ caption }}
        </p>
        <div class="base-image-lightbox__controls">
          <BaseButton
            class="base-image-lightbox__button"
            variant="ghost"
            size="icon"
            :aria-label="t.zoomOut"
            :disabled="scale <= 1"
            @click="zoomOut()"
          >
            <BaseIcon name="zoomOut" size="sm" decorative />
          </BaseButton>
          <span class="base-image-lightbox__zoom" role="status">
            <span class="base-image-lightbox__sr-only">{{ t.zoomLevel }}</span>
            {{ zoomPercent }}
          </span>
          <BaseButton
            class="base-image-lightbox__button"
            variant="ghost"
            size="icon"
            :aria-label="t.zoomIn"
            :disabled="scale >= maxZoom"
            @click="zoomIn()"
          >
            <BaseIcon name="zoomIn" size="sm" decorative />
          </BaseButton>
          <BaseButton
            class="base-image-lightbox__button"
            variant="ghost"
            size="icon"
            :aria-label="t.resetZoom"
            :disabled="scale <= 1"
            @click="resetZoom"
          >
            <BaseIcon name="maximize" size="sm" decorative />
          </BaseButton>
          <span class="base-image-lightbox__separator" aria-hidden="true" />
          <BaseButton
            v-if="showCopy"
            class="base-image-lightbox__button"
            variant="ghost"
            size="icon"
            :aria-label="t.copy"
            @click="handleCopy"
          >
            <BaseIcon name="copy" size="sm" decorative />
          </BaseButton>
          <BaseButton
            v-if="downloadable"
            class="base-image-lightbox__button"
            variant="ghost"
            size="icon"
            :aria-label="t.download"
            @click="handleDownload"
          >
            <BaseIcon name="download" size="sm" decorative />
          </BaseButton>
          <BaseButton
            ref="closeButton"
            class="base-image-lightbox__button"
            variant="ghost"
            size="icon"
            :aria-label="t.close"
            @click="requestClose"
          >
            <BaseIcon name="close" size="sm" decorative />
          </BaseButton>
        </div>
      </div>

      <div
        ref="stage"
        class="base-image-lightbox__stage"
        :class="{
          'base-image-lightbox__stage--zoomed': scale > 1,
          'base-image-lightbox__stage--dragging': dragging,
        }"
        @dblclick="handleDoubleClick"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerUp"
      >
        <img
          v-if="open"
          ref="image"
          class="base-image-lightbox__image"
          :src="src"
          :alt="alt"
          :style="imageStyle"
          draggable="false"
        />
      </div>

      <div
        class="base-image-lightbox__status-region"
        role="status"
        aria-live="polite"
      >
        <p v-if="statusMessage" class="base-image-lightbox__status">
          {{ statusMessage }}
        </p>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.base-image-lightbox {
  box-sizing: border-box;
  width: min(calc(100% - var(--space-8)), var(--jnv-image-lightbox-width));
  max-width: none;
  height: min(calc(100dvh - var(--space-8)), var(--jnv-image-lightbox-height));
  max-height: none;
  padding: var(--space-0);
  overflow: hidden;
  border: var(--border-width-thin) solid var(--jnv-color-border-default);
  border-radius: var(--jnv-dialog-radius);
  color: var(--jnv-color-text-body);
  background: var(--jnv-color-surface-page);
  box-shadow: var(--jnv-dialog-shadow);
}

.base-image-lightbox[open] {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.base-image-lightbox::backdrop {
  background: var(--jnv-dialog-backdrop-background);
}

.base-image-lightbox__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-width-thin) solid var(--jnv-color-border-default);
}

.base-image-lightbox__caption {
  flex: 1 1 12rem;
  min-width: var(--space-0);
  margin: var(--space-0);
  overflow: hidden;
  color: var(--jnv-color-text-heading);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-image-lightbox__controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-inline-start: auto;
}

.base-image-lightbox .base-image-lightbox__button {
  width: var(--control-height-sm);
  min-width: var(--control-height-sm);
  height: var(--control-height-sm);
  min-height: var(--control-height-sm);
  border-radius: var(--radius-md);
}

.base-image-lightbox__zoom {
  min-width: 3.5rem;
  color: var(--jnv-color-text-muted);
  font-size: var(--font-size-xs);
  font-variant-numeric: tabular-nums;
  font-weight: var(--font-weight-bold);
  text-align: center;
}

.base-image-lightbox__separator {
  width: var(--border-width-thin);
  height: var(--icon-size-md);
  margin-inline: var(--space-1);
  background: var(--jnv-color-border-default);
}

.base-image-lightbox__stage {
  display: grid;
  place-items: center;
  min-height: var(--space-0);
  padding: var(--space-4);
  overflow: hidden;
  background: var(--jnv-image-lightbox-stage-background);
  cursor: zoom-in;
  touch-action: none;
  user-select: none;
}

.base-image-lightbox__stage--zoomed {
  cursor: grab;
}

.base-image-lightbox__stage--dragging {
  cursor: grabbing;
}

.base-image-lightbox__image {
  max-width: 100%;
  max-height: 100%;
  border-radius: var(--radius-sm);
  object-fit: contain;
  transform-origin: center;
  transition: transform var(--transition-fast);
}

.base-image-lightbox__stage--dragging .base-image-lightbox__image {
  transition: none;
}

.base-image-lightbox__status-region {
  position: absolute;
  bottom: var(--space-4);
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.base-image-lightbox__status {
  margin: var(--space-0);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  color: var(--jnv-color-text-inverse);
  background: var(--jnv-color-surface-inverse);
  box-shadow: var(--shadow-sm);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.base-image-lightbox__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-width: 35.9375rem) {
  .base-image-lightbox__toolbar {
    padding: var(--space-2) var(--space-3);
  }

  .base-image-lightbox__stage {
    padding: var(--space-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .base-image-lightbox__image {
    transition: none;
  }
}
</style>
