<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: [String, Number, Boolean], required: true },
  label: { type: String, default: "" },
  labelPosition: {
    type: String,
    default: "top",
    validator: (value) => ["top", "end"].includes(value),
  },
  required: Boolean,
  disabled: Boolean,
  invalid: Boolean,
});

const model = defineModel({ type: [String, Number, Boolean], default: "" });
</script>

<template>
  <label
    class="base-radio"
    :class="[
      `base-radio--label-${labelPosition}`,
      { 'base-radio--disabled': disabled },
    ]"
  >
    <span class="base-radio__label">{{ label }}</span>
    <span class="base-radio__option">
      <input
        v-bind="$attrs"
        :id="id"
        v-model="model"
        class="base-radio__input"
        type="radio"
        :name="name"
        :value="value"
        :required="required"
        :disabled="disabled"
        :aria-invalid="invalid ? 'true' : undefined"
      />
      <span class="base-radio__control" aria-hidden="true"></span>
    </span>
  </label>
</template>

<style scoped>
.base-radio {
  position: relative;
  display: grid;
  min-height: var(--jnv-choice-field-min-height);
  min-width: 0;
  gap: var(--jnv-field-gap, var(--base-field-gap, var(--space-2)));
  color: var(--color-text-body);
  cursor: pointer;
}

.base-radio__label {
  color: var(--jnv-form-label-color);
  font-size: var(--jnv-form-label-size);
  font-weight: var(--text-label-weight);
  line-height: var(--text-label-leading);
}

.base-radio__option {
  position: relative;
  display: inline-flex;
  width: fit-content;
  align-items: center;
}

.base-radio--label-end {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
}

.base-radio--label-end .base-radio__label {
  order: 2;
}

.base-radio--label-end .base-radio__option {
  order: 1;
}

.base-radio--label-top {
  height: var(--jnv-choice-field-min-height);
  grid-template-rows: var(--text-label-leading) 1fr;
  align-content: start;
}

.base-radio__input {
  position: absolute;
  top: 50%;
  left: 0;
  width: var(--space-1);
  height: var(--space-1);
  opacity: 0;
  transform: translateY(-50%);
}

.base-radio__control {
  display: inline-flex;
  width: var(--space-5);
  height: var(--space-5);
  flex: 0 0 var(--space-5);
  align-items: center;
  justify-content: center;
  border: var(--border-width-thin) solid var(--color-text-muted);
  border-radius: var(--radius-round);
  background: var(--color-surface-page);
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast);
}

.base-radio__control::after {
  width: var(--space-3);
  height: var(--space-3);
  border-radius: var(--radius-round);
  background: var(--color-brand-primary);
  content: "";
  opacity: 0;
  transform: scale(0.5);
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.base-radio:hover:not(.base-radio--disabled) .base-radio__control {
  border-color: var(--color-text-heading);
}

.base-radio__input:checked + .base-radio__control {
  border-color: var(--color-brand-secondary);
}

.base-radio__input:checked + .base-radio__control::after {
  opacity: 1;
  transform: scale(1);
}

.base-radio__input:focus-visible + .base-radio__control {
  outline: var(--focus-outline-width) solid var(--color-focus-ring);
  outline-offset: var(--focus-outline-offset);
}

.base-radio--disabled {
  cursor: not-allowed;
  opacity: var(--opacity-disabled);
}
</style>
