<script setup lang="ts">
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  shallowRef,
  useId,
  useSlots,
  watch,
  type PropType,
} from "vue";
import BaseButton from "./BaseButton.vue";
import BaseFieldInfo from "./BaseFieldInfo.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseImageViewer from "./BaseImageViewer.vue";
import { resolveFileUploadTexts } from "./fileUploadTexts";
import { tooltip as vTooltip } from "../directives/tooltip";
import {
  fileKey,
  formatFileSize,
  interpolate,
  matchesAccept,
  parseAccept,
} from "../utils/fileUpload";
import type {
  BaseFileUploadRejection,
  BaseFileUploadSizeFormatter,
  BaseFileUploadTexts,
  BaseFileUploadValidator,
  ButtonVariant,
} from "../public-types";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  id: { type: String, default: "" },
  variant: {
    type: String as PropType<"button" | "dropzone">,
    default: "button",
    validator: (value: string) => ["button", "dropzone"].includes(value),
  },
  multiple: Boolean,
  accept: { type: String, default: "" },
  maxFiles: { type: Number, default: 0 },
  maxSize: { type: Number, default: 0 },
  append: { type: Boolean, default: true },
  dedupe: { type: Boolean, default: true },
  validator: {
    type: Function as PropType<BaseFileUploadValidator>,
    default: undefined,
  },
  formatSize: {
    type: Function as PropType<BaseFileUploadSizeFormatter>,
    default: undefined,
  },
  name: { type: String, default: "" },
  capture: {
    type: String as PropType<"user" | "environment" | "">,
    default: "",
  },
  label: { type: String, default: "" },
  info: { type: String, default: "" },
  infoAriaLabel: { type: String, default: "Información adicional" },
  infoType: {
    type: String as PropType<
      "" | "primary" | "secondary" | "success" | "danger"
    >,
    default: "",
    validator: (value: string) =>
      ["", "primary", "secondary", "success", "danger"].includes(value),
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "sm",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  state: {
    type: String as PropType<"default" | "error" | "success">,
    default: "default",
    validator: (value: string) =>
      ["default", "error", "success"].includes(value),
  },
  help: { type: String, default: "" },
  error: { type: String, default: "" },
  success: { type: String, default: "" },
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  tone: {
    type: String as PropType<"default" | "inverse">,
    default: "default",
    validator: (value: string) => ["default", "inverse"].includes(value),
  },
  buttonVariant: {
    type: String as PropType<ButtonVariant>,
    default: "outline",
  },
  icon: { type: String, default: "upload" },
  block: Boolean,
  showList: { type: Boolean, default: true },
  removable: { type: Boolean, default: true },
  clearable: Boolean,
  showSize: { type: Boolean, default: true },
  preview: Boolean,
  showRestrictions: { type: Boolean, default: true },
  showRejections: { type: Boolean, default: true },
  listMaxHeight: { type: String, default: "" },
  texts: {
    type: Object as PropType<BaseFileUploadTexts>,
    default: () => ({}),
  },
});

const model = defineModel<File[]>({ default: () => [] });

const emit = defineEmits<{
  add: [payload: { files: File[] }];
  remove: [payload: { file: File; index: number }];
  reject: [payload: { rejections: BaseFileUploadRejection[] }];
  clear: [payload: { files: File[] }];
}>();

const slots = useSlots();
const generatedId = useId();
const baseId = computed(() => props.id || `file-upload-${generatedId}`);
const labelId = computed(() => `${baseId.value}-label`);
const messageId = computed(() => `${baseId.value}-message`);
const restrictionsId = computed(() => `${baseId.value}-restrictions`);
const listId = computed(() => `${baseId.value}-list`);

const t = computed(() => resolveFileUploadTexts(props.texts));
const files = computed<File[]>(() =>
  Array.isArray(model.value) ? model.value : [],
);

const inputElement = ref<HTMLInputElement | null>(null);
const triggerElement = ref<HTMLElement | null>(null);
const triggerButton = ref<{ $el: HTMLElement } | null>(null);
const removeButtons = ref<({ $el: HTMLElement } | null)[]>([]);
const dragging = ref(false);
const rejections = ref<BaseFileUploadRejection[]>([]);
const statusMessage = ref("");
let dragDepth = 0;
let statusTimer: ReturnType<typeof setTimeout> | undefined;

