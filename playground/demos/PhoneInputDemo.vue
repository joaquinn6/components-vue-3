<script setup lang="ts">
import { computed, ref } from "vue";
import { BasePhoneInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const phone = ref("+34612345678");

const t = useMessages({
  en: {
    description:
      "Phone number with a searchable country selector; the model includes the international prefix.",
    title: "Countries · countries, v-model",
    label: "Phone",
    help: "Search the country by name or prefix.",
    selector: "Select phone country",
    search: "Search country...",
    noResults: "No results.",
    spain: "Spain",
    nicaragua: "Nicaragua",
    usa: "United States",
  },
  es: {
    description:
      "Teléfono con selector de país buscable; el modelo incluye el prefijo internacional.",
    title: "Países · countries, v-model",
    label: "Teléfono",
    help: "Busca el país por nombre o prefijo.",
    selector: "Seleccionar país del teléfono",
    search: "Buscar país...",
    noResults: "No hay resultados.",
    spain: "España",
    nicaragua: "Nicaragua",
    usa: "Estados Unidos",
  },
});

const phoneCountries = computed(() => [
  { name: t.value.spain, prefix: "+34", iso2: "ES", flag: "🇪🇸" },
  { name: t.value.nicaragua, prefix: "+505", iso2: "NI", flag: "🇳🇮" },
  { name: t.value.usa, prefix: "+1", iso2: "US", flag: "🇺🇸" },
]);

const code = `<script setup>
import { ref } from "vue";

const phone = ref("+34612345678");
const countries = [
  { name: "Spain", prefix: "+34", iso2: "ES", flag: "🇪🇸" },
  { name: "Nicaragua", prefix: "+505", iso2: "NI", flag: "🇳🇮" },
  { name: "United States", prefix: "+1", iso2: "US", flag: "🇺🇸" },
];
<\/script>

<template>
  <BasePhoneInput
    v-model="phone"
    label="Phone"
    :countries="countries"
    country-selector-aria-label="Select phone country"
    country-search-placeholder="Search country..."
    no-results-text="No results."
    help="Search the country by name or prefix."
  />
</template>`;
</script>

<template>
  <DemoSection
    id="base-phone-input"
    name="BasePhoneInput"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <BasePhoneInput
        id="phone-example"
        v-model="phone"
        :label="t.label"
        :countries="phoneCountries"
        :country-selector-aria-label="t.selector"
        :country-search-placeholder="t.search"
        :no-results-text="t.noResults"
        :help="t.help"
      />
      <pre class="demo-model">phone: {{ JSON.stringify(phone) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
