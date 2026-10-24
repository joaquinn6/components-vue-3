# Referencia de componentes

## Convenciones comunes

`size`: `sm`, `md`, `lg`. `state`: `default`, `error`, `success`. `tone`: `default`, `inverse`.
Los campos con `error`, `success` y `help` muestran el primer valor disponible en ese orden.

`BaseDropdownMenu` acepta la prop `icon` para personalizar el icono del botón disparador. Su valor
predeterminado es `"moreVertical"` y admite cualquier nombre de icono disponible en `BaseIcon`.

## Contenido y acciones

### BaseLink

Enlace semántico para URLs internas o externas, con los colores, tamaños y estados de foco del
sistema visual. `href` es obligatorio y el contenido se proporciona mediante el slot predeterminado.

```vue
<BaseLink href="https://example.com" target="_blank">
  Abrir sitio externo
</BaseLink>
```

| Prop        | Tipo                                | Predeterminado | Descripción                                                                                     |
| ----------- | ----------------------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| `href`      | `string`                            | —              | URL o fragmento de destino.                                                                     |
| `target`    | `string`                            | `""`           | Destino del enlace.                                                                             |
| `rel`       | `string`                            | `""`           | Relación del enlace; añade `noopener noreferrer` automáticamente para `_blank` si no se indica. |
| `variant`   | `brand \| body \| muted \| inverse` | `brand`        | Tono visual del enlace.                                                                         |
| `size`      | `sm \| md \| lg`                    | `md`           | Tamaño tipográfico.                                                                             |
| `underline` | `always \| hover \| none`           | `hover`        | Comportamiento del subrayado.                                                                   |

No emite eventos propios ni expone modelos, métodos o slots con nombre.

| Componente          | Props principales                                                                                                                                      | Modelo y eventos                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `BaseButton`        | `variant` (`primary`, `secondary`, `outline`, `ghost`, `inverse`, `danger`), `size` (`sm`, `md`, `lg`, `icon`), `type`, `loading`, `disabled`, `block` | `click`; contenido mediante slot predeterminado                                 |
| `BaseLink`          | `href`, `target`, `rel`, `variant` (`brand`, `body`, `muted`, `inverse`), `size`, `underline` (`always`, `hover`, `none`)                              | Sin eventos propios; contenido mediante slot predeterminado                     |
| `BaseCard`          | `as`, `surface` (`page`, `inverse`, `primary`), `padding`, `radius`, `elevation`, `outlined`                                                           | Slot predeterminado                                                             |
| `BaseAlert`         | `title`, `description`, `tone`, `icon`, `dismissible`, `closeLabel`                                                                                    | `dismiss`; slots predeterminado e `icon`                                        |
| `BaseDialog`        | `open`, `title`, `description`, `size` (`sm`, `md`), `form`, `loading`, `closeLabel`, `closeDisabled`                                                  | `close`, `submit`; slots predeterminado y `actions`                             |
| `BaseConfirmDialog` | `open`, `title`, `description`, `confirmLabel`, `cancelLabel`, `loading`, `tone` (`danger`, `primary`)                                                 | `close`, `confirm`                                                              |
| `BaseHeading`       | `as`, `variant` (`hero`, `lg`, `md`, `sm`, `xs`), `color`, `align`                                                                                     | Slot predeterminado                                                             |
| `BaseText`          | `as`, `variant` (`md`, `sm`, `label`, `xl`), `color`, `weight`                                                                                         | Slot predeterminado                                                             |
| `BaseBreadcrumb`    | `value` (`{ name, to? }[]`), `divider`, `size` (`sm`, `md`, `label`, `xl`), `weight`, `ariaLabel`                                                      | Sin eventos ni slots                                                            |
| `BaseTabs`          | `tabs` (`{ label, value, disabled?, id?, panelId? }`), `ariaLabel`                                                                                     | `v-model`; teclado: flechas, Inicio y Fin                                       |
| `BaseFieldInfo`     | `text`, `type`, `ariaLabel`                                                                                                                            | Tooltip al foco o hover                                                         |
| `BaseDropdownMenu`  | `groups` (`{ label, event, color?, disabled?, tooltip? }[][]`)                                                                                         | `select`; menú accesible con teclado                                            |
| `BaseSearchQL`      | `v-model`, `filters`, `defaultFilters`, rango de fecha opcional, textos y etiquetas accesibles, `disabled`                                             | `update:modelValue`, `change`, `date-change`; emite filtros y el rango aplicado |
| `BaseIcon`          | `name`, `size` (`sm`, `md`, `lg`, `xl`), `label`, `decorative`                                                                                         | Sin eventos; icono SVG accesible                                                |
| `BaseFormSection`   | `title`, `description`, `titleAs` (`h2`, `h3`, `h4`)                                                                                                   | Slot predeterminado; sin eventos ni métodos expuestos                           |
| `BaseFormRow`       | `columns` (`1`, `2`, `3`, `4`), `columnWidths`                                                                                                         | Slot predeterminado; sin eventos ni métodos expuestos                           |

