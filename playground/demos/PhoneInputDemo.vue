<script setup lang="ts">
import { ref } from "vue";
import { BasePhoneInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const phone = ref("+34612345678");
const phoneCountries = [
  { name: "España", prefix: "+34", iso2: "ES", flag: "🇪🇸" },
  { name: "Nicaragua", prefix: "+505", iso2: "NI", flag: "🇳🇮" },
  { name: "Estados Unidos", prefix: "+1", iso2: "US", flag: "🇺🇸" },
];

const code = `<script setup>
import { ref } from "vue";

const phone = ref("+34612345678");
const countries = [
  { name: "España", prefix: "+34", iso2: "ES", flag: "🇪🇸" },
  { name: "Nicaragua", prefix: "+505", iso2: "NI", flag: "🇳🇮" },
  { name: "Estados Unidos", prefix: "+1", iso2: "US", flag: "🇺🇸" },
];
<\/script>

<template>
  <BasePhoneInput
    v-model="phone"
    label="Teléfono"
    :countries="countries"
    country-selector-aria-label="Seleccionar país del teléfono"
    help="Busca el país por nombre o prefijo."
  />
</template>`;
</script>

<template>
  <DemoSection
    id="base-phone-input"
    name="BasePhoneInput"
    description="Teléfono con selector de país buscable; el modelo incluye el prefijo internacional."
  >
    <DemoExample title="Países · countries, v-model" :code="code">
      <BasePhoneInput
        id="phone-example"
        v-model="phone"
        label="Teléfono"
        :countries="phoneCountries"
        country-selector-aria-label="Seleccionar país del teléfono"
        help="Busca el país por nombre o prefijo."
      />
      <pre class="demo-model">phone: {{ JSON.stringify(phone) }}</pre>
    </DemoExample>
  </DemoSection>
</template>
