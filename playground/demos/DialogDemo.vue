<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseDialog, BaseInput, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const open = ref(false);
const smallOpen = ref(false);
const status = ref("");

function submit() {
  open.value = false;
  status.value = "Evento submit recibido.";
}

const formCode = `<BaseButton @click="open = true">Abrir diálogo</BaseButton>

<BaseDialog
  :open="open"
  title="Editar perfil"
  description="Ejemplo de diálogo con formulario y acciones personalizadas."
  form
  @close="open = false"
  @submit="save"
>
  <BaseInput label="Correo electrónico" type="email" required />
  <template #actions>
    <BaseButton variant="ghost" @click="open = false">Cancelar</BaseButton>
    <BaseButton type="submit">Guardar</BaseButton>
  </template>
</BaseDialog>`;

const sizeCode = `<BaseDialog
  :open="open"
  size="sm"
  title="Diálogo pequeño"
  description="size admite sm y md."
  close-label="Cerrar diálogo"
  @close="open = false"
/>`;
</script>

<template>
  <DemoSection
    id="base-dialog"
    name="BaseDialog"
    description="Diálogo modal con foco atrapado, cierre con Escape y modo formulario."
  >
    <DemoExample title="Formulario · form, #actions, @submit" :code="formCode">
      <div class="demo-row">
        <BaseButton @click="open = true">Abrir diálogo</BaseButton>
        <BaseText variant="sm" color="muted" aria-live="polite">{{
          status
        }}</BaseText>
      </div>
    </DemoExample>

    <DemoExample title="Tamaño · size" :code="sizeCode">
      <BaseButton variant="secondary" @click="smallOpen = true">
        Abrir diálogo pequeño
      </BaseButton>
    </DemoExample>

    <BaseDialog
      :open="open"
      title="Editar perfil"
      description="Ejemplo de diálogo con formulario y acciones personalizadas."
      form
      @close="open = false"
      @submit="submit"
    >
      <BaseInput
        id="dialog-email"
        label="Correo electrónico"
        type="email"
        required
      />
      <template #actions>
        <BaseButton variant="ghost" @click="open = false">Cancelar</BaseButton>
        <BaseButton type="submit">Guardar</BaseButton>
      </template>
    </BaseDialog>

    <BaseDialog
      :open="smallOpen"
      size="sm"
      title="Diálogo pequeño"
      description="size admite sm y md."
      close-label="Cerrar diálogo"
      @close="smallOpen = false"
    />
  </DemoSection>
</template>
