<script setup lang="ts">
defineProps({
  as: {
    type: String,
    default: "div",
    validator: (value) =>
      ["div", "section", "article", "aside", "details"].includes(value),
  },
  surface: {
    type: String,
    default: "page",
    validator: (value) => ["page", "inverse", "primary"].includes(value),
  },
  padding: {
    type: String,
    default: "comfortable",
    validator: (value) => ["comfortable", "compact", "none"].includes(value),
  },
  radius: {
    type: String,
    default: "md",
    validator: (value) => ["md", "lg"].includes(value),
  },
  elevation: {
    type: String,
    default: "sm",
    validator: (value) => ["none", "sm", "md"].includes(value),
  },
  outlined: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <component
    :is="as"
    class="base-card"
    :class="[
      `base-card--surface-${surface}`,
      `base-card--padding-${padding}`,
      `base-card--radius-${radius}`,
      `base-card--elevation-${elevation}`,
      { 'base-card--outlined': outlined },
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-card {
  min-width: var(--space-0);
}

.base-card--surface-page {
  color: var(--color-text-body);
  background: var(--color-surface-page);
}

.base-card--surface-inverse {
  color: var(--color-text-inverse);
  background: var(--color-surface-inverse);
}

.base-card--surface-primary {
  color: var(--color-text-on-primary);
  background: var(--color-brand-primary);
}

.base-card--surface-page.base-card--outlined {
  border: var(--border-width-thin) solid var(--color-border-default);
}

.base-card--surface-inverse.base-card--outlined {
  border: var(--border-width-thin) solid var(--color-border-inverse);
}

.base-card--surface-primary.base-card--outlined {
  border: var(--border-width-thin) solid var(--color-brand-primary);
}

.base-card--padding-comfortable {
  padding: var(--card-padding);
}

.base-card--padding-compact {
  padding: var(--jnv-card-padding-compact);
}

.base-card--padding-none {
  padding: var(--space-0);
}

.base-card--radius-md {
  border-radius: var(--radius-md);
}

.base-card--radius-lg {
  border-radius: var(--radius-lg);
}

.base-card--elevation-none {
  box-shadow: none;
}

.base-card--elevation-sm {
  box-shadow: var(--shadow-sm);
}

.base-card--elevation-md {
  box-shadow: var(--shadow-md);
}

@media (max-width: 29.9375rem) {
  .base-card--padding-compact {
    padding: var(--space-5);
  }
}
</style>
