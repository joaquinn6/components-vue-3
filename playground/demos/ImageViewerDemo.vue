<script setup lang="ts">
import { computed, ref } from "vue";
import {
  BaseButton,
  BaseImageLightbox,
  BaseImageViewer,
  BaseText,
} from "../../src/index";
import type { BaseImageViewerRadius } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const dogImage = new URL("../assets/golden-retriever.jpg", import.meta.url)
  .href;

const radii: BaseImageViewerRadius[] = ["none", "sm", "md", "lg", "full"];
const sizes = ["sm", "md", "lg"] as const;

const lastEvent = ref("");
const lightboxOpen = ref(false);

const t = useMessages({
  en: {
    description:
      "Image viewer with a thumbnail and a full-width version, hover actions and an enlarged view with zoom, download and copy.",
    thumbnailsTitle: "Thumbnails · variant, radius, thumbnailSize, bordered",
    thumbnailsHint: "Click a thumbnail to open the viewer.",
    borderedHint: "With bordered: border in the primary color.",
    alt: "Golden retriever lying on the grass",
    actionsTitle: "Hover actions · actions, edit, delete, download",
    actionsHint:
      "Hover over or tab into the image to see the actions. Edit and delete only emit events.",
    noEvent: "No events yet.",
    eventLabel: (name: string) => `Last event: ${name}`,
    ratioTitle:
      "Aspect ratio and viewer · aspectRatio, bordered, caption, copyable",
    caption: "Golden retriever · 1,200 × 800",
    customTitle:
      "Custom texts and standalone lightbox · texts, BaseImageLightbox",
    openLightbox: "Open standalone lightbox",
    texts: {
      edit: "Change photo",
      delete: "Remove photo",
      expand: "Enlarge photo",
      download: "Save photo",
      open: "Enlarge photo",
      actionsLabel: "Photo actions",
      loadError: "The photo could not be loaded",
      dialogLabel: "Photo viewer",
      close: "Close viewer",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      resetZoom: "Reset zoom",
      zoomLevel: "Zoom level",
      copy: "Copy photo",
      copied: "Photo copied",
      copyError: "The photo could not be copied",
      downloadError: "The photo could not be downloaded",
    },
  },
  es: {
    description:
      "Visor de imágenes con miniatura y versión a ancho completo, acciones al pasar el puntero y vista ampliada con zoom, descarga y copia.",
    thumbnailsTitle: "Miniaturas · variant, radius, thumbnailSize, bordered",
    thumbnailsHint: "Haz click en una miniatura para abrir el visor.",
    borderedHint: "Con bordered: borde del color principal.",
    alt: "Golden retriever acostado en el césped",
    actionsTitle:
      "Acciones al pasar el puntero · actions, edit, delete, download",
    actionsHint:
      "Pasa el puntero o navega con Tab sobre la imagen para ver las acciones. Editar y eliminar solo emiten eventos.",
    noEvent: "Todavía no hay eventos.",
    eventLabel: (name: string) => `Último evento: ${name}`,
    ratioTitle:
      "Relación de aspecto y visor · aspectRatio, bordered, caption, copyable",
    caption: "Golden retriever · 1200 × 800",
    customTitle:
      "Textos personalizados y visor independiente · texts, BaseImageLightbox",
    openLightbox: "Abrir visor independiente",
    texts: {
      edit: "Cambiar foto",
      delete: "Quitar foto",
      expand: "Ampliar foto",
      download: "Guardar foto",
      open: "Ampliar foto",
      actionsLabel: "Acciones de la foto",
      loadError: "No se pudo cargar la foto",
      dialogLabel: "Visor de fotos",
      close: "Cerrar visor",
      zoomIn: "Acercar",
      zoomOut: "Alejar",
      resetZoom: "Restablecer zoom",
      zoomLevel: "Nivel de zoom",
      copy: "Copiar foto",
      copied: "Foto copiada",
      copyError: "No se pudo copiar la foto",
      downloadError: "No se pudo descargar la foto",
    },
  },
});

const eventText = computed(() =>
  lastEvent.value ? t.value.eventLabel(lastEvent.value) : t.value.noEvent,
);

function logEvent(name: string) {
  lastEvent.value = name;
}

const thumbnailsCode = `<BaseImageViewer
  variant="thumbnail"
  :src="dog"
  alt="Golden retriever"
  radius="full"
  thumbnail-size="lg"
/>

<BaseImageViewer variant="thumbnail" :src="dog" alt="Golden retriever" bordered />`;