`BaseDropdownMenu` emite `select` con `{ item, groupIndex, itemIndex }`. Los colores disponibles
son `default`, `danger`, `success` e `info`. Para usar la directiva `v-tooltip` directamente,
regístrala opcionalmente en la aplicación:

### BaseButton con solo icono

Usa `size="icon"` para acciones compactas en columnas de tablas. El contenido debe ser un icono y
cada acción debe proporcionar un `aria-label` descriptivo; `title` es opcional.

```vue
<BaseButton
  size="icon"
  variant="ghost"
  aria-label="Editar devolución"
  title="Editar"
>
  <BaseIcon name="edit" size="sm" decorative />
</BaseButton>
```

Además de los valores comunes `sm`, `md` y `lg`, `BaseButton.size` acepta `icon` (predeterminado:
`sm`). Emite `click` con el evento nativo del botón y no expone modelos, métodos ni slots con
nombre.

```js
import { tooltip } from "@joaquinn6/jnv-ui-components";

app.directive("tooltip", tooltip);
```

## Directiva `v-loading`

La exportación `loading` permite mostrar una superficie de carga sobre un elemento HTML.
Recibe un valor `boolean`: `true` muestra el indicador y `false` lo oculta. Sin valor, permanece
oculto. Actualiza `aria-busy` en el elemento y el indicador usa `role="status"` y la etiqueta
accesible `"Cargando"`.

Registro global antes de montar la aplicación:

```js
import { loading } from "@joaquinn6/jnv-ui-components";
import "@joaquinn6/jnv-ui-components/styles.css";

app.directive("loading", loading);
```

Uso local con `<script setup>` (el nombre `vLoading` habilita `v-loading` en el template):

```vue
<script setup>
import { ref } from "vue";
import { loading as vLoading } from "@joaquinn6/jnv-ui-components";
import "@joaquinn6/jnv-ui-components/styles.css";

const cargando = ref(false);
</script>

<template>
  <section v-loading="cargando">Contenido del proyecto</section>
</template>
```

La directiva se exporta con el tipo público `LoadingDirective`. Usa los estilos y el tema de la
biblioteca; aplícala a elementos HTML. No emite eventos ni expone modelos, slots o métodos.
Al desmontarse, elimina el indicador y restaura la posición inline previa del elemento.

## BaseSearchQL

`BaseSearchQL` combina búsquedas de texto por campo con filtros predefinidos. Al escribir, permite
seleccionar el campo para el término; el botón de filtros abre las opciones predefinidas. Los filtros
seleccionados se muestran como chips removibles. Cada filtro predefinido ocupa su propia columna
en el menú; en pantallas estrechas, los grupos se apilan para conservar la legibilidad.

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  BaseSearchQL,
  type BaseSearchQLChange,
  type DateRangeValue,
} from "@joaquinn6/jnv-ui-components";

const selectedFilters = ref<BaseSearchQLChange[]>([
  { name: "customer", value: ".*Ada.*" },
  { name: "status", value: "pending" },
]);
const selectedDateRange = ref<DateRangeValue>(null);
</script>

<template>
  <BaseSearchQL
    v-model="selectedFilters"
    :filters="[
      { name: 'reference', label: 'Referencia', regex: false },
      { name: 'customer', label: 'Cliente', regex: true },
    ]"
    :default-filters="[
      {
        name: 'status',
        label: 'Estado',
        options: [
          { value: 'pending', label: 'Pendiente' },
          { value: 'delivered', label: 'Entregado' },
        ],
      },
    ]"
    :texts="{
      defaultFiltersLabel: 'Filters',
      dateFromLabel: 'From',
      dateToLabel: 'To',
      dateLocale: 'en',
    }"
    :show-date-range="true"
    :date-value="selectedDateRange"
    @date-change="(range) => (selectedDateRange = range)"
  />
