# Tema y tokens CSS

## Principio

Los componentes solo consumen tokens CSS públicos. El paquete no fija una paleta ni detecta el modo
oscuro con JavaScript. Un portal activa su variante aplicando sus valores a `:root`, una clase o un
atributo, por ejemplo `:root[data-theme='light']`.

El layout de formularios usa `--jnv-form-field-gap` entre controles, `--jnv-form-section-gap` entre
la cabecera y el contenido de una sección, y `--jnv-field-gap` entre la etiqueta y el control.
`--jnv-choice-field-min-height` define la altura estructural mínima de radios y switches para
mantener un ritmo visual consistente con los controles de formulario.
`--jnv-field-message-min-height` reserva el espacio de mensajes para evitar saltos al mostrar
errores. Las aplicaciones pueden sobrescribir estos tokens en su tema, por ejemplo para un iframe
más compacto:

```css
:root {
  --jnv-form-field-gap: 0.75rem;
  --jnv-form-section-gap: 1.5rem;
  --jnv-form-label-color: var(--jnv-color-text-muted);
  --jnv-form-value-color: var(--jnv-color-text-heading);
  --jnv-form-label-size: var(--text-label-size);
}
```

`--jnv-form-label-color` controla el color de las etiquetas auxiliares y
`--jnv-form-value-color` el de los valores introducidos o seleccionables. Ambos tokens son
independientes de los colores globales de texto, para que cada proyecto pueda ajustar la jerarquia
visual de sus formularios. `--jnv-form-label-size` permite ajustar el tamaño tipografico de esas
etiquetas sin modificar el resto de textos con variante `label`.

El paquete incluye los temas `@joaquinn6/jnv-ui-components/themes/jnv.css` y
`@joaquinn6/jnv-ui-components/themes/jnv-light.css` como referencia y punto de partida. `jnv.css` es el tema predeterminado: oscuro, con base negra y
acento morado, aplicado sobre `:root`. `jnv-light.css` es una variante clara opcional que se
importa después de `jnv.css` y se activa con `data-theme="light"` en el elemento raíz. Son
opcionales: un portal puede importarlos o definir su propio archivo de tema.

`BaseSignature` dibuja sobre un `<canvas>`, que no se actualiza con CSS. Para reflejar un cambio de
tema en caliente, el componente repinta fondo, guía, trazos y su cursor en cruz (generado con
`--jnv-signature-ink-color` y `--jnv-signature-canvas-background`) cuando cambian los atributos
`data-theme`, `class` o `style` del elemento raíz (`<html>`). Una firma ya emitida en `v-model`
conserva los colores del tema en que se dibujó.

```ts
import "@joaquinn6/jnv-ui-components/styles.css";
import "@joaquinn6/jnv-ui-components/themes/jnv.css";
import "@joaquinn6/jnv-ui-components/themes/jnv-light.css"; // opcional

// Activar el tema claro:
document.documentElement.dataset.theme = "light";
```

## Tema mínimo

```css
:root {
  color-scheme: dark;
  --jnv-color-surface-page: #0b0b0f;
  --jnv-color-surface-subtle: #131318;
  --jnv-color-surface-muted: #1d1c24;
  --jnv-color-surface-inverse: #f4f2fa;
  --jnv-color-surface-inverse-hover: #e4e0ee;
  --jnv-color-surface-highlight: #241b3d;
  --jnv-color-text-heading: #ffffff;
  --jnv-color-text-body: #e7e4ef;
  --jnv-color-text-muted: #a59fb6;
  --jnv-color-text-inverse: #0b0b0f;
  --jnv-color-text-inverse-muted: #4a4559;
  --jnv-color-text-on-primary: #0b0b0f;
  --jnv-color-border-default: #2a2833;
  --jnv-color-border-strong: #3e3a4b;
  --jnv-color-border-inverse: rgb(11 11 15 / 14%);
  --jnv-color-brand-primary: #a78bfa;
  --jnv-color-brand-primary-hover: #c4b5fd;
  --jnv-color-brand-secondary: #e4dcff;
  --jnv-color-brand-secondary-hover: #f1ecff;
  --jnv-color-action-primary: var(--jnv-color-brand-primary);
  --jnv-color-action-primary-hover: var(--jnv-color-brand-primary-hover);
  --jnv-color-action-secondary: var(--jnv-color-brand-secondary);
  --jnv-color-action-danger: #ff6b81;
  --jnv-color-action-danger-hover: #ff8597;
  --jnv-color-focus-ring: var(--jnv-color-brand-primary);
  --jnv-color-focus-shadow: rgb(167 139 250 / 28%);
  --jnv-color-state-error: #ff6b81;
  --jnv-color-state-error-surface: #3a1620;
  --jnv-color-state-success: #4ade80;
  --jnv-color-state-success-surface: #12301f;
  --jnv-signature-canvas-background: var(--jnv-color-surface-page);
  --jnv-signature-guide-color: #8e88a3;
  --jnv-signature-ink-color: #ffffff;
  --jnv-field-info-hover-background: var(--jnv-color-surface-subtle);
  --jnv-field-info-focus-border: var(--jnv-color-border-strong);
  --jnv-field-info-focus-shadow: rgb(167 139 250 / 20%);
  --jnv-field-info-tooltip-border: var(--jnv-color-border-default);
  --jnv-alert-danger-background: var(--jnv-color-state-error-surface);
  --jnv-alert-danger-border: var(--jnv-color-state-error);
  --jnv-alert-danger-text: var(--jnv-color-state-error);
  --jnv-alert-warning-background: var(--jnv-color-surface-highlight);
  --jnv-alert-warning-border: var(--jnv-color-state-warning);
  --jnv-alert-warning-text: var(--jnv-color-state-warning);
  --jnv-alert-info-background: var(--jnv-color-surface-subtle);
  --jnv-alert-info-border: var(--jnv-color-status-info-text);
  --jnv-alert-info-text: var(--jnv-color-status-info-text);
  --jnv-alert-primary-background: var(--jnv-color-surface-highlight);
  --jnv-alert-primary-border: var(--jnv-color-brand-primary);
  --jnv-alert-primary-text: var(--jnv-color-brand-primary);
  --jnv-alert-secondary-background: var(--jnv-color-surface-muted);
  --jnv-alert-secondary-border: var(--jnv-color-brand-secondary);
  --jnv-alert-secondary-text: var(--jnv-color-brand-secondary);
  --jnv-alert-close-hover-background: var(--jnv-color-surface-muted);
  --jnv-breadcrumb-gap-block: var(--space-1);
  --jnv-breadcrumb-gap-inline: var(--space-2);
  --jnv-breadcrumb-transition: var(--transition-fast);
  --jnv-breadcrumb-underline-offset: var(--space-1);
  --jnv-breadcrumb-focus-radius: var(--radius-sm);
  --jnv-breadcrumb-focus-width: var(--focus-outline-width);
  --jnv-breadcrumb-focus-offset: var(--focus-outline-offset);
}
```

