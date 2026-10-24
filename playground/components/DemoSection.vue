<script setup lang="ts">
import { computed } from "vue";
import { BaseHeading, BaseText } from "../../src/index";
import { displayName } from "../demos/displayName";

const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
});

const title = computed(() => displayName(props.name));
</script>

<template>
  <section :id="id" class="demo-section" :aria-labelledby="`${id}-title`">
    <header class="demo-section__header">
      <BaseHeading :id="`${id}-title`" as="h2" variant="lg">
        {{ title }}
      </BaseHeading>
      <BaseText v-if="description" color="muted">{{ description }}</BaseText>
    </header>
    <slot />
  </section>
</template>
