import type { Component, DefineComponent, Directive } from "vue";

export type LoadingDirective = Directive<HTMLElement, boolean>;
/** Lado preferido del tooltip; se voltea al opuesto si no cabe en el viewport. */
export type TooltipPlacement = "top" | "bottom";
export type TooltipDirective = Directive<
  Element,
  unknown,
  string,
  TooltipPlacement
>;

export type Size = "sm" | "md" | "lg";
export type FieldState = "default" | "error" | "success";
export type Tone = "default" | "inverse";
export type InfoType = "" | "primary" | "secondary" | "success" | "danger";
export type SelectValue =
  string | number | boolean | Record<string, unknown> | null;
export type DateValue = Date | string | number | Record<string, unknown> | null;
export type DateRangeValue = [Date | string, Date | string] | null;
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "inverse"
  | "danger"
  | "ghost-danger";
export type ButtonSize = Size | "icon";

export interface CommonFieldProps {
  id?: string;
  label?: string;
  info?: string;
  infoAriaLabel?: string;
  infoType?: InfoType;
  /** Altura del control. Predeterminado: `"sm"`. */
  size?: Size;
  state?: FieldState;
  help?: string;
  error?: string;
  success?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  tone?: Tone;
}

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
}
export interface BaseLinkProps {
  href: string;
  target?: string;
  rel?: string;
  variant?: "brand" | "body" | "muted" | "inverse";
  size?: Size;
  underline?: "always" | "hover" | "none";
}
export type BaseIconName =
  | "logo"
  | "menu"
  | "moreVertical"
  | "settings"
  | "close"
  | "search"
  | "clipboard"
  | "copy"
  | "printer"
  | "send"
  | "support"
  | "building"
  | "home"
  | "map"
  | "arrowLeft"
  | "arrowRight"
  | "download"
  | "zoomIn"
  | "zoomOut"
  | "maximize"
  | "plus"
  | "trash"
  | "facebook"
  | "twitter"
  | "loader"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "sort"
  | "check"
  | "location"
  | "weight"
  | "edit"
  | "grid"
  | "list"
  | "shield"
  | "user"
  | "circleUser"
  | "bolt"
  | "clock"
  | "package"
  | "truck"
  | "circleCheck"
  | "circleX"
  | "alertTriangle"
  | "calendar"
  | "tag"
  | "info"
  | "lock"
  | "eye"
  | "eyeOff"
  | "help"
  | "receipt"
  | "piggyBank"
  | "camera"
  | "monitor"
  | "smartphone"
  | "card"
  | "cart"
  | "bank"
  | "bell"
  | "mail"
  | "message"
  | "github"
  | "linkedin"
  | "sun"
  | "moon"
  | "languages"
  | "externalLink"
  | "code"
  | "briefcase"
  | "graduationCap"
  | "upload"
  | "file";
