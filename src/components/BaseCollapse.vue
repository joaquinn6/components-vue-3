<script setup lang="ts">
import { computed, inject, ref, useId, watch } from "vue";
import BaseCard from "./BaseCard.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseText from "./BaseText.vue";
import { collapseGroupKey, type CollapseVariant } from "./collapseContext";

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  icon: { type: String, default: "" },
  titleAs: {
    type: String,
    default: "h3",
    validator: (value: string) => ["h2", "h3", "h4"].includes(value),
  },
  variant: {
    type: String,
    default: undefined,
    validator: (value: string) => ["plain", "card"].includes(value),
  },
  value: { type: [String, Number], default: "" },
  id: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  toggleAriaLabel: { type: String, default: "" },
});

const emit = defineEmits<{
  "update:open": [open: boolean];
  toggle: [open: boolean];
}>();

const group = inject(collapseGroupKey, null);
const generatedId = useId();

const baseId = computed(() => props.id || `base-collapse-${generatedId}`);
const triggerId = computed(() => `${baseId.value}-trigger`);
const titleId = computed(() => `${baseId.value}-title`);
const descriptionId = computed(() => `${baseId.value}-description`);
const panelId = computed(() => `${baseId.value}-panel`);
const itemValue = computed(() =>
  props.value === "" ? generatedId : props.value,
);

const localOpen = ref(props.open);
watch(
  () => props.open,
  (value) => {
    localOpen.value = value;
  },
);

const isOpen = computed(() =>
  group ? group.isOpen(itemValue.value) : localOpen.value,
);
const resolvedVariant = computed<CollapseVariant>(
  () =>
    (props.variant as CollapseVariant | undefined) ??
    group?.variant.value ??
    "plain",
);
const isCard = computed(() => resolvedVariant.value === "card");

// El contenido abierto solo desborda el panel cuando terminó la animación de apertura, para que
// los desplegables internos no queden recortados.
const settled = ref(isOpen.value);
watch(isOpen, () => {
  settled.value = false;
});

function handleTransitionEnd(event: TransitionEvent) {
  if (event.target !== event.currentTarget) return;
  if (event.propertyName !== "grid-template-rows") return;
  settled.value = isOpen.value;
}

function setOpen(next: boolean) {
  if (props.disabled || next === isOpen.value) return;
  if (group) {
    if (!group.setOpen(itemValue.value, next)) return;
  } else {
    localOpen.value = next;
  }
  emit("update:open", next);
  emit("toggle", next);
}

defineExpose({
  expand: () => setOpen(true),
  collapse: () => setOpen(false),
  toggle: () => setOpen(!isOpen.value),
});
</script>

<template>
  <component
    :is="isCard ? BaseCard : 'div'"
    v-bind="isCard ? { padding: 'none', outlined: true, elevation: 'sm' } : {}"
    class="base-collapse"
    :class="[
      `base-collapse--${resolvedVariant}`,
      {
        'base-collapse--open': isOpen,
        'base-collapse--settled': isOpen && settled,
        'base-collapse--disabled': disabled,
      },
    ]"
  >
    <div class="base-collapse__header">
      <component :is="titleAs" class="base-collapse__heading">
        <button
          :id="triggerId"
          type="button"
          class="base-collapse__trigger"
          :aria-expanded="isOpen ? 'true' : 'false'"
          :aria-controls="panelId"
          :aria-label="toggleAriaLabel || undefined"
          :aria-labelledby="toggleAriaLabel ? undefined : titleId"
          :aria-describedby="description ? descriptionId : undefined"
          :disabled="disabled"
          @click="setOpen(!isOpen)"
        >
          <BaseIcon
            v-if="icon"
            class="base-collapse__icon"
            :name="icon"
            size="sm"
            decorative
          />
          <span class="base-collapse__label">
            <span :id="titleId" class="base-collapse__title">
              <slot name="title" :open="isOpen">{{ title }}</slot>
            </span>
            <BaseText
              v-if="description"
              :id="descriptionId"
              as="span"
              variant="sm"
              color="muted"
              class="base-collapse__description"
            >
              {{ description }}
            </BaseText>
          </span>
          <BaseIcon
            class="base-collapse__chevron"
            name="chevronDown"
            size="sm"
            decorative
          />
        </button>
      </component>
      <div v-if="$slots.actions" class="base-collapse__actions">
        <slot name="actions" :open="isOpen" />
      </div>
    </div>
    <div
      :id="panelId"
      class="base-collapse__panel"
      role="region"
      :aria-labelledby="triggerId"
      @transitionend="handleTransitionEnd"
    >
      <div class="base-collapse__panel-inner">
        <div class="base-collapse__content">
          <slot :open="isOpen" />
        </div>
      </div>
    </div>
  </component>
