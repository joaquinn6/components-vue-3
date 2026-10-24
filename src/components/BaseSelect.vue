<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  useSlots,
} from "vue";
import BaseFieldInfo from "./BaseFieldInfo.vue";
import BaseIcon from "./BaseIcon.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  id: { type: String, default: "" },
  label: { type: String, default: "" },
  info: { type: String, default: "" },
  infoAriaLabel: { type: String, default: "Información adicional" },
  infoType: {
    type: String,
    default: "",
    validator: (value) =>
      ["", "primary", "secondary", "success", "danger"].includes(value),
  },
  options: { type: Array, required: true },
  multiple: Boolean,
  allowCreate: Boolean,
  searchPlaceholder: { type: String, default: "Buscar opciones..." },
  createOptionText: { type: String, default: "Crear opción" },
  removeOptionAriaLabel: {
    type: String,
    default: "Quitar opción seleccionada",
  },
  size: {
    type: String,
    default: "sm",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  state: {
    type: String,
    default: "default",
    validator: (value) => ["default", "error", "success"].includes(value),
  },
  help: { type: String, default: "" },
  error: { type: String, default: "" },
  success: { type: String, default: "" },
  name: { type: String, default: "" },
  placeholder: { type: String, default: "Seleccionar..." },
  required: Boolean,
  disabled: Boolean,
  tone: {
    type: String,
    default: "default",
    validator: (value) => ["default", "inverse"].includes(value),
  },
});

const emit = defineEmits(["blur", "update:modelValue"]);
const model = defineModel({
  type: [String, Number, Object, Array],
  default: "",
});
const slots = useSlots();
const generatedId = useId();
const selectId = computed(() => props.id || `select-${generatedId}`);
const listboxId = computed(() => `${selectId.value}-listbox`);
const messageId = computed(() => `${selectId.value}-message`);
const rootElement = ref(null);
const isOpen = ref(false);
const activeIndex = ref(-1);
const searchQuery = ref("");
const createdOptions = ref([]);
const canCreate = computed(() => props.multiple && props.allowCreate);
const selectedValues = computed(() =>
  props.multiple
    ? Array.isArray(model.value)
      ? model.value
      : []
    : [model.value],
);
const availableOptions = computed(() => {
  const options = [...props.options];
  for (const value of createdOptions.value) {
    if (!options.some((option) => isSameValue(option?.value ?? option, value)))
      options.push(value);
  }
  return options;
});
const filteredOptions = computed(() => {
  const options = availableOptions.value;
  if (!canCreate.value || !searchQuery.value.trim()) return options;
  const query = searchQuery.value.trim().toLocaleLowerCase();
  return options.filter((option) =>
    String(option?.label ?? option)
      .toLocaleLowerCase()
      .includes(query),
  );
});
const matchingOption = computed(() => {
  const query = searchQuery.value.trim();
  if (!query) return undefined;
  return availableOptions.value.find(
    (option) =>
      String(option?.label ?? option).toLocaleLowerCase() ===
      query.toLocaleLowerCase(),
  );
});
const canCreateCurrentOption = computed(
  () =>
    canCreate.value &&
    Boolean(searchQuery.value.trim()) &&
    !matchingOption.value,
);

const currentState = computed(() => {
  if (props.error || props.state === "error") return "error";
  if (props.success || props.state === "success") return "success";
  return "default";
});
const message = computed(() => props.error || props.success || props.help);
const hasInfo = computed(() => Boolean(props.info.trim()));
const hasLeading = computed(() => Boolean(slots.leading));

function isSameValue(first, second) {
  if (Object.is(first, second)) return true;

  if (
    first === null ||
    second === null ||
    typeof first !== "object" ||
    typeof second !== "object"
  ) {
    return false;
  }

  if (Array.isArray(first) !== Array.isArray(second)) return false;

  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);
  if (firstKeys.length !== secondKeys.length) return false;

  return firstKeys.every(
    (key) => Object.hasOwn(second, key) && isSameValue(first[key], second[key]),
  );
}

const selectedOption = computed(() =>
  availableOptions.value.find((o) =>
    isSameValue(o.value ?? o, selectedValues.value[0]),
  ),
);

