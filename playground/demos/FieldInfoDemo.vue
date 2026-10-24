<script setup lang="ts">
import { BaseFieldInfo, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const types = ["", "primary", "secondary", "success", "danger"] as const;

const typesCode = `<BaseFieldInfo text="Ayuda contextual." aria-label="Más información" />
<BaseFieldInfo type="primary" text="Ayuda contextual." aria-label="Más información" />
<BaseFieldInfo type="secondary" text="Ayuda contextual." aria-label="Más información" />
<BaseFieldInfo type="success" text="Ayuda contextual." aria-label="Más información" />
<BaseFieldInfo type="danger" text="Ayuda contextual." aria-label="Más información" />`;
</script>

<template>
  <DemoSection
    id="base-field-info"
    name="BaseFieldInfo"
    description="Icono de ayuda con tooltip accesible: se abre con hover y con el teclado."
  >
    <DemoExample title="Tipos · type" :code="typesCode">
      <div class="demo-row">
        <span
          v-for="type in types"
          :key="type || 'default'"
          class="demo-inline"
        >
          <BaseText as="span" variant="label">{{ type || "default" }}</BaseText>
          <BaseFieldInfo
            :type="type"
            :text="`Ayuda contextual de tipo ${type || 'default'}.`"
            :aria-label="`Más información (${type || 'default'})`"
          />
        </span>
      </div>
    </DemoExample>
  </DemoSection>
</template>
