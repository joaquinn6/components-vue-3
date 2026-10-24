<script setup lang="ts">
import { BaseCard, BaseHeading, BaseText } from "../../src/index";
import CodeBlock from "./CodeBlock.vue";

defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  code: { type: String, required: true },
});
</script>

<template>
  <div class="demo-example">
    <div class="demo-example__header">
      <BaseHeading as="h3" variant="sm">{{ title }}</BaseHeading>
      <BaseText v-if="description" variant="sm" color="muted">
        {{ description }}
      </BaseText>
    </div>
    <BaseCard class="demo-example__preview" padding="comfortable" outlined>
      <slot />
    </BaseCard>
    <CodeBlock :code="code" />
  </div>
</template>
