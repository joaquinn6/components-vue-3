<script setup lang="ts">
import { computed, ref } from "vue";
import {
  BaseStepper,
  BaseText,
  type BaseStepperVariant,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const currentStep = ref("details");
const horizontalVariants: BaseStepperVariant[] = ["circles", "bars", "pills"];

const t = useMessages({
  en: {
    description:
      "Step progress in four variants, with optional navigation and descriptions.",
    horizontalTitle:
      "Horizontal variants · variant, navigable, showStepDescriptions",
    verticalTitle: "Vertical · description, descriptionPosition",
    ariaLabel: (variant: string) => `Progress (${variant})`,
    stepInfo: "More information",
    flowDescription: "Sample flow with a description at the bottom.",
    details: "Details",
    detailsDescription: "Main information",
    shipping: "Shipping",
    shippingDescription: "Delivery method",
    review: "Review",
    reviewDescription: "Confirm the details",
    done: "Done",
    doneDescription: "Step unavailable",
  },
  es: {
    description:
      "Progreso por pasos en cuatro variantes, con navegación opcional y descripciones.",
    horizontalTitle:
      "Variantes horizontales · variant, navigable, showStepDescriptions",
    verticalTitle: "Vertical · description, descriptionPosition",
    ariaLabel: (variant) => `Progreso (${variant})`,
    stepInfo: "Información adicional",
    flowDescription: "Flujo de ejemplo con descripción inferior.",
    details: "Datos",
    detailsDescription: "Información principal",
    shipping: "Envío",
    shippingDescription: "Método de entrega",
    review: "Revisión",
    reviewDescription: "Confirma los datos",
    done: "Final",
    doneDescription: "Paso no disponible",
  },
});

const steps = computed(() => [
  {
    value: "details",
    label: t.value.details,
    description: t.value.detailsDescription,
  },
  {
    value: "shipping",
    label: t.value.shipping,
    description: t.value.shippingDescription,
  },
  {
    value: "review",
    label: t.value.review,
    description: t.value.reviewDescription,
  },
  {
    value: "done",
    label: t.value.done,
    description: t.value.doneDescription,
    disabled: true,
  },
]);

const variantsCode = `<script setup>
import { ref } from "vue";

const currentStep = ref("details");
const steps = [
  { value: "details", label: "Details", description: "Main information" },
  { value: "shipping", label: "Shipping", description: "Delivery method" },
  { value: "review", label: "Review", description: "Confirm the details" },
  { value: "done", label: "Done", description: "Step unavailable", disabled: true },
];
<\/script>

<template>
  <BaseStepper v-model="currentStep" :steps="steps" variant="circles" navigable show-step-descriptions aria-label="Progress" />
  <BaseStepper v-model="currentStep" :steps="steps" variant="bars" navigable show-step-descriptions aria-label="Progress" />
  <BaseStepper v-model="currentStep" :steps="steps" variant="pills" navigable show-step-descriptions aria-label="Progress" />
</template>`;

const verticalCode = `<BaseStepper
  v-model="currentStep"
  :steps="steps"
  variant="vertical"
  navigable
  description="Sample flow with a description at the bottom."
  description-position="bottom"
  aria-label="Progress"
  step-description-aria-label="More information"
/>

<!-- Without show-step-descriptions, each description is shown in a BaseFieldInfo -->`;
</script>

<template>
  <DemoSection
    id="base-stepper"
    name="BaseStepper"
    :description="t.description"
  >
    <DemoExample :title="t.horizontalTitle" :code="variantsCode">
      <div class="demo-stack demo-stack--loose">
        <div
          v-for="variant in horizontalVariants"
          :key="variant"
          class="demo-stack"
        >
          <BaseText variant="label" color="muted">
            variant="{{ variant }}"
          </BaseText>
          <BaseStepper
            v-model="currentStep"
            :steps="steps"
            :variant="variant"
            navigable
            show-step-descriptions
            :aria-label="t.ariaLabel(variant)"
            :step-description-aria-label="t.stepInfo"
          />
        </div>
      </div>
    </DemoExample>

    <DemoExample :title="t.verticalTitle" :code="verticalCode">
      <BaseStepper
        v-model="currentStep"
        :steps="steps"
        variant="vertical"
        navigable
        :description="t.flowDescription"
        description-position="bottom"
        :aria-label="t.ariaLabel('vertical')"
        :step-description-aria-label="t.stepInfo"
      />
    </DemoExample>
  </DemoSection>
</template>
