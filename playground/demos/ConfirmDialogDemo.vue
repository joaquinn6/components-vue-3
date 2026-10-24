<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseConfirmDialog, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const dangerOpen = ref(false);
const primaryOpen = ref(false);
const status = ref("");

function confirm(message: string) {
  dangerOpen.value = false;
  primaryOpen.value = false;
  status.value = message;
}

const code = `<BaseButton variant="danger" @click="open = true">Eliminar elemento</BaseButton>

<BaseConfirmDialog
  :open="open"
  title="Eliminar elemento"
  description="Esta acción no se puede deshacer."
  confirm-label="Sí, eliminar"
  cancel-label="Conservar"
  tone="danger"
  @close="open = false"
  @confirm="remove"
/>

<!-- tone="primary" para confirmaciones no destructivas -->
<BaseConfirmDialog
  :open="publishOpen"
  title="Publicar cambios"
  description="Los cambios serán visibles para todos."
  confirm-label="Publicar"
  tone="primary"
  @close="publishOpen = false"
  @confirm="publish"
/>`;
</script>

<template>
  <DemoSection
    id="base-confirm-dialog"
    name="BaseConfirmDialog"
    description="Confirmación de acciones con tono destructivo o primario y textos configurables."
  >
    <DemoExample title="Tonos · tone, confirmLabel, cancelLabel" :code="code">
      <div class="demo-row">
        <BaseButton variant="danger" @click="dangerOpen = true"
          >Eliminar elemento</BaseButton
        >
        <BaseButton variant="secondary" @click="primaryOpen = true">
          Publicar cambios
        </BaseButton>
        <BaseText variant="sm" color="muted" aria-live="polite">{{
          status
        }}</BaseText>
      </div>
    </DemoExample>

    <BaseConfirmDialog
      :open="dangerOpen"
      title="Eliminar elemento"
      description="Esta acción no se puede deshacer."
      confirm-label="Sí, eliminar"
      cancel-label="Conservar"
      tone="danger"
      @close="dangerOpen = false"
      @confirm="confirm('Elemento eliminado (evento confirm).')"
    />
    <BaseConfirmDialog
      :open="primaryOpen"
      title="Publicar cambios"
      description="Los cambios serán visibles para todos."
      confirm-label="Publicar"
      tone="primary"
      @close="primaryOpen = false"
      @confirm="confirm('Cambios publicados (evento confirm).')"
    />
  </DemoSection>
</template>