const actionsCode = `<BaseImageViewer
  :src="dog"
  alt="Golden retriever"
  :actions="['edit', 'delete', 'expand', 'download']"
  download-name="golden-retriever.jpg"
  @edit="onEdit"
  @delete="onDelete"
/>`;

const ratioCode = `<BaseImageViewer
  :src="dog"
  alt="Golden retriever"
  aspect-ratio="16 / 9"
  radius="lg"
  bordered
  caption="Golden retriever · 1,200 × 800"
  copyable
  :max-zoom="6"
/>`;

const customCode = `<BaseImageViewer
  :src="dog"
  alt="Golden retriever"
  :actions="['expand', 'download']"
  :texts="{ expand: 'Enlarge photo', download: 'Save photo' }"
/>

<BaseButton @click="open = true">Open standalone lightbox</BaseButton>
<BaseImageLightbox v-model:open="open" :src="dog" alt="Golden retriever" copyable />`;
</script>

<template>
  <DemoSection
    id="base-image-viewer"
    name="BaseImageViewer · BaseImageLightbox"
    :description="t.description"
  >
    <DemoExample :title="t.thumbnailsTitle" :code="thumbnailsCode">
      <div class="demo-stack">
        <BaseText variant="sm" color="muted">{{ t.thumbnailsHint }}</BaseText>
        <div v-for="size in sizes" :key="size" class="image-demo__row">
          <BaseImageViewer
            v-for="radius in radii"
            :key="radius"
            variant="thumbnail"
            :src="dogImage"
            :alt="t.alt"
            :radius="radius"
            :thumbnail-size="size"
            :texts="t.texts"
            download-name="golden-retriever.jpg"
          />
        </div>
        <BaseText variant="sm" color="muted">{{ t.borderedHint }}</BaseText>
        <div class="image-demo__row">
          <BaseImageViewer
            v-for="radius in radii"
            :key="radius"
            variant="thumbnail"
            :src="dogImage"
            :alt="t.alt"
            :radius="radius"
            bordered
            :texts="t.texts"
            download-name="golden-retriever.jpg"
          />
        </div>
      </div>
    </DemoExample>

    <DemoExample :title="t.actionsTitle" :code="actionsCode">
      <div class="demo-stack">
        <BaseText variant="sm" color="muted">{{ t.actionsHint }}</BaseText>
        <div class="image-demo__frame">
          <BaseImageViewer
            :src="dogImage"
            :alt="t.alt"
            :actions="['edit', 'delete', 'expand', 'download']"
            :texts="t.texts"
            download-name="golden-retriever.jpg"
            @edit="logEvent('edit')"
            @delete="logEvent('delete')"
            @download="logEvent('download')"
            @open="logEvent('open')"
            @close="logEvent('close')"
          />
        </div>
        <BaseText variant="sm" aria-live="polite">{{ eventText }}</BaseText>
      </div>
    </DemoExample>

    <DemoExample :title="t.ratioTitle" :code="ratioCode">
      <BaseImageViewer
        :src="dogImage"
        :alt="t.alt"
        aspect-ratio="16 / 9"
        radius="lg"
        bordered
        :caption="t.caption"
        :texts="t.texts"
        copyable
        :max-zoom="6"
        download-name="golden-retriever.jpg"
      />
    </DemoExample>

    <DemoExample :title="t.customTitle" :code="customCode">
      <div class="demo-grid demo-grid--two">
        <BaseImageViewer
          :src="dogImage"
          :alt="t.alt"
          radius="sm"
          :actions="['expand', 'download']"
          :texts="t.texts"
          download-name="golden-retriever.jpg"
        />
        <div class="demo-stack">
          <BaseButton variant="secondary" @click="lightboxOpen = true">
            {{ t.openLightbox }}
          </BaseButton>
        </div>
      </div>
      <BaseImageLightbox
        v-model:open="lightboxOpen"
        :src="dogImage"
        :alt="t.alt"
        :caption="t.caption"
        :texts="t.texts"
        copyable
        download-name="golden-retriever.jpg"
      />
    </DemoExample>
  </DemoSection>
</template>

<style scoped>
.image-demo__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
}

.image-demo__frame {
  max-width: 32rem;
}
</style>
