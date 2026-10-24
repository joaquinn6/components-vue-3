<script setup lang="ts">
import { ref } from "vue";
import { BaseAutocomplete } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const city = ref<unknown>(null);
const cities = [
  { label: "Managua", value: "managua" },
  { label: "León", value: "leon" },
  { label: "Granada", value: "granada" },
  { label: "Masaya", value: "masaya" },
];

const t = useMessages({
  en: {
    description:
      "Search with local or remote suggestions (fetchOptions), debounce and value creation.",
    title: "Local options · options, allowCreate, noResultsText",
    label: "City",
    placeholder: "Search a city",
    noResults: "No matches found.",
    loading: "Loading options…",
    clear: "Clear selection",
  },
  es: {
    description:
      "Búsqueda con sugerencias locales o remotas (fetchOptions), debounce y creación de valores.",
    title: "Opciones locales · options, allowCreate, noResultsText",
    label: "Ciudad",
    placeholder: "Busca una ciudad",
    noResults: "No encontramos coincidencias.",
    loading: "Cargando opciones…",
    clear: "Limpiar selección",
  },
});

const code = `<script setup>
import { ref } from "vue";

const city = ref(null);
const cities = [
  { label: "Managua", value: "managua" },
  { label: "León", value: "leon" },
  { label: "Granada", value: "granada" },
  { label: "Masaya", value: "masaya" },
];
<\/script>

<template>
  <BaseAutocomplete
    v-model="city"
    label="City"
    placeholder="Search a city"
    :options="cities"
    allow-create
    no-results-text="No matches found."
    loading-text="Loading options…"
    clear-aria-label="Clear selection"
  />
</template>`;
</script>

<template>
  <DemoSection
    id="base-autocomplete"
    name="BaseAutocomplete"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <BaseAutocomplete
        id="autocomplete-city"
        v-model="city"
        :label="t.label"
        :placeholder="t.placeholder"
        :options="cities"
        allow-create
        :no-results-text="t.noResults"
        :loading-text="t.loading"
        :clear-aria-label="t.clear"
      />
      <pre class="demo-model">city: {{ JSON.stringify(city) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
