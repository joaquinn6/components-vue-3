<script setup lang="ts">
import { ref } from "vue";
import { BaseInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";

const name = ref("Ada Lovelace");
const password = ref("secreto");

const basicCode = `<BaseInput
  v-model="name"
  label="Nombre completo"
  placeholder="Escribe un nombre"
  help="Este campo muestra texto de ayuda."
  info="Usa el nombre legal de la persona."
  required
/>

<BaseInput
  v-model="password"
  label="Contraseña"
  type="password"
  show-password-aria-label="Mostrar contraseña"
  hide-password-aria-label="Ocultar contraseña"
/>`;

const sizesCode = `<BaseInput label="Tamaño sm" size="sm" placeholder="sm (predeterminado)" />
<BaseInput label="Tamaño md" size="md" placeholder="md" />
<BaseInput label="Tamaño lg" size="lg" placeholder="lg" />`;

const statesCode = `<BaseInput
  model-value="valor inválido"
  label="Campo con error"
  error="Corrige el valor antes de continuar."
  state="error"
/>
<BaseInput
  model-value="dato@example.com"
  label="Campo válido y deshabilitado"
  success="El correo está disponible."
  state="success"
  disabled
/>
<BaseInput model-value="Ada Lovelace" label="Modo lectura" mode="read" />`;
</script>

<template>
  <DemoSection
    id="base-input"
    name="BaseInput"
    description="Campo de texto con ayuda, información contextual, validación, contraseña y modo lectura."
  >
    <DemoExample
      title="Uso básico · v-model, help, info, type"
      :code="basicCode"
    >
      <div class="demo-grid demo-grid--two">
        <BaseInput
          id="input-name"
          v-model="name"
          label="Nombre completo"
          placeholder="Escribe un nombre"
          help="Este campo muestra texto de ayuda."
          info="Usa el nombre legal de la persona."
          required
        />
        <BaseInput
          id="input-password"
          v-model="password"
          label="Contraseña"
          type="password"
          show-password-aria-label="Mostrar contraseña"
          hide-password-aria-label="Ocultar contraseña"
        />
      </div>
      <pre class="demo-model">name: {{ JSON.stringify(name) }}</pre>
    </DemoExample>

    <DemoExample title="Tamaños · size" :code="sizesCode">
      <div class="demo-grid demo-grid--three">
        <BaseInput
          id="input-sm"
          label="Tamaño sm"
          size="sm"
          placeholder="sm (predeterminado)"
        />
        <BaseInput id="input-md" label="Tamaño md" size="md" placeholder="md" />
        <BaseInput id="input-lg" label="Tamaño lg" size="lg" placeholder="lg" />
      </div>
    </DemoExample>

    <DemoExample
      title="Estados · state, error, success, disabled, mode"
      :code="statesCode"
    >
      <div class="demo-grid demo-grid--three">
        <BaseInput
          id="input-error"
          model-value="valor inválido"
          label="Campo con error"
          error="Corrige el valor antes de continuar."
          state="error"
        />
        <BaseInput
          id="input-success"
          model-value="dato@example.com"
          label="Campo válido y deshabilitado"
          success="El correo está disponible."
          state="success"
          disabled
        />
        <BaseInput
          id="input-read"
          model-value="Ada Lovelace"
          label="Modo lectura"
          mode="read"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
