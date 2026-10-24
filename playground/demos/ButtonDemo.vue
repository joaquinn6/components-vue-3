<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseCard, BaseIcon, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const t = useMessages({
  en: {
    description:
      "The library's main action: variants, sizes, states and icon-only buttons.",
    variantsTitle: "Variants · variant",
    sizesTitle: "Sizes · size, block",
    statesTitle: "States · loading, disabled, type",
    iconTitle: 'With icon · size="icon"',
    iconDescription:
      "Compact actions for table columns: returns, stores and webhooks.",
    noEvents: "No events recorded yet.",
    lastClick: (label: string) => `Last click: ${label}`,
    primary: "Primary",
    secondary: "Secondary",
    outline: "Outline",
    ghost: "Ghost",
    delete: "Delete",
    ghostDanger: "Remove",
    inverse: "Inverse button",
    small: "Small",
    medium: "Medium",
    large: "Large",
    fullWidth: "Full width",
    loading: "Loading",
    disabled: "Disabled",
    submit: "Submit form",
    download: "Download",
    returns: "Returns",
    stores: "Stores",
    webhooks: "Webhooks",
    storeName: "Managua store",
    webhookName: "Orders created",
    viewReturn: "View return",
    editReturn: "Edit return",
    viewStore: "View store",
    configureStore: "Configure store",
    viewWebhook: "View webhook",
    deleteWebhook: "Delete webhook",
  },
  es: {
    description:
      "Acción principal de la librería: variantes, tamaños, estados y botones solo con icono.",
    variantsTitle: "Variantes · variant",
    sizesTitle: "Tamaños · size, block",
    statesTitle: "Estados · loading, disabled, type",
    iconTitle: 'Con icono · size="icon"',
    iconDescription:
      "Acciones compactas para columnas de tablas: devoluciones, tiendas y webhooks.",
    noEvents: "Todavía no hay eventos registrados.",
    lastClick: (label) => `Último clic: ${label}`,
    primary: "Primario",
    secondary: "Secundario",
    outline: "Outline",
    ghost: "Ghost",
    delete: "Eliminar",
    ghostDanger: "Quitar",
    inverse: "Botón inverso",
    small: "Pequeño",
    medium: "Mediano",
    large: "Grande",
    fullWidth: "Ancho completo",
    loading: "Cargando",
    disabled: "Deshabilitado",
    submit: "Enviar formulario",
    download: "Descargar",
    returns: "Devoluciones",
    stores: "Tiendas",
    webhooks: "Webhooks",
    storeName: "Tienda Managua",
    webhookName: "Pedidos creados",
    viewReturn: "Ver devolución",
    editReturn: "Editar devolución",
    viewStore: "Ver tienda",
    configureStore: "Configurar tienda",
    viewWebhook: "Ver webhook",
    deleteWebhook: "Eliminar webhook",
  },
});

const lastClick = ref("");

function recordAction(label: string) {
  lastClick.value = label;
}

const tableActions = [
  {
    group: "returns",
    item: () => "DEV-2048",
    actions: [
      { icon: "eye", key: "viewReturn", variant: "ghost" },
      { icon: "edit", key: "editReturn", variant: "ghost" },
    ],
  },
  {
    group: "stores",
    item: () => t.value.storeName,
    actions: [
      { icon: "eye", key: "viewStore", variant: "ghost" },
      { icon: "settings", key: "configureStore", variant: "ghost" },
    ],
  },
  {
    group: "webhooks",
    item: () => t.value.webhookName,
    actions: [
      { icon: "eye", key: "viewWebhook", variant: "ghost" },
      { icon: "trash", key: "deleteWebhook", variant: "danger" },
    ],
  },
] as const;

const variantsCode = `<BaseButton variant="primary">Primary</BaseButton>
<BaseButton variant="secondary">Secondary</BaseButton>
<BaseButton variant="outline">Outline</BaseButton>
<BaseButton variant="ghost">Ghost</BaseButton>
<BaseButton variant="danger">Delete</BaseButton>
<BaseButton variant="ghost-danger">Remove</BaseButton>

<!-- inverse: on inverted surfaces -->
<BaseCard surface="inverse" padding="compact">
  <BaseButton variant="inverse">Inverse button</BaseButton>
</BaseCard>`;