export interface BaseIconProps {
  /**
   * Nombre del icono. Acepta cualquier `string` por compatibilidad; los nombres de
   * `BaseIconName` ofrecen autocompletado.
   */
  name: BaseIconName | (string & {});
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  decorative?: boolean;
}
export interface BaseFormSectionProps {
  title?: string;
  description?: string;
  stretch?: boolean;
  titleAs?: "h2" | "h3" | "h4";
}
export interface BaseFormColumnsProps {}
export interface BaseFormRowProps {
  columns?: 1 | 2 | 3 | 4;
  columnWidths?: readonly string[];
  alignItems?: "start" | "center" | "end" | "stretch";
}
export interface BaseCardProps {
  as?: "div" | "section" | "article" | "aside" | "details";
  surface?: "page" | "inverse" | "primary";
  padding?: "comfortable" | "compact" | "none";
  radius?: "md" | "lg";
  elevation?: "none" | "sm" | "md";
  outlined?: boolean;
  title?: string;
  titlePosition?: "inside" | "outside";
  titleIcon?: string;
  titleAs?: "h2" | "h3" | "h4";
}
export type BaseCollapseVariant = "plain" | "card";
export type BaseCollapseValue = string | number;
export interface BaseCollapseProps {
  /** Estado abierto; admite `v-model:open`. Se ignora dentro de `BaseCollapseGroup`. */
  open?: boolean;
  title?: string;
  description?: string;
  icon?: string;
  titleAs?: "h2" | "h3" | "h4";
  /**
   * `plain` (sin card, con divisor `--jnv-collapse-divider`) o `card` (sobre `BaseCard`).
   * Sin valor hereda el `variant` del grupo; fuera de un grupo es `plain`.
   */
  variant?: BaseCollapseVariant;
  /** Identificador dentro de `BaseCollapseGroup`. Predeterminado: un id único generado. */
  value?: BaseCollapseValue;
  id?: string;
  disabled?: boolean;
  toggleAriaLabel?: string;
}
export interface BaseCollapseGroupChangeEvent {
  value: BaseCollapseValue;
  open: boolean;
}
export interface BaseCollapseGroupProps {
  /** Valor abierto (o arreglo de valores con `multiple`); `null` si no hay ninguno. */
  modelValue?: BaseCollapseValue | BaseCollapseValue[] | null;
  multiple?: boolean;
  collapsible?: boolean;
  /** Variante predeterminada de los ítems. `card` los separa con `--jnv-collapse-group-gap`. */
  variant?: BaseCollapseVariant;
}
export type BaseImageViewerAction = "edit" | "delete" | "expand" | "download";
export type BaseImageViewerRadius = "none" | "sm" | "md" | "lg" | "full";
/** Textos de `BaseImageViewer` y `BaseImageLightbox`. Los no indicados usan el valor en español. */
export interface BaseImageViewerTexts {
  edit?: string;
  delete?: string;
  expand?: string;
  download?: string;
  /** Etiqueta accesible de la miniatura que abre el visor. */
  open?: string;
  actionsLabel?: string;
  loadError?: string;
  dialogLabel?: string;
  close?: string;
  zoomIn?: string;
  zoomOut?: string;
  resetZoom?: string;
  zoomLevel?: string;
  copy?: string;
  copied?: string;
  copyError?: string;
  downloadError?: string;
}
export interface BaseImageLightboxProps {
  open?: boolean;
  src: string;
  alt?: string;
  caption?: string;
  downloadable?: boolean;
  copyable?: boolean;
  downloadName?: string;
  /** Zoom máximo (1 = tamaño ajustado al visor). Predeterminado: `4`. */
  maxZoom?: number;
  /** Incremento de cada paso de zoom. Predeterminado: `0.5`. */
  zoomStep?: number;
  texts?: BaseImageViewerTexts;
}
export interface BaseImageViewerProps extends Omit<
  BaseImageLightboxProps,
  "open"
> {
  variant?: "default" | "thumbnail";
  /** Radio del borde: `--radius-sm`, `--radius-md`, `--radius-lg` o `--radius-round` (`full`). */
  radius?: BaseImageViewerRadius;
  /**
   * Lado de la miniatura cuadrada: `--jnv-image-viewer-thumbnail-sm` (3rem en los temas JNV),
   * `-md` (4.5rem) o `-lg` (6rem). Predeterminado: `md`.
   */
  thumbnailSize?: "sm" | "md" | "lg";
  /** Relación de aspecto CSS de la versión normal, por ejemplo `"16 / 9"`. */
  aspectRatio?: string;
  fit?: "cover" | "contain";
  /** Acciones al pasar el puntero, en el orden indicado. Predeterminado: `["expand"]`. */
  actions?: BaseImageViewerAction[];
  /** La miniatura abre el visor al hacer click. Predeterminado: `true`. */
  previewable?: boolean;
  /**
   * Muestra un borde de `--jnv-image-viewer-border-width` con el color
   * `--jnv-image-viewer-border-color` (color principal del tema). Predeterminado: `false`.
   */
  bordered?: boolean;
}
export type BaseFileUploadVariant = "button" | "dropzone";
export type BaseFileUploadRejectionReason =
  "type" | "size" | "count" | "duplicate" | "custom";
