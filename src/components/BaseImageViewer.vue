<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseImageLightbox from "./BaseImageLightbox.vue";
import BaseText from "./BaseText.vue";
import { resolveImageViewerTexts } from "./imageViewerTexts";
import { tooltip as vTooltip } from "../directives/tooltip";
import { downloadImage, fileNameFromSrc } from "../utils/imageActions";
import type {
  BaseImageViewerAction,
  BaseImageViewerTexts,
} from "../public-types";

defineOptions({ inheritAttrs: false });

const knownActions: readonly BaseImageViewerAction[] = [
  "edit",
  "delete",
  "expand",
  "download",
];

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  variant: {
    type: String,
    default: "default",
    validator: (value: string) => ["default", "thumbnail"].includes(value),
  },
  radius: {
    type: String,
    default: "md",
    validator: (value: string) =>
      ["none", "sm", "md", "lg", "full"].includes(value),
  },
  thumbnailSize: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  aspectRatio: { type: String, default: "" },
  fit: {
    type: String,
    default: "cover",
    validator: (value: string) => ["cover", "contain"].includes(value),
  },
  actions: {
    type: Array as () => BaseImageViewerAction[],
    default: () => ["expand"],
  },
  previewable: { type: Boolean, default: true },
  bordered: { type: Boolean, default: false },
  downloadable: { type: Boolean, default: true },
  copyable: { type: Boolean, default: false },
  downloadName: { type: String, default: "" },
  maxZoom: { type: Number, default: 4 },
  zoomStep: { type: Number, default: 0.5 },
  caption: { type: String, default: "" },
  texts: {
    type: Object as () => BaseImageViewerTexts,
    default: () => ({}),
  },
});

const emit = defineEmits<{
  edit: [payload: { src: string }];
  delete: [payload: { src: string }];
  download: [payload: { src: string }];
  copy: [payload: { success: boolean }];
  open: [];
  close: [];
  error: [event: Event];
}>();

const t = computed(() => resolveImageViewerTexts(props.texts));
const isThumbnail = computed(() => props.variant === "thumbnail");
const previewOpen = ref(false);
const failed = ref(false);
const statusMessage = ref("");
let statusTimer: ReturnType<typeof setTimeout> | undefined;

// Solo acciones conocidas, sin duplicados y en el orden recibido.
const visibleActions = computed(() =>
  props.actions.filter(
    (action, index, list) =>
      knownActions.includes(action) && list.indexOf(action) === index,
  ),
);

const hasLightbox = computed(() =>
  isThumbnail.value
    ? props.previewable
    : visibleActions.value.includes("expand"),
);

const actionIcons: Record<BaseImageViewerAction, string> = {
  edit: "edit",
  delete: "trash",
  expand: "maximize",
  download: "download",
};

function actionLabel(action: BaseImageViewerAction) {
  return t.value[action];
}

const rootClasses = computed(() => [
  "base-image-viewer",
  `base-image-viewer--${isThumbnail.value ? "thumbnail" : "default"}`,
  `base-image-viewer--radius-${props.radius}`,
  `base-image-viewer--fit-${props.fit}`,
  {
    [`base-image-viewer--thumbnail-${props.thumbnailSize}`]: isThumbnail.value,
    "base-image-viewer--ratio":
      !isThumbnail.value && Boolean(props.aspectRatio),
    "base-image-viewer--failed": failed.value,
    "base-image-viewer--bordered": props.bordered,
  },
]);

const rootStyle = computed(() =>
  !isThumbnail.value && props.aspectRatio
    ? { aspectRatio: props.aspectRatio }
    : undefined,
);

function openPreview() {
  if (!hasLightbox.value || previewOpen.value || failed.value) return;
  previewOpen.value = true;
  emit("open");
}

function closePreview() {
  if (!previewOpen.value) return;
  previewOpen.value = false;
  emit("close");
}

function handlePreviewUpdate(open: boolean) {
  if (open) openPreview();
  else closePreview();
}

