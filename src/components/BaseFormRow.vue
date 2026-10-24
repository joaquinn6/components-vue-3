<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

const props = defineProps({
  columns: {
    type: Number,
    default: 2,
    validator: (value) => [1, 2, 3, 4].includes(value),
  },
  columnWidths: {
    type: Array as PropType<string[]>,
    default: () => [],
    validator: (value) =>
      value.every((width) => typeof width === "string" && width.trim()),
  },
});

const gridTemplateColumns = computed(() => {
  if (props.columnWidths.length !== props.columns) return "";
  return props.columnWidths.join(" ");
});
</script>

<template>
  <div
    class="base-form-row"
    :class="`base-form-row--columns-${columns}`"
    :style="{
      '--base-form-row-template': gridTemplateColumns || undefined,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.base-form-row {
  display: grid;
  gap: var(--jnv-form-field-gap);
  grid-template-columns: var(
    --base-form-row-template,
    repeat(var(--base-form-row-columns, 2), minmax(0, 1fr))
  );
  min-width: var(--space-0);
}

.base-form-row--columns-1 {
  --base-form-row-columns: 1;
}

.base-form-row--columns-2 {
  --base-form-row-columns: 2;
}

.base-form-row--columns-3 {
  --base-form-row-columns: 3;
}

.base-form-row--columns-4 {
  --base-form-row-columns: 4;
}

@media (max-width: 47.9375rem) {
  .base-form-row {
    --base-form-row-template: minmax(0, 1fr) !important;
  }
}
</style>
