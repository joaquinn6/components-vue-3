<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseDialog, BaseInput, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const open = ref(false);
const smallOpen = ref(false);
const submitted = ref(false);

const t = useMessages({
  en: {
    description:
      "Modal dialog with trapped focus, Escape to close and form mode.",
    formTitle: "Form · form, #actions, @submit",
    sizeTitle: "Size · size",
    open: "Open dialog",
    openSmall: "Open small dialog",
    submitted: "submit event received.",
    editProfile: "Edit profile",
    editDescription: "Dialog example with a form and custom actions.",
    email: "Email",
    cancel: "Cancel",
    save: "Save",
    close: "Close dialog",
    smallTitle: "Small dialog",
    smallDescription: "size accepts sm and md.",
  },
  es: {
    description:
      "Diálogo modal con foco atrapado, cierre con Escape y modo formulario.",
    formTitle: "Formulario · form, #actions, @submit",
    sizeTitle: "Tamaño · size",
    open: "Abrir diálogo",
    openSmall: "Abrir diálogo pequeño",
    submitted: "Evento submit recibido.",
    editProfile: "Editar perfil",
    editDescription:
      "Ejemplo de diálogo con formulario y acciones personalizadas.",
    email: "Correo electrónico",
    cancel: "Cancelar",
    save: "Guardar",
    close: "Cerrar diálogo",
    smallTitle: "Diálogo pequeño",
    smallDescription: "size admite sm y md.",
  },
});

function submit() {
  open.value = false;
  submitted.value = true;
}

const formCode = `<BaseButton @click="open = true">Open dialog</BaseButton>

<BaseDialog
  :open="open"
  title="Edit profile"
  description="Dialog example with a form and custom actions."
  form
  close-label="Close dialog"
  @close="open = false"
  @submit="save"
>
  <BaseInput label="Email" type="email" required />
  <template #actions>
    <BaseButton variant="ghost" @click="open = false">Cancel</BaseButton>
    <BaseButton type="submit">Save</BaseButton>
  </template>
</BaseDialog>`;

const sizeCode = `<BaseDialog
  :open="open"
  size="sm"
  title="Small dialog"
  description="size accepts sm and md."
  close-label="Close dialog"
  @close="open = false"
/>`;
</script>

<template>
  <DemoSection id="base-dialog" name="BaseDialog" :description="t.description">
    <DemoExample :title="t.formTitle" :code="formCode">
      <div class="demo-row">
        <BaseButton @click="open = true">{{ t.open }}</BaseButton>
        <BaseText variant="sm" color="muted" aria-live="polite">
          {{ submitted ? t.submitted : "" }}
        </BaseText>
      </div>
    </DemoExample>

    <DemoExample :title="t.sizeTitle" :code="sizeCode">
      <BaseButton variant="secondary" @click="smallOpen = true">
        {{ t.openSmall }}
      </BaseButton>
    </DemoExample>

    <BaseDialog
      :open="open"
      :title="t.editProfile"
      :description="t.editDescription"
      form
      :close-label="t.close"
      @close="open = false"
      @submit="submit"
    >
      <BaseInput id="dialog-email" :label="t.email" type="email" required />
      <template #actions>
        <BaseButton variant="ghost" @click="open = false">
          {{ t.cancel }}
        </BaseButton>
        <BaseButton type="submit">{{ t.save }}</BaseButton>
      </template>
    </BaseDialog>

    <BaseDialog
      :open="smallOpen"
      size="sm"
      :title="t.smallTitle"
      :description="t.smallDescription"
      :close-label="t.close"
      @close="smallOpen = false"
    />
  </DemoSection>
</template>