const acceptTokens = computed(() => parseAccept(props.accept));
const limit = computed(() => {
  if (!props.multiple) return 1;
  return Number.isInteger(props.maxFiles) && props.maxFiles > 0
    ? props.maxFiles
    : Infinity;
});
const replaces = computed(() => !props.multiple || !props.append);
const limitReached = computed(
  () => !replaces.value && files.value.length >= limit.value,
);
const interactive = computed(() => !props.disabled && !props.readonly);
const canSelect = computed(() => interactive.value && !limitReached.value);
const canRemove = computed(() => props.removable && interactive.value);

const currentState = computed(() => {
  if (props.error || props.state === "error") return "error";
  if (props.success || props.state === "success") return "success";
  return "default";
});
const message = computed(() => props.error || props.success || props.help);
const hasInfo = computed(() => Boolean(props.info.trim()));

function sizeText(bytes: number) {
  return props.formatSize ? props.formatSize(bytes) : formatFileSize(bytes);
}

const restrictions = computed(() => {
  if (!props.showRestrictions) return [];
  const items: string[] = [];
  if (acceptTokens.value.length)
    items.push(
      interpolate(t.value.acceptHint, {
        types: acceptTokens.value.join(", "),
      }),
    );
  if (props.maxSize > 0)
    items.push(
      interpolate(t.value.maxSizeHint, { size: sizeText(props.maxSize) }),
    );
  if (props.multiple && Number.isFinite(limit.value))
    items.push(interpolate(t.value.maxFilesHint, { max: limit.value }));
  return items;
});

const describedBy = computed(
  () =>
    [
      message.value ? messageId.value : "",
      restrictions.value.length ? restrictionsId.value : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined,
);

const buttonLabel = computed(() => {
  if (!props.multiple && files.value.length) return t.value.replace;
  return props.multiple ? t.value.selectMultiple : t.value.select;
});
const dropzoneTitle = computed(() => {
  if (dragging.value) return t.value.dropzoneActive;
  return props.multiple ? t.value.dropzoneTitleMultiple : t.value.dropzoneTitle;
});
const dropzoneAction = computed(() =>
  props.multiple ? t.value.dropzoneActionMultiple : t.value.dropzoneAction,
);

const listStyle = computed(() =>
  props.listMaxHeight
    ? { "--base-file-upload-list-max-height": props.listMaxHeight }
    : undefined,
);

// URLs de vista previa por imagen; se revocan al quitar el archivo o desmontar el componente.
const previews = shallowRef(new Map<File, string>());
const canCreatePreviews = () =>
  typeof URL !== "undefined" && typeof URL.createObjectURL === "function";

function isImage(file: File) {
  return (file.type || "").startsWith("image/");
}

function previewUrl(file: File) {
  return previews.value.get(file) ?? "";
}

watch(
  [files, () => props.preview],
  ([current, enabled]) => {
    const previous = previews.value;
    const next = new Map<File, string>();
    if (enabled && canCreatePreviews()) {
      for (const file of current) {
        if (isImage(file))
          next.set(file, previous.get(file) ?? URL.createObjectURL(file));
      }
    }
    for (const [file, url] of previous) {
      if (next.get(file) !== url) URL.revokeObjectURL(url);
    }
    previews.value = next;
  },
  { immediate: true },
);

watch(files, (current) => syncInputFiles(current));

// Refleja la selección en el input para que los envíos nativos de formulario la incluyan.
function syncInputFiles(current: readonly File[]) {
  const input = inputElement.value;
  if (!input || !props.name || typeof DataTransfer === "undefined") return;
  try {
    const transfer = new DataTransfer();
    current.forEach((file) => transfer.items.add(file));
    input.files = transfer.files;
  } catch {
    // Navegadores sin soporte para asignar `files`: se mantiene el valor nativo.
  }
}

function announce(text: string) {
  clearTimeout(statusTimer);
  statusMessage.value = text;
  statusTimer = setTimeout(() => {
    statusMessage.value = "";
  }, 3000);
}

function reject(
  list: BaseFileUploadRejection[],
  file: File,
  reason: BaseFileUploadRejection["reason"],
  message: string,
) {
  list.push({ file, reason, message });
}

function processFiles(incoming: File[]) {
  if (!interactive.value || !incoming.length) return;

  const base = replaces.value ? [] : [...files.value];
  const accepted: File[] = [];
  const rejected: BaseFileUploadRejection[] = [];
  const keys = new Set(base.map(fileKey));

  for (const file of incoming) {
    const params = { name: file.name, size: sizeText(props.maxSize) };

    if (!matchesAccept(file, acceptTokens.value)) {
      reject(rejected, file, "type", interpolate(t.value.invalidType, params));
      continue;
    }
    if (props.maxSize > 0 && file.size > props.maxSize) {
      reject(rejected, file, "size", interpolate(t.value.invalidSize, params));
      continue;
    }
    if (props.dedupe && keys.has(fileKey(file))) {
      reject(
        rejected,
        file,
        "duplicate",
        interpolate(t.value.duplicate, params),
      );
      continue;
    }
    if (base.length + accepted.length >= limit.value) {
      const text = props.multiple
        ? interpolate(t.value.tooMany, { max: limit.value })
        : t.value.single;
      reject(rejected, file, "count", text);
      continue;
    }
    const custom = props.validator?.(file, [...base, ...accepted]);
    if (typeof custom === "string" && custom) {
      reject(rejected, file, "custom", custom);
      continue;
    }

    accepted.push(file);
    keys.add(fileKey(file));
  }

  rejections.value = rejected;
  if (rejected.length) emit("reject", { rejections: rejected });

  if (accepted.length) {
    model.value = [...base, ...accepted];
    emit("add", { files: accepted });
    announce(interpolate(t.value.added, { count: accepted.length }));
  }
}

function openDialog() {
  if (!canSelect.value) return;
  inputElement.value?.click();
}

function handleInputChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const selected = Array.from(input.files ?? []);
  // Permite volver a elegir el mismo archivo tras eliminarlo.
  input.value = "";
  processFiles(selected);
  syncInputFiles(files.value);
}

