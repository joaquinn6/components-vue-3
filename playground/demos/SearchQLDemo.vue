<script setup lang="ts">
import { computed, ref } from "vue";
import {
  BaseButton,
  BaseSearchQL,
  type BaseSearchQLChange,
  type DateRangeValue,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages, usePlaygroundLocale } from "../i18n/usePlaygroundLocale";

const { locale } = usePlaygroundLocale();

const t = useMessages({
  en: {
    description:
      "Field search combined with predefined filters shown as removable chips.",
    sizesTitle:
      "Sizes and required range · size, showDateRange, dateRangeRequired",
    modelTitle: "Controlled model · v-model, optional date",
    modelDescription: "Filters can be preloaded or cleared from the page.",
    loadPreset: "Load existing filters",
    clearPreset: "Clear filters from the page",
    reference: "Reference",
    customer: "Customer",
    email: "Email",
    status: "Status",
    pending: "Pending",
    transit: "In transit",
    delivered: "Delivered",
    shippingType: "Shipping type",
    standard: "Standard",
    express: "Express",
    paymentStatus: "Payment status",
    unpaid: "Unpaid",
    paid: "Paid",
    texts: {
      placeholder: "Type a term and choose a field",
      searchAriaLabel: "Search by field",
      searchSuggestionPrefix: "Search",
      searchSuggestionConnector: "by",
      defaultFiltersLabel: "Filters",
      removeFilterAriaLabel: "Remove filter",
      noResultsText: "No search fields available.",
      dateRangeLabel: "Date range",
      dateRangeAriaLabel: "Select date range",
      acceptDateRangeLabel: "Accept",
      dateRangePlaceholder: "Select dates",
      dateFromLabel: "From",
      dateToLabel: "To",
    },
  },
  es: {
    description:
      "Búsqueda por campo combinada con filtros predefinidos que se muestran como chips removibles.",
    sizesTitle:
      "Tamaños y rango obligatorio · size, showDateRange, dateRangeRequired",
    modelTitle: "Modelo controlado · v-model, fecha opcional",
    modelDescription:
      "Los filtros pueden precargarse o limpiarse desde la página.",
    loadPreset: "Cargar filtros existentes",
    clearPreset: "Limpiar filtros desde la página",
    reference: "Referencia",
    customer: "Cliente",
    email: "Correo electrónico",
    status: "Estado",
    pending: "Pendiente",
    transit: "En tránsito",
    delivered: "Entregado",
    shippingType: "Tipo de envío",
    standard: "Estándar",
    express: "Exprés",
    paymentStatus: "Estado de pago",
    unpaid: "Por pagar",
    paid: "Pagado",
    texts: {
      placeholder: "Escribe un término y elige un campo",
      searchAriaLabel: "Buscar por campo",
      searchSuggestionPrefix: "Buscar",
      searchSuggestionConnector: "por",
      defaultFiltersLabel: "Filtros",
      removeFilterAriaLabel: "Quitar filtro",
      noResultsText: "No hay campos de búsqueda disponibles.",
      dateRangeLabel: "Rango de fechas",
      dateRangeAriaLabel: "Seleccionar rango de fechas",
      acceptDateRangeLabel: "Aceptar",
      dateRangePlaceholder: "Seleccionar fechas",
      dateFromLabel: "Desde",
      dateToLabel: "Hasta",
    },
  },
});

// dateLocale da formato a las fechas del rango con Intl.DateTimeFormat.
const searchTexts = computed(() => ({
  ...t.value.texts,
  dateLocale: locale.value === "en" ? "en-US" : "es",
}));

const textFilters = computed(() => [
  { name: "reference", label: t.value.reference, regex: false },
  { name: "customer", label: t.value.customer, regex: true },
  { name: "email", label: t.value.email, regex: true },
]);