</template>
```

| Prop                        | Tipo                                                                                                      | Predeterminado                           | Descripción                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `id`                        | `string`                                                                                                  | ID único generado                        | Identificador del campo de búsqueda.                                                                              |
| `size`                      | `Size` (`sm`, `md`, `lg`)                                                                                 | `md`                                     | Tamaño de la barra y sus controles.                                                                               |
| `modelValue`                | `BaseSearchQLChange[]`                                                                                    | `undefined`                              | Filtros seleccionados mediante `v-model`. Sin modelo, mantiene la selección interna.                              |
| `filters`                   | `{ name: string, label: string, regex?: boolean }[]`                                                      | `[]`                                     | Campos sugeridos para búsquedas de texto.                                                                         |
| `defaultFilters`            | `{ name: string, label: string, options: { value: SelectValue, label: string }[], multiple?: boolean }[]` | `[]`                                     | Grupos de opciones; se permite una opción por campo. `multiple` se conserva por compatibilidad y no tiene efecto. |
| `texts`                     | `BaseSearchQLTexts`                                                                                       | Valores actuales en español              | Sobrescribe los textos visibles y accesibles; sus claves tienen prioridad sobre los props individuales.           |
| `placeholder`               | `string`                                                                                                  | `Buscar...`                              | Placeholder del campo de texto.                                                                                   |
| `searchAriaLabel`           | `string`                                                                                                  | `Buscar por campo`                       | Nombre accesible del campo.                                                                                       |
| `searchSuggestionPrefix`    | `string`                                                                                                  | `Buscar`                                 | Texto inicial de cada sugerencia.                                                                                 |
| `searchSuggestionConnector` | `string`                                                                                                  | `por`                                    | Texto entre el nombre del campo y el término.                                                                     |
| `defaultFiltersLabel`       | `string`                                                                                                  | `Filtros`                                | Texto y nombre accesible del botón de filtros.                                                                    |
| `removeFilterAriaLabel`     | `string`                                                                                                  | `Quitar filtro`                          | Texto inicial de la etiqueta de cada botón de quitar.                                                             |
| `noResultsText`             | `string`                                                                                                  | `No hay campos de búsqueda disponibles.` | Mensaje cuando no hay campos que sugerir.                                                                         |
| `showDateRange`             | `boolean`                                                                                                 | `false`                                  | Muestra el botón y el selector de rango de fechas.                                                                |
| `dateRangeRequired`         | `boolean`                                                                                                 | `false`                                  | Hace obligatorios ambos campos y omite el botón para quitar el chip.                                              |
| `dateValue`                 | `DateRangeValue`                                                                                          | `null`                                   | Pareja `[desde, hasta]` con valores `Date` o `string`.                                                            |
| `dateRangeLabel`            | `string`                                                                                                  | `Rango de fechas`                        | Etiqueta visible del chip.                                                                                        |
| `dateRangeAriaLabel`        | `string`                                                                                                  | `Seleccionar rango de fechas`            | Nombre accesible del botón y menú.                                                                                |
| `acceptDateRangeLabel`      | `string`                                                                                                  | `Aceptar`                                | Texto del botón que aplica el rango.                                                                              |
| `dateRangePlaceholder`      | `string`                                                                                                  | `Seleccionar fechas`                     | Placeholder del selector.                                                                                         |
| `dateFromLabel`             | `string`                                                                                                  | `Desde`                                  | Etiqueta del selector de inicio.                                                                                  |
| `dateToLabel`               | `string`                                                                                                  | `Hasta`                                  | Etiqueta del selector de fin.                                                                                     |
| `disabled`                  | `boolean`                                                                                                 | `false`                                  | Deshabilita la edición y la selección.                                                                            |

`BaseSearchQLTexts` admite `placeholder`, `searchAriaLabel`, `searchSuggestionPrefix`,
`searchSuggestionConnector`, `defaultFiltersLabel`, `removeFilterAriaLabel`, `noResultsText`,
`dateRangeLabel`, `dateRangeAriaLabel`, `acceptDateRangeLabel`, `dateRangePlaceholder`,
`dateFromLabel`, `dateToLabel` y `dateLocale`. Cada clave es opcional; las omitidas conservan el
valor predeterminado en español. `dateLocale` se usa para el calendario y el formato de fechas del chip.

`change` emite `BaseSearchQLChange[]`: `{ name, value }` para todos los filtros, incluidos los de
texto con `regex: true`. Estos últimos emiten en `value` una cadena con un patrón de
contenido `.*texto.*`, escapando los caracteres especiales del texto. Cada campo puede seleccionarse
una sola vez; tras seleccionar un campo de texto deja de aparecer entre las sugerencias. Las opciones
predefinidas del mismo campo permanecen disponibles y elegir otra reemplaza la selección anterior.
Al quitar el filtro, el campo vuelve a estar disponible. El componente no gestiona favoritos.

El modelo `v-model` usa `BaseSearchQLChange[]`, el mismo formato de `change`. Permite precargar
filtros y sincronizar modificaciones externas, incluida la limpieza mediante `selectedFilters = []`.
Cada interacción que agrega, reemplaza o quita un filtro emite `update:modelValue` y `change`
con el arreglo completo actualizado. Cargar o modificar el modelo desde la página no emite eventos.
Sin `v-model`, se conserva el comportamiento anterior con selección interna y `change`.
El componente no modifica el arreglo ni los objetos recibidos.

Las etiquetas de los chips se resuelven a partir de `filters` y `defaultFilters`; las opciones
predefinidas seleccionadas también se marcan en el menú. Los patrones literales `.*texto.*`
generados por el componente se muestran como texto, sin cambiar su valor. Otros patrones se muestran
completos. Un campo desconocido se muestra con su `name` y su valor para que pueda quitarse;
una opción desconocida muestra su valor. Si el modelo repite un campo, se muestra su último valor.
Las actualizaciones de la configuración también actualizan las etiquetas.

El rango de fechas conserva su contrato independiente `dateValue` / `date-change` y no forma
parte de `v-model`. No hay slots ni métodos expuestos.

Migración: los consumidores que leían `regexValue` deben leer `value`. Por ejemplo, un filtro
regex de cliente ahora emite `{ name: "customer", value: ".*Ada.*" }`. Para distinguir un patrón
de un valor exacto, consulta `regex` en la configuración del campo en `filters`.

El rango de fechas es opcional y se activa con `showDateRange`. `dateValue` usa una tupla
`[desde, hasta]` de `Date` o `string`, o `null`. El menú contiene dos `BaseDateInput`, uno por extremo;
al pulsar `Aceptar`, `date-change` emite el rango aplicado. Con `dateRangeRequired`, ambos campos son
obligatorios y el chip no muestra el control para quitarlo.

## Layout de formularios

`BaseFormSection` apila el contenido de una sección con los tokens de espaciado del formulario y
acepta un título y una descripción opcionales. `BaseFormRow` organiza sus controles en una a cuatro
columnas, permite ajustar el ancho de cada una y pasa a una columna en pantallas estrechas.

```vue
<BaseFormSection title="Conexión con Shopify">
  <BaseFormRow>
    <BaseInput label="URL de Shopify" />
    <BaseInput label="API key" />
  </BaseFormRow>
  <BaseInput label="API secret" />