/** Archivo descartado al seleccionar o soltar, con el motivo y el mensaje mostrado. */
export interface BaseFileUploadRejection {
  file: File;
  reason: BaseFileUploadRejectionReason;
  message: string;
}
/**
 * Validación adicional por archivo. Devuelve un mensaje para rechazarlo o `null`/`undefined`
 * para aceptarlo. `files` es la selección vigente más los archivos ya aceptados en la misma tanda.
 */
export type BaseFileUploadValidator = (
  file: File,
  files: readonly File[],
) => string | null | undefined;
/** Formatea un tamaño en bytes para la lista y los mensajes. */
export type BaseFileUploadSizeFormatter = (bytes: number) => string;
/**
 * Textos de `BaseFileUpload`. Los no indicados usan el valor en español. Admiten las variables
 * `{name}`, `{size}`, `{max}`, `{types}` y `{count}` donde se indica en la documentación.
 */
export interface BaseFileUploadTexts {
  select?: string;
  selectMultiple?: string;
  /** Botón cuando ya hay un archivo en modo simple. */
  replace?: string;
  dropzoneTitle?: string;
  dropzoneTitleMultiple?: string;
  dropzoneAction?: string;
  dropzoneActionMultiple?: string;
  /** Título mientras se arrastran archivos sobre la zona. */
  dropzoneActive?: string;
  acceptHint?: string;
  maxSizeHint?: string;
  maxFilesHint?: string;
  listLabel?: string;
  remove?: string;
  clear?: string;
  invalidType?: string;
  invalidSize?: string;
  tooMany?: string;
  single?: string;
  duplicate?: string;
  added?: string;
  removed?: string;
  cleared?: string;
}
export interface BaseFileUploadProps extends CommonFieldProps {
  /** Archivos seleccionados; admite `v-model`. Siempre es un arreglo, también en modo simple. */
  modelValue?: File[];
  /** `button` muestra solo un botón; `dropzone`, una zona para arrastrar y soltar. Predeterminado: `"button"`. */
  variant?: BaseFileUploadVariant;
  multiple?: boolean;
  /** Tipos aceptados con la sintaxis del atributo `accept` (`.pdf`, `image/*`, `application/pdf`). */
  accept?: string;
  /** Máximo de archivos con `multiple`; `0` sin límite. Predeterminado: `0`. */
  maxFiles?: number;
  /** Tamaño máximo por archivo en bytes; `0` sin límite. Predeterminado: `0`. */
  maxSize?: number;
  /** Con `multiple`, una nueva selección se añade a la actual en lugar de reemplazarla. Predeterminado: `true`. */
  append?: boolean;
  /** Descarta archivos con el mismo nombre, tamaño y fecha de modificación. Predeterminado: `true`. */
  dedupe?: boolean;
  validator?: BaseFileUploadValidator;
  formatSize?: BaseFileUploadSizeFormatter;
  /** Nombre del `<input type="file">` para envíos nativos de formulario. */
  name?: string;
  /** Atributo `capture` del input (cámara en móviles). */
  capture?: "user" | "environment" | "";
  /** Variante de `BaseButton` del disparador `button`. Predeterminado: `"outline"`. */
  buttonVariant?: ButtonVariant;
  /** Icono del botón y de la zona de arrastre. Predeterminado: `"upload"`. */
  icon?: string;
  /** El botón ocupa todo el ancho. */
  block?: boolean;
  /** Muestra la lista de archivos seleccionados. Predeterminado: `true`. */
  showList?: boolean;
  /** Cada archivo tiene un botón para eliminarlo. Predeterminado: `true`. */
  removable?: boolean;
  /** Muestra el botón para quitar todos los archivos cuando hay más de uno. Predeterminado: `false`. */
  clearable?: boolean;
  /** Muestra el tamaño de cada archivo. Predeterminado: `true`. */
  showSize?: boolean;
  /** Miniatura con vista ampliada para imágenes en lugar del icono. Predeterminado: `false`. */
  preview?: boolean;
  /** Muestra automáticamente formatos, tamaño y cantidad máximos. Predeterminado: `true`. */
  showRestrictions?: boolean;
  /** Muestra los mensajes de archivos rechazados. Predeterminado: `true`. */
  showRejections?: boolean;
  /**
   * Altura máxima CSS de la lista antes de desplazarse, por ejemplo `"16rem"`. Vacío usa
   * `--jnv-file-upload-list-max-height` (`none` en los temas JNV). La zona `dropzone` mide al
   * menos `--jnv-file-upload-dropzone-min-height` (8rem) en cualquier `size`.
   */
  listMaxHeight?: string;
  texts?: BaseFileUploadTexts;
}
/** Métodos expuestos por `BaseFileUpload`, para tipar una referencia de plantilla. */
export interface BaseFileUploadExposed {
  /** Abre el selector de archivos del sistema. */
  open: () => void;
  /** Quita todos los archivos y emite `clear`. */
  clear: () => void;
  /** Elimina el archivo en la posición indicada y emite `remove`. */
  remove: (index: number) => void;
  /** Enfoca el botón o la zona de arrastre. */
  focus: () => void;
}
export interface BaseAlertProps {
  title?: string;
  description?: string;
  tone?: "danger" | "warning" | "info" | "primary" | "secondary";
  icon?: string;
  dismissible?: boolean;
  closeLabel?: string;
}
export interface BaseToastProps {
  open?: boolean;
  title?: string;
  description?: string;
  tone?: "success" | "info" | "warning" | "danger";
  icon?: string;
  dismissible?: boolean;
  closeLabel?: string;
  duration?: number;
  pauseOnHover?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}
