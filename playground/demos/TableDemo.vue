<script setup lang="ts">
import { computed, ref } from "vue";
import {
  BaseTable,
  BaseText,
  type BaseTableColumn,
  type BaseTableRow,
  type BaseTableSort,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

type ShipmentStatus = "transit" | "delivered" | "pending";
type TableAction = "added" | "edited" | "deleted";

const page = ref(1);
const sort = ref<BaseTableSort | null>(null);
const selectedRows = ref<BaseTableRow[]>([]);
const lastAction = ref<TableAction | null>(null);
// El estado se guarda como clave y se traduce al mostrarlo, así los datos no dependen del idioma.
const rows = ref<BaseTableRow[]>([
  { id: 1, reference: "HTK-1042", customer: "María López", status: "transit" },
  {
    id: 2,
    reference: "HTK-1043",
    customer: "Carlos Pérez",
    status: "delivered",
  },
  { id: 3, reference: "HTK-1044", customer: "Ana Ruiz", status: "pending" },
  { id: 4, reference: "HTK-1045", customer: "Luis Gómez", status: "transit" },
  { id: 5, reference: "HTK-1046", customer: "Elena Díaz", status: "delivered" },
]);

const t = useMessages({
  en: {
    description:
      "Semantic table with sorting, local or remote pagination, selection, slots and CRUD.",
    title: "Local CRUD · selectable, addable, editable, deletable, slots",
    caption: "Demo shipments",
    empty: "There are no items to show.",
    reference: "Reference",
    customer: "Customer",
    status: "Status",
    required: "This field is required.",
    statuses: {
      transit: "In transit",
      delivered: "Delivered",
      pending: "Pending",
    } as Record<ShipmentStatus, string>,
    selected: (count: number) => `${count} rows selected`,
    noChanges: "No changes yet.",
    actions: {
      added: "add event: row added.",
      edited: "edit event: row edited.",
      deleted: "delete event: row deleted.",
    } as Record<TableAction, string>,
  },
  es: {
    description:
      "Tabla semántica con ordenamiento, paginación local o remota, selección, slots y CRUD.",
    title: "CRUD local · selectable, addable, editable, deletable, slots",
    caption: "Envíos de demostración",
    empty: "No hay elementos para mostrar.",
    reference: "Referencia",
    customer: "Cliente",
    status: "Estado",
    required: "Este campo es obligatorio.",
    statuses: {
      transit: "En tránsito",
      delivered: "Entregado",
      pending: "Pendiente",
    },
    selected: (count) => `${count} filas seleccionadas`,
    noChanges: "Todavía no hay cambios.",
    actions: {
      added: "Evento add: fila agregada.",
      edited: "Evento edit: fila editada.",
      deleted: "Evento delete: fila eliminada.",
    },
  },
});

const columns = computed<BaseTableColumn[]>(() => [
  {
    key: "reference",
    label: t.value.reference,
    sortable: true,
    required: true,
    requiredMessage: t.value.required,
  },
  {
    key: "customer",
    label: t.value.customer,
    sortable: true,
    required: true,
    requiredMessage: t.value.required,
  },
  {
    key: "status",
    label: t.value.status,
    sortable: true,
    formatter: (value) =>
      t.value.statuses[value as ShipmentStatus] ?? value ?? "",
  },
]);

function handleAdd(row: BaseTableRow, resetDraft: () => void) {
  rows.value = [...rows.value, { ...row, id: Date.now() }];
  resetDraft();
  lastAction.value = "added";
}

function handleEdit(row: BaseTableRow, finishEditing: () => void) {
  rows.value = rows.value.map((current) =>
    current.id === row.id ? row : current,
  );
  finishEditing();
  lastAction.value = "edited";
}

function handleDelete(rowToDelete: BaseTableRow) {
  rows.value = rows.value.filter((row) => row.id !== rowToDelete.id);
  selectedRows.value = selectedRows.value.filter(
    (row) => row.id !== rowToDelete.id,
  );
  lastAction.value = "deleted";
}

const code = `<script setup>
import { ref } from "vue";

const page = ref(1);
const sort = ref(null);
const selectedRows = ref([]);
const rows = ref([
  { id: 1, reference: "HTK-1042", customer: "María López", status: "transit" },
  // …
]);
const statusLabels = { transit: "In transit", delivered: "Delivered", pending: "Pending" };
const columns = [
  { key: "reference", label: "Reference", sortable: true, required: true },
  { key: "customer", label: "Customer", sortable: true, required: true },
  { key: "status", label: "Status", sortable: true, formatter: (value) => statusLabels[value] },
];

function handleAdd(row, resetDraft) {
  rows.value = [...rows.value, { ...row, id: Date.now() }];
  resetDraft();
}
function handleEdit(row, finishEditing) {
  rows.value = rows.value.map((r) => (r.id === row.id ? row : r));
  finishEditing();
}
function handleDelete(row) {
  rows.value = rows.value.filter((r) => r.id !== row.id);
}
<\/script>

<template>
  <BaseTable
    v-model:page="page"
    v-model:sort="sort"
    v-model:selected-rows="selectedRows"
    :rows="rows"
    :columns="columns"
    :total-items="rows.length"
    :page-size="3"
    row-key="id"
    caption="Demo shipments"
    empty-text="There are no items to show."
    selectable
    addable
    editable
    deletable
    @add="handleAdd"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <template #cell-reference="{ value }">
      <BaseText color="heading" weight="bold">{{ value }}</BaseText>
    </template>
    <template #selection-summary="{ selectedCount }">
      <BaseText variant="label" color="heading">{{ selectedCount }} rows selected</BaseText>
    </template>
  </BaseTable>
</template>`;
</script>

<template>
  <DemoSection id="base-table" name="BaseTable" :description="t.description">
    <DemoExample :title="t.title" :code="code">
      <BaseTable
        v-model:page="page"
        v-model:sort="sort"
        v-model:selected-rows="selectedRows"
        :rows="rows"
        :columns="columns"
        :total-items="rows.length"
        :page-size="3"
        row-key="id"
        :caption="t.caption"
        :empty-text="t.empty"
        selectable
        addable
        editable
        deletable
        @add="handleAdd"
        @edit="handleEdit"
        @delete="handleDelete"
      >
        <template #cell-reference="{ value }">
          <BaseText color="heading" weight="bold">{{ value }}</BaseText>
        </template>
        <template #selection-summary="{ selectedCount }">
          <BaseText variant="label" color="heading">
            {{ t.selected(selectedCount) }}
          </BaseText>
        </template>
      </BaseTable>
      <BaseText variant="sm" color="muted" aria-live="polite">
        {{ lastAction ? t.actions[lastAction] : t.noChanges }}
      </BaseText>
      <pre class="demo-model">{{
        JSON.stringify({ page, sort, selected: selectedRows.length })
      }}</pre>
    </DemoExample>
  </DemoSection>
</template>