</BaseFormSection>
```

Para ajustar los anchos, pasa un valor CSS por columna. La cantidad de valores debe coincidir con
`columns`:

```vue
<BaseFormRow :columns="3" :column-widths="['1fr', '2fr', '1fr']">
  <BaseInput label="Código" />
  <BaseInput label="Descripción" />
  <BaseInput label="Estado" />
</BaseFormRow>
```

Ambos componentes solo exponen su slot predeterminado; no tienen modelos, eventos ni métodos.

| Componente        | Prop           | Tipo                   | Predeterminado | Descripción                                              |
| ----------------- | -------------- | ---------------------- | -------------- | -------------------------------------------------------- |
| `BaseFormSection` | `title`        | `string`               | `""`           | Título opcional de la sección.                           |
| `BaseFormSection` | `description`  | `string`               | `""`           | Descripción opcional debajo del título.                  |
| `BaseFormSection` | `titleAs`      | `"h2" \| "h3" \| "h4"` | `"h3"`         | Nivel semántico del título.                              |
| `BaseFormRow`     | `columns`      | `1 \| 2 \| 3 \| 4`     | `2`            | Número de columnas antes del breakpoint móvil.           |
| `BaseFormRow`     | `columnWidths` | `readonly string[]`    | `[]`           | Ancho CSS de cada columna; debe coincidir con `columns`. |

## BaseAlert

`BaseAlert` muestra un aviso en tono suave. El título y la descripción son opcionales y se pueden
combinar con contenido adicional. `danger` y `warning` usan `role="alert"`; los demás tonos usan
`role="status"`.

```vue
<BaseAlert
  tone="warning"
  title="Revisa los datos"
  description="Algunos campos necesitan atención."
  icon="alertTriangle"
  dismissible
  @dismiss="showWarning = false"
>
  <a href="#formulario">Ir al formulario</a>
</BaseAlert>
```

| Prop          | Tipo                                                          | Predeterminado   | Descripción                                                          |
| ------------- | ------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------- |
| `title`       | `string`                                                      | `""`             | Título opcional del aviso.                                           |
| `description` | `string`                                                      | `""`             | Descripción opcional.                                                |
| `tone`        | `"danger" \| "warning" \| "info" \| "primary" \| "secondary"` | `"info"`         | Tono semántico y rol accesible asociado.                             |
| `icon`        | `string`                                                      | `""`             | Nombre de un icono disponible en `BaseIcon`, junto a la descripción. |
| `dismissible` | `boolean`                                                     | `false`          | Muestra un botón de cierre que emite `dismiss`.                      |
| `closeLabel`  | `string`                                                      | `"Cerrar aviso"` | Nombre accesible del botón de cierre.                                |

El slot predeterminado añade contenido debajo de la descripción. El slot `icon` reemplaza el icono
de la prop `icon`.

## Breadcrumb

`BaseBreadcrumb` representa una ruta jerárquica compacta. Los elementos anteriores al último usan
el `RouterLink` registrado por Vue Router cuando incluyen `to`; el último siempre representa la
página actual y no es navegable. El componente no añade `vue-router` como dependencia.

```vue
<script setup>
import { BaseBreadcrumb } from "@joaquinn6/jnv-ui-components";

const breadcrumbs = [
  { name: "Inicio", to: { name: "home" } },
  { name: "Configuración", to: { path: "/settings" } },
  {
    name: "Direcciones",
    to: { name: "address-book", query: { page: 1 } },
  },
  { name: "Editar dirección" },
];
</script>

<template>
  <BaseBreadcrumb
    :value="breadcrumbs"
    divider="/"
    size="md"
    weight="semibold"
  />