function optionValue(option) {
  return option?.value ?? option;
}

function isOptionSelected(option) {
  return selectedValues.value.some((value) =>
    isSameValue(optionValue(option), value),
  );
}

function getOptionLabel(value) {
  const option = availableOptions.value.find((candidate) =>
    isSameValue(optionValue(candidate), value),
  );
  return option?.label ?? option ?? value;
}

function toggle() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value)
    activeIndex.value = Math.max(
      0,
      availableOptions.value.findIndex((option) => isOptionSelected(option)),
    );
}

function closeList() {
  isOpen.value = false;
  activeIndex.value = -1;
  searchQuery.value = "";
}

function selectOption(option) {
  if (option?.disabled) return;

  const nextValue = option?.value ?? option;
  if (props.multiple) {
    const current = selectedValues.value;
    model.value = isOptionSelected(option)
      ? current.filter((value) => !isSameValue(value, nextValue))
      : [...current, nextValue];
    searchQuery.value = "";
    return;
  }
  model.value = nextValue;
  closeList();
}

function createOption() {
  const value = searchQuery.value.trim();
  if (!canCreate.value || !value || props.disabled) return;
  if (matchingOption.value) {
    selectOption(matchingOption.value);
    return;
  }
  createdOptions.value = [...createdOptions.value, value];
  model.value = [...selectedValues.value, value];
  searchQuery.value = "";
  activeIndex.value = -1;
}

function removeValue(value) {
  if (props.disabled) return;
  model.value = selectedValues.value.filter(
    (selected) => !isSameValue(selected, value),
  );
}

function handleKeydown(event) {
  if (props.disabled) return;
  if (props.multiple && event.key === " ") return;
  if (event.key === "Escape") return closeList();
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!isOpen.value) toggle();
    else if (
      canCreate.value &&
      event.key === "Enter" &&
      searchQuery.value.trim()
    ) {
      if (matchingOption.value) selectOption(matchingOption.value);
      else createOption();
    } else if (activeIndex.value >= 0)
      selectOption(filteredOptions.value[activeIndex.value]);
    return;
  }
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  if (!isOpen.value) toggle();
  const enabled = filteredOptions.value
    .map((option, index) => ({ option, index }))
    .filter(({ option }) => !option?.disabled);
  if (!enabled.length) return;
  if (event.key === "Home") activeIndex.value = enabled[0].index;
  else if (event.key === "End") activeIndex.value = enabled.at(-1).index;
  else {
    const current = enabled.findIndex(
      ({ index }) => index === activeIndex.value,
    );
    const direction = event.key === "ArrowDown" ? 1 : -1;
    activeIndex.value =
      enabled[(current + direction + enabled.length) % enabled.length].index;
  }
}

const formValue = computed(() => {
  const value = model.value;
  return value === null || value === undefined
    ? ""
    : typeof value === "object"
      ? JSON.stringify(value)
      : String(value);
});

function handleDocumentPointerDown(event) {
  if (!rootElement.value?.contains(event.target)) closeList();
}

onMounted(() =>
  document.addEventListener("pointerdown", handleDocumentPointerDown),
);
onBeforeUnmount(() =>
  document.removeEventListener("pointerdown", handleDocumentPointerDown),
);
</script>

