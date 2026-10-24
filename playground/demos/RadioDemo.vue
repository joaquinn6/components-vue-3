<script setup lang="ts">
import { ref } from "vue";
import { BaseRadio, BaseRadioGroup } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const notificationType = ref("email");
const groupedChannel = ref("email");
const shipping = ref("standard");

const notificationOptions = [
  { value: "email", label: "Correo electrónico" },
  { value: "sms", label: "SMS" },
  { value: "push", label: "Push no disponible", disabled: true },
];

const groupCode = `<BaseRadioGroup
  v-model="channel"
  name="notification-type"
  label="Canal de notificación"
  :options="[
    { value: 'email', label: 'Correo electrónico' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push no disponible', disabled: true },
  ]"
/>

<BaseRadioGroup
  v-model="channel"
  name="notification-group"
  label="Horizontal, con borde y error"
  :options="options"
  orientation="horizontal"
  bordered
  error="Selecciona un canal para continuar."
/>`;

const radioCode = `<BaseRadio
  id="shipping-standard"
  v-model="shipping"
  name="shipping"
  value="standard"
  label="Envío estándar"
  label-position="end"
/>
<BaseRadio
  id="shipping-express"
  v-model="shipping"
  name="shipping"
  value="express"
  label="Envío exprés"
  label-position="end"
/>`;
</script>

<template>
  <DemoSection
    id="base-radio"
    name="BaseRadioGroup · BaseRadio"
    description="Grupo de opciones excluyentes (recomendado) o radios individuales para layouts propios."
  >
    <DemoExample
      title="Grupo · options, orientation, bordered, error"
      :code="groupCode"
    >
      <div class="demo-stack">
        <BaseRadioGroup
          id="radio-group-vertical"
          v-model="notificationType"
          name="notification-type"
          label="Canal de notificación"
          :options="notificationOptions"
        />
        <BaseRadioGroup
          id="radio-group-horizontal"
          v-model="groupedChannel"
          name="notification-group"
          label="Horizontal, con borde y error"
          :options="notificationOptions"
          orientation="horizontal"
          bordered
          error="Selecciona un canal para continuar."
        />
      </div>
    </DemoExample>

    <DemoExample
      title="Radios individuales · value, labelPosition"
      :code="radioCode"
    >
      <div class="demo-row">
        <BaseRadio
          id="shipping-standard"
          v-model="shipping"
          name="shipping"
          value="standard"
          label="Envío estándar"
          label-position="end"
        />
        <BaseRadio
          id="shipping-express"
          v-model="shipping"
          name="shipping"
          value="express"
          label="Envío exprés"
          label-position="end"
        />
      </div>
      <pre class="demo-model">shipping: {{ JSON.stringify(shipping) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
