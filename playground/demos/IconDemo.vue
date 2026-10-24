<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseIcon, BaseInput, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const iconNames = [
  "logo",
  "menu",
  "moreVertical",
  "settings",
  "close",
  "search",
  "clipboard",
  "copy",
  "printer",
  "send",
  "support",
  "building",
  "home",
  "map",
  "arrowLeft",
  "arrowRight",
  "download",
  "plus",
  "trash",
  "facebook",
  "twitter",
  "loader",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "sort",
  "check",
  "location",
  "weight",
  "edit",
  "grid",
  "list",
  "shield",
  "user",
  "circleUser",
  "bolt",
  "clock",
  "package",
  "truck",
  "circleCheck",
  "circleX",
  "alertTriangle",
  "calendar",
  "tag",
  "info",
  "lock",
  "eye",
  "eyeOff",
  "help",
  "receipt",
  "piggyBank",
  "camera",
  "monitor",
  "smartphone",
  "card",
  "cart",
  "bank",
  "bell",
  "mail",
  "message",
];

const t = useMessages({
  en: {
    description:
      "Built-in SVG icons. Use decorative next to visible text, or label when the icon conveys information.",
    sizesTitle: "Sizes and accessibility · size, decorative, label",
    warning: "Warning",
    catalogTitle: "Catalog · name",
    catalogDescription:
      "Names available for BaseIcon and for props such as BaseDropdownMenu.icon.",
    filterLabel: "Filter icons",
    filterPlaceholder: "e.g. arrow",
    noIcons: "No icon matches the filter.",
  },
  es: {
    description:
      "Iconos SVG integrados. Usa decorative junto a texto visible o label cuando el icono transmite información.",
    sizesTitle: "Tamaños y accesibilidad · size, decorative, label",
    warning: "Advertencia",
    catalogTitle: "Catálogo · name",
    catalogDescription:
      "Nombres disponibles para BaseIcon y para props como BaseDropdownMenu.icon.",
    filterLabel: "Filtrar iconos",
    filterPlaceholder: "Ej. arrow",
    noIcons: "Ningún icono coincide con el filtro.",
  },
});

const filter = ref("");
const visibleIcons = computed(() => {
  const term = filter.value.trim().toLowerCase();
  return term
    ? iconNames.filter((name) => name.toLowerCase().includes(term))
    : iconNames;
});

const sizesCode = `<BaseIcon name="truck" size="sm" decorative />
<BaseIcon name="truck" size="md" decorative />
<BaseIcon name="truck" size="lg" decorative />
<BaseIcon name="truck" size="xl" decorative />

<!-- Icon with its own meaning: accessible label -->
<BaseIcon name="alertTriangle" size="lg" label="Warning" />`;

const catalogCode = `<BaseIcon name="package" size="lg" decorative />`;
</script>

<template>
  <DemoSection id="base-icon" name="BaseIcon" :description="t.description">
    <DemoExample :title="t.sizesTitle" :code="sizesCode">
      <div class="demo-row">
        <BaseIcon name="truck" size="sm" decorative />
        <BaseIcon name="truck" size="md" decorative />
        <BaseIcon name="truck" size="lg" decorative />
        <BaseIcon name="truck" size="xl" decorative />
        <BaseIcon name="alertTriangle" size="lg" :label="t.warning" />
      </div>
    </DemoExample>

    <DemoExample
      :title="t.catalogTitle"
      :description="t.catalogDescription"
      :code="catalogCode"
    >
      <div class="icon-catalog__filter">
        <BaseInput
          id="icon-catalog-filter"
          v-model="filter"
          :label="t.filterLabel"
          :placeholder="t.filterPlaceholder"
          type="search"
        />
      </div>
      <div class="icon-catalog">
        <div
          v-for="iconName in visibleIcons"
          :key="iconName"
          class="icon-catalog__item"
        >
          <BaseIcon :name="iconName" size="lg" decorative />
          <code>{{ iconName }}</code>
        </div>
      </div>
      <BaseText v-if="!visibleIcons.length" variant="sm" color="muted">
        {{ t.noIcons }}
      </BaseText>
    </DemoExample>
  </DemoSection>
</template>
