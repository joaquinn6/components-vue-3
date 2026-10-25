<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseButton, BaseIcon, BaseInput, BaseText } from "../../src/index";
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
  "github",
  "linkedin",
  "sun",
  "moon",
  "languages",
  "externalLink",
  "code",
  "briefcase",
  "graduationCap",
];

const t = useMessages({
  en: {
    description:
      "Built-in SVG icons. Use decorative next to visible text, or label when the icon conveys information.",
    sizesTitle: "Sizes and accessibility · size, decorative, label",
    warning: "Warning",
    smallTitle: 'Small actions · size="sm" inside BaseButton size="icon"',
    smallDescription:
      "Outline brand and utility icons stay legible at the smallest size.",
    github: "GitHub profile",
    linkedin: "LinkedIn profile",
    externalLink: "Open in a new tab",
    lightTheme: "Switch to light theme",
    darkTheme: "Switch to dark theme",
    language: "Change language",
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
    smallTitle:
      'Acciones pequeñas · size="sm" dentro de BaseButton size="icon"',
    smallDescription:
      "Los iconos de marca y utilidad de contorno siguen siendo legibles en el tamaño más pequeño.",
    github: "Perfil de GitHub",
    linkedin: "Perfil de LinkedIn",
    externalLink: "Abrir en una pestaña nueva",
    lightTheme: "Cambiar al tema claro",
    darkTheme: "Cambiar al tema oscuro",
    language: "Cambiar idioma",
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

const smallActions = [
  { icon: "github", label: "github" },
  { icon: "linkedin", label: "linkedin" },
  { icon: "externalLink", label: "externalLink" },
  { icon: "sun", label: "lightTheme" },
  { icon: "moon", label: "darkTheme" },
  { icon: "languages", label: "language" },
] as const;

const smallCode = `<BaseButton size="icon" variant="ghost" aria-label="GitHub profile">
  <BaseIcon name="github" size="sm" decorative />
</BaseButton>
<BaseButton size="icon" variant="ghost" aria-label="Switch to light theme">
  <BaseIcon name="sun" size="sm" decorative />
</BaseButton>`;

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
      :title="t.smallTitle"
      :description="t.smallDescription"
      :code="smallCode"
    >
      <div class="demo-row">
        <BaseButton
          v-for="action in smallActions"
          :key="action.icon"
          size="icon"
          variant="ghost"
          :aria-label="t[action.label]"
          :title="t[action.label]"
        >
          <BaseIcon :name="action.icon" size="sm" decorative />
        </BaseButton>
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