</template>
```

| Prop        | Tipo                            | Predeterminado       | Descripción                                                                                     |
| ----------- | ------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `value`     | `readonly BaseBreadcrumbItem[]` | —                    | Elementos jerárquicos. `name` es el texto y `to` acepta una ubicación válida para `RouterLink`. |
| `divider`   | `string`                        | `/`                  | Separador visual entre elementos; queda oculto para tecnologías de asistencia.                  |
| `ariaLabel` | `string`                        | `Ruta de navegación` | Nombre accesible del `nav`.                                                                     |

`BaseBreadcrumbItem.to` admite strings y objetos de ruta, incluidos `name`, `path`, `params` y
`query`. Los elementos previos sin `to` se muestran como texto neutro. Con un único elemento se
muestra solamente la página actual. El componente no expone eventos, modelos, slots ni métodos.

`size` acepta `sm`, `md`, `label` y `xl`, y controla el tamaño tipográfico de los elementos y
separadores. `weight` acepta `regular`, `medium`, `semibold` y `bold`, y controla su grosor.

## Stepper

`BaseStepper` representa el progreso de un flujo mediante pasos ordenados. El componente es
controlado: recibe el valor del paso actual con `v-model` y nunca modifica el arreglo `steps`.

```vue
<script setup>
import { ref } from "vue";
import { BaseStepper } from "@joaquinn6/jnv-ui-components";

const currentStep = ref("order");
const steps = [
  {
    value: "order",
    label: "Pedido",
    description: "Identifica el pedido que quieres gestionar.",
  },
  {
    value: "shipping",
    label: "Envío",
    description: "Selecciona el método de envío.",
  },
  {
    value: "confirmation",
    label: "Confirmación",
    disabled: true,
  },
];
</script>

<template>
  <BaseStepper
    v-model="currentStep"
    :steps="steps"
    variant="circles"
    description="Completa los datos para continuar."
    navigable
    @step-change="
      ({ value, previousValue }) => console.log(previousValue, value)
    "
  />
