<script setup lang="ts">
import { ref } from "vue";
import {
  BaseStepper,
  BaseText,
  type BaseStepperVariant,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const currentStep = ref("details");
const horizontalVariants: BaseStepperVariant[] = ["circles", "bars", "pills"];
const steps = [
  { value: "details", label: "Datos", description: "Información principal" },
  { value: "shipping", label: "Envío", description: "Método de entrega" },
  { value: "review", label: "Revisión", description: "Confirma los datos" },
  {
    value: "done",
    label: "Final",
    description: "Paso no disponible",
    disabled: true,
  },
];

const variantsCode = `<script setup>
import { ref } from "vue";

const currentStep = ref("details");
const steps = [
  { value: "details", label: "Datos", description: "Información principal" },
  { value: "shipping", label: "Envío", description: "Método de entrega" },
  { value: "review", label: "Revisión", description: "Confirma los datos" },
  { value: "done", label: "Final", description: "Paso no disponible", disabled: true },
];
<\/script>

<template>
  <BaseStepper v-model="currentStep" :steps="steps" variant="circles" navigable show-step-descriptions />
  <BaseStepper v-model="currentStep" :steps="steps" variant="bars" navigable show-step-descriptions />
  <BaseStepper v-model="currentStep" :steps="steps" variant="pills" navigable show-step-descriptions />
</template>`;

const verticalCode = `<BaseStepper
  v-model="currentStep"
  :steps="steps"
  variant="vertical"
  navigable
  description="Flujo de ejemplo con descripción inferior."
  description-position="bottom"
/>

<!-- Sin show-step-descriptions, cada descripción se muestra en un BaseFieldInfo -->`;
</script>

<template>
  <DemoSection
    id="base-stepper"
    name="BaseStepper"
    description="Progreso por pasos en cuatro variantes, con navegación opcional y descripciones."
  >
    <DemoExample
      title="Variantes horizontales · variant, navigable, showStepDescriptions"
      :code="variantsCode"
    >
      <div class="demo-stack demo-stack--loose">
        <div
          v-for="variant in horizontalVariants"
          :key="variant"
          class="demo-stack"
        >
          <BaseText variant="label" color="muted"
            >variant="{{ variant }}"</BaseText
          >
          <BaseStepper
            v-model="currentStep"
            :steps="steps"
            :variant="variant"
            navigable
            show-step-descriptions
            :aria-label="`Stepper ${variant}`"
          />
        </div>
      </div>
    </DemoExample>

    <DemoExample
      title="Vertical · description, descriptionPosition"
      :code="verticalCode"
    >
      <BaseStepper
        v-model="currentStep"
        :steps="steps"
        variant="vertical"
        navigable
        description="Flujo de ejemplo con descripción inferior."
        description-position="bottom"
        aria-label="Stepper vertical"
      />
    </DemoExample>
  </DemoSection>
</template>
