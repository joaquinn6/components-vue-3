<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseRadio, BaseRadioGroup } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const notificationType = ref("email");
const groupedChannel = ref("email");
const shipping = ref("standard");

const t = useMessages({
  en: {
    description:
      "Group of mutually exclusive options (recommended) or individual radios for custom layouts.",
    groupTitle: "Group · options, orientation, bordered, error",
    radioTitle:
      "Individual radios · value, labelPosition (end by default), size",
    channel: "Notification channel",
    horizontal: "Horizontal, bordered, with error",
    channelError: "Select a channel to continue.",
    email: "Email",
    sms: "SMS",
    push: "Push unavailable",
    standard: "Standard shipping",
    express: "Express shipping",
  },
  es: {
    description:
      "Grupo de opciones excluyentes (recomendado) o radios individuales para layouts propios.",
    groupTitle: "Grupo · options, orientation, bordered, error",
    radioTitle:
      "Radios individuales · value, labelPosition (end por defecto), size",
    channel: "Canal de notificación",
    horizontal: "Horizontal, con borde y error",
    channelError: "Selecciona un canal para continuar.",
    email: "Correo electrónico",
    sms: "SMS",
    push: "Push no disponible",
    standard: "Envío estándar",
    express: "Envío exprés",
  },
});

const notificationOptions = computed(() => [
  { value: "email", label: t.value.email },
  { value: "sms", label: t.value.sms },
  { value: "push", label: t.value.push, disabled: true },
]);

const groupCode = `<BaseRadioGroup
  v-model="channel"
  name="notification-type"
  label="Notification channel"
  :options="[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push unavailable', disabled: true },
  ]"
/>

<BaseRadioGroup
  v-model="channel"
  name="notification-group"
  label="Horizontal, bordered, with error"
  :options="options"
  orientation="horizontal"
  bordered
  error="Select a channel to continue."
/>`;

const radioCode = `<BaseRadio
  id="shipping-standard"
  v-model="shipping"
  name="shipping"
  value="standard"
  label="Standard shipping"
/>
<BaseRadio
  id="shipping-express"
  v-model="shipping"
  name="shipping"
  value="express"
  label="Express shipping"
  size="md"
/>`;
</script>

<template>
  <DemoSection
    id="base-radio"
    name="BaseRadioGroup · BaseRadio"
    :description="t.description"
  >
    <DemoExample :title="t.groupTitle" :code="groupCode">
      <div class="demo-stack">
        <BaseRadioGroup
          id="radio-group-vertical"
          v-model="notificationType"
          name="notification-type"
          :label="t.channel"
          :options="notificationOptions"
        />
        <BaseRadioGroup
          id="radio-group-horizontal"
          v-model="groupedChannel"
          name="notification-group"
          :label="t.horizontal"
          :options="notificationOptions"
          orientation="horizontal"
          bordered
          :error="t.channelError"
        />
      </div>
    </DemoExample>

    <DemoExample :title="t.radioTitle" :code="radioCode">
      <div class="demo-row">
        <BaseRadio
          id="shipping-standard"
          v-model="shipping"
          name="shipping"
          value="standard"
          :label="t.standard"
        />
        <BaseRadio
          id="shipping-express"
          v-model="shipping"
          name="shipping"
          value="express"
          :label="t.express"
          size="md"
        />
      </div>
      <pre class="demo-model">shipping: {{ JSON.stringify(shipping) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
