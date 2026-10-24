<script setup lang="ts">
import { ref } from "vue";
import { BaseAutocomplete } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const city = ref<unknown>(null);
const cities = [
  { label: "Managua", value: "managua" },
  { label: "León", value: "leon" },
  { label: "Granada", value: "granada" },
  { label: "Masaya", value: "masaya" },
];

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
    label="Ciudad"
    placeholder="Busca una ciudad"
    :options="cities"
    allow-create
    no-results-text="No encontramos coincidencias."
  />
</template>`;
</script>

<template>
  <DemoSection
    id="base-autocomplete"
    name="BaseAutocomplete"
    description="Búsqueda con sugerencias locales o remotas (fetchOptions), debounce y creación de valores."
  >
    <DemoExample
      title="Opciones locales · options, allowCreate, noResultsText"
      :code="code"
    >
      <BaseAutocomplete
        id="autocomplete-city"
        v-model="city"
        label="Ciudad"
        placeholder="Busca una ciudad"
        :options="cities"
        allow-create
        no-results-text="No encontramos coincidencias."
      />
      <pre class="demo-model">city: {{ JSON.stringify(city) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
