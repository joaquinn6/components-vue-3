<script setup lang="ts">
import { BaseFieldInfo, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const types = ["", "primary", "secondary", "success", "danger"] as const;

const t = useMessages({
  en: {
    description:
      "Help icon with an accessible tooltip that opens on hover and with the keyboard.",
    typesTitle: "Types · type",
    text: (type: string) => `Contextual help of type ${type}.`,
    ariaLabel: (type: string) => `More information (${type})`,
  },
  es: {
    description:
      "Icono de ayuda con tooltip accesible: se abre con hover y con el teclado.",
    typesTitle: "Tipos · type",
    text: (type) => `Ayuda contextual de tipo ${type}.`,
    ariaLabel: (type) => `Más información (${type})`,
  },
});

const typesCode = `<BaseFieldInfo text="Contextual help." aria-label="More information" />
<BaseFieldInfo type="primary" text="Contextual help." aria-label="More information" />
<BaseFieldInfo type="secondary" text="Contextual help." aria-label="More information" />
<BaseFieldInfo type="success" text="Contextual help." aria-label="More information" />
<BaseFieldInfo type="danger" text="Contextual help." aria-label="More information" />`;
</script>

<template>
  <DemoSection
    id="base-field-info"
    name="BaseFieldInfo"
    :description="t.description"
  >
    <DemoExample :title="t.typesTitle" :code="typesCode">
      <div class="demo-row">
        <span
          v-for="type in types"
          :key="type || 'default'"
          class="demo-inline"
        >
          <BaseText as="span" variant="label">{{ type || "default" }}</BaseText>
          <BaseFieldInfo
            :type="type"
            :text="t.text(type || 'default')"
            :aria-label="t.ariaLabel(type || 'default')"
          />
        </span>
      </div>
    </DemoExample>
  </DemoSection>
</template>
