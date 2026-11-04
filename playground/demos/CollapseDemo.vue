<script setup lang="ts">
import { ref } from "vue";
import {
  BaseBadge,
  BaseButton,
  BaseCollapse,
  BaseCollapseGroup,
  BaseInput,
  BaseText,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const plainOpen = ref(true);
const activeStep = ref<string | number | (string | number)[] | null>(
  "shipping",
);
const openFaqs = ref<string | number | (string | number)[] | null>(["returns"]);

const t = useMessages({
  en: {
    description:
      "Collapsible section with a plain or card design. Combine several in BaseCollapseGroup to build an accordion.",
    singleTitle: "Single section · v-model:open, variant, description, icon",
    plainTitle: "Order notes",
    plainDescription: "Plain design: no card, divider line only.",
    plainContent:
      "Notes are visible to the whole team and are included in the delivery receipt.",
    cardTitle: "Sender details",
    cardDescription: "Card design with an action in the header.",
    fullName: "Full name",
    badge: "Required",
    edit: "Edit",
    groupTitle: "Accordion · BaseCollapseGroup, variant card, one open",
    shipping: "Shipping",
    shippingContent: "Standard shipping takes 2 to 4 business days.",
    payment: "Payment",
    paymentContent: "Card, transfer or cash on delivery.",
    invoice: "Invoice",
    invoiceContent: "The invoice is sent by email after payment.",
    multipleTitle: "Multiple · multiple, plain variant, disabled item",
    returns: "Returns",
    returnsContent: "You have 30 days to return a product.",
    warranty: "Warranty",
    warrantyContent: "All products include a 12-month warranty.",
    unavailable: "Unavailable section",
    unavailableContent: "This content is not available.",
  },
  es: {
    description:
      "Sección colapsable con diseño sin card o con card. Combina varias en BaseCollapseGroup para formar un acordeón.",
    singleTitle:
      "Sección individual · v-model:open, variant, description, icon",
    plainTitle: "Notas del pedido",
    plainDescription: "Diseño sin card: solo línea divisoria.",
    plainContent:
      "Las notas son visibles para todo el equipo y se incluyen en el comprobante de entrega.",
    cardTitle: "Datos del remitente",
    cardDescription: "Diseño con card y una acción en la cabecera.",
    fullName: "Nombre completo",
    badge: "Obligatorio",
    edit: "Editar",
    groupTitle: "Acordeón · BaseCollapseGroup, variant card, uno abierto",
    shipping: "Envío",
    shippingContent: "El envío estándar tarda de 2 a 4 días hábiles.",
    payment: "Pago",
    paymentContent: "Tarjeta, transferencia o pago contra entrega.",
    invoice: "Factura",
    invoiceContent: "La factura se envía por correo después del pago.",
    multipleTitle: "Múltiple · multiple, variant plain, ítem deshabilitado",
    returns: "Devoluciones",
    returnsContent: "Tienes 30 días para devolver un producto.",
    warranty: "Garantía",
    warrantyContent: "Todos los productos incluyen 12 meses de garantía.",
    unavailable: "Sección no disponible",
    unavailableContent: "Este contenido no está disponible.",
  },
});

const singleCode = `<BaseCollapse
  v-model:open="open"
  title="Order notes"
  description="Plain design: no card, divider line only."
>
  <BaseText>Notes are visible to the whole team…</BaseText>
</BaseCollapse>

<BaseCollapse variant="card" title="Sender details" icon="location">
  <template #actions>
    <BaseBadge label="Required" tone="info" size="sm" />
  </template>
  <BaseInput label="Full name" />
</BaseCollapse>`;

const groupCode = `<BaseCollapseGroup v-model="active" variant="card">
  <BaseCollapse value="shipping" title="Shipping">…</BaseCollapse>
  <BaseCollapse value="payment" title="Payment">…</BaseCollapse>
  <BaseCollapse value="invoice" title="Invoice">…</BaseCollapse>
</BaseCollapseGroup>`;

const multipleCode = `<BaseCollapseGroup v-model="openItems" multiple>
  <BaseCollapse value="returns" title="Returns">…</BaseCollapse>
  <BaseCollapse value="warranty" title="Warranty">…</BaseCollapse>
  <BaseCollapse value="unavailable" title="Unavailable section" disabled>…</BaseCollapse>
</BaseCollapseGroup>`;
</script>

<template>
  <DemoSection
    id="base-collapse"
    name="BaseCollapse"
    :description="t.description"
  >
    <DemoExample :title="t.singleTitle" :code="singleCode">
      <div class="demo-stack">
        <BaseCollapse
          v-model:open="plainOpen"
          :title="t.plainTitle"
          :description="t.plainDescription"
        >
          <BaseText>{{ t.plainContent }}</BaseText>
        </BaseCollapse>
        <BaseCollapse
          variant="card"
          :title="t.cardTitle"
          :description="t.cardDescription"
          icon="location"
        >
          <template #actions>
            <BaseBadge :label="t.badge" tone="info" size="sm" />
            <BaseButton variant="ghost" size="sm">{{ t.edit }}</BaseButton>
          </template>
          <BaseInput :label="t.fullName" />
        </BaseCollapse>
      </div>
    </DemoExample>

    <DemoExample :title="t.groupTitle" :code="groupCode">
      <BaseCollapseGroup v-model="activeStep" variant="card">
        <BaseCollapse value="shipping" :title="t.shipping">
          <BaseText>{{ t.shippingContent }}</BaseText>
        </BaseCollapse>
        <BaseCollapse value="payment" :title="t.payment">
          <BaseText>{{ t.paymentContent }}</BaseText>
        </BaseCollapse>
        <BaseCollapse value="invoice" :title="t.invoice">
          <BaseText>{{ t.invoiceContent }}</BaseText>
        </BaseCollapse>
      </BaseCollapseGroup>
    </DemoExample>

    <DemoExample :title="t.multipleTitle" :code="multipleCode">
      <BaseCollapseGroup v-model="openFaqs" multiple>
        <BaseCollapse value="returns" :title="t.returns">
          <BaseText>{{ t.returnsContent }}</BaseText>
        </BaseCollapse>
        <BaseCollapse value="warranty" :title="t.warranty">
          <BaseText>{{ t.warrantyContent }}</BaseText>
        </BaseCollapse>
        <BaseCollapse value="unavailable" :title="t.unavailable" disabled>
          <BaseText>{{ t.unavailableContent }}</BaseText>
        </BaseCollapse>
      </BaseCollapseGroup>
    </DemoExample>
  </DemoSection>
</template>
