<script setup lang="ts">
import { ref } from "vue";
import { BaseBadge, BaseButton, BaseFileUpload } from "../../src/index";
import type {
  BaseFileUploadExposed,
  BaseFileUploadRejection,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const contract = ref<File[]>([]);
const avatar = ref<File[]>([]);
const attachments = ref<File[]>([]);
const photos = ref<File[]>([]);
const documents = ref<File[]>([]);
const lastRejections = ref<BaseFileUploadRejection[]>([]);

function makeFile(name: string, bytes: number, type: string) {
  return new File([new Uint8Array(bytes)], name, { type });
}

const readonlyFiles = ref<File[]>([
  makeFile("invoice-2026-11.pdf", 245_760, "application/pdf"),
  makeFile("delivery-receipt.png", 1_153_434, "image/png"),
]);

const t = useMessages({
  en: {
    description:
      "File picker with a button or drag-and-drop variant. Selected files are listed and can be removed one by one.",
    buttonTitle: "Button variant · single file, accept, maxSize, buttonVariant",
    contractLabel: "Signed contract",
    contractHelp: "Selecting a new file replaces the current one.",
    avatarLabel: "Profile picture",
    dropzoneTitle:
      "Dropzone · multiple, maxFiles, maxSize, preview, clearable, reject",
    attachmentsLabel: "Attachments",
    attachmentsInfo: "Images show a thumbnail you can expand.",
    rejectedCount: "Rejected in the last selection",
    customTitle: "Customization · validator, texts, append, slots, size",
    photosLabel: "Gallery photos",
    noSpaces: "{name}: file names cannot contain spaces",
    documentsLabel: "Documents",
    selectDocuments: "Attach documents",
    dropTitle: "Drop your documents",
    dropAction: "or browse your computer",
    removeDocument: "Remove {name}",
    statesTitle: "States · readonly, disabled, error",
    readonlyLabel: "Attached files (read only)",
    disabledLabel: "Disabled",
    errorLabel: "Required document",
    errorMessage: "Attach at least one document.",
    exposedTitle: "Exposed methods · open(), clear()",
    openPicker: "Open picker",
    clearAll: "Clear",
    texts: {
      select: "Select file",
      selectMultiple: "Select files",
      replace: "Change file",
      dropzoneTitle: "Drag a file here",
      dropzoneTitleMultiple: "Drag your files here",
      dropzoneAction: "or click to select it",
      dropzoneActionMultiple: "or click to select them",
      dropzoneActive: "Drop to add",
      acceptHint: "Formats: {types}",
      maxSizeHint: "Max size: {size}",
      maxFilesHint: "Up to {max} files",
      listLabel: "Selected files",
      remove: "Remove {name}",
      clear: "Remove all",
      invalidType: "{name}: file type not allowed",
      invalidSize: "{name} exceeds the maximum size of {size}",
      tooMany: "You can select up to {max} files",
      single: "You can only select one file",
      duplicate: "{name} is already in the list",
      added: "Files added: {count}",
      removed: "File removed: {name}",
      cleared: "All files were removed",
    },
  },
  es: {
    description:
      "Selector de archivos con variante de botón o de arrastrar y soltar. Los archivos seleccionados se listan y se pueden eliminar uno a uno.",
    buttonTitle: "Variante botón · un archivo, accept, maxSize, buttonVariant",
    contractLabel: "Contrato firmado",
    contractHelp: "Al elegir un archivo nuevo se reemplaza el actual.",
    avatarLabel: "Foto de perfil",
    dropzoneTitle:
      "Zona de arrastre · multiple, maxFiles, maxSize, preview, clearable, reject",
    attachmentsLabel: "Adjuntos",
    attachmentsInfo:
      "Las imágenes muestran una miniatura que se puede ampliar.",
    rejectedCount: "Rechazados en la última selección",
    customTitle: "Personalización · validator, texts, append, slots, size",
    photosLabel: "Fotos de la galería",
    noSpaces: "{name}: el nombre no puede contener espacios",
    documentsLabel: "Documentos",
    selectDocuments: "Adjuntar documentos",
    dropTitle: "Suelta tus documentos",
    dropAction: "o búscalos en tu equipo",
    removeDocument: "Quitar {name}",
    statesTitle: "Estados · readonly, disabled, error",
    readonlyLabel: "Archivos adjuntos (solo lectura)",
    disabledLabel: "Deshabilitado",
    errorLabel: "Documento obligatorio",
    errorMessage: "Adjunta al menos un documento.",
    exposedTitle: "Métodos expuestos · open(), clear()",
    openPicker: "Abrir selector",
    clearAll: "Vaciar",
    texts: {
      select: "Seleccionar archivo",
      selectMultiple: "Seleccionar archivos",
      replace: "Cambiar archivo",
      dropzoneTitle: "Arrastra un archivo aquí",
      dropzoneTitleMultiple: "Arrastra tus archivos aquí",
      dropzoneAction: "o haz clic para seleccionarlo",
      dropzoneActionMultiple: "o haz clic para seleccionarlos",
      dropzoneActive: "Suelta para añadir",
      acceptHint: "Formatos: {types}",
      maxSizeHint: "Tamaño máximo: {size}",
      maxFilesHint: "Máximo {max} archivos",
      listLabel: "Archivos seleccionados",
      remove: "Eliminar {name}",
      clear: "Quitar todos",
      invalidType: "{name}: tipo de archivo no permitido",
      invalidSize: "{name} supera el tamaño máximo de {size}",
      tooMany: "Solo puedes seleccionar hasta {max} archivos",
      single: "Solo puedes seleccionar un archivo",
      duplicate: "{name} ya está en la lista",
      added: "Archivos añadidos: {count}",
      removed: "Archivo eliminado: {name}",
      cleared: "Se quitaron todos los archivos",
    },
  },
});

function rejectSpaces(file: File) {
  return file.name.includes(" ")
    ? t.value.noSpaces.replace("{name}", file.name)
    : null;
}

const uploader = ref<BaseFileUploadExposed | null>(null);

const buttonCode = `<BaseFileUpload
  v-model="contract"
  label="Signed contract"
  accept=".pdf"
  :max-size="2 * 1024 * 1024"
  required
/>

<BaseFileUpload
  v-model="avatar"
  label="Profile picture"
  accept="image/*"
  button-variant="primary"
  preview
/>`;

const dropzoneCode = `<BaseFileUpload
  v-model="attachments"
  variant="dropzone"
  label="Attachments"
  multiple
  accept="image/*,.pdf,.docx"
  :max-files="4"
  :max-size="5 * 1024 * 1024"
  preview
  clearable
  @reject="({ rejections }) => (lastRejections = rejections)"
/>`;

const customCode = `<BaseFileUpload
  v-model="photos"
  label="Gallery photos"
  multiple
  :append="false"
  :validator="(file) => (file.name.includes(' ') ? 'No spaces' : null)"
  size="md"
  block
/>

<BaseFileUpload
  v-model="documents"
  variant="dropzone"
  multiple
  icon="file"
  size="lg"
  list-max-height="12rem"
  :texts="{
    dropzoneTitleMultiple: 'Drop your documents',
    dropzoneActionMultiple: 'or browse your computer',
    remove: 'Remove {name}',
  }"
>
  <template #file-actions="{ file }">
    <BaseBadge :label="file.name.split('.').pop()" size="sm" />
  </template>
</BaseFileUpload>`;

const statesCode = `<BaseFileUpload v-model="files" label="Attached files" readonly />
<BaseFileUpload label="Disabled" variant="dropzone" disabled />
<BaseFileUpload label="Required document" error="Attach at least one document." />`;

const exposedCode = `<BaseFileUpload ref="uploader" v-model="files" multiple :show-restrictions="false" />
<BaseButton @click="uploader?.open()">Open picker</BaseButton>
<BaseButton variant="ghost" @click="uploader?.clear()">Clear</BaseButton>`;

const exposedFiles = ref<File[]>([]);
</script>

<template>
  <DemoSection
    id="base-file-upload"
    name="BaseFileUpload"
    :description="t.description"
  >
    <DemoExample :title="t.buttonTitle" :code="buttonCode">
      <div class="demo-grid demo-grid--two">
        <BaseFileUpload
          v-model="contract"
          :texts="t.texts"
          :label="t.contractLabel"
          :help="t.contractHelp"
          accept=".pdf"
          :max-size="2 * 1024 * 1024"
          required
        />
        <BaseFileUpload
          v-model="avatar"
          :texts="t.texts"
          :label="t.avatarLabel"
          accept="image/*"
          button-variant="primary"
          preview
        />
      </div>
    </DemoExample>

    <DemoExample :title="t.dropzoneTitle" :code="dropzoneCode">
      <div class="demo-stack">
        <BaseFileUpload
          v-model="attachments"
          :texts="t.texts"
          variant="dropzone"
          :label="t.attachmentsLabel"
          :info="t.attachmentsInfo"
          multiple
          accept="image/*,.pdf,.docx"
          :max-files="4"
          :max-size="5 * 1024 * 1024"
          preview
          clearable
          @reject="({ rejections }) => (lastRejections = rejections)"
        />
        <div v-if="lastRejections.length" class="demo-row demo-row--compact">
          <BaseBadge
            :label="`${t.rejectedCount}: ${lastRejections.length}`"
            tone="error"
            size="sm"
          />
        </div>
      </div>
    </DemoExample>

    <DemoExample :title="t.customTitle" :code="customCode">
      <div class="demo-grid demo-grid--two">
        <BaseFileUpload
          v-model="photos"
          :texts="t.texts"
          :label="t.photosLabel"
          multiple
          :append="false"
          :validator="rejectSpaces"
          size="md"
          block
        />
        <BaseFileUpload
          v-model="documents"
          variant="dropzone"
          :label="t.documentsLabel"
          multiple
          icon="file"
          size="lg"
          list-max-height="12rem"
          :texts="{
            ...t.texts,
            selectMultiple: t.selectDocuments,
            dropzoneTitleMultiple: t.dropTitle,
            dropzoneActionMultiple: t.dropAction,
            remove: t.removeDocument,
          }"
        >
          <template #file-actions="{ file }">
            <BaseBadge
              :label="(file.name.split('.').pop() || '').toUpperCase()"
              size="sm"
            />
          </template>
        </BaseFileUpload>
      </div>
    </DemoExample>

    <DemoExample :title="t.statesTitle" :code="statesCode">
      <div class="demo-grid demo-grid--three">
        <BaseFileUpload
          v-model="readonlyFiles"
          :label="t.readonlyLabel"
          :texts="t.texts"
          readonly
        />
        <BaseFileUpload
          :label="t.disabledLabel"
          :texts="t.texts"
          variant="dropzone"
          disabled
        />
        <BaseFileUpload
          :label="t.errorLabel"
          :error="t.errorMessage"
          :texts="t.texts"
        />
      </div>
    </DemoExample>

    <DemoExample :title="t.exposedTitle" :code="exposedCode">
      <div class="demo-stack">
        <div class="demo-row demo-row--compact">
          <BaseButton @click="uploader?.open()">{{ t.openPicker }}</BaseButton>
          <BaseButton variant="ghost" @click="uploader?.clear()">
            {{ t.clearAll }}
          </BaseButton>
        </div>
        <BaseFileUpload
          ref="uploader"
          :texts="t.texts"
          v-model="exposedFiles"
          multiple
          :show-restrictions="false"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