function announce(message: string) {
  clearTimeout(statusTimer);
  statusMessage.value = message;
  statusTimer = setTimeout(() => {
    statusMessage.value = "";
  }, 3000);
}

async function handleAction(action: BaseImageViewerAction) {
  if (action === "edit") emit("edit", { src: props.src });
  else if (action === "delete") emit("delete", { src: props.src });
  else if (action === "expand") openPreview();
  else {
    emit("download", { src: props.src });
    const ok = await downloadImage(
      props.src,
      props.downloadName || fileNameFromSrc(props.src),
    );
    if (!ok) announce(t.value.downloadError);
  }
}

function handleError(event: Event) {
  failed.value = true;
  emit("error", event);
}

watch(
  () => props.src,
  () => {
    failed.value = false;
  },
);

onBeforeUnmount(() => clearTimeout(statusTimer));

defineExpose({ openPreview, closePreview });
</script>

<template>
  <button
    v-if="isThumbnail && previewable && !failed"
    v-bind="$attrs"
    type="button"
    :class="rootClasses"
    :aria-label="t.open"
    aria-haspopup="dialog"
    @click="openPreview"
  >
    <img
      class="base-image-viewer__image"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      @error="handleError"
    />
  </button>

  <span v-else-if="isThumbnail" v-bind="$attrs" :class="rootClasses">
    <img
      v-if="!failed"
      class="base-image-viewer__image"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      @error="handleError"
    />
    <span
      v-else
      class="base-image-viewer__fallback"
      role="img"
      :aria-label="t.loadError"
    >
      <slot name="fallback">
        <BaseIcon name="camera" size="sm" decorative />
      </slot>
    </span>
  </span>

  <figure v-else v-bind="$attrs" :class="rootClasses" :style="rootStyle">
    <img
      v-if="!failed"
      class="base-image-viewer__image"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      @error="handleError"
    />
    <div v-else class="base-image-viewer__fallback">
      <slot name="fallback">
        <BaseIcon name="camera" size="lg" decorative />
        <BaseText as="span" variant="sm" color="muted">
          {{ t.loadError }}
        </BaseText>
      </slot>
    </div>

    <div
      v-if="visibleActions.length || $slots.actions"
      class="base-image-viewer__actions"
      role="group"
      :aria-label="t.actionsLabel"
    >
      <BaseButton
        v-for="action in visibleActions"
        :key="action"
        v-tooltip="actionLabel(action)"
        class="base-image-viewer__action"
        :class="`base-image-viewer__action--${action}`"
        variant="inverse"
        size="icon"
        :aria-label="actionLabel(action)"
        :aria-haspopup="action === 'expand' ? 'dialog' : undefined"
        :disabled="failed && (action === 'expand' || action === 'download')"
        @click="handleAction(action)"
      >
        <BaseIcon :name="actionIcons[action]" size="sm" decorative />
      </BaseButton>
      <slot name="actions" />
    </div>

    <span class="base-image-viewer__sr-only" role="status" aria-live="polite">
      {{ statusMessage }}
    </span>
  </figure>

  <BaseImageLightbox
    v-if="hasLightbox"
    :open="previewOpen"
    :src="src"
    :alt="alt"
    :caption="caption"
    :downloadable="downloadable"
    :copyable="copyable"
    :download-name="downloadName"
    :max-zoom="maxZoom"
    :zoom-step="zoomStep"
    :texts="texts"
    @update:open="handlePreviewUpdate"
    @download="emit('download', $event)"
    @copy="emit('copy', $event)"
  />
</template>

<style scoped>
.base-image-viewer {
  position: relative;
  display: block;
  box-sizing: border-box;
  margin: var(--space-0);
  padding: var(--space-0);
  overflow: hidden;
  border: var(--space-0);
  background: var(--jnv-image-viewer-background);
}

.base-image-viewer--default {
  width: 100%;
  min-width: var(--space-0);
}