const defaultFilters = computed(() => [
  {
    name: "status",
    label: t.value.status,
    options: [
      { value: "pending", label: t.value.pending },
      { value: "transit", label: t.value.transit },
      { value: "delivered", label: t.value.delivered },
    ],
  },
  {
    name: "type",
    label: t.value.shippingType,
    options: [
      { value: "standard", label: t.value.standard },
      { value: "express", label: t.value.express },
    ],
  },
  {
    name: "paymentStatus",
    label: t.value.paymentStatus,
    options: [
      { value: "unpaid", label: t.value.unpaid },
      { value: "paid", label: t.value.paid },
    ],
  },
]);

const today = new Date();
const oneWeekAgo = new Date(today);
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

const lastChange = ref<BaseSearchQLChange[]>([]);
const requiredRange = ref<DateRangeValue>([oneWeekAgo, today]);

function createPreset(): BaseSearchQLChange[] {
  return [
    { name: "reference", value: "HTK-1042" },
    { name: "customer", value: ".*Ada.*" },
    { name: "status", value: "pending" },
  ];
}
const modelSelection = ref<BaseSearchQLChange[]>(createPreset());
const optionalRange = ref<DateRangeValue>(null);

function loadPreset() {
  modelSelection.value = createPreset();
  optionalRange.value = [new Date(oneWeekAgo), new Date(today)];
}

function clearPreset() {
  modelSelection.value = [];
  optionalRange.value = null;
}

const sizesCode = `<BaseSearchQL
  size="sm"
  :filters="textFilters"
  :default-filters="defaultFilters"
  show-date-range
  date-range-required
  :date-value="dateRange"
  :texts="{ placeholder: 'Type a term and choose a field', defaultFiltersLabel: 'Filters', dateLocale: 'en-US' }"
  @change="handleChange"
  @date-change="dateRange = $event"
/>

<BaseSearchQL size="md" :filters="textFilters" :default-filters="defaultFilters" @change="handleChange" />`;

const modelCode = `<script setup>
import { ref } from "vue";

const filters = ref([
  { name: "reference", value: "HTK-1042" },
  { name: "customer", value: ".*Ada.*" },
  { name: "status", value: "pending" },
]);
const dateRange = ref(null);
<\/script>

<template>
  <BaseSearchQL
    v-model="filters"
    size="lg"
    :filters="textFilters"
    :default-filters="defaultFilters"
    show-date-range
    :date-range-required="false"
    :date-value="dateRange"
    @date-change="dateRange = $event"
  />
</template>`;
</script>

<template>
  <DemoSection
    id="base-search-ql"
    name="BaseSearchQL"
    :description="t.description"
  >
    <DemoExample :title="t.sizesTitle" :code="sizesCode">
      <div class="demo-stack demo-stack--loose">
        <BaseSearchQL
          size="sm"
          :filters="textFilters"
          :default-filters="defaultFilters"
          show-date-range
          date-range-required
          :date-value="requiredRange"
          :texts="searchTexts"
          @change="lastChange = $event"
          @date-change="requiredRange = $event"
        />
        <BaseSearchQL
          size="md"
          :filters="textFilters"
          :default-filters="defaultFilters"
          :texts="searchTexts"
          @change="lastChange = $event"
        />
      </div>
      <pre class="demo-model">
change: {{ JSON.stringify(lastChange, null, 2) }}</pre>
    </DemoExample>

    <DemoExample
      :title="t.modelTitle"
      :description="t.modelDescription"
      :code="modelCode"
    >
      <div class="demo-row">
        <BaseButton size="sm" @click="loadPreset">{{
          t.loadPreset
        }}</BaseButton>
        <BaseButton size="sm" variant="ghost" @click="clearPreset">
          {{ t.clearPreset }}
        </BaseButton>
      </div>
      <BaseSearchQL
        v-model="modelSelection"
        size="lg"
        :filters="textFilters"
        :default-filters="defaultFilters"
        show-date-range
        :date-range-required="false"
        :date-value="optionalRange"
        :texts="searchTexts"
        @date-change="optionalRange = $event"
      />
      <pre class="demo-model">{{
        JSON.stringify(
          { filters: modelSelection, dateRange: optionalRange },
          null,
          2,
        )
      }}</pre>
    </DemoExample>
  </DemoSection>
</template>