export interface BaseDialogProps {
  open?: boolean;
  title: string;
  description?: string;
  /**
   * Ancho máximo del diálogo. `sm` usa `--jnv-dialog-sm-width` (28rem en los temas JNV) y `md`
   * usa `--jnv-dialog-md-width` (40rem). En pantallas estrechas se limita al viewport menos
   * `--space-8`. Predeterminado: `sm`.
   */
  size?: "sm" | "md";
  form?: boolean;
  loading?: boolean;
  closeLabel?: string;
  closeDisabled?: boolean;
}
export interface BaseConfirmDialogProps {
  open?: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  buttonSize?: Size;
  loading?: boolean;
  tone?: "danger" | "primary";
}
export interface BaseHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  variant?: "hero" | "lg" | "md" | "sm" | "xs";
  color?: "heading" | "body" | "inverse" | "brand";
  align?: "left" | "center" | "right";
}
export interface BaseTextProps {
  as?: "p" | "span" | "div" | "small" | "li";
  variant?: "md" | "sm" | "label" | "xl";
  color?:
    | "body"
    | "muted"
    | "heading"
    | "inverse"
    | "inverse-muted"
    | "brand"
    | "danger"
    | "warning"
    | "inherit";
  weight?: "regular" | "medium" | "semibold" | "bold";
}
export type BaseBadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "critical"
  | "progress"
  | "violet";