</template>
```

Las variantes disponibles son `circles`, `bars`, `pills` y `vertical`. Las tres variantes
horizontales permiten desplazamiento lateral cuando sus pasos no caben en el contenedor. El paso
actual usa el color primario, los anteriores el estado success y los posteriores los colores
muted/default del tema.

| Prop                       | Tipo                                   | Predeterminado          | Descripción                                                                                 |
| -------------------------- | -------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------- |
| `modelValue`               | `string \| number`                     | —                       | `value` del paso actual.                                                                    |
| `steps`                    | `BaseStepperStep[]`                    | —                       | Pasos con `value`, `label`, `description?` y `disabled?`; cada `value` debe ser único.      |
| `variant`                  | `circles \| bars \| pills \| vertical` | `circles`               | Diseño visual del stepper.                                                                  |
| `navigable`                | `boolean`                              | `false`                 | Convierte los pasos habilitados en controles interactivos.                                  |
| `showStepDescriptions`     | `boolean`                              | `false`                 | Muestra las descripciones bajo los labels; si es false, se presentan mediante tooltip.      |
| `description`              | `string`                               | `""`                    | Descripción general del flujo.                                                              |
| `descriptionPosition`      | `top \| bottom`                        | `top`                   | Posición de la descripción general.                                                         |
| `ariaLabel`                | `string`                               | `Progreso`              | Nombre accesible de la navegación.                                                          |
| `stepDescriptionAriaLabel` | `string`                               | `Información adicional` | Prefijo accesible de los controles que muestran la descripción individual mediante tooltip. |

### Modelo y eventos

- `v-model` / `update:modelValue`: valor estable del paso solicitado.
- `step-change`: `{ value, previousValue, step, index }` al activar un paso diferente y habilitado.
- No se emiten cambios al activar el paso actual, un paso con `disabled: true` o cuando
  `navigable` es `false`.

El componente no decide qué pasos puede visitar el usuario. El consumidor debe marcar como
`disabled` los pasos bloqueados por sus reglas de validación. Si `modelValue` no coincide con un
paso, todos se muestran como pendientes y el componente no corrige el modelo automáticamente.

`BaseStepper` no expone slots ni métodos públicos.

## Tablas

Ademas de paginar, ordenar y seleccionar, `BaseTable` puede gestionar filas de alta, edicion y eliminacion mediante sus props CRUD.

`BaseTable` presenta datos tabulares con columnas configurables, slots de encabezado y celda,
ordenamiento, paginación local o remota y selección opcional de filas. Usa una tabla HTML semántica
y muestra una superficie de carga cuando recibe `loading`.

La directiva `v-loading` se registra internamente en `BaseTable`; el consumidor no necesita
importarla ni registrarla en la aplicación para usar la tabla. Para aplicarla en otros elementos,
puede importar la exportación pública `loading` como se muestra en la sección de la directiva.

| Prop                         | Tipo                         | Predeterminado                   | Descripción                                                                                                    |
| ---------------------------- | ---------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `rows`                       | `Array`                      | —                                | Filas. En modo local contiene toda la colección; en modo remoto, solo la página actual.                        |
| `columns`                    | `Array`                      | —                                | Columnas. Cada una requiere `key` y `label`; admite `field`, `formatter`, `align`, `headerAlign` y `sortable`. |
| `totalItems`                 | `number`                     | —                                | Total de elementos para calcular páginas y resumen.                                                            |
| `pageSize`                   | `number`                     | —                                | Elementos por página.                                                                                          |
| `page`                       | `number`                     | `1`                              | Página controlada actualmente.                                                                                 |
| `paginationMode`             | `local \| remote`            | `local`                          | Pagina y ordena internamente, o delega esas operaciones al consumidor.                                         |
| `rowKey`                     | `string \| Function`         | `id`                             | Propiedad o función que identifica cada fila.                                                                  |
| `loading`                    | `boolean`                    | `false`                          | Deshabilita acciones y muestra la carga.                                                                       |
| `caption`                    | `string`                     | `Tabla de datos`                 | Descripción accesible de la tabla.                                                                             |
| `emptyText`                  | `string`                     | `No hay elementos para mostrar.` | Texto del estado vacío.                                                                                        |
| `sort`                       | `{ key, direction } \| null` | `null`                           | Orden controlado; `direction` puede ser `asc` o `desc`.                                                        |
| `selectable`                 | `boolean`                    | `false`                          | Muestra selección por fila y selección de filas visibles.                                                      |
| `selectedRows`               | `Array`                      | `[]`                             | Filas seleccionadas de forma controlada.                                                                       |
| `clearSelectionOnPageChange` | `boolean`                    | `false`                          | Limpia la selección cuando cambia `page`.                                                                      |

Cada columna puede definirse así:

```js
{
  key: 'date',
  label: 'Fecha',
  field: (row) => row.createdAt,
  formatter: (value, row, rowIndex) => formatDate(value),
  sortable: true,
  required: true,
  requiredMessage: 'La fecha es obligatoria.',
  align: 'left',
  headerAlign: 'left',
}
```

`field` acepta el nombre de una propiedad o una función que recibe la fila. Si se omite, se usa
`row[key]`. `formatter` solo modifica el contenido predeterminado; el slot recibe el valor sin
formatear.

Props CRUD adicionales:

| Prop        | Tipo      | Predeterminado | DescripciÃ³n                             |
| ----------- | --------- | -------------- | ---------------------------------------- |
| `addable`   | `boolean` | `false`        | Muestra una fila para agregar registros. |
| `editable`  | `boolean` | `false`        | Permite editar registros.                |
| `deletable` | `boolean` | `false`        | Permite eliminar registros.              |

### Eventos y modelos

- `v-model:page` / `update:page`: página solicitada.
- `page-change`: `{ page, pageSize }`, útil para solicitar una página remota.
- `v-model:sort` / `update:sort`: orden solicitado o `null` al quitarlo.
- `sort-change`: el nuevo ordenamiento.
- `v-model:selected-rows` / `update:selectedRows`: filas seleccionadas.
- `selection-change`: la nueva colección de filas seleccionadas.

### Eventos CRUD

- `add`: recibe `(draftRow, done)` cuando la fila de alta es vÃ¡lida.
- `add-invalid`: recibe `{ [columnKey]: message }` cuando faltan campos requeridos.
- `add-start` y `add-cancel`: inicio o cancelaciÃ³n de la fila de alta.
- `edit`: recibe `(draftRow, done)` para guardar una ediciÃ³n.
- `edit-start` y `edit-cancel`: inicio o cancelaciÃ³n de una ediciÃ³n.
- `delete`: recibe la fila que se solicitÃ³ eliminar.

### Slots

- `header-{key}`: contenido del encabezado; recibe `column`.
- `cell-{key}`: contenido de una celda; recibe `row`, `value`, `rowIndex` y `column`.
- `add-cell-{key}`: recibe `row`, `column`, `cancel`, `required`, `invalid` y `error`.
- `edit-cell-{key}`: recibe `row`, `originalRow`, `value`, `rowIndex`, `column` y `cancel`.
- `empty`: reemplaza el estado vacío.
- `pagination-summary`: recibe `start`, `end`, `visibleCount` y `totalItems`.
- `selection-summary`: recibe `selectedCount`.

### Alta, ediciÃ³n y validaciÃ³n

Cuando una columna tiene `required: true`, `BaseTable` valida su valor antes de emitir `add`.
Considera faltantes `null`, `undefined`, cadenas vacÃ­as y arreglos vacÃ­os; `0` es vÃ¡lido.

```vue
<BaseTable
  :rows="rows"
  :columns="columns"
  :total-items="rows.length"
  :page-size="10"
  addable
  @add="addRow"
>
  <template #add-cell-product="{ row, required, invalid }">
    <BaseInput
      v-model="row.product"
      :required="required"
      :state="invalid ? 'error' : 'default'"
      placeholder="Producto"
    />
  </template>
</BaseTable>
```

### Ejemplo completo: paginación remota

En modo remoto, el consumidor solicita los datos cuando cambia la página o el ordenamiento:

```vue
<script setup>
import { ref, watch } from "vue";
import { BaseTable, BaseText } from "@joaquinn6/jnv-ui-components";

const page = ref(1);
const sort = ref({ key: "date", direction: "desc" });
const selectedRows = ref([]);
const shipments = ref([]);
const totalItems = ref(0);
const loading = ref(false);

const columns = [
  { key: "reference", label: "Referencia" },
  {
    key: "destination",
    label: "Destino",
    field: (row) => row.destination?.city,
  },
  { key: "date", label: "Fecha", field: "createdAt", sortable: true },
  { key: "status", label: "Estado" },
];