function hasFiles(event: DragEvent) {
  return Array.from(event.dataTransfer?.types ?? []).includes("Files");
}

function handleDragEnter(event: DragEvent) {
  if (!hasFiles(event)) return;
  event.preventDefault();
  if (!canSelect.value) return;
  dragDepth += 1;
  dragging.value = true;
}

function handleDragOver(event: DragEvent) {
  if (!hasFiles(event)) return;
  event.preventDefault();
  if (event.dataTransfer)
    event.dataTransfer.dropEffect = canSelect.value ? "copy" : "none";
}

function handleDragLeave() {
  if (!dragging.value) return;
  dragDepth = Math.max(dragDepth - 1, 0);
  if (!dragDepth) dragging.value = false;
}

function handleDrop(event: DragEvent) {
  if (!hasFiles(event)) return;
  event.preventDefault();
  dragDepth = 0;
  dragging.value = false;
  if (!canSelect.value) return;
  processFiles(Array.from(event.dataTransfer?.files ?? []));
}

function setRemoveButton(element: unknown, index: number) {
  removeButtons.value[index] = (element as { $el: HTMLElement } | null) ?? null;
}

function focusTrigger() {
  if (props.variant === "dropzone") triggerElement.value?.focus();
  else triggerButton.value?.$el?.focus();
}

function removeFile(index: number) {
  if (!canRemove.value) return;
  const file = files.value[index];
  if (!file) return;

  model.value = files.value.filter((_, position) => position !== index);
  rejections.value = [];
  emit("remove", { file, index });
  announce(interpolate(t.value.removed, { name: file.name }));

  // El foco pasa al siguiente archivo, al anterior o, si no quedan, al disparador.
  nextTick(() => {
    const remaining = files.value.length;
    if (remaining && props.showList) {
      removeButtons.value[Math.min(index, remaining - 1)]?.$el?.focus();
    } else {
      focusTrigger();
    }
  });
}

function clear() {
  if (!files.value.length) return;
  const removed = [...files.value];
  model.value = [];
  rejections.value = [];
  emit("clear", { files: removed });
  announce(t.value.cleared);
}

function handleClear() {
  if (!canRemove.value) return;
  clear();
  nextTick(focusTrigger);
}

function fileSize(file: File) {
  return sizeText(file.size);
}

