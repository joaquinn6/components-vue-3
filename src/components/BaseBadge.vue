<script setup lang="ts">
import type { BaseBadgeProps } from "../public-types";

withDefaults(defineProps<BaseBadgeProps>(), {
  label: "",
  tone: "neutral",
  size: "sm",
  width: "fixed",
});
</script>

<template>
  <span
    class="base-badge"
    :class="[
      `base-badge--${tone}`,
      `base-badge--${size}`,
      `base-badge--width-${width}`,
    ]"
  >
    <slot>{{ label }}</slot>
  </span>
</template>

<style scoped>
.base-badge {
  --badge-text: var(--jnv-badge-neutral-text);
  --badge-background: var(--jnv-badge-neutral-background);
  --badge-border: var(--jnv-badge-neutral-border);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: var(--jnv-badge-sm-padding-block) var(--jnv-badge-sm-padding-inline);
  color: var(--badge-text);
  background: var(--badge-background);
  border: var(--border-width-thin) solid var(--badge-border);
  border-radius: var(--radius-round);
  font-weight: var(--font-weight-semibold);
  line-height: var(--jnv-badge-sm-line-height);
  white-space: nowrap;
}

.base-badge--sm {
  padding-block: var(--jnv-badge-sm-padding-block);
  padding-inline: var(--jnv-badge-sm-padding-inline);
  font-size: var(--font-size-xs);
  line-height: var(--jnv-badge-sm-line-height);
}

.base-badge--md {
  padding-block: var(--jnv-badge-md-padding-block);
  padding-inline: var(--jnv-badge-md-padding-inline);
  font-size: var(--text-body-sm-size);
  line-height: var(--jnv-badge-md-line-height);
}

.base-badge--width-fixed {
  width: var(--jnv-badge-fixed-width);
  min-width: var(--jnv-badge-fixed-width);
}

.base-badge--info {
  --badge-text: var(--jnv-badge-info-text);
  --badge-background: var(--jnv-badge-info-background);
  --badge-border: var(--jnv-badge-info-border);
}

.base-badge--success {
  --badge-text: var(--jnv-badge-success-text);
  --badge-background: var(--jnv-badge-success-background);
  --badge-border: var(--jnv-badge-success-border);
}

.base-badge--warning {
  --badge-text: var(--jnv-badge-warning-text);
  --badge-background: var(--jnv-badge-warning-background);
  --badge-border: var(--jnv-badge-warning-border);
}

.base-badge--error {
  --badge-text: var(--jnv-badge-error-text);
  --badge-background: var(--jnv-badge-error-background);
  --badge-border: var(--jnv-badge-error-border);
}

.base-badge--critical {
  --badge-text: var(--jnv-badge-critical-text);
  --badge-background: var(--jnv-badge-critical-background);
  --badge-border: var(--jnv-badge-critical-border);
}

.base-badge--progress {
  --badge-text: var(--jnv-badge-progress-text);
  --badge-background: var(--jnv-badge-progress-background);
  --badge-border: var(--jnv-badge-progress-border);
}

.base-badge--violet {
  --badge-text: var(--jnv-badge-violet-text);
  --badge-background: var(--jnv-badge-violet-background);
  --badge-border: var(--jnv-badge-violet-border);
}
</style>
