<div align="center">

# JNV UI Components

**Componentes Vue 3 tematizables, accesibles y tipados, sin un solo color dentro.**

Tu tema CSS decide la apariencia; los componentes se encargan del comportamiento.

[![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-tipado-3178c6?logo=typescript&logoColor=white)](src/public-types.ts)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Versión](https://img.shields.io/badge/versi%C3%B3n-0.1.0-a78bfa)](package.json)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-green)](LICENSE)

[Inicio rápido](#-inicio-rápido) ·
[Componentes](#-componentes) ·
[Temas](#-temas-y-tokens) ·
[Documentación](#-documentación) ·
[Playground](#-playground)

</div>

---

## ✨ Por qué

- 🎨 **Tematizable de verdad.** Los componentes no declaran colores literales: solo consumen tokens
  semánticos `--jnv-*`. El script `check:base-colors` lo verifica en cada cambio.
- 🌗 **Oscuro y claro de serie.** Incluye el tema JNV oscuro y una variante clara que se activa con
  `data-theme="light"`. También puedes escribir tu propio tema.
- ♿ **Accesible por diseño.** HTML semántico, navegación completa por teclado, foco visible, estados
  ARIA sincronizados y regiones `aria-live` para los mensajes.
- 🌍 **Textos configurables.** Todo texto visible o accesible tiene su prop opcional: etiquetas ARIA,
  placeholders, mensajes y estados vacíos. Los valores predeterminados están en español.
- 🧩 **TypeScript sin fricción.** Declaraciones públicas para props, modelos y eventos, con
  autocompletado en el editor. También funciona en proyectos JavaScript.
- 🪶 **Pocas dependencias.** Solo Vue como dependencia de par. El selector de fechas es opcional.

## 🚀 Inicio rápido

```bash
pnpm add @joaquinn6/jnv-ui-components
```

> [!NOTE]
> El paquete se publica en GitHub Packages. Antes de instalarlo, configura el scope en el `.npmrc`
> de tu proyecto y autentícate con un token que tenga `read:packages`.
>
> ```ini
> @joaquinn6:registry=https://npm.pkg.github.com
> ```
>
> ```bash
> npm login --scope=@joaquinn6 --auth-type=legacy --registry=https://npm.pkg.github.com
> ```
>
> Nunca guardes el token en el repositorio. Los detalles están en la
> [guía de instalación](docs/installation.md).

Importa los estilos de la biblioteca y, **después**, un tema:

```js
import { createApp } from "vue";
import "@joaquinn6/jnv-ui-components/styles.css";
import "@joaquinn6/jnv-ui-components/themes/jnv.css";
import "@joaquinn6/jnv-ui-components/themes/jnv-light.css"; // opcional
import App from "./App.vue";

createApp(App).mount("#app");
```

> [!IMPORTANT]
> Registrar un componente no carga sus estilos. Sin `styles.css` y un tema que defina los tokens
> `--jnv-*`, los controles se mostrarán con la apariencia nativa del navegador.

Y a usarlos:

```vue
<script setup>
import { ref } from "vue";
import { BaseButton, BaseInput } from "@joaquinn6/jnv-ui-components";

const email = ref("");
</script>

<template>
  <BaseInput v-model="email" label="Correo electrónico" type="email" />
  <BaseButton type="submit">Continuar</BaseButton>
</template>
```

## 🧱 Componentes

Más de 30 componentes listos para portales y formularios reales.

| Categoría                | Componentes                                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acciones y contenido** | `BaseButton` · `BaseLink` · `BaseCard` · `BaseHeading` · `BaseText` · `BaseIcon` · `BaseAlert`                                                                         |
| **Navegación**           | `BaseTabs` · `BaseBreadcrumb` · `BaseStepper` · `BaseDropdownMenu`                                                                                                     |
| **Diálogos**             | `BaseDialog` · `BaseConfirmDialog`                                                                                                                                     |
| **Formularios**          | `BaseInput` · `BaseTextarea` · `BasePhoneInput` · `BaseSelect` · `BaseAutocomplete` · `BaseCheckbox` · `BaseRadio` · `BaseRadioGroup` · `BaseSwitch` · `BaseFieldInfo` |
| **Layout de formulario** | `BaseFormSection` · `BaseFormRow`                                                                                                                                      |
| **Fecha y hora**         | `BaseDateInput` · `BaseDateTimeInput` · `BaseMonthInput` · `BaseYearInput` · `BaseDatePicker`                                                                          |
| **Datos y búsqueda**     | `BaseTable` · `BaseSearchQL`                                                                                                                                           |
| **Captura**              | `BaseSignature`                                                                                                                                                        |
| **Directivas**           | `v-tooltip` · `v-loading`                                                                                                                                              |

Algunos destacados:

- **`BaseTable`**: tabla HTML semántica con columnas configurables, ordenamiento, paginación local o
  remota, selección de filas y altas, ediciones y bajas integradas.
- **`BaseSearchQL`**: búsqueda por campo combinada con filtros predefinidos, que se muestran como
  chips removibles.
- **`BaseStepper`**: progreso en cuatro variantes (`circles`, `bars`, `pills`, `vertical`), con
  navegación opcional.
- **`BaseSignature`**: firma con puntero, lápiz o táctil. Se repinta al cambiar de tema.

Las props, eventos, slots y ejemplos de cada componente están en la
[referencia de componentes](docs/components.md).

## 🎨 Temas y tokens

Toda la apariencia sale de un contrato de tokens CSS. Para cambiar la identidad visual, sobrescribe
los tokens semánticos en tu propio tema:

```css
:root {
  --jnv-color-brand-primary: #0ea5e9;
  --jnv-color-brand-primary-hover: #38bdf8;
  --jnv-color-surface-page: #0b1120;
  --jnv-color-text-heading: #f8fafc;
}
```

Para cambiar al tema claro en tiempo de ejecución:

```js
document.documentElement.dataset.theme = "light";
```

El contrato completo y cómo crear un tema desde cero están en [Tema y tokens CSS](docs/theming.md).

## 🧪 Playground

El playground importa los componentes directamente desde `src/`, recarga en caliente y permite
alternar entre los temas oscuro y claro. Muestra variantes, estados e interacciones de toda la
biblioteca.

```bash
pnpm install
pnpm dev
```

## 🛠️ Scripts

| Comando                       | Qué hace                                                   |
| ----------------------------- | ---------------------------------------------------------- |
| `pnpm dev`                    | Levanta el playground con Vite.                            |
| `pnpm build`                  | Compila la biblioteca y genera las declaraciones de tipos. |
| `pnpm check:types`            | Verifica los tipos de los componentes.                     |
| `pnpm check:consumer-types`   | Comprueba la API pública como la vería un consumidor.      |
| `pnpm check:playground-types` | Verifica los tipos del playground.                         |
| `pnpm check:base-colors`      | Garantiza que ningún componente declare colores literales. |
| `pnpm format:check`           | Revisa el formato con Prettier.                            |

## 📚 Documentación

- [Instalación e integración](docs/installation.md): acceso al registro, `.npmrc` y uso en portales.
- [Referencia de componentes](docs/components.md): props, eventos, modelos, slots y ejemplos.
- [Tema y tokens CSS](docs/theming.md): contrato de tokens y temas de referencia.
- [Publicación y versiones](docs/publishing.md): proceso para personas mantenedoras.

## 📦 Compatibilidad

- **Vue** `^3.5` (dependencia de par).
- **Node** `^20.19.0` o `>=22.12.0` para desarrollar.
- **Componentes de fecha:** requieren `@vuepic/vue-datepicker` `^14` y su hoja de estilos
  (dependencia de par opcional).

## 📄 Licencia

[MIT](LICENSE) © 2026 Joaquín Núñez Vega
