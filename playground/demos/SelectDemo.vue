<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseSelect } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const country = ref("ni");
const selectedCountries = ref<string[]>(["ni", "cr", "hn", "sv", "pa", "mx"]);

const t = useMessages({
  en: {
    description:
      "Single or multiple option selector with disabled options and value creation.",
    singleTitle: "Single selection · options, info",
    multipleTitle:
      "Multiple selection · multiple, allowCreate, moreSelectedAriaLabel",
    country: "Country",
    countryPlaceholder: "Select a country",
    countryInfo: "Guatemala is disabled to show that state.",
    favorites: "Favorite countries",
    favoritesPlaceholder: "Select countries",
    infoAriaLabel: "More information",
    searchPlaceholder: "Search options...",
    createOption: "Create option",
    removeOption: "Remove selected option",
    moreSelected: "Show more selected options",
  },
  es: {
    description:
      "Selector de opciones simple o múltiple, con opciones deshabilitadas y creación de valores.",
    singleTitle: "Selección simple · options, info",
    multipleTitle:
      "Selección múltiple · multiple, allowCreate, moreSelectedAriaLabel",
    country: "País",
    countryPlaceholder: "Selecciona un país",
    countryInfo: "Guatemala está deshabilitada para mostrar ese estado.",
    favorites: "Países favoritos",
    favoritesPlaceholder: "Selecciona países",
    infoAriaLabel: "Más información",
    searchPlaceholder: "Buscar opciones...",
    createOption: "Crear opción",
    removeOption: "Quitar opción seleccionada",
    moreSelected: "Ver opciones seleccionadas adicionales",
  },
});

const countries = computed(() => [
  { label: "Nicaragua", value: "ni" },
  { label: "Costa Rica", value: "cr" },
  { label: "Guatemala", value: "gt", disabled: true },
  { label: "Honduras", value: "hn" },
  { label: "El Salvador", value: "sv" },
  { label: "Panamá", value: "pa" },
  { label: "México", value: "mx" },
  { label: "Colombia", value: "co" },
]);

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
    label="Country"
    placeholder="Select a country"
    :options="countries"
    info="Guatemala is disabled to show that state."
    info-aria-label="More information"
  />
</template>`;

const multipleCode = `<BaseSelect
  v-model="selectedCountries"
  label="Favorite countries"
  placeholder="Select countries"
  :options="countries"
  multiple
  allow-create
  search-placeholder="Search options..."
  create-option-text="Create option"
  remove-option-aria-label="Remove selected option"
  more-selected-aria-label="Show more selected options"
/>`;
</script>

<template>
  <DemoSection id="base-select" name="BaseSelect" :description="t.description">
    <DemoExample :title="t.singleTitle" :code="singleCode">
      <BaseSelect
        id="select-country"
        v-model="country"
        :label="t.country"
        :placeholder="t.countryPlaceholder"
        :options="countries"
        :info="t.countryInfo"
        :info-aria-label="t.infoAriaLabel"
      />
      <pre class="demo-model">country: {{ JSON.stringify(country) }}</pre>
    </DemoExample>

    <DemoExample :title="t.multipleTitle" :code="multipleCode">
      <BaseSelect
        id="select-countries"
        v-model="selectedCountries"
        :label="t.favorites"
        :placeholder="t.favoritesPlaceholder"
        :options="countries"
        multiple
        allow-create
        :search-placeholder="t.searchPlaceholder"
        :create-option-text="t.createOption"
        :remove-option-aria-label="t.removeOption"
        :more-selected-aria-label="t.moreSelected"
      />
      <pre class="demo-model">
selectedCountries: {{ JSON.stringify(selectedCountries) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
