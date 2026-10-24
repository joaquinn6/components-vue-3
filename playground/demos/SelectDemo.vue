<script setup lang="ts">
import { ref } from "vue";
import { BaseSelect } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const country = ref("ni");
const selectedCountries = ref<string[]>(["ni"]);
const countries = [
  { label: "Nicaragua", value: "ni" },
  { label: "Costa Rica", value: "cr" },
  { label: "Guatemala", value: "gt", disabled: true },
];

const singleCode = `<script setup>
import { ref } from "vue";

const country = ref("ni");
const countries = [
  { label: "Nicaragua", value: "ni" },
  { label: "Costa Rica", value: "cr" },
  { label: "Guatemala", value: "gt", disabled: true },
];
<\/script>

<template>
  <BaseSelect
    v-model="country"
    label="País"
    placeholder="Selecciona un país"
    :options="countries"
    info="Guatemala está deshabilitada para mostrar ese estado."
  />
</template>`;

const multipleCode = `<BaseSelect
  v-model="selectedCountries"
  label="Países favoritos"
  placeholder="Selecciona países"
  :options="countries"
  multiple
  allow-create
/>`;
</script>

<template>
  <DemoSection
    id="base-select"
    name="BaseSelect"
    description="Selector de opciones simple o múltiple, con opciones deshabilitadas y creación de valores."
  >
    <DemoExample title="Selección simple · options, info" :code="singleCode">
      <BaseSelect
        id="select-country"
        v-model="country"
        label="País"
        placeholder="Selecciona un país"
        :options="countries"
        info="Guatemala está deshabilitada para mostrar ese estado."
      />
      <pre class="demo-model">country: {{ JSON.stringify(country) }}</pre>
    </DemoExample>

    <DemoExample
      title="Selección múltiple · multiple, allowCreate"
      :code="multipleCode"
    >
      <BaseSelect
        id="select-countries"
        v-model="selectedCountries"
        label="Países favoritos"
        placeholder="Selecciona países"
        :options="countries"
        multiple
        allow-create
      />
      <pre class="demo-model">
selectedCountries: {{ JSON.stringify(selectedCountries) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