const sizesCode = `<BaseButton size="sm">Small</BaseButton>
<BaseButton size="md">Medium</BaseButton>
<BaseButton size="lg">Large</BaseButton>
<BaseButton block>Full width</BaseButton>`;

const statesCode = `<BaseButton loading>Loading</BaseButton>
<BaseButton disabled>Disabled</BaseButton>
<BaseButton type="submit">Submit form</BaseButton>`;

const iconCode = `<!-- size="icon" requires an accessible label -->
<BaseButton size="icon" variant="ghost" aria-label="View return DEV-2048" title="View return">
  <BaseIcon name="eye" size="sm" decorative />
</BaseButton>
<BaseButton size="icon" variant="danger" aria-label="Delete webhook" title="Delete webhook">
  <BaseIcon name="trash" size="sm" decorative />
</BaseButton>

<!-- Icon next to text -->
<BaseButton variant="secondary">
  <BaseIcon name="download" size="sm" decorative />
  Download
</BaseButton>`;
</script>

<template>
  <DemoSection id="base-button" name="BaseButton" :description="t.description">
    <DemoExample :title="t.variantsTitle" :code="variantsCode">
      <div class="demo-row">
        <BaseButton variant="primary" @click="recordAction(t.primary)">
          {{ t.primary }}
        </BaseButton>
        <BaseButton variant="secondary" @click="recordAction(t.secondary)">
          {{ t.secondary }}
        </BaseButton>
        <BaseButton variant="outline" @click="recordAction(t.outline)">
          {{ t.outline }}
        </BaseButton>
        <BaseButton variant="ghost" @click="recordAction(t.ghost)">
          {{ t.ghost }}
        </BaseButton>
        <BaseButton variant="danger" @click="recordAction(t.delete)">
          {{ t.delete }}
        </BaseButton>
        <BaseButton variant="ghost-danger" @click="recordAction(t.ghostDanger)">
          {{ t.ghostDanger }}
        </BaseButton>
      </div>
      <BaseCard class="inverse-sample" surface="inverse" padding="compact">
        <BaseButton variant="inverse" @click="recordAction(t.inverse)">
          {{ t.inverse }}
        </BaseButton>
      </BaseCard>
      <BaseText variant="sm" color="muted" aria-live="polite">
        {{ lastClick ? t.lastClick(lastClick) : t.noEvents }}
      </BaseText>
    </DemoExample>

    <DemoExample :title="t.sizesTitle" :code="sizesCode">
      <div class="demo-row">
        <BaseButton size="sm">{{ t.small }}</BaseButton>
        <BaseButton size="md">{{ t.medium }}</BaseButton>
        <BaseButton size="lg">{{ t.large }}</BaseButton>
      </div>
      <BaseButton block>{{ t.fullWidth }}</BaseButton>
    </DemoExample>

    <DemoExample :title="t.statesTitle" :code="statesCode">
      <div class="demo-row">
        <BaseButton loading>{{ t.loading }}</BaseButton>
        <BaseButton disabled>{{ t.disabled }}</BaseButton>
        <BaseButton type="submit" @click="recordAction(t.submit)">
          {{ t.submit }}
        </BaseButton>
      </div>
    </DemoExample>

    <DemoExample
      :title="t.iconTitle"
      :description="t.iconDescription"
      :code="iconCode"
    >
      <div class="action-column-examples">
        <div
          v-for="example in tableActions"
          :key="example.group"
          class="action-column-example"
        >
          <BaseText variant="label" color="heading" weight="bold">
            {{ t[example.group] }}
          </BaseText>
          <div class="action-column-example__row">
            <span>{{ example.item() }}</span>
            <div class="demo-row demo-row--compact">
              <BaseButton
                v-for="action in example.actions"
                :key="action.key"
                size="icon"
                :variant="action.variant"
                :aria-label="`${t[action.key]} ${example.item()}`"
                :title="t[action.key]"
                @click="recordAction(`${t[action.key]} ${example.item()}`)"
              >
                <BaseIcon :name="action.icon" size="sm" decorative />
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-row">
        <BaseButton variant="secondary">
          <BaseIcon name="download" size="sm" decorative />
          {{ t.download }}
        </BaseButton>
      </div>
    </DemoExample>
  </DemoSection>
</template>
