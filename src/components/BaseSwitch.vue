<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  labelPosition: {
    type: String,
    default: "top",
    validator: (value) => ["top", "end"].includes(value),
  },
  modelValue: Boolean,
  disabled: Boolean,
  error: { type: String, default: "" },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <span
    class="base-switch-wrapper"
    :class="{ 'base-switch-wrapper--error': error }"
  >
    <label
      class="base-switch"
      :class="[
        `base-switch--label-${labelPosition}`,
        {
          'base-switch--disabled': disabled,
          'base-switch--error': error,
        },
      ]"
      :for="id"
    >
      <span class="base-switch__label">{{ label }}</span>
      <span class="base-switch__option">
        <input
          v-bind="$attrs"
          :id="id"
          class="base-switch__input"
          type="checkbox"
          role="switch"
          :checked="modelValue"
          :disabled="disabled"
          :aria-invalid="error ? 'true' : undefined"
          :aria-describedby="error ? `${id}-message` : undefined"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <span class="base-switch__track" aria-hidden="true">
          <span class="base-switch__thumb" />
        </span>
      </span>
    </label>
    <span
      :id="error ? `${id}-message` : undefined"
      class="base-switch__message"
      :aria-hidden="error ? undefined : 'true'"
      :role="error ? 'alert' : undefined"
    >
      {{ error }}
    </span>
  </span>
</template>

<style scoped>
.base-switch-wrapper {
  display: grid;
  min-width: var(--space-0);
  gap: var(--jnv-field-gap, var(--base-field-gap, var(--space-2)));
}

.base-switch {
  position: relative;
  display: grid;
  min-height: var(--jnv-choice-field-min-height);
  gap: var(--jnv-field-gap, var(--base-field-gap, var(--space-2)));
  color: var(--color-text-body);
  cursor: pointer;
}

.base-switch__label {
  color: var(--jnv-form-label-color);
  font-size: var(--jnv-form-label-size);
  font-weight: var(--text-label-weight);
  line-height: var(--text-label-leading);
}

.base-switch__option {
  position: relative;
  display: inline-flex;
  width: fit-content;
  align-items: center;
}

.base-switch--label-end {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
}

.base-switch--label-end .base-switch__label {
  order: 2;
}

.base-switch--label-end .base-switch__option {
  order: 1;
}

.base-switch--label-top {
  height: var(--jnv-choice-field-min-height);
  grid-template-rows: var(--text-label-leading) 1fr;
  align-content: start;
}

.base-switch__input {
  position: absolute;
  top: 50%;
  left: 0;
  width: var(--switch-width);
  height: var(--switch-height);
  margin: var(--space-0);
  opacity: 0;
  transform: translateY(-50%);
}

.base-switch__track {
  display: flex;
  width: var(--switch-width);
  height: var(--switch-height);
  align-items: center;
  padding: calc((var(--switch-height) - var(--switch-thumb-size)) / 2);
  border-radius: var(--radius-round);
  background: var(--color-border-strong);
  transition:
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.base-switch__thumb {
  width: var(--switch-thumb-size);
  height: var(--switch-thumb-size);
  border-radius: var(--radius-round);
  background: var(--color-surface-page);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}

.base-switch__input:checked + .base-switch__track {
  background: var(--color-action-primary);
}

.base-switch__input:checked + .base-switch__track .base-switch__thumb {
  transform: translateX(calc(var(--switch-width) - var(--switch-height)));
}

.base-switch__input:focus-visible + .base-switch__track {
  box-shadow: 0 0 0 var(--focus-outline-width) var(--color-focus-ring);
}

.base-switch--disabled {
  cursor: not-allowed;
  opacity: var(--opacity-disabled);
}

.base-switch--error .base-switch__track {
  box-shadow: 0 0 0 var(--border-width-thin) var(--color-state-error);
}

.base-switch__message {
  min-height: var(--jnv-field-message-min-height);
  margin-top: var(--space-0);
  color: var(--color-state-error);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-heading);
}
</style>