onUnmounted(() => {
  clearTimeout(statusTimer);
  for (const url of previews.value.values()) URL.revokeObjectURL(url);
  previews.value = new Map();
});

defineExpose({
  /** Abre el selector de archivos del sistema. */
  open: openDialog,
  /** Quita todos los archivos y emite `clear`. */
  clear,
  /** Elimina el archivo en la posición indicada. */
  remove: removeFile,
  focus: focusTrigger,
});

const hasFileSlot = computed(() => Boolean(slots.file));
</script>

<template>
  <div
    v-bind="$attrs"
    class="base-file-upload"
    :class="[
      `base-file-upload--${variant}`,
      `base-file-upload--${size}`,
      `base-file-upload--${currentState}`,
      `base-file-upload--tone-${tone}`,
      {
        'base-file-upload--disabled': disabled,
        'base-file-upload--readonly': readonly,
        'base-file-upload--block': block,
      },
    ]"
    role="group"
    :aria-labelledby="label ? labelId : undefined"
  >
    <div v-if="label" class="base-file-upload__label-row">
      <span :id="labelId" class="base-file-upload__label">
        {{ label }}<span v-if="required" aria-hidden="true"> *</span>
      </span>
      <BaseFieldInfo
        v-if="hasInfo"
        :text="info"
        :type="infoType"
        :aria-label="infoAriaLabel"
      />
    </div>

    <input
      :id="`${baseId}-input`"
      ref="inputElement"
      class="base-file-upload__input"
      type="file"
      tabindex="-1"
      aria-hidden="true"
      :name="name || undefined"
      :accept="accept || undefined"
      :multiple="multiple"
      :capture="capture || undefined"
      :disabled="!canSelect"
      @change="handleInputChange"
    />

    <template v-if="!readonly">
      <BaseButton
        v-if="variant === 'button'"
        ref="triggerButton"
        class="base-file-upload__button"
        :variant="buttonVariant"
        :size="size"
        :block="block"
        :disabled="!canSelect"
        :aria-describedby="describedBy"
        @click="openDialog"
        @dragenter="handleDragEnter"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      >
        <slot name="button" :files="files" :open="openDialog">
          <BaseIcon v-if="icon" :name="icon" size="sm" decorative />
          {{ buttonLabel }}
        </slot>
      </BaseButton>

      <button
        v-else
        ref="triggerElement"
        type="button"
        class="base-file-upload__dropzone"
        :class="{ 'base-file-upload__dropzone--active': dragging }"
        :disabled="!canSelect"
        :aria-describedby="describedBy"
        @click="openDialog"
        @dragenter="handleDragEnter"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      >
        <slot
          name="dropzone"
          :dragging="dragging"
          :files="files"
          :open="openDialog"
        >
          <BaseIcon
            v-if="icon"
            class="base-file-upload__dropzone-icon"
            :name="icon"
            size="lg"
            decorative
          />
          <span class="base-file-upload__dropzone-title">
            {{ dropzoneTitle }}
          </span>
          <span v-if="!dragging" class="base-file-upload__dropzone-action">
            {{ dropzoneAction }}
          </span>
        </slot>
      </button>
    </template>

    <ul
      v-if="restrictions.length && !readonly"
      :id="restrictionsId"
      class="base-file-upload__restrictions"
    >
      <li v-for="item in restrictions" :key="item">{{ item }}</li>
    </ul>

    <div v-if="showList && files.length" class="base-file-upload__list-wrapper">
      <ul
        :id="listId"
        class="base-file-upload__list"
        :style="listStyle"
        :aria-label="t.listLabel"
      >
        <li
          v-for="(file, index) in files"
          :key="`${fileKey(file)}-${index}`"
          class="base-file-upload__item"
        >
          <slot
            name="file"
            :file="file"
            :index="index"
            :size="fileSize(file)"
            :remove="() => removeFile(index)"
            :removable="canRemove"
          >
            <BaseImageViewer
              v-if="previewUrl(file)"
              class="base-file-upload__thumbnail"
              variant="thumbnail"
              thumbnail-size="sm"
              radius="sm"
              :src="previewUrl(file)"
              :alt="file.name"
              :caption="file.name"
              :downloadable="false"
            />
            <span v-else class="base-file-upload__file-icon" aria-hidden="true">
              <BaseIcon name="file" size="sm" decorative />
            </span>
            <span class="base-file-upload__file-info">
              <span class="base-file-upload__file-name" :title="file.name">
                {{ file.name }}
              </span>
              <span v-if="showSize" class="base-file-upload__file-size">
                {{ fileSize(file) }}
              </span>
            </span>
          </slot>
          <span
            v-if="slots['file-actions'] || (canRemove && !hasFileSlot)"
            class="base-file-upload__item-actions"
          >
            <slot name="file-actions" :file="file" :index="index" />
            <BaseButton
              v-if="canRemove && !hasFileSlot"
              :ref="(element) => setRemoveButton(element, index)"
              v-tooltip="interpolate(t.remove, { name: file.name })"
              class="base-file-upload__remove"
              variant="ghost-danger"
              size="icon"
              :aria-label="interpolate(t.remove, { name: file.name })"
              @click="removeFile(index)"
            >
              <BaseIcon name="trash" size="sm" decorative />
            </BaseButton>
          </span>
        </li>
      </ul>

      <BaseButton
        v-if="clearable && canRemove && files.length > 1"
        class="base-file-upload__clear"
        variant="ghost-danger"
        size="sm"
        :aria-controls="listId"
        @click="handleClear"
      >
        {{ t.clear }}
      </BaseButton>
    </div>

    <div
      v-if="showRejections"
      class="base-file-upload__rejections"
      aria-live="polite"
    >
      <ul v-if="rejections.length" class="base-file-upload__rejection-list">
        <li
          v-for="(rejection, index) in rejections"
          :key="`${fileKey(rejection.file)}-${index}`"
        >
          <BaseIcon name="alertTriangle" size="sm" decorative />
          {{ rejection.message }}
        </li>
      </ul>
    </div>

    <span
      v-if="message"
      :id="messageId"
      class="base-file-upload__message"
      :role="currentState === 'error' ? 'alert' : undefined"
    >
      {{ message }}
    </span>

    <span class="base-file-upload__sr-only" role="status" aria-live="polite">
      {{ statusMessage }}
    </span>
  </div>
