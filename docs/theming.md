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

## Alturas de control

`--control-height-sm` (`2.25rem`), `--control-height-md` (`2.75rem`) y `--control-height-lg`
(`3.25rem`) definen la altura de inputs, selects y botones por tamaño. Las dos primeras eran
`2.5rem` y `3rem` en versiones anteriores; un portal que necesite la densidad anterior puede
restaurarlas en su tema:

```css
:root {
  --control-height-sm: 2.5rem;
  --control-height-md: 3rem;
}
```

## Tokens de controles de formulario

Inputs, textareas, selects, autocompletes, selectores de fecha y teléfono, casillas, radios,
switches y la barra de `BaseSearchQL` comparten estos tokens. Los estados de error y éxito siguen
usando `--jnv-color-state-{error,success}` y sus superficies.

| Token                                                                | Uso                                   |
| -------------------------------------------------------------------- | ------------------------------------- |
| `--jnv-control-background`, `--jnv-control-border`                   | Fondo y borde en reposo               |
| `--jnv-control-hover-border`                                         | Borde al pasar el puntero             |
| `--jnv-control-focus-border`, `--jnv-control-focus-background`       | Borde y fondo con foco                |
| `--jnv-control-focus-shadow`                                         | Halo de foco                          |
| `--jnv-control-disabled-background`, `--jnv-control-disabled-border` | Control deshabilitado                 |
| `--jnv-overlay-background`                                           | Menús desplegables, listas y tooltips |
| `--jnv-dialog-backdrop-background`                                   | Fondo detrás de `BaseDialog`          |
| `--jnv-loading-overlay-background`                                   | Velo de la directiva `v-loading`      |
| `--jnv-tooltip-border`                                               | Borde del tooltip de la directiva     |

`--jnv-dialog-backdrop-background`, `--jnv-loading-overlay-background` y `--jnv-tooltip-border`
suelen necesitar transparencia o mezcla; declara esos valores en el tema, nunca en un componente.

## Tokens de BaseTabs

| Token                      | Uso                                  |
| -------------------------- | ------------------------------------ |
| `--jnv-tabs-margin-bottom` | Separación bajo la lista de pestañas |
| `--jnv-tabs-border`        | Línea inferior de la lista           |
| `--jnv-tabs-text`          | Texto de las pestañas inactivas      |
| `--jnv-tabs-text-active`   | Texto de la pestaña activa y hover   |

Para colocar las pestañas sobre una superficie invertida, sobrescribe estos tokens en el contenedor,
por ejemplo con `--jnv-color-text-inverse-muted`, `--jnv-color-text-inverse` y
`--jnv-color-border-inverse`.

## Tokens de BaseBadge

| Token                                                                  | Uso                                    |
| ---------------------------------------------------------------------- | -------------------------------------- |
| `--jnv-badge-{sm,md}-padding-block`, `-padding-inline`, `-line-height` | Espaciado y altura de línea por tamaño |
| `--jnv-badge-fixed-width`                                              | Ancho con `width="fixed"` (`9.25rem`)  |
| `--jnv-badge-{tono}-{text,background,border}`                          | Colores de cada tono                   |
| `--jnv-color-badge-progress`, `--jnv-color-badge-progress-surface`     | Color base del tono `progress`         |
| `--jnv-color-badge-violet`, `--jnv-color-badge-violet-surface`         | Color base del tono `violet`           |

Los tonos son `neutral`, `info`, `success`, `warning`, `error`, `critical`, `progress` y `violet`.

## Tokens de BaseCard

`--jnv-card-background` define el fondo de `BaseCard` con `surface="page"`.
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

## Tokens de BaseTable

`BaseTable` aplica un grupo de tokens según su prop `size` (`sm` por defecto, `md` o `lg`). Los temas
JNV oscuro y claro comparten estos valores de referencia:

| Token                                    | `sm`                  | `md`                                    | `lg`                          | Uso                                       |
| ---------------------------------------- | --------------------- | --------------------------------------- | ----------------------------- | ----------------------------------------- |
| `--jnv-table-{size}-cell-padding-block`  | `var(--space-2)`      | `var(--space-3)`                        | `var(--space-4)`              | Padding vertical de celdas y pie          |
| `--jnv-table-{size}-cell-padding-inline` | `var(--space-4)`      | `var(--space-5)`                        | `var(--space-6)`              | Padding horizontal de celdas y pie        |
| `--jnv-table-{size}-font-size`           | `var(--font-size-sm)` | `var(--font-size-md)`                   | `var(--text-heading-sm-size)` | Texto predeterminado de las celdas        |
| `--jnv-table-{size}-header-font-size`    | `var(--font-size-xs)` | `var(--font-size-xs)`                   | `var(--font-size-sm)`         | Texto del encabezado                      |
| `--jnv-table-{size}-page-button-size`    | `var(--space-8)`      | `calc(var(--space-8) + var(--space-1))` | `var(--control-height-sm)`    | Ancho y alto de los botones de paginación |

La celda de selección usa `--jnv-table-{size}-cell-padding-block` como padding horizontal. Un tema
propio puede ajustar un tamaño sin afectar a los demás:

```css
:root {
  --jnv-table-sm-cell-padding-block: var(--space-3);
}
```

## Tokens de BaseTimeline

Los temas JNV oscuro y claro comparten estos valores de referencia:

| Token                                                            | Valor de referencia                  | Uso                                            |
| ---------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| `--jnv-timeline-line-color`                                      | `var(--jnv-color-border-default)`    | Línea que une los marcadores                   |
| `--jnv-timeline-marker-color`                                    | `var(--jnv-color-text-muted)`        | Borde e icono de los marcadores                |
| `--jnv-timeline-marker-background`                               | `var(--jnv-color-surface-page)`      | Relleno de los marcadores; cubre la línea      |
| `--jnv-timeline-marker-current-color`                            | `var(--jnv-color-brand-primary)`     | Marcador del elemento en curso (`end: null`)   |
| `--jnv-timeline-marker-current-background`                       | `var(--jnv-color-surface-highlight)` | Fondo y halo del marcador en curso             |
| `--jnv-timeline-date-color`                                      | `var(--jnv-color-text-muted)`        | Texto de las fechas                            |
| `--jnv-timeline-sm-gap`, `--jnv-timeline-md-gap`                 | `var(--space-4)`, `var(--space-6)`   | Separación vertical entre elementos por tamaño |
| `--jnv-timeline-sm-marker-size`, `--jnv-timeline-md-marker-size` | `var(--space-6)`, `var(--space-8)`   | Diámetro del marcador y alto mínimo del título |

El relleno del marcador oculta la línea detrás de él, por lo que `--jnv-timeline-marker-background`
debe coincidir con la superficie donde se coloca el componente. Por ejemplo, dentro de un panel con
otra superficie:

```css
.mi-panel {
  --jnv-timeline-marker-background: var(--jnv-color-surface-subtle);
}
```

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