</template>

<style scoped>
.base-collapse {
  min-width: var(--space-0);
}

.base-collapse--plain {
  border-bottom: var(--border-width-thin) solid var(--jnv-collapse-divider);
}

.base-collapse__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: var(--space-0);
}

.base-collapse__heading {
  flex: 1 1 auto;
  min-width: var(--space-0);
  margin: var(--space-0);
  font: inherit;
}

.base-collapse__trigger {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  box-sizing: border-box;
  width: 100%;
  padding: var(--space-3) var(--space-2);
  border: var(--space-0);
  border-radius: var(--radius-md);
  color: var(--jnv-color-text-heading);
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.base-collapse--card .base-collapse__trigger {
  padding: var(--space-4) var(--space-5);
}

.base-collapse--card.base-collapse--open .base-collapse__trigger {
  border-end-start-radius: var(--space-0);
  border-end-end-radius: var(--space-0);
}

.base-collapse__trigger:hover:not(:disabled) {
  background: var(--jnv-collapse-header-hover-background);
}

.base-collapse__trigger:focus-visible {
  outline: var(--focus-outline-width) solid var(--jnv-color-focus-ring);
  outline-offset: calc(var(--focus-outline-width) * -1);
}

.base-collapse__trigger:disabled {
  cursor: not-allowed;
  opacity: var(--opacity-disabled);
}

.base-collapse__icon {
  flex: none;
  color: var(--jnv-color-brand-primary);
}

.base-collapse__label {
  display: grid;
  flex: 1 1 auto;
  gap: var(--space-1);
  min-width: var(--space-0);
}

.base-collapse__title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-heading);
  overflow-wrap: anywhere;
}

.base-collapse__chevron {
  flex: none;
  color: var(--jnv-collapse-icon);
  transition: transform var(--transition-fast);
}

.base-collapse--open .base-collapse__chevron {
  transform: rotate(180deg);
}

.base-collapse__actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--space-2);
  padding-inline-end: var(--space-2);
}

.base-collapse--card .base-collapse__actions {
  padding-inline-end: var(--space-5);
}

.base-collapse__panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition:
    grid-template-rows var(--transition-fast),
    visibility var(--transition-fast);
}

.base-collapse--open > .base-collapse__panel {
  grid-template-rows: 1fr;
  visibility: visible;
}

.base-collapse__panel-inner {
  min-height: var(--space-0);
  overflow: hidden;
}

.base-collapse--settled > .base-collapse__panel > .base-collapse__panel-inner {
  overflow: visible;
}

.base-collapse__content {
  padding: var(--space-1) var(--space-2) var(--space-4);
  color: var(--jnv-color-text-body);
}

.base-collapse--card .base-collapse__content {
  padding: var(--space-4) var(--space-5) var(--space-5);
  border-top: var(--border-width-thin) solid var(--jnv-collapse-divider);
}

@media (prefers-reduced-motion: reduce) {
  .base-collapse__trigger,
  .base-collapse__chevron,
  .base-collapse__panel {
    transition: none;
  }

  .base-collapse--open > .base-collapse__panel > .base-collapse__panel-inner {
    overflow: visible;
  }
}
</style>