</template>

<style scoped>
.base-file-upload {
  display: grid;
  min-width: var(--space-0);
  gap: var(--jnv-field-gap, var(--space-2));
  justify-items: start;
}

.base-file-upload--dropzone,
.base-file-upload--block {
  justify-items: stretch;
}

.base-file-upload > .base-file-upload__list-wrapper,
.base-file-upload > .base-file-upload__rejections,
.base-file-upload > .base-file-upload__label-row {
  justify-self: stretch;
}

.base-file-upload__label-row {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: var(--space-1);
  flex-wrap: wrap;
}

.base-file-upload__label {
  color: var(--jnv-form-label-color);
  font-size: var(--jnv-form-label-size);
  font-weight: var(--text-label-weight);
  line-height: var(--text-label-leading);
}

.base-file-upload--tone-inverse .base-file-upload__label {
  color: var(--jnv-color-text-inverse-muted);
}

.base-file-upload__input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
}

/* Variante dropzone. */
.base-file-upload__dropzone {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: var(--jnv-file-upload-dropzone-min-height);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-6) var(--space-4);
  border: var(--jnv-file-upload-dropzone-border-width)
    var(--jnv-file-upload-dropzone-border-style)
    var(--jnv-file-upload-dropzone-border);
  border-radius: var(--jnv-file-upload-dropzone-radius);
  color: var(--jnv-color-text-body);
  background: var(--jnv-file-upload-dropzone-background);
  font: inherit;
  text-align: center;
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.base-file-upload__dropzone:hover:not(:disabled) {
  border-color: var(--jnv-file-upload-dropzone-hover-border);
}

.base-file-upload__dropzone:focus-visible {
  outline: var(--focus-outline-width) solid var(--jnv-color-focus-ring);
  outline-offset: var(--focus-outline-offset);
}

.base-file-upload__dropzone--active {
  border-color: var(--jnv-file-upload-dropzone-active-border);
  background: var(--jnv-file-upload-dropzone-active-background);
  box-shadow: 0 0 0 var(--space-1) var(--jnv-control-focus-shadow);
}