export interface BaseBadgeProps {
  label?: string;
  tone?: BaseBadgeTone;
  size?: "sm" | "md";
  width?: "auto" | "fixed";
}
export type BaseBreadcrumbRouteLocation = string | object;
export interface BaseBreadcrumbItem {
  name: string;
  to?: BaseBreadcrumbRouteLocation;
}
export interface BaseBreadcrumbProps {
  value: readonly BaseBreadcrumbItem[];
  divider?: string;
  size?: "sm" | "md" | "label" | "xl";
  weight?: "regular" | "medium" | "semibold" | "bold";
  ariaLabel?: string;
}
export interface BaseFieldInfoProps {
  text?: string;
  type?: InfoType;
  ariaLabel?: string;
}
export type BaseDropdownMenuColor = "default" | "danger" | "success" | "info";
export interface BaseDropdownMenuItem {
  label: string;
  event: string;
  color?: BaseDropdownMenuColor;
  disabled?: boolean;
  tooltip?: string;
}
export type BaseDropdownMenuGroup = BaseDropdownMenuItem[];
export interface BaseDropdownMenuProps {
  icon?: string;
  groups?: BaseDropdownMenuGroup[];
}
export interface BaseSearchQLTextFilter {
  name: string;
  label: string;
  regex?: boolean;
}
export interface BaseSearchQLDefaultFilterOption {
  value: SelectValue;
  label: string;
}
export interface BaseSearchQLDefaultFilter {
  name: string;
  label: string;
  options: BaseSearchQLDefaultFilterOption[];
  /** @deprecated Retained for compatibility; each field now allows one option. */
  multiple?: boolean;
}
export type BaseSearchQLChange = { name: string; value: SelectValue };
export interface BaseSearchQLTexts {
  placeholder?: string;
  searchAriaLabel?: string;
  searchSuggestionPrefix?: string;
  searchSuggestionConnector?: string;
  defaultFiltersLabel?: string;
  removeFilterAriaLabel?: string;
  noResultsText?: string;
  dateRangeLabel?: string;
  dateRangeAriaLabel?: string;
  acceptDateRangeLabel?: string;
  dateRangePlaceholder?: string;
  dateFromLabel?: string;
  dateToLabel?: string;
  dateLocale?: string;
}
export interface BaseSearchQLProps {
  id?: string;
  size?: Size;
  modelValue?: BaseSearchQLChange[];
  filters?: BaseSearchQLTextFilter[];
  defaultFilters?: BaseSearchQLDefaultFilter[];
  texts?: BaseSearchQLTexts;
  placeholder?: string;
  searchAriaLabel?: string;
  searchSuggestionPrefix?: string;
  searchSuggestionConnector?: string;
  defaultFiltersLabel?: string;
  removeFilterAriaLabel?: string;
  noResultsText?: string;
  showDateRange?: boolean;
  dateRangeRequired?: boolean;
  dateValue?: DateRangeValue;
  dateRangeLabel?: string;
  dateRangeAriaLabel?: string;
  acceptDateRangeLabel?: string;
  dateRangePlaceholder?: string;
  dateFromLabel?: string;
  dateToLabel?: string;
  disabled?: boolean;
}
export interface TabOption {
  label?: string;
  title?: string;
  value?: string | number;
  id?: string;
  panelId?: string;
  disabled?: boolean;
}
export interface BaseTabsProps {
  modelValue?: string | number;
  tabs: TabOption[];
  ariaLabel?: string;
}

export type StepperValue = string | number;
export type BaseStepperVariant = "circles" | "bars" | "pills" | "vertical";
export type StepperDescriptionPosition = "top" | "bottom";

export interface BaseStepperStep {
  value: StepperValue;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface BaseStepperChangeEvent {
  value: StepperValue;
  previousValue: StepperValue;
  step: BaseStepperStep;
  index: number;
}

export interface BaseStepperProps {
  modelValue: StepperValue;
  steps: BaseStepperStep[];
  variant?: BaseStepperVariant;
  navigable?: boolean;
  showStepDescriptions?: boolean;
  description?: string;
  descriptionPosition?: StepperDescriptionPosition;
  ariaLabel?: string;
  stepDescriptionAriaLabel?: string;
}

export type BaseTimelinePrecision = "month" | "year";

export interface BaseTimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  /** Fecha ISO parcial: "2020" o "2020-09". */
  start: string;
  /** Fecha ISO parcial; `null` indica un periodo en curso y sin valor solo se muestra `start`. */
  end?: string | null;
  precision?: BaseTimelinePrecision;
  icon?: BaseIconName | (string & {});
}

export interface BaseTimelineProps {
  items: readonly BaseTimelineItem[];
  locale?: string;
  presentLabel?: string;
  dateSeparator?: string;
  ariaLabel?: string;
  titleAs?: "h2" | "h3" | "h4" | "p";
  size?: "sm" | "md";
}