watch(
  [page, sort],
  async ([nextPage, nextSort]) => {
    loading.value = true;

    try {
      const response = await fetchShipments({ page: nextPage, sort: nextSort });
      shipments.value = response.data;
      totalItems.value = response.total;
    } finally {
      loading.value = false;
    }
  },
  { immediate: true, deep: true },
);

function handlePageChange({ page: nextPage }) {
  page.value = nextPage;
}

function handleSortChange(nextSort) {
  sort.value = nextSort;
  page.value = 1;
}
</script>

<template>
  <BaseTable
    v-model:page="page"
    v-model:sort="sort"
    v-model:selected-rows="selectedRows"
    :rows="shipments"
    :columns="columns"
    :total-items="totalItems"
    :page-size="10"
    :loading="loading"
    pagination-mode="remote"
    row-key="id"
    caption="Historial de envíos"
    selectable
    @page-change="handlePageChange"
    @sort-change="handleSortChange"
  >
    <template #cell-reference="{ row }">
      <BaseText color="heading" weight="bold">{{ row.reference }}</BaseText>
    </template>

    <template #cell-status="{ value }">
      <BaseText variant="label" color="muted">{{ value }}</BaseText>
    </template>

    <template #pagination-summary="{ start, end, totalItems }">
      <BaseText variant="label" color="muted">
        Mostrando {{ start }}–{{ end }} de {{ totalItems }} envíos
      </BaseText>
    </template>

    <template #selection-summary="{ selectedCount }">
      <BaseText variant="label" color="heading"
        >{{ selectedCount }} seleccionados</BaseText
      >
    </template>
  </BaseTable>
</template>
```

Para paginación local, pasa la colección completa en `rows`, usa `pagination-mode="local"` (valor
predeterminado) y conserva `totalItems` igual a `rows.length`.

## Campos y selección

| Componente         | Props principales                                                                                                                                                                                                                     | Modelo y eventos                                                                                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BaseInput`        | `id`, `label`, `type`, `mode` (`edit`, `read`), `suffix`, `maxLength`, `maxLengthVisible`, `showPasswordAriaLabel`, `hidePasswordAriaLabel`, `info`, `infoAriaLabel`                                                                  | `v-model`, `blur` en modo edición; slot `leading`; expone `focus()`                                                                                                                                                                                                  |
| `BasePhoneInput`   | `countries` (`{ name, prefix, iso2?, flag? }[]`), `defaultCountry`, `countrySearchPlaceholder`, `countrySelectorAriaLabel`, `noResultsText`, estado común                                                                             | `v-model` E.164 como texto (`+34612345678`); emite `prefixChange` con el objeto del país seleccionado al cambiar de país; genera un campo oculto con `name`; expone `focus()`                                                                                        |
| `BaseTextarea`     | `id`, `label`, `rows`, `maxLength`, `maxLengthVisible`, estado común                                                                                                                                                                  | `v-model`, `blur`; expone `focus()`                                                                                                                                                                                                                                  |
| `BaseCheckbox`     | `id`, `name`, `label`, `labelPosition` (`"end"` o `"top"`, predeterminado `"end"`), `type` (`primary`, `secondary`, `success`, `danger`), `size`, `indeterminate`, `invalid`, `info`                                                  | `v-model` booleano; slot `label` para contenido enriquecido en la etiqueta, con `label` como fallback                                                                                                                                                                |
| `BaseRadio`        | `id`, `name`, `value`, `label` (`""`), `labelPosition` (`"top"` o `"end"`, predeterminado `"top"`), `required`, `disabled`, `invalid`                                                                                                 | `v-model`; `id`, `name` y `value` son obligatorios                                                                                                                                                                                                                   |
| `BaseRadioGroup`   | `id`, `name`, `label`, `options`, `optionLabelPosition` (`"top"` o `"end"`, predeterminado `"end"`), `orientation` (`"vertical"` o `"horizontal"`, predeterminado `"vertical"`), `bordered` (`true`), `required`, `disabled`, `error` | `v-model`; `name` y `options` son obligatorios; usa un `fieldset` semántico y agrupa el error                                                                                                                                                                        |
| `BaseSwitch`       | `id`, `label` (`""`), `labelPosition` (`"top"` o `"end"`, predeterminado `"top"`), `error`, `disabled`                                                                                                                                | `v-model` booleano; `id` es obligatorio; `error` muestra un mensaje y marca el control como inválido                                                                                                                                                                 |
| `BaseSelect`       | `id`, `label`, `name`, `placeholder`, `options` (`valor` u objeto `{ label, value, disabled? }`), `multiple` (`false`), `allowCreate` (`false`), `searchPlaceholder`, `createOptionText`, `removeOptionAriaLabel`, estado común       | `v-model` escalar o array cuando `multiple`; `allowCreate` agrega textos nuevos como strings solo en modo múltiple; genera un campo oculto JSON cuando recibe `name`; slots `leading`, `selected` y `option`; teclado: flechas, Inicio, Fin, Enter, Espacio y Escape |
| `BaseAutocomplete` | `options`, `fetchOptions`, `labelKey`, `valueKey`, `selectedLabelKey`, `minChars`, `debounceMs`, `maxSuggestions`, `allowCreate`, textos `loadingText`, `noResultsText`, `loadErrorText`, `clearAriaLabel`                            | `v-model`, `select`, `blur`; slot `leading`; expone `focus()`                                                                                                                                                                                                        |
| `BaseSignature`    | `id`, `label`, `width`, `height`, `clearAriaLabel`, `drawingInstructions`, `help`, `error`                                                                                                                                            | `v-model` con PNG data URL; se opera con puntero táctil, lápiz o ratón                                                                                                                                                                                               |

