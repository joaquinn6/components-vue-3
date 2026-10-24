<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { BaseInput, BaseText } from "../../src/index";
import { displayName } from "../demos/displayName";
import type { DemoEntry } from "../demos/registry";

const props = defineProps({
  items: { type: Array as PropType<readonly DemoEntry[]>, required: true },
  activeId: { type: String, default: "" },
});

const emit = defineEmits<{ navigate: [id: string] }>();

const query = ref("");

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
}

const groups = computed(() => {
  const term = normalize(query.value);
  const result: { category: string; items: DemoEntry[] }[] = [];

  props.items.forEach((item) => {
    const matches =
      !term ||
      normalize(item.name).includes(term) ||
      normalize(item.category).includes(term);
    if (!matches) return;

    let group = result.find((entry) => entry.category === item.category);
    if (!group) {
      group = { category: item.category, items: [] };
      result.push(group);
    }
    group.items.push(item);
  });

  return result;
});
</script>

<template>
  <nav class="playground-nav" aria-label="Índice de componentes">
    <div class="playground-nav__search" role="search">
      <BaseInput
        id="playground-nav-search"
        v-model="query"
        label="Buscar componente"
        placeholder="Ej. button, fecha…"
        type="search"
        size="sm"
      />
    </div>

    <div
      v-for="group in groups"
      :key="group.category"
      class="playground-nav__group"
    >
      <BaseText as="span" variant="label" color="muted" weight="bold">
        {{ group.category }}
      </BaseText>
      <ul class="playground-nav__list">
        <li v-for="item in group.items" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="playground-nav__link"
            :class="{ 'playground-nav__link--active': item.id === activeId }"
            :aria-current="item.id === activeId ? 'location' : undefined"
            @click="emit('navigate', item.id)"
          >
            {{ displayName(item.name) }}
          </a>
        </li>
      </ul>
    </div>

    <BaseText
      v-if="!groups.length"
      variant="sm"
      color="muted"
      aria-live="polite"
    >
      No hay componentes que coincidan con «{{ query }}».
    </BaseText>
  </nav>
</template>
