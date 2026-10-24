<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { BaseButton, BaseIcon } from "../../src/index";
import { useUiMessages } from "../i18n/ui";

const props = defineProps({
  code: { type: String, required: true },
});

const ui = useUiMessages();
const copied = ref<boolean | null>(null);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
  } catch {
    copied.value = false;
  }

  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    copied.value = null;
  }, 2000);
}

onUnmounted(() => clearTimeout(resetTimer));
</script>

<template>
  <div class="code-block">
    <div class="code-block__toolbar">
      <span class="code-block__label">{{ ui.codeLabel }}</span>
      <span class="code-block__status" aria-live="polite">
        {{ copied === null ? "" : copied ? ui.copied : ui.copyFailed }}
      </span>
      <BaseButton variant="ghost" size="sm" type="button" @click="copyCode">
        <BaseIcon :name="copied ? 'check' : 'clipboard'" size="sm" decorative />
        {{ ui.copy }}
      </BaseButton>
    </div>
    <pre class="code-block__pre"><code>{{ code }}</code></pre>
  </div>
</template>
