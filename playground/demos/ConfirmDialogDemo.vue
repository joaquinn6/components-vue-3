<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseConfirmDialog, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const dangerOpen = ref(false);
const primaryOpen = ref(false);
const result = ref<"deleted" | "published" | null>(null);

const t = useMessages({
  en: {
    description:
      "Action confirmation with destructive or primary tone and configurable texts.",
    title: "Tones and size · tone, confirmLabel, cancelLabel, buttonSize",
    deleteItem: "Delete item",
    deleteDescription: "This action cannot be undone.",
    confirmDelete: "Yes, delete",
    keep: "Keep",
    publish: "Publish changes",
    publishDescription: "The changes will be visible to everyone.",
    confirmPublish: "Publish",
    cancel: "Cancel",
    deleted: "Item deleted (confirm event).",
    published: "Changes published (confirm event).",
  },
  es: {
    description:
      "Confirmación de acciones con tono destructivo o primario y textos configurables.",
    title: "Tonos y tamaño · tone, confirmLabel, cancelLabel, buttonSize",
    deleteItem: "Eliminar elemento",
    deleteDescription: "Esta acción no se puede deshacer.",
    confirmDelete: "Sí, eliminar",
    keep: "Conservar",
    publish: "Publicar cambios",
    publishDescription: "Los cambios serán visibles para todos.",
    confirmPublish: "Publicar",
    cancel: "Cancelar",
    deleted: "Elemento eliminado (evento confirm).",
    published: "Cambios publicados (evento confirm).",
  },
});

function confirm(value: "deleted" | "published") {
  dangerOpen.value = false;
  primaryOpen.value = false;
  result.value = value;
}

const code = `<BaseButton variant="danger" @click="open = true">Delete item</BaseButton>

<BaseConfirmDialog
  :open="open"
  title="Delete item"
  description="This action cannot be undone."
  confirm-label="Yes, delete"
  cancel-label="Keep"
  tone="danger"
  @close="open = false"
  @confirm="remove"
/>

<!-- tone="primary" for non-destructive confirmations; buttonSize defaults to "sm" -->
<BaseConfirmDialog
  :open="publishOpen"
  title="Publish changes"
  description="The changes will be visible to everyone."
  confirm-label="Publish"
  cancel-label="Cancel"
  tone="primary"
  button-size="md"
  @close="publishOpen = false"
  @confirm="publish"
/>`;
</script>

<template>
  <DemoSection
    id="base-confirm-dialog"
    name="BaseConfirmDialog"
    :description="t.description"
  >
    <DemoExample :title="t.title" :code="code">
      <div class="demo-row">
        <BaseButton variant="danger" @click="dangerOpen = true">
          {{ t.deleteItem }}
        </BaseButton>
        <BaseButton variant="secondary" @click="primaryOpen = true">
          {{ t.publish }}
        </BaseButton>
        <BaseText variant="sm" color="muted" aria-live="polite">
          {{ result ? t[result] : "" }}
        </BaseText>
      </div>
    </DemoExample>

    <BaseConfirmDialog
      :open="dangerOpen"
      :title="t.deleteItem"
      :description="t.deleteDescription"
      :confirm-label="t.confirmDelete"
      :cancel-label="t.keep"
      tone="danger"
      @close="dangerOpen = false"
      @confirm="confirm('deleted')"
    />
    <BaseConfirmDialog
      :open="primaryOpen"
      :title="t.publish"
      :description="t.publishDescription"
      :confirm-label="t.confirmPublish"
      :cancel-label="t.cancel"
      tone="primary"
      button-size="md"
      @close="primaryOpen = false"
      @confirm="confirm('published')"
    />
  </DemoSection>
</template>
