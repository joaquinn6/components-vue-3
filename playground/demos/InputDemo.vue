<script setup lang="ts">
import { ref } from "vue";
import { BaseInput } from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages } from "../i18n/usePlaygroundLocale";

const name = ref("Ada Lovelace");
const password = ref("secret");

const t = useMessages({
  en: {
    description:
      "Text field with help, contextual information, validation, password and read mode.",
    basicTitle: "Basic usage · v-model, help, info, type",
    sizesTitle: "Sizes · size",
    statesTitle: "States · state, error, success, disabled, mode",
    fullName: "Full name",
    fullNamePlaceholder: "Type a name",
    fullNameHelp: "This field shows help text.",
    fullNameInfo: "Use the person's legal name.",
    infoAriaLabel: "More information",
    password: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    sizeLabel: (size: string) => `Size ${size}`,
    smDefault: "sm (default)",
    invalidValue: "invalid value",
    errorLabel: "Field with error",
    errorMessage: "Fix the value before continuing.",
    validLabel: "Valid and disabled field",
    validMessage: "The email is available.",
    readLabel: "Read mode",
  },
  es: {
    description:
      "Campo de texto con ayuda, información contextual, validación, contraseña y modo lectura.",
    basicTitle: "Uso básico · v-model, help, info, type",
    sizesTitle: "Tamaños · size",
    statesTitle: "Estados · state, error, success, disabled, mode",
    fullName: "Nombre completo",
    fullNamePlaceholder: "Escribe un nombre",
    fullNameHelp: "Este campo muestra texto de ayuda.",
    fullNameInfo: "Usa el nombre legal de la persona.",
    infoAriaLabel: "Más información",
    password: "Contraseña",
    showPassword: "Mostrar contraseña",
    hidePassword: "Ocultar contraseña",
    sizeLabel: (size) => `Tamaño ${size}`,
    smDefault: "sm (predeterminado)",
    invalidValue: "valor inválido",
    errorLabel: "Campo con error",
    errorMessage: "Corrige el valor antes de continuar.",
    validLabel: "Campo válido y deshabilitado",
    validMessage: "El correo está disponible.",
    readLabel: "Modo lectura",
  },
});

const basicCode = `<BaseInput
  v-model="name"
  label="Full name"
  placeholder="Type a name"
  help="This field shows help text."
  info="Use the person's legal name."
  info-aria-label="More information"
  required
/>

<BaseInput
  v-model="password"
  label="Password"
  type="password"
  show-password-aria-label="Show password"
  hide-password-aria-label="Hide password"
/>`;

const sizesCode = `<BaseInput label="Size sm" size="sm" placeholder="sm (default)" />
<BaseInput label="Size md" size="md" placeholder="md" />
<BaseInput label="Size lg" size="lg" placeholder="lg" />`;

const statesCode = `<BaseInput
  model-value="invalid value"
  label="Field with error"
  error="Fix the value before continuing."
  state="error"
/>
<BaseInput
  model-value="data@example.com"
  label="Valid and disabled field"
  success="The email is available."
  state="success"
  disabled
/>
<BaseInput model-value="Ada Lovelace" label="Read mode" mode="read" />`;
</script>

<template>
  <DemoSection id="base-input" name="BaseInput" :description="t.description">
    <DemoExample :title="t.basicTitle" :code="basicCode">
      <div class="demo-grid demo-grid--two">
        <BaseInput
          id="input-name"
          v-model="name"
          :label="t.fullName"
          :placeholder="t.fullNamePlaceholder"
          :help="t.fullNameHelp"
          :info="t.fullNameInfo"
          :info-aria-label="t.infoAriaLabel"
          required
        />
        <BaseInput
          id="input-password"
          v-model="password"
          :label="t.password"
          type="password"
          :show-password-aria-label="t.showPassword"
          :hide-password-aria-label="t.hidePassword"
        />
      </div>
      <pre class="demo-model">name: {{ JSON.stringify(name) }}</pre>
    </DemoExample>

    <DemoExample :title="t.sizesTitle" :code="sizesCode">
      <div class="demo-grid demo-grid--three">
        <BaseInput
          id="input-sm"
          :label="t.sizeLabel('sm')"
          size="sm"
          :placeholder="t.smDefault"
        />
        <BaseInput
          id="input-md"
          :label="t.sizeLabel('md')"
          size="md"
          placeholder="md"
        />
        <BaseInput
          id="input-lg"
          :label="t.sizeLabel('lg')"
          size="lg"
          placeholder="lg"
        />
      </div>
    </DemoExample>

    <DemoExample :title="t.statesTitle" :code="statesCode">
      <div class="demo-grid demo-grid--three">
        <BaseInput
          id="input-error"
          :model-value="t.invalidValue"
          :label="t.errorLabel"
          :error="t.errorMessage"
          state="error"
        />
        <BaseInput
          id="input-success"
          model-value="data@example.com"
          :label="t.validLabel"
          :success="t.validMessage"
          state="success"
          disabled
        />
        <BaseInput
          id="input-read"
          model-value="Ada Lovelace"
          :label="t.readLabel"
          mode="read"
        />
      </div>
    </DemoExample>
  </DemoSection>
</template>
