<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { BaseButton, BaseIcon } from "../../src/index";

const props = defineProps({
  code: { type: String, required: true },
  label: { type: String, default: "Código del ejemplo" },
});

const status = ref("");
let resetTimer: ReturnType<typeof setTimeout> | undefined;

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code);
    status.value = "Código copiado";
  } catch {
    status.value = "No se pudo copiar el código";
  }

  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    status.value = "";
  }, 2000);
}

onUnmounted(() => clearTimeout(resetTimer));
</script>

<template>
  <div class="code-block">
    <div class="code-block__toolbar">
      <span class="code-block__label">{{ label }}</span>
      <span class="code-block__status" aria-live="polite">{{ status }}</span>
      <BaseButton variant="ghost" size="sm" type="button" @click="copyCode">
        <BaseIcon :name="status ? 'check' : 'clipboard'" size="sm" decorative />
        Copiar
      </BaseButton>
    </div>
    <pre class="code-block__pre"><code>{{ code }}</code></pre>
  </div>
</template>
