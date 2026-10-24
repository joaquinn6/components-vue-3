<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseIcon, BaseInput, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const iconNames = [
  "logo",
  "menu",
  "moreVertical",
  "settings",
  "close",
  "search",
  "clipboard",
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

<!-- Icono con significado propio: etiqueta accesible -->
<BaseIcon name="alertTriangle" size="lg" label="Advertencia" />`;

const catalogCode = `<BaseIcon name="package" size="lg" decorative />`;
</script>

<template>
  <DemoSection
    id="base-icon"
    name="BaseIcon"
    description="Iconos SVG integrados. Usa decorative junto a texto visible o label cuando el icono transmite información."
  >
    <DemoExample
      title="Tamaños y accesibilidad · size, decorative, label"
      :code="sizesCode"
    >
      <div class="demo-row">
        <BaseIcon name="truck" size="sm" decorative />
        <BaseIcon name="truck" size="md" decorative />
        <BaseIcon name="truck" size="lg" decorative />
        <BaseIcon name="truck" size="xl" decorative />
        <BaseIcon name="alertTriangle" size="lg" label="Advertencia" />
      </div>
    </DemoExample>

    <DemoExample
      title="Catálogo · name"
      description="Nombres disponibles para BaseIcon y para props como BaseDropdownMenu.icon."
      :code="catalogCode"
    >
      <div class="icon-catalog__filter">
        <BaseInput
          id="icon-catalog-filter"
          v-model="filter"
          label="Filtrar iconos"
          placeholder="Ej. arrow"
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
        Ningún icono coincide con el filtro.
      </BaseText>
    </DemoExample>
  </DemoSection>
</template>
