<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { BaseInput, BaseText } from "../../src/index";
import { displayName } from "../demos/displayName";
import type { DemoEntry } from "../demos/registry";
import { useUiMessages } from "../i18n/ui";

const props = defineProps({
  items: { type: Array as PropType<readonly DemoEntry[]>, required: true },
  activeId: { type: String, default: "" },
});

const emit = defineEmits<{ navigate: [id: string] }>();

const ui = useUiMessages();
const query = ref("");

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
}

const groups = computed(() => {
  const term = normalize(query.value);
  const result: { category: string; label: string; items: DemoEntry[] }[] = [];

  props.items.forEach((item) => {
    const label = ui.value.categories[item.category];
    const matches =
      !term ||
      normalize(item.name).includes(term) ||
      normalize(label).includes(term);
    if (!matches) return;

    let group = result.find((entry) => entry.category === item.category);
    if (!group) {
      group = { category: item.category, label, items: [] };
      result.push(group);
    }
    group.items.push(item);
  });

  return result;
});
</script>

<template>
  <nav class="playground-nav" :aria-label="ui.indexNavLabel">
    <div class="playground-nav__search" role="search">
      <BaseInput
        id="playground-nav-search"
        v-model="query"
        :label="ui.searchLabel"
        :placeholder="ui.searchPlaceholder"
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
        {{ group.label }}
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
      {{ ui.noMatches(query) }}
    </BaseText>
  </nav>
</template>