.base-file-upload__dropzone:disabled {
  cursor: not-allowed;
  background: var(--jnv-control-disabled-background);
  border-color: var(--jnv-control-disabled-border);
  opacity: var(--opacity-disabled);
}

.base-file-upload__dropzone > * {
  pointer-events: none;
}

.base-file-upload__dropzone-icon {
  margin-bottom: var(--space-1);
  color: var(--jnv-file-upload-icon);
}

.base-file-upload__dropzone-title {
  color: var(--jnv-color-text-heading);
  font-weight: var(--font-weight-bold);
}

.base-file-upload__dropzone-action {
  color: var(--jnv-color-text-muted);
}

.base-file-upload--sm .base-file-upload__dropzone {
  font-size: var(--font-size-xs);
}

.base-file-upload--md .base-file-upload__dropzone {
  padding: var(--space-8) var(--space-5);
  font-size: var(--font-size-sm);
}

.base-file-upload--lg .base-file-upload__dropzone {
  padding: var(--space-10) var(--space-6);
  font-size: var(--font-size-md);
}

.base-file-upload--error .base-file-upload__dropzone {
  border-color: var(--jnv-color-state-error);
  background: var(--jnv-color-state-error-surface);
}

.base-file-upload--success .base-file-upload__dropzone {
  border-color: var(--jnv-color-state-success);
  background: var(--jnv-color-state-success-surface);
}

/* Restricciones y mensajes. */
.base-file-upload__restrictions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-3);
  margin: var(--space-0);
  padding: var(--space-0);
  color: var(--jnv-color-text-muted);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-heading);
  list-style: none;
}

.base-file-upload__message {
  color: var(--jnv-color-text-muted);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-heading);
}

.base-file-upload--error .base-file-upload__message {
  color: var(--jnv-color-state-error);
}

.base-file-upload--success .base-file-upload__message {
  color: var(--jnv-color-state-success);
}

.base-file-upload__rejections:empty {
  display: none;
}

.base-file-upload__rejection-list {
  display: grid;
  gap: var(--space-1);
  margin: var(--space-0);
  padding: var(--space-0);
  color: var(--jnv-color-state-error);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-heading);
  list-style: none;
}

.base-file-upload__rejection-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-1);
}

/* Lista de archivos. */
.base-file-upload__list-wrapper {
  display: grid;
  gap: var(--space-2);
  justify-items: end;
}

.base-file-upload__list {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  max-height: var(
    --base-file-upload-list-max-height,
    var(--jnv-file-upload-list-max-height)
  );
  gap: var(--jnv-file-upload-list-gap);
  margin: var(--space-0);
  padding: var(--space-0);
  overflow-y: auto;
  list-style: none;
}

.base-file-upload__item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border: var(--border-width-thin) solid var(--jnv-file-upload-item-border);
  border-radius: var(--radius-md);
  color: var(--jnv-color-text-body);
  background: var(--jnv-file-upload-item-background);
  font-size: var(--font-size-xs);
}

.base-file-upload--md .base-file-upload__item {
  font-size: var(--font-size-sm);
}

.base-file-upload--lg .base-file-upload__item {
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-md);
}

.base-file-upload__file-icon {
  display: inline-flex;
  flex: 0 0 auto;
  width: var(--control-height-sm);
  height: var(--control-height-sm);
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--jnv-file-upload-icon);
  background: var(--jnv-file-upload-icon-background);
}

.base-file-upload__thumbnail {
  flex: 0 0 auto;
}

.base-file-upload__file-info {
  display: grid;
  min-width: 0;
  flex: 1 1 auto;
  gap: calc(var(--space-1) / 2);
}

.base-file-upload__file-name {
  overflow: hidden;
  color: var(--jnv-color-text-heading);
  font-weight: var(--font-weight-medium);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-file-upload__file-size {
  color: var(--jnv-color-text-muted);
  font-size: var(--font-size-xs);
}

.base-file-upload__item-actions {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--space-1);
  margin-left: auto;
}

.base-file-upload .base-file-upload__remove {
  width: var(--control-height-sm);
  min-width: var(--control-height-sm);
  height: var(--control-height-sm);
  min-height: var(--control-height-sm);
  border-radius: var(--radius-md);
}

.base-file-upload__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .base-file-upload__dropzone {
    transition: none;
  }
}
</style>
