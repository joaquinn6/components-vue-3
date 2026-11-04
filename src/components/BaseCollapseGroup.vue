<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import {
  collapseGroupKey,
  type CollapseItemValue,
  type CollapseVariant,
} from "./collapseContext";

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
  multiple: { type: Boolean, default: false },
  collapsible: { type: Boolean, default: true },
  variant: {
    type: String,
    default: "plain",
    validator: (value: string) => ["plain", "card"].includes(value),
  },
});

const emit = defineEmits<{
  "update:modelValue": [value: CollapseItemValue | CollapseItemValue[] | null];
  change: [event: { value: CollapseItemValue; open: boolean }];
}>();

function normalize(value: unknown): CollapseItemValue[] {
  if (value === null || value === undefined || value === "") return [];
  if (Array.isArray(value)) return [...value] as CollapseItemValue[];
  return [value as CollapseItemValue];
}

const openValues = ref<CollapseItemValue[]>(normalize(props.modelValue));
watch(
  () => props.modelValue,
  (value) => {
    openValues.value = normalize(value);
  },
  { deep: true },
);

function setOpen(value: CollapseItemValue, open: boolean) {
  const current = openValues.value;
  let next: CollapseItemValue[];
  if (open) {
    next = props.multiple ? [...current, value] : [value];
  } else {
    if (!props.multiple && !props.collapsible) return false;
    next = current.filter((item) => item !== value);
  }
  openValues.value = next;
  emit("update:modelValue", props.multiple ? next : (next[0] ?? null));
  emit("change", { value, open });
  return true;
}

provide(collapseGroupKey, {
  variant: computed(() => props.variant as CollapseVariant),
  isOpen: (value) => openValues.value.includes(value),
  setOpen,
});

const root = ref<HTMLElement | null>(null);

function handleKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null;
  if (!root.value || !target?.classList.contains("base-collapse__trigger"))
    return;

  const triggers = Array.from(
    root.value.querySelectorAll<HTMLButtonElement>(".base-collapse__trigger"),
  ).filter(
    (trigger) =>
      trigger.closest(".base-collapse-group") === root.value &&
      !trigger.disabled,
  );
  const index = triggers.indexOf(target as HTMLButtonElement);
  if (index < 0) return;

  let next: HTMLButtonElement | undefined;
  if (event.key === "ArrowDown") next = triggers[(index + 1) % triggers.length];
  else if (event.key === "ArrowUp")
    next = triggers[(index - 1 + triggers.length) % triggers.length];
  else if (event.key === "Home") next = triggers[0];
  else if (event.key === "End") next = triggers.at(-1);
  else return;

  event.preventDefault();
  next?.focus();
}
</script>

<template>
  <div
    ref="root"
    class="base-collapse-group"
    :class="`base-collapse-group--${variant}`"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>

<style scoped>
.base-collapse-group {
  display: grid;
  min-width: var(--space-0);
}

.base-collapse-group--plain {
  border-top: var(--border-width-thin) solid var(--jnv-collapse-divider);
}

.base-collapse-group--card {
  gap: var(--jnv-collapse-group-gap);
}
</style>