> **Migración de `BaseCheckbox`:** desde esta versión la etiqueta se muestra por defecto a la
> derecha de la casilla (`labelPosition="end"`). Para conservar la etiqueta encima, como antes,
> indica `label-position="top"` de forma explícita:
>
> ```vue
> <BaseCheckbox v-model="accepted" label="Acepto" label-position="top" />
> ```

### BaseRadioGroup

Agrupa opciones de radio dentro de un `fieldset` accesible y gestiona el error del grupo completo.

```vue
<BaseRadioGroup
  v-model="channel"
  name="channel"
  label="Canal de contacto"
  :options="[
    { value: 'email', label: 'Correo electrónico' },
    { value: 'sms', label: 'SMS' },
  ]"
  error="Selecciona un canal."
/>
```

`options` recibe objetos `{ id?, value, label, disabled? }`. `optionLabelPosition` controla la
posición del label de cada radio (`"top"` o `"end"`) y `orientation` organiza las opciones en
filas o columnas (`"vertical"` o `"horizontal"`). Emite `update:modelValue` mediante `v-model`;
no expone slots ni métodos.

`BaseSelect` usa el texto de `label` de forma predeterminada. Para personalizarlo sin alterar su
comportamiento, el slot `selected` recibe `option` y el slot `option` recibe `option`, `index`,
`selected` y `active`.

Con `multiple`, el modelo debe ser un array de valores y las opciones elegidas se muestran como
chips que pueden quitarse. `allowCreate` habilita búsqueda y creación de valores de texto; una
coincidencia exacta selecciona la opción disponible. Los valores creados permanecen disponibles
mientras viva la instancia, aunque se quiten de la selección. `searchPlaceholder` (`Buscar
opciones...`), `createOptionText` (`Crear opción`) y `removeOptionAriaLabel` (`Quitar opción
seleccionada`) permiten localizar estos controles. Si se proporciona `name`, el array se serializa
como JSON en un campo oculto.

En `BasePhoneInput`, `countries[].flag` acepta un emoji o una URI de imagen, como la ruta de un SVG.
El menú se abre hacia arriba cuando no hay suficiente espacio debajo del campo.

`BasePhoneInput` conserva el texto escrito en el número nacional y compone el modelo con el prefijo
del país; la validación del número corresponde al proyecto consumidor. Si se omite `countries`,
ofrece España (`+34`). La búsqueda encuentra países por nombre o
prefijo; al cambiar el país conserva el número nacional. Los valores iniciales permiten inferir el
país por el prefijo más largo disponible; ante prefijos compartidos se usa el primer país de la
lista. `defaultCountry` acepta ISO2, prefijo o nombre y, si se omite, se selecciona España cuando
está en la lista o el primer país disponible.

## Fecha y hora

Los siguientes wrappers comparten `id`, `name`, `label`, `placeholder`, `size`, `state`, `help`,
`error`, `success`, `required`, `disabled`, `readonly`, `tone`, `locale`, `formats`, `teleport`,
`clearAriaLabel`, `ariaLabels`, `actionRow`, `dayNames`, `weekNumbers`, `dark` e `infoAriaLabel`.
Emiten `update:modelValue`, `focus`, `blur`, `open`, `close`, `clear` e `invalid`.

| Componente          | Modelo y props específicas                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BaseDateInput`     | Fecha (`Date`, texto o número); `autoApply`, `modelType`, `minDate`, `maxDate`, `disabledDates`, `allowedDates`, `preventMinMaxNavigation`, `filters`, `pickerProps`; no muestra hora |
| `BaseDateTimeInput` | Fecha y hora; además `minTime`, `maxTime`, `disabledTimes`, `timeConfig`                                                                                                              |
| `BaseMonthInput`    | Modelo de mes; `modelType`, `minDate`, `maxDate`, `disabledDates`, `filters`                                                                                                          |
| `BaseYearInput`     | Modelo numérico de año; `minDate`, `maxDate`, `filters`                                                                                                                               |
| `BaseDatePicker`    | Wrapper de bajo nivel; recibe `pickerProps` para la configuración explícitamente soportada y `inputIcon` (`calendar` o `clock`)                                                       |

Para localización de fecha, `locale` define el idioma y `formats` el formato. `ariaLabels`,
`actionRow`, `dayNames` y `weekNumbers` se reenvían a Vue Datepicker para localizar su interfaz.
