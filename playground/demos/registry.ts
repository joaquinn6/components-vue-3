import type { Component } from "vue";

import AlertDemo from "./AlertDemo.vue";
import AutocompleteDemo from "./AutocompleteDemo.vue";
import BreadcrumbDemo from "./BreadcrumbDemo.vue";
import ButtonDemo from "./ButtonDemo.vue";
import CardDemo from "./CardDemo.vue";
import CheckboxDemo from "./CheckboxDemo.vue";
import ConfirmDialogDemo from "./ConfirmDialogDemo.vue";
import DateInputDemo from "./DateInputDemo.vue";
import DatePickerDemo from "./DatePickerDemo.vue";
import DateTimeInputDemo from "./DateTimeInputDemo.vue";
import DialogDemo from "./DialogDemo.vue";
import DropdownMenuDemo from "./DropdownMenuDemo.vue";
import FieldInfoDemo from "./FieldInfoDemo.vue";
import FormLayoutDemo from "./FormLayoutDemo.vue";
import HeadingDemo from "./HeadingDemo.vue";
import IconDemo from "./IconDemo.vue";
import InputDemo from "./InputDemo.vue";
import LinkDemo from "./LinkDemo.vue";
import LoadingDirectiveDemo from "./LoadingDirectiveDemo.vue";
import MonthInputDemo from "./MonthInputDemo.vue";
import PhoneInputDemo from "./PhoneInputDemo.vue";
import RadioDemo from "./RadioDemo.vue";
import SearchQLDemo from "./SearchQLDemo.vue";
import SelectDemo from "./SelectDemo.vue";
import SignatureDemo from "./SignatureDemo.vue";
import StepperDemo from "./StepperDemo.vue";
import SwitchDemo from "./SwitchDemo.vue";
import TableDemo from "./TableDemo.vue";
import TabsDemo from "./TabsDemo.vue";
import TextareaDemo from "./TextareaDemo.vue";
import TextDemo from "./TextDemo.vue";
import YearInputDemo from "./YearInputDemo.vue";

export interface DemoEntry {
  /** Debe coincidir con el id de la DemoSection del componente. */
  id: string;
  name: string;
  category: string;
  component: Component;
}

// Única fuente para el orden de las secciones y el índice lateral.
export const demos: readonly DemoEntry[] = [
  {
    id: "base-heading",
    name: "BaseHeading",
    category: "Contenido",
    component: HeadingDemo,
  },
  {
    id: "base-text",
    name: "BaseText",
    category: "Contenido",
    component: TextDemo,
  },
  {
    id: "base-card",
    name: "BaseCard",
    category: "Contenido",
    component: CardDemo,
  },
  {
    id: "base-alert",
    name: "BaseAlert",
    category: "Contenido",
    component: AlertDemo,
  },
  {
    id: "base-field-info",
    name: "BaseFieldInfo",
    category: "Contenido",
    component: FieldInfoDemo,
  },
  {
    id: "base-icon",
    name: "BaseIcon",
    category: "Contenido",
    component: IconDemo,
  },

  {
    id: "base-button",
    name: "BaseButton",
    category: "Acciones",
    component: ButtonDemo,
  },
  {
    id: "base-link",
    name: "BaseLink",
    category: "Acciones",
    component: LinkDemo,
  },
  {
    id: "base-dropdown-menu",
    name: "BaseDropdownMenu",
    category: "Acciones",
    component: DropdownMenuDemo,
  },
  {
    id: "v-loading",
    name: "v-loading",
    category: "Acciones",
    component: LoadingDirectiveDemo,
  },

  {
    id: "base-dialog",
    name: "BaseDialog",
    category: "Diálogos",
    component: DialogDemo,
  },
  {
    id: "base-confirm-dialog",
    name: "BaseConfirmDialog",
    category: "Diálogos",
    component: ConfirmDialogDemo,
  },

  {
    id: "base-form-layout",
    name: "BaseFormSection · BaseFormRow",
    category: "Formularios",
    component: FormLayoutDemo,
  },
  {
    id: "base-input",
    name: "BaseInput",
    category: "Formularios",
    component: InputDemo,
  },
  {
    id: "base-phone-input",
    name: "BasePhoneInput",
    category: "Formularios",
    component: PhoneInputDemo,
  },
  {
    id: "base-textarea",
    name: "BaseTextarea",
    category: "Formularios",
    component: TextareaDemo,
  },
  {
    id: "base-select",
    name: "BaseSelect",
    category: "Formularios",
    component: SelectDemo,
  },
  {
    id: "base-autocomplete",
    name: "BaseAutocomplete",
    category: "Formularios",
    component: AutocompleteDemo,
  },
  {
    id: "base-checkbox",
    name: "BaseCheckbox",
    category: "Formularios",
    component: CheckboxDemo,
  },
  {
    id: "base-radio",
    name: "BaseRadioGroup · BaseRadio",
    category: "Formularios",
    component: RadioDemo,
  },
  {
    id: "base-switch",
    name: "BaseSwitch",
    category: "Formularios",
    component: SwitchDemo,
  },
  {
    id: "base-signature",
    name: "BaseSignature",
    category: "Formularios",
    component: SignatureDemo,
  },

  {
    id: "base-date-input",
    name: "BaseDateInput",
    category: "Fecha y hora",
    component: DateInputDemo,
  },
  {
    id: "base-date-time-input",
    name: "BaseDateTimeInput",
    category: "Fecha y hora",
    component: DateTimeInputDemo,
  },
  {
    id: "base-month-input",
    name: "BaseMonthInput",
    category: "Fecha y hora",
    component: MonthInputDemo,
  },
  {
    id: "base-year-input",
    name: "BaseYearInput",
    category: "Fecha y hora",
    component: YearInputDemo,
  },
  {
    id: "base-date-picker",
    name: "BaseDatePicker",
    category: "Fecha y hora",
    component: DatePickerDemo,
  },

  {
    id: "base-breadcrumb",
    name: "BaseBreadcrumb",
    category: "Navegación",
    component: BreadcrumbDemo,
  },
  {
    id: "base-tabs",
    name: "BaseTabs",
    category: "Navegación",
    component: TabsDemo,
  },
  {
    id: "base-stepper",
    name: "BaseStepper",
    category: "Navegación",
    component: StepperDemo,
  },

  {
    id: "base-table",
    name: "BaseTable",
    category: "Datos",
    component: TableDemo,
  },
  {
    id: "base-search-ql",
    name: "BaseSearchQL",
    category: "Datos",
    component: SearchQLDemo,
  },
];