export type BaseTableAlignment = "left" | "center" | "right";
export type BaseTableSortDirection = "asc" | "desc";
export type BaseTableRow = Record<string, any>;

export interface BaseTableColumn {
  key: string;
  label: string;
  field?: string | ((row: BaseTableRow) => unknown);
  formatter?: (value: unknown, row: BaseTableRow, rowIndex: number) => unknown;
  sortable?: boolean;
  required?: boolean;
  requiredMessage?: string;
  align?: BaseTableAlignment;
  headerAlign?: BaseTableAlignment;
}

export interface BaseTableSort {
  key: string;
  direction: BaseTableSortDirection;
}

export interface BaseTableProps {
  rows: BaseTableRow[];
  columns: BaseTableColumn[];
  totalItems: number;
  pageSize: number;
  page?: number;
  paginationMode?: "local" | "remote";
  paginationStyle?: "default" | "floating";
  paginationAriaLabel?: string;
  previousPageAriaLabel?: string;
  nextPageAriaLabel?: string;
  rowKey?: string | ((row: BaseTableRow, index?: number) => string | number);
  loading?: boolean;
  size?: Size;
  caption?: string;
  emptyText?: string;
  sort?: BaseTableSort | null;
  selectable?: boolean;
  selectedRows?: BaseTableRow[];
  clearSelectionOnPageChange?: boolean;
  addable?: boolean;
  editable?: boolean;
  deletable?: boolean;
}

