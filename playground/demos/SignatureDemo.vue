<script setup lang="ts">
import { ref } from "vue";
import { BaseSignature, BaseText } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const signature = ref<string | null>(null);

const code = `<BaseSignature
  v-model="signature"
  label="Firma del remitente"
  help="Dibuja dentro del área usando ratón, lápiz o pantalla táctil."
  clear-aria-label="Borrar la firma"
  drawing-instructions="Área para dibujar una firma"
  :height="180"
/>

<!-- signature contiene un data URL PNG o null -->`;

const errorCode = `<BaseSignature
  id="signature-required"
  label="Firma obligatoria"
  required
  error="La firma es obligatoria."
/>`;
</script>

<template>
  <DemoSection
    id="base-signature"
    name="BaseSignature"
    description="Captura de firma con puntero, lápiz o táctil. Se repinta con el tema activo."
  >
    <DemoExample title="Uso básico · v-model, width, height" :code="code">
      <BaseSignature
        id="signature-example"
        v-model="signature"
        label="Firma del remitente"
        help="Dibuja dentro del área usando ratón, lápiz o pantalla táctil."
        clear-aria-label="Borrar la firma"
        drawing-instructions="Área para dibujar una firma"
        :height="180"
      />
      <BaseText variant="sm" color="muted" aria-live="polite">
        {{
          signature
            ? `Firma capturada (${signature.length} caracteres de data URL).`
            : "Sin firma."
        }}
      </BaseText>
    </DemoExample>

    <DemoExample title="Validación · required, error" :code="errorCode">
      <BaseSignature
        id="signature-required"
        label="Firma obligatoria"
        required
        error="La firma es obligatoria."
      />
    </DemoExample>
  </DemoSection>
</template>
