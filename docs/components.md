# Referencia de componentes

## Convenciones comunes

`size`: `sm`, `md`, `lg` (los campos de formulario usan `sm` por defecto). `state`: `default`, `error`, `success`. `tone`: `default`, `inverse`.
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

| Componente          | Props principales                                                                                                                                                      | Modelo y eventos                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `BaseButton`        | `variant` (`primary`, `secondary`, `outline`, `ghost`, `inverse`, `danger`, `ghost-danger`), `size` (`sm`, `md`, `lg`, `icon`), `type`, `loading`, `disabled`, `block` | `click`; contenido mediante slot predeterminado                                                         |
| `BaseBadge`         | `label`, `tone` (`neutral`, `info`, `success`, `warning`, `error`, `critical`, `progress`, `violet`), `size` (`sm`, `md`), `width` (`auto`, `fixed`)                   | Slot predeterminado opcional; si existe, tiene prioridad sobre `label`                                  |
| `BaseLink`          | `href`, `target`, `rel`, `variant` (`brand`, `body`, `muted`, `inverse`), `size`, `underline` (`always`, `hover`, `none`)                                              | Sin eventos propios; contenido mediante slot predeterminado                                             |
| `BaseCard`          | `as`, `surface` (`page`, `inverse`, `primary`), `padding`, `radius`, `elevation`, `outlined`, `title`, `titlePosition` (`inside`, `outside`), `titleIcon`, `titleAs`   | Slot predeterminado                                                                                     |
| `BaseCollapse`      | `open`, `title`, `description`, `icon`, `titleAs`, `variant` (`plain`, `card`), `value`, `id`, `disabled`, `toggleAriaLabel`                                           | `v-model:open`, `toggle`; slots predeterminado, `title` y `actions`                                     |
| `BaseCollapseGroup` | `v-model`, `multiple`, `collapsible`, `variant` (`plain`, `card`)                                                                                                      | `change`; acordeón con teclado: flechas, Inicio y Fin                                                   |
| `BaseImageViewer`   | `src`, `alt`, `variant` (`default`, `thumbnail`), `radius`, `bordered`, `thumbnailSize`, `aspectRatio`, `fit`, `actions`, `texts` y opciones del visor                 | `edit`, `delete`, `download`, `copy`, `open`, `close`, `error`. Ver [BaseImageViewer](#baseimageviewer) |
| `BaseImageLightbox` | `open`, `src`, `alt`, `caption`, `downloadable`, `copyable`, `maxZoom`, `zoomStep`, `texts`                                                                            | `v-model:open`, `close`, `download`, `copy`, `zoom`                                                     |
| `BaseAlert`         | `title`, `description`, `tone`, `icon`, `dismissible`, `closeLabel`                                                                                                    | `dismiss`; slots predeterminado e `icon`                                                                |
| `BaseToast`         | `open`, `title`, `description`, `tone`, `icon`, `dismissible`, `closeLabel`, `duration`, `pauseOnHover`, `position`                                                    | `v-model:open`, `close`; slots predeterminado e `icon`                                                  |
| `BaseDialog`        | `open`, `title`, `description`, `size` (`sm`, `md`), `form`, `loading`, `closeLabel`, `closeDisabled`                                                                  | `close`, `submit`; slots predeterminado y `actions`                                                     |
| `BaseConfirmDialog` | `open`, `title`, `description`, `confirmLabel`, `cancelLabel`, `buttonSize` (`sm`, `md`, `lg`, predeterminado `sm`), `loading`, `tone` (`danger`, `primary`)           | `close`, `confirm`                                                                                      |
| `BaseHeading`       | `as`, `variant` (`hero`, `lg`, `md`, `sm`, `xs`), `color`, `align`                                                                                                     | Slot predeterminado                                                                                     |
| `BaseText`          | `as`, `variant` (`md`, `sm`, `label`, `xl`), `color`, `weight`                                                                                                         | Slot predeterminado                                                                                     |
| `BaseBreadcrumb`    | `value` (`{ name, to? }[]`), `divider`, `size` (`sm`, `md`, `label`, `xl`), `weight`, `ariaLabel`                                                                      | Sin eventos ni slots                                                                                    |
| `BaseTabs`          | `tabs` (`{ label, value, disabled?, id?, panelId? }`), `ariaLabel`                                                                                                     | `v-model`; teclado: flechas, Inicio y Fin                                                               |
| `BaseFieldInfo`     | `text`, `type`, `ariaLabel`                                                                                                                                            | Tooltip al foco o hover                                                                                 |
| `BaseDropdownMenu`  | `groups` (`{ label, event, color?, disabled?, tooltip? }[][]`)                                                                                                         | `select`; menú accesible con teclado                                                                    |
| `BaseSearchQL`      | `v-model`, `filters`, `defaultFilters`, rango de fecha opcional, textos y etiquetas accesibles, `disabled`                                                             | `update:modelValue`, `change`, `date-change`; emite filtros y el rango aplicado                         |
| `BaseIcon`          | `name`, `size` (`sm`, `md`, `lg`, `xl`), `label`, `decorative`                                                                                                         | Sin eventos; icono SVG accesible                                                                        |
| `BaseFormSection`   | `title`, `description`, `stretch`, `titleAs` (`h2`, `h3`, `h4`)                                                                                                        | Slot predeterminado; sin eventos ni métodos expuestos                                                   |
| `BaseFormRow`       | `columns` (`1`, `2`, `3`, `4`), `columnWidths`, `alignItems` (`start`, `center`, `end`, `stretch`)                                                                     | Slot predeterminado; sin eventos ni métodos expuestos                                                   |
| `BaseFormColumns`   | Sin props                                                                                                                                                              | Slot predeterminado; sin eventos ni métodos expuestos                                                   |

`BaseDropdownMenu` emite `select` con `{ item, groupIndex, itemIndex }`. Los colores disponibles
son `default`, `danger`, `success` e `info`. Para usar la directiva `v-tooltip` directamente,
regístrala opcionalmente en la aplicación:

`ghost-danger` es una variante transparente con texto e icono rojos, pensada para acciones
destructivas secundarias como eliminar una fila de una tabla.

`BaseConfirmDialog` muestra el botón de cancelar con la variante `outline`, y ambos botones usan
`buttonSize` (`sm` por defecto; antes tenían tamaño `md`). Indica `button-size="md"` para conservar
el tamaño anterior.

### BaseCard con título

`BaseCard` acepta un título opcional dentro de la superficie (`titlePosition="inside"`,
predeterminado) o fuera de ella (`"outside"`). `titleIcon` recibe cualquier nombre disponible en
`BaseIcon` y `titleAs` (`h3` por defecto) controla el nivel semántico del encabezado. Los atributos
no declarados se aplican a la superficie de la tarjeta, también cuando el título está fuera.

```vue
<BaseCard title="Datos del remitente" title-icon="location">
  <BaseInput label="Nombre completo" />
</BaseCard>

<BaseCard title="Integraciones" title-position="outside">
  <BaseInput label="URL de la tienda" />
</BaseCard>
```

Sin `title`, `BaseCard` conserva su estructura y comportamiento actuales.

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

### BaseIcon

Icono SVG de contorno (`viewBox` 24×24, `stroke="currentColor"`) que hereda el color del texto.
Usa `decorative` cuando acompaña a un texto visible y `label` cuando el icono transmite
información por sí mismo.

```vue
<BaseIcon name="github" size="sm" decorative />
<BaseIcon name="alertTriangle" size="lg" label="Advertencia" />
```

| Prop         | Tipo                     | Predeterminado | Descripción                                                                                |
| ------------ | ------------------------ | -------------- | ------------------------------------------------------------------------------------------ |
| `name`       | `BaseIconName \| string` | —              | Nombre del icono. Un nombre desconocido produce un aviso del validator y no dibuja trazos. |
| `size`       | `sm \| md \| lg \| xl`   | `md`           | Tamaño, según los tokens `--icon-size-*`.                                                  |
| `label`      | `string`                 | `""`           | Etiqueta accesible; añade `role="img"` y `aria-label`.                                     |
| `decorative` | `boolean`                | `false`        | Oculta el icono a tecnologías de asistencia aunque exista `label`.                         |

Sin `label`, o con `decorative`, el icono se marca con `aria-hidden="true"`. No emite eventos ni
expone modelos, slots o métodos.

El tipo `BaseIconName` reúne los nombres disponibles y ofrece autocompletado; `BaseIconProps.name`
sigue aceptando cualquier `string` por compatibilidad. Nombres disponibles:

| Grupo               | Nombres                                                                                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Navegación          | `menu`, `moreVertical`, `close`, `search`, `arrowLeft`, `arrowRight`, `chevronDown`, `chevronLeft`, `chevronRight`, `externalLink`, `home`                                                                                                                                                                                           |
| Acciones            | `plus`, `edit`, `trash`, `copy`, `clipboard`, `download`, `upload`, `send`, `printer`, `sort`, `check`, `settings`, `loader`, `zoomIn`, `zoomOut`, `maximize`                                                                                                                                                                        |
| Estado              | `info`, `help`, `alertTriangle`, `circleCheck`, `circleX`, `bell`, `lock`, `shield`, `eye`, `eyeOff`, `clock`, `calendar`                                                                                                                                                                                                            |
| Personas            | `user`, `circleUser`, `support`, `mail`, `message`, `smartphone`, `monitor`, `camera`                                                                                                                                                                                                                                                |
| Comercio            | `cart`, `card`, `bank`, `piggyBank`, `receipt`, `tag`, `package`, `truck`, `weight`, `location`, `map`, `building`                                                                                                                                                                                                                   |
| Contenido           | `grid`, `list`, `bolt`, `code`, `briefcase`, `graduationCap`, `languages`, `file`                                                                                                                                                                                                                                                    |
| Tema                | `sun`, `moon`                                                                                                                                                                                                                                                                                                                        |
| Marcas y otros      | `logo`, `facebook`, `twitter`, `twitterX`, `github`, `linkedin`, `whatsapp`, `instagram`, `tiktok`, `youtube`, `telegram`, `pinterest`, `discord`, `threads`, `snapchat`, `messenger`, `reddit`, `twitch`, `spotify`, `google`, `apple`, `paypal`                                                                                    |
| Contacto            | `phone`, `globe`, `share`, `link`, `users`, `userPlus`, `star`, `heart`                                                                                                                                                                                                                                                              |
| Animales            | `pawPrint`, `dog`, `cat`, `bird`, `fish`, `rabbit`, `turtle`, `horse`, `pig`, `bone`                                                                                                                                                                                                                                                 |
| Salud y veterinaria | `syringe`, `pill`, `pillBottle`, `tablets`, `stethoscope`, `heartPulse`, `thermometer`, `microscope`, `testTube`, `bandage`, `hospital`, `ambulance`, `scissors`, `bath`, `showerHead`, `clipboardPlus`, `calendarCheck`, `calendarClock`, `calendarPlus`                                                                            |
| Inventario          | `warehouse`, `boxes`, `barcode`, `scanBarcode`, `qrCode`, `clipboardList`, `clipboardCheck`, `packageCheck`, `packagePlus`, `packageMinus`, `packageX`, `packageSearch`, `packageOpen`, `forklift`, `container`, `store`, `factory`, `scale`, `ruler`, `layers`, `archive`, `filter`, `refresh`, `arrowLeftRight`, `history`, `hash` |
| Finanzas y reportes | `trendingUp`, `trendingDown`, `chartBar`, `chartPie`, `fileSpreadsheet`, `fileText`, `dollarSign`, `percent`, `shoppingBag`, `wallet`, `handCoins`                                                                                                                                                                                   |

Los trazados de `github`, `linkedin`, `sun`, `moon`, `languages`, `externalLink`, `code`,
`briefcase`, `graduationCap`, `zoomIn`, `zoomOut`, `maximize`, `trash` y los grupos Contacto, Animales, Salud y
veterinaria, Inventario y Finanzas y reportes están adaptados de [Lucide](https://lucide.dev)
(licencia ISC), salvo `horse` y `pig`. Estos dos y `whatsapp`, `instagram`, `tiktok`, `youtube`,
`telegram`, `twitterX`, `pinterest`, `discord`, `threads`, `snapchat`, `messenger`, `reddit`,
`twitch`, `spotify`, `google`, `apple` y `paypal` están adaptados de
[Tabler Icons](https://tabler.io/icons) (licencia MIT). La atribución se distribuye en `NOTICE`.

## BaseCollapse

Sección colapsable con cabecera clicable y contenido que se expande con una animación de altura.
Tiene dos diseños: `plain` (predeterminado, sin card: solo una línea divisoria inferior) y `card`
(sobre `BaseCard` con borde y elevación). Varias secciones dentro de `BaseCollapseGroup` forman un
acordeón.

```vue
<BaseCollapse v-model:open="open" title="Notas del pedido">
  <BaseText>Las notas son visibles para todo el equipo.</BaseText>
</BaseCollapse>

<BaseCollapseGroup v-model="activo" variant="card">
  <BaseCollapse value="envio" title="Envío">…</BaseCollapse>
  <BaseCollapse value="pago" title="Pago">…</BaseCollapse>
</BaseCollapseGroup>
```

### Props de BaseCollapse

| Prop              | Tipo                   | Predeterminado                                   | Descripción                                                                                    |
| ----------------- | ---------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `open`            | `boolean`              | `false`                                          | Estado abierto (`v-model:open`). Funciona también sin v-model. Se ignora dentro de un grupo    |
| `title`           | `string`               | `""`                                             | Título de la cabecera                                                                          |
| `description`     | `string`               | `""`                                             | Texto secundario bajo el título; se asocia al botón con `aria-describedby`                     |
| `icon`            | `string`               | `""`                                             | Nombre de un icono de `BaseIcon` mostrado antes del título (decorativo)                        |
| `titleAs`         | `"h2" \| "h3" \| "h4"` | `"h3"`                                           | Elemento de encabezado que envuelve el botón                                                   |
| `variant`         | `"plain" \| "card"`    | `undefined` (hereda del grupo; si no, `"plain"`) | Diseño sin card o con card                                                                     |
| `value`           | `string \| number`     | `""` (se genera un id único)                     | Identificador del ítem dentro de `BaseCollapseGroup`; indícalo para usar `v-model` en el grupo |
| `id`              | `string`               | `""` (se genera uno único)                       | Base de los ids del botón (`{id}-trigger`) y del panel (`{id}-panel`)                          |
| `disabled`        | `boolean`              | `false`                                          | Deshabilita el botón; el estado tampoco cambia con los métodos expuestos                       |
| `toggleAriaLabel` | `string`               | `""`                                             | Nombre accesible del botón; úsalo cuando el slot `title` no tenga texto                        |

Los atributos no declarados (`class`, `data-*`, etc.) se aplican al elemento raíz.

### Props de BaseCollapseGroup

| Prop          | Tipo                                               | Predeterminado | Descripción                                                                |
| ------------- | -------------------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| `modelValue`  | `string \| number \| (string \| number)[] \| null` | `null`         | Valor del ítem abierto o, con `multiple`, arreglo de valores abiertos      |
| `multiple`    | `boolean`                                          | `false`        | Permite varios ítems abiertos a la vez                                     |
| `collapsible` | `boolean`                                          | `true`         | Sin `multiple`, permite cerrar el ítem abierto y dejar todos cerrados      |
| `variant`     | `"plain" \| "card"`                                | `"plain"`      | Diseño de los ítems sin `variant` propio; `card` los separa con un espacio |

### Modelos y eventos

| Componente          | Nombre                   | Payload                                              | Cuándo se emite                                             |
| ------------------- | ------------------------ | ---------------------------------------------------- | ----------------------------------------------------------- |
| `BaseCollapse`      | `v-model:open`           | `boolean`                                            | Al abrir o cerrar la sección (también dentro de un grupo)   |
| `BaseCollapse`      | `toggle`                 | `boolean` (nuevo estado)                             | Al abrir o cerrar la sección                                |
| `BaseCollapseGroup` | `v-model` (`modelValue`) | `string \| number \| null`, o arreglo con `multiple` | Al abrir o cerrar un ítem; nunca modifica el valor recibido |
| `BaseCollapseGroup` | `change`                 | `{ value, open }`                                    | Al abrir o cerrar un ítem                                   |

Sin `v-model`, ambos componentes conservan el estado internamente.

### Slots y métodos expuestos

- `BaseCollapse`: slot predeterminado (contenido, recibe `{ open }`), `title` (reemplaza el título
  dentro del botón, recibe `{ open }`) y `actions` (contenido de la cabecera fuera del botón, como
  badges o botones; recibe `{ open }`). Expone `expand()`, `collapse()` y `toggle()`.
- `BaseCollapseGroup`: slot predeterminado con los `BaseCollapse`. Sin métodos expuestos.

### Teclado y accesibilidad

- Sigue el patrón de acordeón de WAI-ARIA: un `<button>` con `aria-expanded` y `aria-controls`
  dentro del encabezado `titleAs`, y un panel `role="region"` etiquetado por el botón.
- `Enter` y `Espacio` abren y cierran la sección. El contenido cerrado queda oculto
  (`visibility: hidden`) y no recibe foco.
- Dentro de `BaseCollapseGroup`, `↑`/`↓` mueven el foco entre cabeceras habilitadas (de forma
  circular) e `Inicio`/`Fin` van a la primera y la última.
- Con `prefers-reduced-motion: reduce` se desactivan las animaciones.

## BaseImageViewer

Muestra una imagen recibida por props en dos variantes:

- `thumbnail`: miniatura cuadrada (`thumbnailSize`) que abre el visor ampliado al hacer click.
- `default`: ocupa el ancho del contenedor y, al pasar el puntero o al recibir el foco, muestra de
  una a cuatro acciones: editar, eliminar, ampliar y descargar.

`radius` controla lo redondeado de ambas variantes, desde `none` hasta `full` (círculo en la
miniatura). El visor ampliado es `BaseImageLightbox`, que también puede usarse de forma
independiente.

```vue
<BaseImageViewer variant="thumbnail" :src="foto" alt="Perro" radius="full" />

<BaseImageViewer
  :src="foto"
  alt="Perro"
  :actions="['edit', 'delete', 'expand', 'download']"
  @edit="editarFoto"
  @delete="eliminarFoto"
/>
```

### Props de BaseImageViewer

| Prop            | Tipo                                               | Predeterminado    | Descripción                                                                                                |
| --------------- | -------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `src`           | `string`                                           | — (obligatoria)   | URL de la imagen                                                                                           |
| `alt`           | `string`                                           | `""`              | Texto alternativo; usa `""` solo para imágenes decorativas                                                 |
| `variant`       | `"default" \| "thumbnail"`                         | `"default"`       | Versión normal a ancho completo o miniatura                                                                |
| `radius`        | `"none" \| "sm" \| "md" \| "lg" \| "full"`         | `"md"`            | Radio del borde (`--radius-sm/md/lg`; `full` usa `--radius-round`)                                         |
| `thumbnailSize` | `"sm" \| "md" \| "lg"`                             | `"md"`            | Lado de la miniatura: `--jnv-image-viewer-thumbnail-{sm,md,lg}` (3, 4.5 y 6 rem)                           |
| `aspectRatio`   | `string`                                           | `""`              | Relación de aspecto CSS de la versión normal (p. ej. `"16 / 9"`); vacío conserva la altura natural         |
| `fit`           | `"cover" \| "contain"`                             | `"cover"`         | Ajuste de la imagen dentro de su caja                                                                      |
| `actions`       | `("edit" \| "delete" \| "expand" \| "download")[]` | `["expand"]`      | Acciones de la versión normal, en el orden indicado; se ignoran duplicados                                 |
| `bordered`      | `boolean`                                          | `false`           | Añade un borde del color principal (`--jnv-image-viewer-border-color` y `--jnv-image-viewer-border-width`) |
| `previewable`   | `boolean`                                          | `true`            | La miniatura abre el visor al hacer click; con `false` solo se muestra                                     |
| `downloadable`  | `boolean`                                          | `true`            | Muestra el botón de descarga en el visor ampliado                                                          |
| `copyable`      | `boolean`                                          | `false`           | Muestra el botón de copiar en el visor ampliado (si el navegador lo permite)                               |
| `downloadName`  | `string`                                           | `""`              | Nombre del archivo descargado; vacío usa el nombre de la URL o `imagen`                                    |
| `maxZoom`       | `number`                                           | `4`               | Zoom máximo del visor (`1` = imagen ajustada a la pantalla)                                                |
| `zoomStep`      | `number`                                           | `0.5`             | Incremento de cada paso de zoom                                                                            |
| `caption`       | `string`                                           | `""`              | Título visible en la barra del visor; también lo etiqueta                                                  |
| `texts`         | `BaseImageViewerTexts`                             | textos en español | Sustituye cualquier texto visible o accesible (ver abajo)                                                  |

Los atributos no declarados (`class`, `data-*`, etc.) se aplican al elemento raíz: `<figure>` en
la versión normal, y `<button>` (o `<span>` sin `previewable`) en la miniatura.

### Props de BaseImageLightbox

`open` (`v-model:open`, `false`), `src` (obligatoria), `alt`, `caption`, `downloadable` (`true`),
`copyable` (`false`), `downloadName`, `maxZoom` (`4`), `zoomStep` (`0.5`) y `texts`, con el mismo
significado que en `BaseImageViewer`.

### Textos (`texts`)

| Clave                                         | Predeterminado                                                                        | Uso                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `edit`, `delete`, `expand`, `download`        | `"Editar imagen"`, `"Eliminar imagen"`, `"Ver imagen ampliada"`, `"Descargar imagen"` | Etiquetas y tooltips de las acciones; `download` también en el visor |
| `open`                                        | `"Ver imagen"`                                                                        | Etiqueta accesible de la miniatura                                   |
| `actionsLabel`                                | `"Acciones de la imagen"`                                                             | Etiqueta del grupo de acciones                                       |
| `loadError`                                   | `"No se pudo cargar la imagen"`                                                       | Estado de error de carga                                             |
| `dialogLabel`                                 | `"Visor de imagen"`                                                                   | Etiqueta del visor cuando no hay `caption`                           |
| `close`                                       | `"Cerrar visor"`                                                                      | Botón de cierre                                                      |
| `zoomIn`, `zoomOut`, `resetZoom`, `zoomLevel` | `"Acercar"`, `"Alejar"`, `"Restablecer zoom"`, `"Nivel de zoom"`                      | Controles e indicador de zoom                                        |
| `copy`, `copied`, `copyError`                 | `"Copiar imagen"`, `"Imagen copiada"`, `"No se pudo copiar la imagen"`                | Botón de copiar y su resultado                                       |
| `downloadError`                               | `"No se pudo descargar la imagen"`                                                    | Error al descargar                                                   |

### Eventos

| Componente          | Evento                  | Payload                  | Cuándo se emite                                                               |
| ------------------- | ----------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| `BaseImageViewer`   | `edit`, `delete`        | `{ src }`                | Al pulsar la acción; el componente no hace nada más                           |
| `BaseImageViewer`   | `download`              | `{ src }`                | Al pulsar descargar, en la imagen o en el visor, antes de iniciar la descarga |
| `BaseImageViewer`   | `copy`                  | `{ success: boolean }`   | Tras intentar copiar desde el visor                                           |
| `BaseImageViewer`   | `open`, `close`         | —                        | Al abrir y cerrar el visor ampliado                                           |
| `BaseImageViewer`   | `error`                 | `Event`                  | Si la imagen no se puede cargar                                               |
| `BaseImageLightbox` | `v-model:open`, `close` | `boolean`, —             | Al cerrar con el botón, `Escape` o el navegador                               |
| `BaseImageLightbox` | `download`, `copy`      | `{ src }`, `{ success }` | Igual que en `BaseImageViewer`                                                |
| `BaseImageLightbox` | `zoom`                  | `number`                 | Cada vez que cambia el nivel de zoom                                          |

### Slots y métodos expuestos

- `BaseImageViewer`: `actions` (botones adicionales tras los integrados) y `fallback` (contenido
  cuando la imagen no carga; por defecto, un icono y `texts.loadError`). Expone `openPreview()` y
  `closePreview()`.
- `BaseImageLightbox`: sin slots ni métodos expuestos.

### Teclado y accesibilidad

- Las acciones se muestran al pasar el puntero o cuando el foco está dentro de la imagen; en
  dispositivos táctiles están siempre visibles. Son botones con etiqueta y tooltip.
- El visor es un `<dialog>` modal centrado, con el mismo estilo que `BaseDialog`: al abrirse enfoca
  el botón de cerrar; `Escape` o un click fuera del modal lo cierran y el foco vuelve al control
  que lo abrió.
- Zoom: botones, rueda del ratón (centrada en el puntero), doble click (alterna 100 %/200 %) y
  teclas `+`/`=`, `-` y `0` (restablecer). Con zoom, la imagen se arrastra con el puntero o se
  desplaza con las flechas. El nivel se anuncia en una región `role="status"`.
- Con `prefers-reduced-motion: reduce` se desactivan las transiciones.

### Descarga, copia y CORS

La descarga obtiene la imagen con `fetch` para guardarla con `downloadName`. Si el servidor no
permite CORS, se abre la URL directamente y el navegador decide si la descarga o la muestra.
Copiar requiere la API de portapapeles (contexto seguro) y que la imagen permita CORS. La imagen
se copia como PNG. Si falla, se emite `copy` con `success: false` y se anuncia `texts.copyError`.

## Directiva `v-tooltip`

La exportación `tooltip` muestra un texto de ayuda al pasar el ratón o al enfocar el elemento con
el teclado. Recibe un `string`; un valor vacío o que no sea texto no crea el tooltip. El tooltip
se inserta en `document.body` con `role="tooltip"`, se asocia al elemento mediante
`aria-describedby` (conservando los identificadores previos) y alterna `hidden` y `aria-hidden`
según su visibilidad.

```vue
<script setup>
import { tooltip as vTooltip } from "@joaquinn6/jnv-ui-components";
</script>

<template>
  <button type="button" v-tooltip="'Guardar cambios'">Guardar</button>
  <button type="button" v-tooltip:bottom="'Abre hacia abajo'">Ayuda</button>
</template>
```

| Argumento | Tipo               | Predeterminado | Descripción                                                              |
| --------- | ------------------ | -------------- | ------------------------------------------------------------------------ |
| `arg`     | `TooltipPlacement` | `top`          | Lado preferido: `top` (`v-tooltip:top`) o `bottom` (`v-tooltip:bottom`). |

Volteo automático: si el tooltip no cabe en el lado preferido dentro del viewport (con un margen
de 8 px), se coloca en el lado opuesto; si tampoco cabe allí, usa el lado con más espacio. La
posición se recalcula al hacer scroll y al cambiar el tamaño de la ventana. Sin argumento, el
comportamiento cuando hay espacio arriba es el mismo que en versiones anteriores. Un argumento
distinto de `top` o `bottom` se trata como `top`.

El lado final se expone en el elemento del tooltip como `data-placement="top|bottom"`. Los estilos
de la biblioteca lo usan para orientar la flecha y el desplazamiento de entrada; con
`prefers-reduced-motion: reduce`, el tooltip solo cambia de opacidad.

La directiva se exporta con el tipo público `TooltipDirective`. No emite eventos ni expone
modelos, slots o métodos. Al desmontarse, elimina el tooltip, sus listeners y restaura el
`aria-describedby` original.

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
columnas, permite ajustar el ancho de cada una, alinear verticalmente sus celdas y pasa a una columna
en pantallas estrechas.

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

| Componente        | Prop           | Tipo                                        | Predeterminado | Descripción                                                |
| ----------------- | -------------- | ------------------------------------------- | -------------- | ---------------------------------------------------------- |
| `BaseFormSection` | `title`        | `string`                                    | `""`           | Título opcional de la sección.                             |
| `BaseFormSection` | `description`  | `string`                                    | `""`           | Descripción opcional debajo del título.                    |
| `BaseFormSection` | `stretch`      | `boolean`                                   | `false`        | Ocupa la altura disponible para igualar columnas vecinas.  |
| `BaseFormSection` | `titleAs`      | `"h2" \| "h3" \| "h4"`                      | `"h3"`         | Nivel semántico del título.                                |
| `BaseFormRow`     | `columns`      | `1 \| 2 \| 3 \| 4`                          | `2`            | Número de columnas antes del breakpoint móvil.             |
| `BaseFormRow`     | `columnWidths` | `readonly string[]`                         | `[]`           | Ancho CSS de cada columna; debe coincidir con `columns`.   |
| `BaseFormRow`     | `alignItems`   | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"`    | Alineación vertical de los controles dentro de cada celda. |

`alignItems="center"` también centra verticalmente casillas y switches con `labelPosition="end"`
respecto a los campos vecinos.

## BaseFormColumns

`BaseFormColumns` coloca dos contenidos en columnas con el mismo alto y los apila en pantallas
estrechas (menos de 62.5rem). Combínalo con `BaseFormSection stretch` para que cada sección ocupe
la altura completa de su columna:

```vue
<BaseFormColumns>
  <BaseFormSection title="Datos de contacto" stretch>...</BaseFormSection>
  <BaseFormSection title="Preferencias" stretch>...</BaseFormSection>
</BaseFormColumns>
```

Solo expone su slot predeterminado; no tiene props, modelos, eventos ni métodos.

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

## BaseBadge

`BaseBadge` muestra una etiqueta de estado tematizable. Por defecto usa un ancho fijo
(`--jnv-badge-fixed-width`) para alinear listas de estados; usa `width="auto"` cuando deba
ajustarse al contenido. El tono `critical` representa una incidencia de severidad alta.

```vue
<BaseBadge tone="success" label="Entregado" />
<BaseBadge tone="info" width="auto">En tránsito</BaseBadge>
```

| Prop    | Tipo                                                                               | Predeterminado | Descripción                                                           |
| ------- | ---------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------- |
| `label` | `string`                                                                           | `""`           | Texto de fallback cuando no se usa el slot predeterminado.            |
| `tone`  | `neutral \| info \| success \| warning \| error \| critical \| progress \| violet` | `neutral`      | Intención visual del estado.                                          |
| `size`  | `sm \| md`                                                                         | `sm`           | Tamaño de la insignia.                                                |
| `width` | `auto \| fixed`                                                                    | `fixed`        | `fixed` usa `--jnv-badge-fixed-width`; `auto` se ajusta al contenido. |

No emite eventos ni expone modelos o métodos. Admite el slot predeterminado.

## BaseToast

`BaseToast` muestra una notificación breve en una esquina de la ventana. Se controla con
`v-model:open`, se cierra automáticamente cuando `duration` es mayor que cero y pausa el
temporizador al pasar el puntero si `pauseOnHover` está habilitado. Se teletransporta a `body`.
Los tonos `warning` y `danger` usan `role="alert"`; `success` e `info`, `role="status"`.

```vue
<BaseToast
  v-model:open="toastOpen"
  tone="success"
  title="Cambios guardados"
  description="Tu información se actualizó correctamente."
/>
```

| Prop           | Tipo                                                           | Predeterminado          | Descripción                                                 |
| -------------- | -------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------- |
| `open`         | `boolean`                                                      | `false`                 | Visibilidad mediante `v-model:open`.                        |
| `title`        | `string`                                                       | `""`                    | Título opcional.                                            |
| `description`  | `string`                                                       | `""`                    | Descripción opcional.                                       |
| `tone`         | `"success" \| "info" \| "warning" \| "danger"`                 | `"info"`                | Tono semántico y rol accesible asociado.                    |
| `icon`         | `string`                                                       | Según el tono           | Nombre de un icono de `BaseIcon`.                           |
| `dismissible`  | `boolean`                                                      | `true`                  | Muestra el botón de cierre.                                 |
| `closeLabel`   | `string`                                                       | `"Cerrar notificación"` | Etiqueta accesible del botón de cierre.                     |
| `duration`     | `number`                                                       | `5000`                  | Milisegundos antes del cierre; `0` desactiva el autocierre. |
| `pauseOnHover` | `boolean`                                                      | `true`                  | Pausa el autocierre mientras el puntero está encima.        |
| `position`     | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | `"top-right"`           | Esquina donde se muestra.                                   |

Emite `update:open` con `false` y `close` (sin payload) al cerrarse con el botón, con `Escape`
mientras el foco está dentro, o por tiempo. El slot predeterminado añade contenido debajo de la
descripción y el slot `icon` reemplaza el icono automático. No expone métodos.

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

## Timeline

`BaseTimeline` muestra un historial vertical de periodos, como experiencia laboral, educación o
versiones. Es un componente de presentación: no representa progreso (para eso usa `BaseStepper`),
no tiene estado interactivo y nunca modifica `items`.

```vue
<script setup>
import { BaseBadge, BaseTimeline } from "@joaquinn6/jnv-ui-components";

const experience = [
  {
    id: "acme",
    title: "Desarrollador frontend",
    subtitle: "Acme",
    start: "2022-03",
    end: null,
    icon: "briefcase",
  },
  {
    id: "uni",
    title: "Ingeniería en sistemas",
    subtitle: "Universidad Nacional",
    start: "2016",
    end: "2020",
    icon: "graduationCap",
  },
];
</script>

<template>
  <BaseTimeline :items="experience" aria-label="Experiencia" title-as="h4">
    <template #item="{ item }">
      <BaseBadge v-if="item.id === 'acme'" width="auto" label="Vue" />
    </template>
  </BaseTimeline>
</template>
```

Se representa como un `<ol>` con `aria-label` (y `role="list"`, para conservar la semántica de
lista en Safari); cada elemento es un `<li>`. Las fechas se muestran dentro de
`<time datetime="...">` con el valor ISO original. El marcador y la línea son decorativos y quedan
ocultos para tecnologías de asistencia; si un elemento tiene `icon`, el marcador muestra un
`BaseIcon` decorativo. El elemento en curso (`end: null`) destaca su marcador con los tokens
`--jnv-timeline-marker-current-*`.

| Prop            | Tipo                          | Predeterminado      | Descripción                                                                           |
| --------------- | ----------------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| `items`         | `readonly BaseTimelineItem[]` | —                   | Elementos en el orden en que se muestran; cada `id` debe ser único.                   |
| `locale`        | `string`                      | `"es"`              | Locale de `Intl.DateTimeFormat`. Un locale inválido recurre a `"es"`.                 |
| `presentLabel`  | `string`                      | `"Actualidad"`      | Texto del final de un periodo en curso (`end: null`).                                 |
| `dateSeparator` | `string`                      | `" – "`             | Separador entre la fecha inicial y la final; se respeta tal cual, espacios incluidos. |
| `ariaLabel`     | `string`                      | `"Línea de tiempo"` | Nombre accesible de la lista.                                                         |
| `titleAs`       | `"h2" \| "h3" \| "h4" \| "p"` | `"h3"`              | Elemento del título de cada elemento; elige el nivel según la jerarquía de la página. |
| `size`          | `"sm" \| "md"`                | `"md"`              | Tamaño del marcador, la tipografía y la separación entre elementos.                   |

`BaseTimelineItem`:

| Campo       | Tipo                     | Descripción                                                                                             |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `id`        | `string`                 | Identificador estable y único; se usa como `key`.                                                       |
| `title`     | `string`                 | Título del periodo.                                                                                     |
| `subtitle`  | `string`                 | Opcional. Texto secundario, como la empresa o la institución.                                           |
| `start`     | `string`                 | Fecha ISO parcial: `"2020-09"` o `"2020"`.                                                              |
| `end`       | `string \| null`         | Opcional. Fecha ISO parcial; `null` indica un periodo en curso y sin valor solo se muestra `start`.     |
| `precision` | `"month" \| "year"`      | Opcional. `"year"` muestra solo el año aunque la fecha incluya mes. Sin valor, se deduce de cada fecha. |
| `icon`      | `BaseIconName \| string` | Opcional. Icono de `BaseIcon` dentro del marcador.                                                      |

Con precisión mensual se formatea con `{ year: "numeric", month: "short" }` (por ejemplo,
`sept 2020` en `es` o `Sep 2020` en `en`) y con precisión anual solo el año, siempre en UTC para
evitar desplazamientos por zona horaria. Un valor que no sea `AAAA` ni `AAAA-MM` se muestra sin
formatear y sin atributo `datetime`. Para otro formato, usa el slot `meta`.

### Slots

Todos reciben `{ item, index }`:

- `item`: contenido adicional debajo de las fechas, por ejemplo logros o tecnologías. Si no se
  proporciona, no se renderiza su contenedor.
- `title`: reemplaza el texto del título, conservando el elemento indicado en `titleAs`.
- `meta`: reemplaza el bloque de fechas, incluidos los elementos `<time>` predeterminados.

`BaseTimeline` no emite eventos ni expone modelos o métodos públicos. No usa transiciones ni
animaciones.

## Tablas

Ademas de paginar, ordenar y seleccionar, `BaseTable` puede gestionar filas de alta, edicion y eliminacion mediante sus props CRUD.

`BaseTable` presenta datos tabulares con columnas configurables, slots de encabezado y celda,
ordenamiento, paginación local o remota y selección opcional de filas. Usa una tabla HTML semántica
y muestra una superficie de carga cuando recibe `loading`.

La directiva `v-loading` se registra internamente en `BaseTable`; el consumidor no necesita
importarla ni registrarla en la aplicación para usar la tabla. Para aplicarla en otros elementos,
puede importar la exportación pública `loading` como se muestra en la sección de la directiva.

| Prop                         | Tipo                         | Predeterminado                   | Descripción                                                                                                     |
| ---------------------------- | ---------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `rows`                       | `Array`                      | —                                | Filas. En modo local contiene toda la colección; en modo remoto, solo la página actual.                         |
| `columns`                    | `Array`                      | —                                | Columnas. Cada una requiere `key` y `label`; admite `field`, `formatter`, `align`, `headerAlign` y `sortable`.  |
| `totalItems`                 | `number`                     | —                                | Total de elementos para calcular páginas y resumen.                                                             |
| `pageSize`                   | `number`                     | —                                | Elementos por página.                                                                                           |
| `page`                       | `number`                     | `1`                              | Página controlada actualmente.                                                                                  |
| `paginationMode`             | `local \| remote`            | `local`                          | Pagina y ordena internamente, o delega esas operaciones al consumidor.                                          |
| `paginationStyle`            | `default \| floating`        | `default`                        | `floating` sustituye el pie por una pastilla compacta y pegada abajo (‹ 21–40 de 134 ›), sin números de página. |
| `paginationAriaLabel`        | `string`                     | `Paginación de la tabla`         | Etiqueta accesible de la navegación de páginas.                                                                 |
| `previousPageAriaLabel`      | `string`                     | `Ir a la página anterior`        | Etiqueta accesible del botón de página anterior.                                                                |
| `nextPageAriaLabel`          | `string`                     | `Ir a la página siguiente`       | Etiqueta accesible del botón de página siguiente.                                                               |
| `rowKey`                     | `string \| Function`         | `id`                             | Propiedad o función que identifica cada fila.                                                                   |
| `loading`                    | `boolean`                    | `false`                          | Deshabilita acciones y muestra la carga.                                                                        |
| `size`                       | `sm \| md \| lg`             | `sm`                             | Densidad de la tabla: tamaño de texto, espaciado de celdas y botones de paginación.                             |
| `caption`                    | `string`                     | `Tabla de datos`                 | Descripción accesible de la tabla.                                                                              |
| `emptyText`                  | `string`                     | `No hay elementos para mostrar.` | Texto del estado vacío.                                                                                         |
| `sort`                       | `{ key, direction } \| null` | `null`                           | Orden controlado; `direction` puede ser `asc` o `desc`.                                                         |
| `selectable`                 | `boolean`                    | `false`                          | Muestra selección por fila y selección de filas visibles.                                                       |
| `selectedRows`               | `Array`                      | `[]`                             | Filas seleccionadas de forma controlada.                                                                        |
| `clearSelectionOnPageChange` | `boolean`                    | `false`                          | Limpia la selección cuando cambia `page`.                                                                       |

`size` aplica los tokens `--jnv-table-{sm,md,lg}-*`, descritos en
[Tema y tokens CSS](./theming.md#tokens-de-basetable). Afecta el texto predeterminado de las celdas
y el encabezado; el contenido de los slots conserva su propia tipografía.

```vue
<BaseTable
  size="md"
  :rows="rows"
  :columns="columns"
  :total-items="rows.length"
  :page-size="10"
/>
```

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

| Componente         | Props principales                                                                                                                                                                                                                                        | Modelo y eventos                                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BaseInput`        | `id`, `label`, `type`, `mode` (`edit`, `read`), `suffix`, `maxLength`, `maxLengthVisible`, `showPasswordAriaLabel`, `hidePasswordAriaLabel`, `info`, `infoAriaLabel`                                                                                     | `v-model`, `blur` en modo edición; en modo lectura muestra `—` cuando el valor está vacío; slot `leading`; expone `focus()`                                                                                                                                                                                                                                           |
| `BasePhoneInput`   | `countries` (`{ name, prefix, iso2?, flag? }[]`), `defaultCountry`, `showFlags` (`true`), `countrySearchPlaceholder`, `countrySelectorAriaLabel`, `noResultsText`, estado común                                                                          | `v-model` E.164 como texto (`+34612345678`); emite `prefixChange` con el objeto del país seleccionado al cambiar de país; genera un campo oculto con `name`; expone `focus()`                                                                                                                                                                                         |
| `BaseTextarea`     | `id`, `label`, `rows`, `maxLength`, `maxLengthVisible`, `info`, `infoAriaLabel` (`"Información adicional"`), `infoType` (`""`, `primary`, `secondary`, `success`, `danger`), estado común                                                                | `v-model`, `blur`; expone `focus()`                                                                                                                                                                                                                                                                                                                                   |
| `BaseCheckbox`     | `id`, `name`, `label`, `labelPosition` (`"end"` o `"top"`, predeterminado `"end"`), `type` (`primary`, `secondary`, `success`, `danger`), `size`, `indeterminate`, `invalid`, `info`                                                                     | `v-model` booleano; slot `label` para contenido enriquecido en la etiqueta, con `label` como fallback                                                                                                                                                                                                                                                                 |
| `BaseRadio`        | `id`, `name`, `value`, `label` (`""`), `labelPosition` (`"top"` o `"end"`, predeterminado `"end"`), `size` (`sm`, `md`, predeterminado `sm`), `required`, `disabled`, `invalid`                                                                          | `v-model`; `id`, `name` y `value` son obligatorios                                                                                                                                                                                                                                                                                                                    |
| `BaseRadioGroup`   | `id`, `name`, `label`, `options`, `optionLabelPosition` (`"top"` o `"end"`, predeterminado `"end"`), `orientation` (`"vertical"` o `"horizontal"`, predeterminado `"vertical"`), `bordered` (`true`), `required`, `disabled`, `error`                    | `v-model`; `name` y `options` son obligatorios; usa un `fieldset` semántico y agrupa el error                                                                                                                                                                                                                                                                         |
| `BaseSwitch`       | `id`, `label` (`""`), `labelPosition` (`"top"` o `"end"`, predeterminado `"end"`), `size` (`sm`, `md`, predeterminado `sm`), `error`, `disabled`                                                                                                         | `v-model` booleano; `id` es obligatorio; `error` muestra un mensaje y marca el control como inválido                                                                                                                                                                                                                                                                  |
| `BaseSelect`       | `id`, `label`, `name`, `placeholder`, `options` (`valor` u objeto `{ label, value, disabled? }`), `multiple` (`false`), `allowCreate` (`false`), `searchPlaceholder`, `createOptionText`, `removeOptionAriaLabel`, `moreSelectedAriaLabel`, estado común | `v-model` escalar o array cuando `multiple`; `allowCreate` agrega textos nuevos como strings solo en modo múltiple; cuando los chips no caben muestra `+N` con un tooltip para revisar y quitar los valores ocultos; genera un campo oculto JSON cuando recibe `name`; slots `leading`, `selected` y `option`; teclado: flechas, Inicio, Fin, Enter, Espacio y Escape |
| `BaseAutocomplete` | `options`, `fetchOptions`, `labelKey`, `valueKey`, `selectedLabelKey`, `minChars`, `debounceMs`, `maxSuggestions`, `allowCreate`, textos `loadingText`, `noResultsText`, `loadErrorText`, `clearAriaLabel`                                               | `v-model`, `select`, `blur`; slot `leading`; expone `focus()`                                                                                                                                                                                                                                                                                                         |
| `BaseColorPicker`  | `swatches`, textos accesibles; ver [BaseColorPicker](#basecolorpicker), estado común                                                                                                                                                                     | `v-model` `#rrggbb` o `""`; `change`, `blur`, `open`, `close`; expone `focus()`, `open()` y `close()`                                                                                                                                                                                                                                                                 |
| `BaseSignature`    | `id`, `label`, `width`, `height`, `clearAriaLabel`, `drawingInstructions`, `help`, `error`                                                                                                                                                               | `v-model` con PNG data URL; se opera con puntero táctil, lápiz o ratón                                                                                                                                                                                                                                                                                                |
| `BaseFileUpload`   | `variant` (`button`, `dropzone`), `multiple`, `accept`, `maxFiles`, `maxSize`, `preview`, `texts`; ver [BaseFileUpload](#basefileupload), estado común                                                                                                   | `v-model` con `File[]`; `add`, `remove`, `clear`, `reject`; slots `button`, `dropzone`, `file` y `file-actions`; expone `open()`, `clear()`, `remove(index)` y `focus()`                                                                                                                                                                                              |

> **Migración de `BaseCheckbox`:** desde esta versión la etiqueta se muestra por defecto a la
> derecha de la casilla (`labelPosition="end"`). Para conservar la etiqueta encima, como antes,
> indica `label-position="top"` de forma explícita:
>
> ```vue
> <BaseCheckbox v-model="accepted" label="Acepto" label-position="top" />
> ```

> **Migración de `BaseRadio` y `BaseSwitch`:** la etiqueta se muestra por defecto a la derecha
> del control (`labelPosition="end"`). Para conservar la etiqueta encima, indica
> `label-position="top"` de forma explícita. Ambos aceptan `size="sm"` (predeterminado, usa
> `--control-height-sm`) y `size="md"` (usa `--jnv-choice-field-min-height`).

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
chips que pueden quitarse; las opciones ya elegidas no vuelven a aparecer en la lista. `allowCreate` habilita búsqueda y creación de valores de texto; una
coincidencia exacta selecciona la opción disponible. Los valores creados permanecen disponibles
mientras viva la instancia, aunque se quiten de la selección. `searchPlaceholder` (`Buscar
opciones...`), `createOptionText` (`Crear opción`) y `removeOptionAriaLabel` (`Quitar opción
seleccionada`) permiten localizar estos controles. Si se proporciona `name`, el array se serializa
como JSON en un campo oculto.

Cuando los chips no caben en el ancho disponible, `BaseSelect` muestra los primeros que caben y un
indicador `+N`. Al pasar el puntero, enfocar o activar el indicador aparece un tooltip con las
opciones ocultas, que también pueden quitarse. `moreSelectedAriaLabel` (`Ver opciones
seleccionadas adicionales`) permite localizar su etiqueta accesible.

En `BasePhoneInput`, `countries[].flag` acepta un emoji o una URI de imagen, como la ruta de un SVG.
`showFlags` permite ocultar las banderas del país seleccionado y del menú; su valor predeterminado es `true`.
El menú se abre hacia arriba cuando no hay suficiente espacio debajo del campo.

`BasePhoneInput` conserva el texto escrito en el número nacional y compone el modelo con el prefijo
del país; la validación del número corresponde al proyecto consumidor. Si se omite `countries`,
ofrece España (`+34`). La búsqueda encuentra países por nombre o
prefijo; al cambiar el país conserva el número nacional. Los valores iniciales permiten inferir el
país por el prefijo más largo disponible; ante prefijos compartidos se usa el primer país de la
lista. `defaultCountry` acepta ISO2, prefijo o nombre y, si se omite, se selecciona España cuando
está en la lista o el primer país disponible.

## BaseColorPicker

Campo para elegir un color. Combina un input de texto hexadecimal con un panel desplegable que
contiene un área de saturación y brillo, una barra de tono y, opcionalmente, una paleta de colores
predefinidos. El modelo es siempre un color `#rrggbb` en minúsculas o `""` cuando no hay color.

```vue
<BaseColorPicker
  v-model="brandColor"
  label="Color de marca"
  :swatches="['#7c3aed', '#0ea5e9', '#16a34a', '#f59e0b', '#dc2626']"
  help="Escribe un código hexadecimal o elige un color en el panel."
/>
```

### Props

| Prop                | Tipo                                                      | Predeterminado                   | Descripción                                                                     |
| ------------------- | --------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `id`                | `string`                                                  | `""` (se genera uno único)       | Id del input de texto; el label apunta a él                                     |
| `label`             | `string`                                                  | `""`                             | Etiqueta visible del campo                                                      |
| `info`              | `string`                                                  | `""`                             | Texto de `BaseFieldInfo` junto a la etiqueta                                    |
| `infoAriaLabel`     | `string`                                                  | `"Información adicional"`        | Etiqueta accesible del botón de información                                     |
| `infoType`          | `"" \| "primary" \| "secondary" \| "success" \| "danger"` | `""`                             | Tono del botón de información                                                   |
| `name`              | `string`                                                  | `""`                             | Nombre del input para formularios nativos                                       |
| `placeholder`       | `string`                                                  | `"Seleccionar color"`            | Texto del input vacío                                                           |
| `swatches`          | `readonly string[]`                                       | `[]`                             | Colores predefinidos (`#rgb` o `#rrggbb`); los no válidos o repetidos se omiten |
| `size`              | `"sm" \| "md" \| "lg"`                                    | `"sm"`                           | Altura del control                                                              |
| `state`             | `"default" \| "error" \| "success"`                       | `"default"`                      | Estado visual; `error` y `success` también lo activan                           |
| `help`              | `string`                                                  | `""`                             | Mensaje de ayuda                                                                |
| `error`             | `string`                                                  | `""`                             | Mensaje de error; marca el input con `aria-invalid`                             |
| `success`           | `string`                                                  | `""`                             | Mensaje de éxito                                                                |
| `required`          | `boolean`                                                 | `false`                          | Marca el campo como obligatorio                                                 |
| `disabled`          | `boolean`                                                 | `false`                          | Deshabilita el input y el botón del panel                                       |
| `readonly`          | `boolean`                                                 | `false`                          | Input de solo lectura; el panel no se puede abrir                               |
| `tone`              | `"default" \| "inverse"`                                  | `"default"`                      | `inverse` adapta la etiqueta a superficies invertidas                           |
| `inputAriaLabel`    | `string`                                                  | `"Código hexadecimal del color"` | Etiqueta accesible del input cuando no hay `label`                              |
| `toggleAriaLabel`   | `string`                                                  | `"Abrir selector de color"`      | Etiqueta accesible del botón con la muestra de color                            |
| `panelAriaLabel`    | `string`                                                  | `"Selector de color"`            | Etiqueta accesible del panel (`role="dialog"`)                                  |
| `saturationLabel`   | `string`                                                  | `"Saturación"`                   | Texto de la etiqueta y del valor accesible del área                             |
| `brightnessLabel`   | `string`                                                  | `"Brillo"`                       | Texto de la etiqueta y del valor accesible del área                             |
| `hueAriaLabel`      | `string`                                                  | `"Tono"`                         | Etiqueta accesible de la barra de tono                                          |
| `swatchesAriaLabel` | `string`                                                  | `"Colores predefinidos"`         | Etiqueta accesible del grupo de colores predefinidos                            |

Los atributos no declarados (`autofocus`, `data-*`, etc.) se aplican al input de texto.

### Modelo y eventos

| Nombre                   | Payload      | Cuándo se emite                                                                                                                                                                                       |
| ------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v-model` (`modelValue`) | `string`     | En vivo al arrastrar, usar el teclado o escribir un hexadecimal válido; `""` al vaciar el input                                                                                                       |
| `change`                 | `string`     | Al confirmar un color distinto del último confirmado: al soltar el puntero o la barra de tono, con cada tecla del área, al elegir una muestra, al salir del input o pulsar Enter y al cerrar el panel |
| `blur`                   | `FocusEvent` | Cuando el input de texto pierde el foco                                                                                                                                                               |
| `open`, `close`          | —            | Al abrir y cerrar el panel                                                                                                                                                                            |

El input acepta `#rgb`, `#rrggbb` y las mismas formas sin `#`, sin distinguir mayúsculas. Al salir
del input o pulsar Enter, un valor válido se normaliza a `#rrggbb` y uno no válido se descarta para
restaurar el color actual. Un `modelValue` externo que no sea hexadecimal se muestra tal cual en el
input, sin modificar el panel.

### Teclado y accesibilidad

- El botón con la muestra abre y cierra el panel; al abrirse, el foco pasa al área de saturación y
  brillo.
- En el área, `←`/`→` ajustan la saturación y `↑`/`↓` el brillo en pasos de 1 %; con `Shift`, de
  10 %. Expone `role="slider"` con un `aria-valuetext` que describe ambos valores.
- La barra de tono es un `<input type="range">` nativo (0–360°).
- Las muestras son botones con `aria-pressed` y el código del color como etiqueta.
- `Escape` cierra el panel y devuelve el foco al botón si estaba dentro del panel. El panel también
  se cierra al hacer clic fuera o al mover el foco fuera del componente.
- El panel se abre hacia arriba cuando no hay espacio suficiente debajo del campo.

### Slots y métodos expuestos

No tiene slots. Expone `focus()` (enfoca el input de texto), `open()` y `close()` para controlar el
panel.

## BaseFileUpload

Selector de archivos con dos variantes:

- `button`: solo un botón (`BaseButton`) que abre el selector del sistema. También acepta archivos
  soltados sobre él.
- `dropzone`: zona para arrastrar y soltar archivos que también abre el selector al hacer clic o al
  pulsar `Enter`/`Espacio`.

En modo simple o múltiple (`multiple`), los archivos aceptados se muestran en una lista desde la que
cada uno se puede eliminar. El componente no sube archivos: entrega los `File` en el `v-model` para
que la aplicación decida cómo enviarlos.

```vue
<BaseFileUpload v-model="cv" label="Currículum" accept=".pdf" />

<BaseFileUpload
  v-model="attachments"
  variant="dropzone"
  label="Adjuntos"
  multiple
  accept="image/*,.pdf"
  :max-files="5"
  :max-size="5 * 1024 * 1024"
  preview
  clearable
  @reject="onReject"
/>
```

### Props

| Prop                                | Tipo                                           | Predeterminado                        | Descripción                                                                                            |
| ----------------------------------- | ---------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `modelValue`                        | `File[]`                                       | `[]`                                  | Archivos seleccionados (`v-model`); siempre es un arreglo, también en modo simple                      |
| `variant`                           | `"button" \| "dropzone"`                       | `"button"`                            | Solo botón o zona de arrastrar y soltar                                                                |
| `multiple`                          | `boolean`                                      | `false`                               | Permite varios archivos; en modo simple, una nueva selección reemplaza la anterior                     |
| `accept`                            | `string`                                       | `""`                                  | Sintaxis del atributo `accept`: extensiones (`.pdf`), MIME (`application/pdf`) o comodines (`image/*`) |
| `maxFiles`                          | `number`                                       | `0`                                   | Máximo de archivos con `multiple`; `0` sin límite. Al alcanzarlo, el disparador se deshabilita         |
| `maxSize`                           | `number`                                       | `0`                                   | Tamaño máximo por archivo en bytes; `0` sin límite                                                     |
| `append`                            | `boolean`                                      | `true`                                | Con `multiple`, añade la nueva selección a la actual; con `false` la reemplaza                         |
| `dedupe`                            | `boolean`                                      | `true`                                | Rechaza archivos ya presentes (mismo nombre, tamaño y fecha de modificación)                           |
| `validator`                         | `(file, files) => string \| null \| undefined` | —                                     | Validación adicional; devolver un texto rechaza el archivo con ese mensaje                             |
| `formatSize`                        | `(bytes: number) => string`                    | base 1024 (`1.5 MB`)                  | Formato de los tamaños de la lista, las restricciones y los mensajes                                   |
| `name`                              | `string`                                       | `""`                                  | Nombre del `<input type="file">`; la selección se refleja en él para envíos nativos de formulario      |
| `capture`                           | `"user" \| "environment" \| ""`                | `""`                                  | Atributo `capture` del input (cámara en móviles)                                                       |
| `id`                                | `string`                                       | `""` (se genera uno único)            | Prefijo de los ids internos                                                                            |
| `label`                             | `string`                                       | `""`                                  | Etiqueta visible; nombra el grupo (`role="group"`)                                                     |
| `info`, `infoAriaLabel`, `infoType` | igual que `BaseInput`                          | `""`, `"Información adicional"`, `""` | Botón `BaseFieldInfo` junto a la etiqueta                                                              |
| `size`                              | `"sm" \| "md" \| "lg"`                         | `"sm"`                                | Tamaño del botón, relleno de la zona y densidad de la lista                                            |
| `state`                             | `"default" \| "error" \| "success"`            | `"default"`                           | Estado visual; `error` y `success` también lo activan                                                  |
| `help`, `error`, `success`          | `string`                                       | `""`                                  | Mensaje del campo; se muestra el primero disponible en el orden `error`, `success`, `help`             |
| `required`                          | `boolean`                                      | `false`                               | Muestra el asterisco en la etiqueta                                                                    |
| `disabled`                          | `boolean`                                      | `false`                               | Deshabilita la selección y la eliminación                                                              |
| `readonly`                          | `boolean`                                      | `false`                               | Oculta el disparador, las restricciones y los botones de eliminar; solo muestra la lista               |
| `tone`                              | `"default" \| "inverse"`                       | `"default"`                           | `inverse` adapta la etiqueta a superficies invertidas                                                  |
| `buttonVariant`                     | `ButtonVariant`                                | `"outline"`                           | Variante de `BaseButton` del disparador `button`                                                       |
| `icon`                              | `string`                                       | `"upload"`                            | Icono del botón y de la zona; `""` lo oculta                                                           |
| `block`                             | `boolean`                                      | `false`                               | El botón ocupa todo el ancho                                                                           |
| `showList`                          | `boolean`                                      | `true`                                | Muestra la lista de archivos seleccionados                                                             |
| `removable`                         | `boolean`                                      | `true`                                | Botón para eliminar cada archivo                                                                       |
| `clearable`                         | `boolean`                                      | `false`                               | Botón "Quitar todos" cuando hay más de un archivo                                                      |
| `showSize`                          | `boolean`                                      | `true`                                | Muestra el tamaño de cada archivo                                                                      |
| `preview`                           | `boolean`                                      | `false`                               | Las imágenes muestran una miniatura (`BaseImageViewer`) que abre la vista ampliada                     |
| `showRestrictions`                  | `boolean`                                      | `true`                                | Muestra formatos, tamaño y cantidad máximos bajo el disparador                                         |
| `showRejections`                    | `boolean`                                      | `true`                                | Muestra los mensajes de los archivos rechazados en la última selección                                 |
| `listMaxHeight`                     | `string`                                       | `""`                                  | Altura máxima CSS de la lista antes de desplazarse; vacío usa `--jnv-file-upload-list-max-height`      |
| `texts`                             | `BaseFileUploadTexts`                          | textos en español                     | Sustituye cualquier texto visible o accesible (ver abajo)                                              |

Los atributos no declarados (`class`, `data-*`, etc.) se aplican al contenedor raíz.

### Textos (`texts`)

| Clave                                       | Predeterminado                                                                                    | Uso                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `select`, `selectMultiple`                  | `"Seleccionar archivo"`, `"Seleccionar archivos"`                                                 | Texto del botón                                         |
| `replace`                                   | `"Cambiar archivo"`                                                                               | Texto del botón en modo simple cuando ya hay un archivo |
| `dropzoneTitle`, `dropzoneTitleMultiple`    | `"Arrastra un archivo aquí"`, `"Arrastra tus archivos aquí"`                                      | Título de la zona                                       |
| `dropzoneAction`, `dropzoneActionMultiple`  | `"o haz clic para seleccionarlo"`, `"o haz clic para seleccionarlos"`                             | Segunda línea de la zona                                |
| `dropzoneActive`                            | `"Suelta para añadir"`                                                                            | Título mientras se arrastran archivos encima            |
| `acceptHint`, `maxSizeHint`, `maxFilesHint` | `"Formatos: {types}"`, `"Tamaño máximo: {size}"`, `"Máximo {max} archivos"`                       | Restricciones visibles                                  |
| `listLabel`                                 | `"Archivos seleccionados"`                                                                        | Etiqueta accesible de la lista                          |
| `remove`                                    | `"Eliminar {name}"`                                                                               | Etiqueta y tooltip del botón de eliminar                |
| `clear`                                     | `"Quitar todos"`                                                                                  | Botón para quitar todos                                 |
| `invalidType`, `invalidSize`                | `"{name}: tipo de archivo no permitido"`, `"{name} supera el tamaño máximo de {size}"`            | Rechazos por tipo y tamaño                              |
| `tooMany`, `single`                         | `"Solo puedes seleccionar hasta {max} archivos"`, `"Solo puedes seleccionar un archivo"`          | Rechazos por cantidad                                   |
| `duplicate`                                 | `"{name} ya está en la lista"`                                                                    | Rechazo de un archivo repetido                          |
| `added`, `removed`, `cleared`               | `"Archivos añadidos: {count}"`, `"Archivo eliminado: {name}"`, `"Se quitaron todos los archivos"` | Anuncios para lectores de pantalla                      |

### Modelo y eventos

| Nombre                   | Payload                                     | Cuándo se emite                                                                 |
| ------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------- |
| `v-model` (`modelValue`) | `File[]`                                    | Al añadir, eliminar o quitar todos los archivos                                 |
| `add`                    | `{ files: File[] }`                         | Con los archivos aceptados en una selección o al soltar                         |
| `remove`                 | `{ file: File, index: number }`             | Al eliminar un archivo de la lista                                              |
| `clear`                  | `{ files: File[] }`                         | Al quitar todos los archivos (botón o método `clear()`)                         |
| `reject`                 | `{ rejections: BaseFileUploadRejection[] }` | Si algún archivo se descarta; cada rechazo incluye `file`, `reason` y `message` |

`reason` puede ser `"type"`, `"size"`, `"duplicate"`, `"count"` o `"custom"` (el `validator`), y se
comprueban en ese orden. Los archivos válidos de una tanda se aceptan aunque otros se rechacen.
`accept` también se comprueba al soltar archivos, ya que el navegador solo filtra el diálogo de
selección.

### Slots y métodos expuestos

- `button` (`{ files, open }`): contenido del botón; por defecto, icono y texto.
- `dropzone` (`{ dragging, files, open }`): contenido de la zona de arrastre.
- `file` (`{ file, index, size, remove, removable }`): contenido completo de cada fila. Al usarlo,
  el botón de eliminar integrado no se muestra; llama a `remove()` desde tu propio control.
- `file-actions` (`{ file, index }`): acciones adicionales antes del botón de eliminar.

Expone `open()` (abre el selector del sistema), `clear()`, `remove(index)` y `focus()` (enfoca el
disparador). Para tipar la referencia de plantilla usa `BaseFileUploadExposed`:

```ts
import type { BaseFileUploadExposed } from "@joaquinn6/jnv-ui-components";

const uploader = ref<BaseFileUploadExposed | null>(null);
uploader.value?.open();
```

### Teclado y accesibilidad

- El botón y la zona son elementos `<button>` nativos: se activan con `Enter` o `Espacio`. El
  `<input type="file">` real queda oculto y fuera del orden de tabulación.
- Cada archivo tiene un botón de eliminar con etiqueta accesible (`texts.remove`). Tras eliminar,
  el foco pasa al siguiente archivo, al anterior o, si la lista queda vacía, al disparador.
- Las altas, bajas y rechazos se anuncian en regiones `aria-live="polite"`; el mensaje de `error`
  usa `role="alert"`. El disparador se describe con el mensaje y las restricciones.
- Con `preview`, las URLs de las miniaturas se crean con `URL.createObjectURL` y se revocan al
  quitar el archivo, desactivar `preview` o desmontar el componente.

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
