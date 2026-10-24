<script setup lang="ts">
import { ref } from "vue";
import {
  BaseButton,
  BaseSearchQL,
  type BaseSearchQLChange,
  type DateRangeValue,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const textFilters = [
  { name: "reference", label: "Referencia", regex: false },
  { name: "customer", label: "Cliente", regex: true },
  { name: "email", label: "Correo electrónico", regex: true },
];
const defaultFilters = [
  {
    name: "status",
    label: "Estado",
    options: [
      { value: "pending", label: "Pendiente" },
      { value: "transit", label: "En tránsito" },
      { value: "delivered", label: "Entregado" },
    ],
  },
  {
    name: "type",
    label: "Tipo de envío",
    options: [
      { value: "standard", label: "Estándar" },
      { value: "express", label: "Exprés" },
    ],
  },
  {
    name: "paymentStatus",
    label: "Estado de pago",
    options: [
      { value: "unpaid", label: "Por pagar" },
      { value: "paid", label: "Pagado" },
    ],
  },
];

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
  placeholder="Escribe un término y elige un campo"
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
    description="Búsqueda por campo combinada con filtros predefinidos que se muestran como chips removibles."
  >
    <DemoExample
      title="Tamaños y rango obligatorio · size, showDateRange, dateRangeRequired"
      :code="sizesCode"
    >
      <div class="demo-stack demo-stack--loose">
        <BaseSearchQL
          size="sm"
          :filters="textFilters"
          :default-filters="defaultFilters"
          show-date-range
          date-range-required
          :date-value="requiredRange"
          placeholder="Escribe un término y elige un campo"
          @change="lastChange = $event"
          @date-change="requiredRange = $event"
        />
        <BaseSearchQL
          size="md"
          :filters="textFilters"
          :default-filters="defaultFilters"
          placeholder="Escribe un término y elige un campo"
          @change="lastChange = $event"
        />
      </div>
      <pre class="demo-model">
change: {{ JSON.stringify(lastChange, null, 2) }}</pre>
    </DemoExample>

    <DemoExample
      title="Modelo controlado · v-model, fecha opcional"
      description="Los filtros pueden precargarse o limpiarse desde la página."
      :code="modelCode"
    >
      <div class="demo-row">
        <BaseButton size="sm" @click="loadPreset"
          >Cargar filtros existentes</BaseButton
        >
        <BaseButton size="sm" variant="ghost" @click="clearPreset">
          Limpiar filtros desde la página
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
        placeholder="Escribe un término y elige un campo"
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