Los estilos del paquete deben incluir los tokens estructurales de espaciado, radios, sombras,
tipografÃ­a, transiciones y `--layer-loading`, que controla la superposiciÃ³n visual de los estados de carga.
tipografía y transiciones. El portal solo proporciona los valores visuales y las variantes de
componente que correspondan a su identidad.

## Tokens de BaseCard

`--jnv-card-padding-compact` controla el padding de `BaseCard` cuando `padding="compact"`.
Los temas JNV oscuro y claro lo establecen en `var(--space-4)`; en pantallas pequeñas el componente
mantiene `var(--space-5)` como ajuste responsive. Un tema propio puede sobrescribir el token, por
ejemplo:

```css
:root {
  --jnv-card-padding-compact: var(--space-5);
}
```

## Tokens de BaseAlert

Cada tono define fondo, borde y texto con `--jnv-alert-{tono}-{background,border,text}`.
`--jnv-alert-close-hover-background` controla el fondo al pasar sobre el botón de cierre. Los temas
JNV oscuro y claro incluyen los valores de referencia; los temas propios deben definir estos tokens.

## Tokens del breadcrumb

| Token                                                                                            | Uso                                     |
| ------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `--jnv-breadcrumb-gap-block`, `--jnv-breadcrumb-gap-inline`                                      | Separación entre niveles y líneas       |
| `--jnv-breadcrumb-transition`, `--jnv-breadcrumb-underline-offset`                               | Respuesta visual de los enlaces         |
| `--jnv-breadcrumb-focus-radius`, `--jnv-breadcrumb-focus-width`, `--jnv-breadcrumb-focus-offset` | Contorno de foco visible de los enlaces |

## Tokens del selector de fecha

`BaseDatePicker` traduce estos tokens a las variables privadas `--dp-*` de Vue Datepicker. Los
consumidores nunca necesitan modificar `--dp-*` directamente.

| Familia                                                                                  | Uso                                   |
| ---------------------------------------------------------------------------------------- | ------------------------------------- |
| `--jnv-date-picker-menu-background`, `-text`, `-muted-text`, `-icon`                     | Superficie y contenido del calendario |
| `--jnv-date-picker-menu-hover-background`, `-hover-text`, `-hover-icon`, `-hover-border` | Hover y navegación                    |
| `--jnv-date-picker-menu-selected-background`, `-selected-text`, `-selected-disabled`     | Fecha u hora seleccionada             |
| `--jnv-date-picker-menu-border`, `-focus-border`                                         | Bordes y foco                         |
| `--jnv-date-picker-menu-disabled-background`, `-disabled-text`                           | Elementos no disponibles              |
| `--jnv-date-picker-menu-highlight`, `-range-background`, `-range-text`, `-range-border`  | Marcado y rangos                      |
| `--jnv-date-picker-menu-success`, `-danger`, `-marker`, `-tooltip-background`            | Estados auxiliares                    |
| `--jnv-date-picker-menu-scrollbar-track`, `-scrollbar-thumb`, `-loader`                  | Controles internos                    |

## Modo claro

Un tema claro debe reemplazar también las superficies de estado. No dejes que `error-surface` y
`success-surface` hereden los valores oscuros:

```css
:root[data-theme="light"] {
  color-scheme: light;
  --jnv-color-surface-page: #ffffff;
  --jnv-color-surface-muted: #f2f0f7;
  --jnv-color-text-body: #2e2a38;
  --jnv-color-brand-primary: #6d28d9;
  --jnv-color-text-on-primary: #ffffff;
  --jnv-color-state-error: #c62839;
  --jnv-color-state-error-surface: #fdecee;
  --jnv-color-state-success: #15803d;
  --jnv-color-state-success-surface: #e9f7ef;
}
```
