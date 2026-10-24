<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseCard, BaseIcon, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const lastAction = ref("Todavía no hay eventos registrados.");

function recordAction(message: string) {
  lastAction.value = `Último clic: ${message}`;
}

const tableActions = [
  {
    group: "Devoluciones",
    item: "DEV-2048",
    actions: [
      {
        icon: "eye",
        label: "Ver devolución DEV-2048",
        title: "Ver devolución",
        variant: "ghost",
      },
      {
        icon: "edit",
        label: "Editar devolución DEV-2048",
        title: "Editar devolución",
        variant: "ghost",
      },
    ],
  },
  {
    group: "Tiendas",
    item: "Tienda Managua",
    actions: [
      {
        icon: "eye",
        label: "Ver tienda Managua",
        title: "Ver tienda",
        variant: "ghost",
      },
      {
        icon: "settings",
        label: "Configurar tienda Managua",
        title: "Configurar tienda",
        variant: "ghost",
      },
    ],
  },
  {
    group: "Webhooks",
    item: "Pedidos creados",
    actions: [
      {
        icon: "eye",
        label: "Ver webhook de pedidos creados",
        title: "Ver webhook",
        variant: "ghost",
      },
      {
        icon: "trash",
        label: "Eliminar webhook de pedidos creados",
        title: "Eliminar webhook",
        variant: "danger",
      },
    ],
  },
] as const;

const variantsCode = `<BaseButton variant="primary">Primario</BaseButton>
<BaseButton variant="secondary">Secundario</BaseButton>
<BaseButton variant="outline">Outline</BaseButton>
<BaseButton variant="ghost">Ghost</BaseButton>
<BaseButton variant="danger">Eliminar</BaseButton>

<!-- inverse: sobre superficies invertidas -->
<BaseCard surface="inverse" padding="compact">
  <BaseButton variant="inverse">Botón inverso</BaseButton>
</BaseCard>`;

const sizesCode = `<BaseButton size="sm">Pequeño</BaseButton>
<BaseButton size="md">Mediano</BaseButton>
<BaseButton size="lg">Grande</BaseButton>
<BaseButton block>Ancho completo</BaseButton>`;

const statesCode = `<BaseButton loading>Cargando</BaseButton>
<BaseButton disabled>Deshabilitado</BaseButton>
<BaseButton type="submit">Enviar formulario</BaseButton>`;

const iconCode = `<!-- size="icon" requiere una etiqueta accesible -->
<BaseButton size="icon" variant="ghost" aria-label="Ver devolución DEV-2048" title="Ver devolución">
  <BaseIcon name="eye" size="sm" decorative />
</BaseButton>
<BaseButton size="icon" variant="danger" aria-label="Eliminar webhook" title="Eliminar webhook">
  <BaseIcon name="trash" size="sm" decorative />
</BaseButton>

<!-- Icono junto a texto -->
<BaseButton variant="secondary">
  <BaseIcon name="download" size="sm" decorative />
  Descargar
</BaseButton>`;
</script>

<template>
  <DemoSection
    id="base-button"
    name="BaseButton"
    description="Acción principal de la librería: variantes, tamaños, estados y botones solo con icono."
  >
    <DemoExample title="Variantes · variant" :code="variantsCode">
      <div class="demo-row">
        <BaseButton variant="primary" @click="recordAction('Primario')"
          >Primario</BaseButton
        >
        <BaseButton variant="secondary" @click="recordAction('Secundario')">
          Secundario
        </BaseButton>
        <BaseButton variant="outline" @click="recordAction('Outline')"
          >Outline</BaseButton
        >
        <BaseButton variant="ghost" @click="recordAction('Ghost')"
          >Ghost</BaseButton
        >
        <BaseButton variant="danger" @click="recordAction('Eliminar')"
          >Eliminar</BaseButton
        >
      </div>
      <BaseCard class="inverse-sample" surface="inverse" padding="compact">
        <BaseButton variant="inverse" @click="recordAction('Inverso')">
          Botón inverso
        </BaseButton>
      </BaseCard>
      <BaseText variant="sm" color="muted" aria-live="polite">{{
        lastAction
      }}</BaseText>
    </DemoExample>

    <DemoExample title="Tamaños · size, block" :code="sizesCode">
      <div class="demo-row">
        <BaseButton size="sm">Pequeño</BaseButton>
        <BaseButton size="md">Mediano</BaseButton>
        <BaseButton size="lg">Grande</BaseButton>
      </div>
      <BaseButton block>Ancho completo</BaseButton>
    </DemoExample>

    <DemoExample title="Estados · loading, disabled, type" :code="statesCode">
      <div class="demo-row">
        <BaseButton loading>Cargando</BaseButton>
        <BaseButton disabled>Deshabilitado</BaseButton>
        <BaseButton type="submit" @click="recordAction('Enviar formulario')">
          Enviar formulario
        </BaseButton>
      </div>
    </DemoExample>

    <DemoExample
      title='Con icono · size="icon"'
      description="Acciones compactas para columnas de tablas: devoluciones, tiendas y webhooks."
      :code="iconCode"
    >
      <div class="action-column-examples">
        <div
          v-for="example in tableActions"
          :key="example.group"
          class="action-column-example"
        >
          <BaseText variant="label" color="heading" weight="bold">{{
            example.group
          }}</BaseText>
          <div class="action-column-example__row">
            <span>{{ example.item }}</span>
            <div class="demo-row demo-row--compact">
              <BaseButton
                v-for="action in example.actions"
                :key="action.label"
                size="icon"
                :variant="action.variant"
                :aria-label="action.label"
                :title="action.title"
                @click="recordAction(action.label)"
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
          Descargar
        </BaseButton>
      </div>
    </DemoExample>
  </DemoSection>
</template>