<template>
  <div
    ref="rootElement"
    class="base-select"
    :class="[`base-select--${currentState}`, `base-select--${tone}`]"
  >
    <div v-if="label" class="base-select__label-row">
      <label class="base-select__label" :for="selectId">
        {{ label }}<span v-if="required" aria-hidden="true"> *</span>
      </label>
      <BaseFieldInfo
        v-if="hasInfo"
        :text="info"
        :type="infoType"
        :aria-label="infoAriaLabel"
      />
    </div>
    <div
      class="base-select__control"
      :class="{ 'base-select__control--leading': hasLeading }"
    >
      <span v-if="hasLeading" class="base-select__leading" aria-hidden="true">
        <slot name="leading" />
      </span>
      <div
        v-if="multiple"
        class="base-select__multiple-control"
        :class="`base-select__input--${size}`"
        @click="toggle"
      >
        <span
          v-for="value in selectedValues"
          :key="String(value)"
          class="base-select__chip"
        >
          {{ getOptionLabel(value) }}
          <button
            type="button"
            class="base-select__chip-remove"
            :aria-label="`${removeOptionAriaLabel}: ${getOptionLabel(value)}`"
            :disabled="disabled"
            @click.stop="removeValue(value)"
          >
            <span aria-hidden="true">×</span>
          </button>
        </span>
        <input
          :id="selectId"
          v-model="searchQuery"
          class="base-select__search"
          :placeholder="
            selectedValues.length
              ? ''
              : canCreate
                ? searchPlaceholder
                : placeholder
          "
          :disabled="disabled"
          role="combobox"
          :aria-expanded="isOpen"
          :aria-haspopup="true"
          :aria-controls="listboxId"
          :aria-activedescendant="
            activeIndex >= 0 ? `${selectId}-option-${activeIndex}` : undefined
          "
          :aria-invalid="currentState === 'error' ? 'true' : undefined"
          :aria-describedby="message ? messageId : undefined"
          @focus="isOpen = true"
          @click.stop="isOpen = true"
          @keydown="handleKeydown"
        />
      </div>
      <button
        v-else
        :id="selectId"
        type="button"
        class="base-select__input"
        :class="`base-select__input--${size}`"
        :disabled="disabled"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
        :aria-controls="listboxId"
        role="combobox"
        :aria-activedescendant="
          activeIndex >= 0 ? `${selectId}-option-${activeIndex}` : undefined
        "
        :aria-invalid="currentState === 'error' ? 'true' : undefined"
        :aria-describedby="message ? messageId : undefined"
        @click="toggle"
        @keydown="handleKeydown"
      >
        <slot name="selected" :option="selectedOption">
          {{ selectedOption?.label ?? selectedOption ?? placeholder }}
        </slot>
      </button>
      <input v-if="name" type="hidden" :name="name" :value="formValue" />
      <BaseIcon
        class="base-select__icon"
        name="chevronDown"
        size="sm"
        decorative
      />

      <ul
        v-if="isOpen"
        :id="listboxId"
        class="base-select__list"
        role="listbox"
        :aria-multiselectable="multiple ? 'true' : undefined"
      >
        <li
          v-for="(option, index) in filteredOptions"
          :id="`${selectId}-option-${index}`"
          :key="option.value ?? option"
          class="base-select__option"
          :class="{
            'base-select__option--selected': isOptionSelected(option),
            'base-select__option--active': index === activeIndex,
            'base-select__option--disabled': option.disabled,
          }"
          role="option"
          :aria-selected="isOptionSelected(option)"
          @click.prevent="selectOption(option)"
        >
          <slot
            name="option"
            :option="option"
            :index="index"
            :selected="isOptionSelected(option)"
            :active="index === activeIndex"
          >
            {{ option.label ?? option }}
          </slot>
        </li>
        <li
          v-if="canCreateCurrentOption"
          :id="`${selectId}-create-option`"
          class="base-select__option base-select__option--create"
          role="option"
          aria-selected="false"
          @click.prevent="createOption"
        >
          {{ createOptionText }}: {{ searchQuery.trim() }}
        </li>
      </ul>
    </div>
    <span
      :id="messageId"
      class="base-select__message"
      :class="{ 'base-select__message--visible': message }"
      :aria-hidden="message ? undefined : 'true'"
      :role="currentState === 'error' ? 'alert' : undefined"
    >
      {{ message }}
    </span>
  </div>
</template>

<style scoped>
.base-select {
  display: grid;
  min-width: var(--space-0);
  gap: var(--jnv-field-gap, var(--base-field-gap, var(--space-2)));
}
.base-select__label {
  color: var(--jnv-form-label-color);
  font-size: var(--jnv-form-label-size);
  font-weight: var(--text-label-weight);
  line-height: var(--text-label-leading);
}
.base-select__label-row {
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: var(--space-1);
  flex-wrap: wrap;
}
.base-select--inverse .base-select__label {
  color: var(--color-text-inverse-muted);
}
.base-select__control {
  position: relative;
}
.base-select__input {
  width: 100%;
  text-align: left;
  border: var(--border-width-thin) solid var(--color-border-strong);
  border-radius: var(--radius-md);
  color: var(--jnv-form-value-color);
  background: var(--color-surface-page);
  font: inherit;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}