.base-image-viewer--thumbnail {
  display: inline-block;
  flex: none;
  width: var(--base-image-viewer-thumbnail-size);
  height: var(--base-image-viewer-thumbnail-size);
  vertical-align: middle;
}

.base-image-viewer--thumbnail-sm {
  --base-image-viewer-thumbnail-size: var(--jnv-image-viewer-thumbnail-sm);
}

.base-image-viewer--thumbnail-md {
  --base-image-viewer-thumbnail-size: var(--jnv-image-viewer-thumbnail-md);
}

.base-image-viewer--thumbnail-lg {
  --base-image-viewer-thumbnail-size: var(--jnv-image-viewer-thumbnail-lg);
}

button.base-image-viewer {
  cursor: zoom-in;
  transition: transform var(--transition-fast);
}

button.base-image-viewer:hover {
  transform: translateY(calc(var(--border-width-thin) * -1));
}

button.base-image-viewer:focus-visible {
  outline: var(--focus-outline-width) solid var(--jnv-color-focus-ring);
  outline-offset: var(--focus-outline-offset);
}

.base-image-viewer--bordered {
  border: var(--jnv-image-viewer-border-width) solid
    var(--jnv-image-viewer-border-color);
}

.base-image-viewer--radius-none {
  border-radius: var(--space-0);
}

.base-image-viewer--radius-sm {
  border-radius: var(--radius-sm);
}

.base-image-viewer--radius-md {
  border-radius: var(--radius-md);
}

.base-image-viewer--radius-lg {
  border-radius: var(--radius-lg);
}

.base-image-viewer--radius-full {
  border-radius: var(--radius-round);
}

.base-image-viewer__image {
  display: block;
  width: 100%;
  height: auto;
}

.base-image-viewer--thumbnail .base-image-viewer__image,
.base-image-viewer--ratio .base-image-viewer__image {
  height: 100%;
}

.base-image-viewer--fit-cover .base-image-viewer__image {
  object-fit: cover;
}

.base-image-viewer--fit-contain .base-image-viewer__image {
  object-fit: contain;
}

.base-image-viewer__fallback {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: var(--space-2);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: inherit;
  padding: var(--space-4);
  color: var(--jnv-color-text-muted);
  text-align: center;
}

.base-image-viewer--default.base-image-viewer--failed:not(
    .base-image-viewer--ratio
  ) {
  min-height: 10rem;
}

.base-image-viewer--default::after {
  position: absolute;
  inset: var(--space-0);
  background: var(--jnv-image-viewer-scrim);
  content: "";
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-fast);
}

.base-image-viewer__actions {
  position: absolute;
  z-index: 1;
  top: var(--space-2);
  right: var(--space-2);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-1);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.base-image-viewer--default:hover::after,
.base-image-viewer--default:focus-within::after,
.base-image-viewer--default:hover .base-image-viewer__actions,
.base-image-viewer--default:focus-within .base-image-viewer__actions {
  opacity: 1;
}

.base-image-viewer--failed::after {
  display: none;
}

.base-image-viewer .base-image-viewer__action {
  width: var(--control-height-sm);
  min-width: var(--control-height-sm);
  height: var(--control-height-sm);
  min-height: var(--control-height-sm);
  border-radius: var(--radius-md);
  color: var(--jnv-image-viewer-action-text);
  background: var(--jnv-image-viewer-action-background);
}

.base-image-viewer .base-image-viewer__action:hover:not(:disabled) {
  color: var(--jnv-image-viewer-action-text);
  background: var(--jnv-image-viewer-action-hover-background);
}

.base-image-viewer .base-image-viewer__action:focus-visible {
  outline-color: var(--jnv-image-viewer-action-text);
}

.base-image-viewer__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (hover: none) {
  .base-image-viewer__actions {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  button.base-image-viewer,
  .base-image-viewer__actions,
  .base-image-viewer--default::after {
    transition: none;
  }
}
</style>