export interface BaseInputProps extends CommonFieldProps {
  name?: string;
  placeholder?: string;
  type?: string;
  mode?: "edit" | "read";
  suffix?: string;
  maxLength?: number | null;
  maxLengthVisible?: boolean;
  showPasswordAriaLabel?: string;
  hidePasswordAriaLabel?: string;
}
export interface PhoneCountry {
  name: string;
  prefix: string;
  iso2?: string;
  /** Emoji o URI de imagen (por ejemplo, un SVG) para la bandera. */
  flag?: string;
}
export interface BasePhoneInputProps extends CommonFieldProps {
  name?: string;
  countries?: PhoneCountry[];
  defaultCountry?: string;
  placeholder?: string;
  countrySearchPlaceholder?: string;
  noResultsText?: string;
  countrySelectorAriaLabel?: string;
  showFlags?: boolean;
  modelValue?: string;
}
export interface BaseTextareaProps extends CommonFieldProps {
  rows?: number;
  maxLength?: number | null;
  maxLengthVisible?: boolean;
}
export interface BaseCheckboxProps extends CommonFieldProps {
  labelPosition?: "top" | "end";
  name?: string;
  type?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md";
  invalid?: boolean;
  indeterminate?: boolean;
}
export interface BaseRadioProps {
  id: string;
  name: string;
  value: string | number | boolean;
  label?: string;
  labelPosition?: "top" | "end";
  size?: "sm" | "md";
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  modelValue?: string | number | boolean;
}
export interface BaseRadioGroupOption {
  id?: string;
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
}
export interface BaseRadioGroupProps {
  id?: string;
  name: string;
  label?: string;
  options: BaseRadioGroupOption[];
  optionLabelPosition?: "top" | "end";
  orientation?: "vertical" | "horizontal";
  bordered?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  modelValue?: string | number | boolean;
}
export interface BaseSwitchProps {
  id: string;
  label?: string;
  labelPosition?: "top" | "end";
  size?: "sm" | "md";
  modelValue?: boolean;
  disabled?: boolean;
  error?: string;
}
export interface SelectOption {
  label?: string;
  value?: SelectValue;
  disabled?: boolean;
  [key: string]: unknown;
}
export interface BaseSelectProps extends CommonFieldProps {
  name?: string;
  placeholder?: string;
  multiple?: boolean;
  allowCreate?: boolean;
  searchPlaceholder?: string;
  createOptionText?: string;
  removeOptionAriaLabel?: string;
  moreSelectedAriaLabel?: string;
  options: Array<SelectValue | SelectOption>;
  modelValue?: SelectValue | SelectValue[];
}
export interface AutocompleteOption {
  label?: string;
  value?: SelectValue;
  disabled?: boolean;
  [key: string]: unknown;
}
export interface BaseAutocompleteProps extends CommonFieldProps {
  options?: Array<SelectValue | AutocompleteOption>;
  fetchOptions?: (
    query: string,
    context: { limit: number; signal: AbortSignal },
  ) => Promise<Array<SelectValue | AutocompleteOption>>;
  allowCreate?: boolean;
  labelKey?: string;
  selectedLabelKey?: string;
  valueKey?: string;
  initialMatchKey?: string;
  initialMatchValue?: string | number;
  minChars?: number;
  debounceMs?: number;
  maxSuggestions?: number;
  clearAriaLabel?: string;
  loadingText?: string;
  noResultsText?: string;
  loadErrorText?: string;
  modelValue?: SelectValue;
}
export interface DatePickerProps extends CommonFieldProps {
  name?: string;
  placeholder?: string;
  clearAriaLabel?: string;
  ariaLabels?: Record<string, string>;
  actionRow?: Record<string, unknown>;
  dayNames?: unknown[] | ((date: Date) => string);
  weekNumbers?: boolean | Record<string, unknown>;
  dark?: boolean;
  clearable?: boolean;
  locale?: string | Record<string, unknown>;
  formats?: Record<string, unknown> | null;
  modelType?: string;
  teleport?: boolean | string | Record<string, unknown>;
  minDate?: Date | string | number;
  maxDate?: Date | string | number;
  disabledDates?: unknown[] | ((date: Date) => boolean);
  allowedDates?: unknown[];
  preventMinMaxNavigation?: boolean;
  filters?: Record<string, unknown>;
  pickerProps?: Record<string, unknown>;
  inputIcon?: "calendar" | "clock";
  modelValue?: DateValue;
}
export interface BaseDateInputProps extends DatePickerProps {
  autoApply?: boolean;
}
export interface BaseDateTimeInputProps extends DatePickerProps {
  autoApply?: boolean;
  minTime?: Record<string, unknown>;
  maxTime?: Record<string, unknown>;
  disabledTimes?: unknown[] | ((time: unknown) => boolean);
  timeConfig?: Record<string, unknown>;
}
export interface BaseMonthInputProps extends DatePickerProps {
  autoApply?: boolean;
}
export interface BaseYearInputProps extends DatePickerProps {
  autoApply?: boolean;
  modelValue?: number | null;
}
export interface BaseColorPickerProps extends CommonFieldProps {
  name?: string;
  placeholder?: string;
  /**
   * Colores predefinidos en formato hexadecimal (`#rgb` o `#rrggbb`). Los valores no válidos o
   * repetidos se ignoran. El tamaño de cada muestra usa `--jnv-color-picker-swatch-size`.
   */
  swatches?: readonly string[];
  inputAriaLabel?: string;
  toggleAriaLabel?: string;
  panelAriaLabel?: string;
  saturationLabel?: string;
  brightnessLabel?: string;
  hueAriaLabel?: string;
  swatchesAriaLabel?: string;
  /** Color normalizado `#rrggbb` en minúsculas, o `""` sin color. */
  modelValue?: string;
}
export interface BaseSignatureProps {
  id?: string;
  label?: string;
  help?: string;
  error?: string;
  clearAriaLabel?: string;
  drawingInstructions?: string;
  width?: number;
  height?: number;
  required?: boolean;
  disabled?: boolean;
  modelValue?: string | null;
}

export type TypedComponent<Props, Model = never> = DefineComponent<Props> & {
  new (): ComponentPublicInstance<Props, Model>;
};

// `[Model]` evita un condicional distributivo: con `Model = never` el resultado debe ser `{}` y no
// `never`, que haría inasignable cualquier componente en consumidores con vue-tsc estricto.
type ComponentPublicInstance<Props, Model> = Component & {
  $props: Props;
  $emit: (event: string, ...args: any[]) => void;
} & ([Model] extends [never] ? {} : Model);