.base-select__multiple-control {
  display: flex;
  width: 100%;
  min-height: var(--control-height-sm);
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-10) var(--space-1) var(--space-2);
  border: var(--border-width-thin) solid var(--color-border-strong);
  border-radius: var(--radius-md);
  color: var(--color-text-body);
  background: var(--color-surface-page);
}
.base-select__multiple-control:focus-within {
  border-color: var(--color-brand-primary);
  box-shadow: 0 0 0 var(--space-1) var(--color-focus-shadow);
}
.base-select__search {
  min-width: 4rem;
  flex: 1 1 4rem;
  padding: var(--space-1);
  border: 0;
  outline: 0;
  color: inherit;
  background: transparent;
  font: inherit;
}
.base-select__search:disabled {
  cursor: not-allowed;
}
.base-select__chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  background: var(--color-surface-muted);
  font-size: var(--font-size-xs);
}
.base-select__chip-remove {
  display: inline-grid;
  width: var(--space-4);
  height: var(--space-4);
  place-items: center;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
}
.base-select__chip-remove:focus-visible {
  outline: var(--border-width-medium) solid var(--color-brand-primary);
  outline-offset: var(--space-px);
}
.base-select__chip-remove:disabled {
  cursor: not-allowed;
}
.base-select__input:hover:not(:disabled) {
  border-color: var(--color-text-muted);
}
.base-select__input:focus {
  border-color: var(--color-brand-primary);
  outline: none;
  box-shadow: 0 0 0 var(--space-1) var(--color-focus-shadow);
}
.base-select__input:disabled {
  cursor: not-allowed;
  background: var(--color-surface-muted);
}
.base-select__input--sm {
  height: var(--control-height-sm);
  padding-inline: var(--space-3) var(--space-10);
  font-size: var(--font-size-xs);
}
.base-select__input--md {
  height: var(--control-height-md);
  padding-inline: var(--space-4) var(--space-10);
  font-size: var(--font-size-sm);
}
.base-select__input--lg {
  height: var(--control-height-lg);
  padding-inline: var(--space-4) var(--space-10);
  font-size: var(--font-size-md);
}
.base-select__icon {
  position: absolute;
  top: 50%;
  right: var(--space-3);
  transform: translateY(-50%);
  pointer-events: none;
}
.base-select__list {
  position: absolute;
  z-index: 2;
  top: var(--base-menu-top, calc(100% + var(--space-1)));
  left: 0;
  width: 100%;
  max-height: 16rem;
  margin: 0;
  padding: var(--space-1);
  overflow-y: auto;
  border: var(--border-width-thin) solid var(--color-border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  background: var(--color-surface-page);
  list-style: none;
  bottom: var(--base-menu-bottom, auto);
}
.base-select__option {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  color: var(--color-text-body);
  cursor: pointer;
}
.base-select__option:hover {
  background: var(--color-surface-muted);
}
.base-select__option--active {
  background: var(--color-surface-muted);
}
.base-select__option--selected {
  color: var(--color-brand-primary);
  font-weight: var(--font-weight-semibold);
}
.base-select__option--disabled {
  cursor: not-allowed;
  opacity: var(--opacity-disabled);
}
.base-select__option--disabled:hover {
  background: transparent;
}
.base-select__message {
  margin-top: calc(var(--space-2) * -0.5);
  min-height: var(
    --jnv-field-message-min-height,
    var(
      --base-field-message-min-height,
      calc(var(--font-size-xs) * var(--line-height-heading))
    )
  );
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-heading);
  visibility: hidden;
}
.base-select__message--visible {
  visibility: visible;
}
.base-select--error .base-select__message {
  color: var(--color-state-error);
}
.base-select--success .base-select__message {
  color: var(--color-state-success);
}
</style>
