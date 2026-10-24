<script setup lang="ts">
import { computed, ref } from "vue";
import {
  BaseInput,
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
  {
    id: 1,
    reference: "HTK-1042",
    locator: "LC-88412",
    customer: "María López",
    city: "Managua",
    status: "transit",
  },
  {
    id: 2,
    reference: "HTK-1043",
    locator: "LC-88413",
    customer: "Carlos Pérez",
    city: "León",
    status: "delivered",
  },
  {
    id: 3,
    reference: "HTK-1044",
    locator: "LC-88414",
    customer: "Ana Ruiz",
    city: "Granada",
    status: "pending",
  },
  {
    id: 4,
    reference: "HTK-1045",
    locator: "LC-88415",
    customer: "Luis Gómez",
    city: "Masaya",
    status: "transit",
  },
  {
    id: 5,
    reference: "HTK-1046",
    locator: "LC-88416",
    customer: "Elena Díaz",
    city: "Estelí",
    status: "delivered",
  },
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
    referencePlaceholder: "HTK-0000",
    customerPlaceholder: "Customer name",
    noLocator: "No locator",
    statuses: {
      transit: "In transit",
      delivered: "Delivered",
      pending: "Pending",
    } as Record<ShipmentStatus, string>,
    summary: (visible: number, total: number) =>
      `Showing ${visible} of ${total} shipments`,
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
    referencePlaceholder: "HTK-0000",
    customerPlaceholder: "Nombre del cliente",
    noLocator: "Sin localizador",
    statuses: {
      transit: "En tránsito",
      delivered: "Entregado",
      pending: "Pendiente",
    },
    summary: (visible, total) => `Mostrando ${visible} de ${total} envíos`,
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
    formatter: statusLabel,
  },
]);

function statusLabel(value: unknown) {
  return t.value.statuses[value as ShipmentStatus] ?? value ?? "";
}

function handleAdd(row: BaseTableRow, resetDraft: () => void) {
  rows.value = [...rows.value, { status: "pending", ...row, id: Date.now() }];
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
  {
    id: 1,
    reference: "HTK-1042",
    locator: "LC-88412",
    customer: "María López",
    city: "Managua",
    status: "transit",
  },
  // …
]);
const statusLabels = { transit: "In transit", delivered: "Delivered", pending: "Pending" };
const columns = [
  { key: "reference", label: "Reference", sortable: true, required: true },
  { key: "customer", label: "Customer", sortable: true, required: true },
  { key: "status", label: "Status", sortable: true, formatter: (value) => statusLabels[value] },
];

function handleAdd(row, resetDraft) {
  rows.value = [...rows.value, { status: "pending", ...row, id: Date.now() }];
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
    <template #cell-reference="{ row }">
      <div class="shipment-cell">
        <BaseText as="span" color="heading" weight="bold">{{ row.reference }}</BaseText>
        <BaseText as="span" variant="label" color="muted">{{ row.locator || "No locator" }}</BaseText>
      </div>
    </template>
    <template #cell-customer="{ row }">
      <div class="shipment-cell">
        <BaseText as="span" color="heading" weight="bold">{{ row.customer }}</BaseText>
        <BaseText as="span" variant="label" color="muted">{{ row.city }}</BaseText>
      </div>
    </template>
    <template #cell-status="{ value }">
      <span class="shipment-status" :class="\`shipment-status--\${value}\`">
        {{ statusLabels[value] }}
      </span>
    </template>

    <template #add-cell-reference="{ row, required, invalid }">
      <BaseInput
        v-model="row.reference"
        :required="required"
        :state="invalid ? 'error' : 'default'"
        aria-label="Reference"
        placeholder="HTK-0000"
      />
    </template>
    <template #add-cell-customer="{ row, required, invalid }">
      <BaseInput
        v-model="row.customer"
        :required="required"
        :state="invalid ? 'error' : 'default'"
        aria-label="Customer"
        placeholder="Customer name"
      />
    </template>
    <template #edit-cell-customer="{ row }">
      <BaseInput v-model="row.customer" aria-label="Customer" />
    </template>

    <template #pagination-summary="{ visibleCount, totalItems }">
      Showing {{ visibleCount }} of {{ totalItems }} shipments
    </template>
    <template #selection-summary="{ selectedCount }">
      {{ selectedCount }} rows selected
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
        <template #cell-reference="{ row }">
          <div class="table-demo__cell">
            <BaseText as="span" color="heading" weight="bold">
              {{ row.reference }}
            </BaseText>
            <BaseText as="span" variant="label" color="muted">
              {{ row.locator || t.noLocator }}
            </BaseText>
          </div>
        </template>
        <template #cell-customer="{ row }">
          <div class="table-demo__cell">
            <BaseText as="span" color="heading" weight="bold">
              {{ row.customer }}
            </BaseText>
            <BaseText as="span" variant="label" color="muted">
              {{ row.city }}
            </BaseText>
          </div>
        </template>
        <template #cell-status="{ value }">
          <span
            class="table-demo__status"
            :class="`table-demo__status--${value}`"
          >
            {{ statusLabel(value) }}
          </span>
        </template>

        <template #add-cell-reference="{ row, required, invalid }">
          <BaseInput
            v-model="row.reference"
            :required="required"
            :state="invalid ? 'error' : 'default'"
            :aria-label="t.reference"
            :placeholder="t.referencePlaceholder"
          />
        </template>
        <template #add-cell-customer="{ row, required, invalid }">
          <BaseInput
            v-model="row.customer"
            :required="required"
            :state="invalid ? 'error' : 'default'"
            :aria-label="t.customer"
            :placeholder="t.customerPlaceholder"
          />
        </template>
        <template #edit-cell-reference="{ row }">
          <BaseInput v-model="row.reference" :aria-label="t.reference" />
        </template>
        <template #edit-cell-customer="{ row }">
          <BaseInput v-model="row.customer" :aria-label="t.customer" />
        </template>

        <template #pagination-summary="{ visibleCount, totalItems }">
          {{ t.summary(visibleCount, totalItems) }}
        </template>
        <template #selection-summary="{ selectedCount }">
          {{ t.selected(selectedCount) }}
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

<style scoped>
.table-demo__cell {
  display: grid;
  gap: var(--space-1);
}

.table-demo__status {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-round);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
}

.table-demo__status--transit {
  color: var(--jnv-color-brand-secondary);
  background: var(--jnv-color-surface-highlight);
}

.table-demo__status--delivered {
  color: var(--jnv-color-state-success);
  background: var(--jnv-color-state-success-surface);
}

.table-demo__status--pending {
  color: var(--jnv-color-state-warning);
  background: var(--jnv-color-surface-subtle);
}
</style>
