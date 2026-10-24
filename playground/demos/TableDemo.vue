<script setup lang="ts">
import { ref } from "vue";
import {
  BaseTable,
  BaseText,
  type BaseTableColumn,
  type BaseTableRow,
  type BaseTableSort,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const page = ref(1);
const sort = ref<BaseTableSort | null>(null);
const selectedRows = ref<BaseTableRow[]>([]);
const lastAction = ref("Todavía no hay cambios.");
const rows = ref<BaseTableRow[]>([
  {
    id: 1,
    reference: "HTK-1042",
    customer: "María López",
    status: "En tránsito",
  },
  {
    id: 2,
    reference: "HTK-1043",
    customer: "Carlos Pérez",
    status: "Entregado",
  },
  { id: 3, reference: "HTK-1044", customer: "Ana Ruiz", status: "Pendiente" },
  {
    id: 4,
    reference: "HTK-1045",
    customer: "Luis Gómez",
    status: "En tránsito",
  },
  { id: 5, reference: "HTK-1046", customer: "Elena Díaz", status: "Entregado" },
]);

const columns: BaseTableColumn[] = [
  { key: "reference", label: "Referencia", sortable: true, required: true },
  { key: "customer", label: "Cliente", sortable: true, required: true },
  { key: "status", label: "Estado", sortable: true },
];

function handleAdd(row: BaseTableRow, resetDraft: () => void) {
  rows.value = [...rows.value, { ...row, id: Date.now() }];
  resetDraft();
  lastAction.value = "Evento add: fila agregada.";
}

function handleEdit(row: BaseTableRow, finishEditing: () => void) {
  rows.value = rows.value.map((current) =>
    current.id === row.id ? row : current,
  );
  finishEditing();
  lastAction.value = "Evento edit: fila editada.";
}

function handleDelete(rowToDelete: BaseTableRow) {
  rows.value = rows.value.filter((row) => row.id !== rowToDelete.id);
  selectedRows.value = selectedRows.value.filter(
    (row) => row.id !== rowToDelete.id,
  );
  lastAction.value = "Evento delete: fila eliminada.";
}

const code = `<script setup>
import { ref } from "vue";

const page = ref(1);
const sort = ref(null);
const selectedRows = ref([]);
const rows = ref([
  { id: 1, reference: "HTK-1042", customer: "María López", status: "En tránsito" },
  // …
]);
const columns = [
  { key: "reference", label: "Referencia", sortable: true, required: true },
  { key: "customer", label: "Cliente", sortable: true, required: true },
  { key: "status", label: "Estado", sortable: true },
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
    caption="Envíos de demostración"
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
      <BaseText variant="label" color="heading">{{ selectedCount }} filas seleccionadas</BaseText>
    </template>
  </BaseTable>
</template>`;
</script>

<template>
  <DemoSection
    id="base-table"
    name="BaseTable"
    description="Tabla semántica con ordenamiento, paginación local o remota, selección, slots y CRUD."
  >
    <DemoExample
      title="CRUD local · selectable, addable, editable, deletable, slots"
      :code="code"
    >
      <BaseTable
        v-model:page="page"
        v-model:sort="sort"
        v-model:selected-rows="selectedRows"
        :rows="rows"
        :columns="columns"
        :total-items="rows.length"
        :page-size="3"
        row-key="id"
        caption="Envíos de demostración"
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
            {{ selectedCount }} filas seleccionadas
          </BaseText>
        </template>
      </BaseTable>
      <BaseText variant="sm" color="muted" aria-live="polite">{{
        lastAction
      }}</BaseText>
      <pre class="demo-model">{{
        JSON.stringify({ page, sort, selected: selectedRows.length })
      }}</pre>
    </DemoExample>
  </DemoSection>
</template>
