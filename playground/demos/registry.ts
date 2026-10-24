import type { Component } from "vue";

import type { DemoCategory } from "../i18n/ui";

import AlertDemo from "./AlertDemo.vue";
import AutocompleteDemo from "./AutocompleteDemo.vue";
import BadgeDemo from "./BadgeDemo.vue";
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
import ToastDemo from "./ToastDemo.vue";
import YearInputDemo from "./YearInputDemo.vue";

export interface DemoEntry {
  /** Debe coincidir con el id de la DemoSection del componente. */
  id: string;
  name: string;
  category: DemoCategory;
  component: Component;
}

// Única fuente para el orden de las secciones y el índice lateral.
export const demos: readonly DemoEntry[] = [
  {
    id: "base-heading",
    name: "BaseHeading",
    category: "content",
    component: HeadingDemo,
  },
  {
    id: "base-text",
    name: "BaseText",
    category: "content",
    component: TextDemo,
  },
  {
    id: "base-card",
    name: "BaseCard",
    category: "content",
    component: CardDemo,
  },
  {
    id: "base-alert",
    name: "BaseAlert",
    category: "content",
    component: AlertDemo,
  },
  {
    id: "base-badge",
    name: "BaseBadge",
    category: "content",
    component: BadgeDemo,
  },
  {
    id: "base-toast",
    name: "BaseToast",
    category: "content",
    component: ToastDemo,
  },
  {
    id: "base-field-info",
    name: "BaseFieldInfo",
    category: "content",
    component: FieldInfoDemo,
  },
  {
    id: "base-icon",
    name: "BaseIcon",
    category: "content",
    component: IconDemo,
  },

  {
    id: "base-button",
    name: "BaseButton",
    category: "actions",
    component: ButtonDemo,
  },
  {
    id: "base-link",
    name: "BaseLink",
    category: "actions",
    component: LinkDemo,
  },
  {
    id: "base-dropdown-menu",
    name: "BaseDropdownMenu",
    category: "actions",
    component: DropdownMenuDemo,
  },
  {
    id: "v-loading",
    name: "v-loading",
    category: "actions",
    component: LoadingDirectiveDemo,
  },

  {
    id: "base-dialog",
    name: "BaseDialog",
    category: "dialogs",
    component: DialogDemo,
  },
  {
    id: "base-confirm-dialog",
    name: "BaseConfirmDialog",
    category: "dialogs",
    component: ConfirmDialogDemo,
  },

  {
    id: "base-form-layout",
    name: "BaseFormSection · BaseFormRow · BaseFormColumns",
    category: "forms",
    component: FormLayoutDemo,
  },
  {
    id: "base-input",
    name: "BaseInput",
    category: "forms",
    component: InputDemo,
  },
  {
    id: "base-phone-input",
    name: "BasePhoneInput",
    category: "forms",
    component: PhoneInputDemo,
  },
  {
    id: "base-textarea",
    name: "BaseTextarea",
    category: "forms",
    component: TextareaDemo,
  },
  {
    id: "base-select",
    name: "BaseSelect",
    category: "forms",
    component: SelectDemo,
  },
  {
    id: "base-autocomplete",
    name: "BaseAutocomplete",
    category: "forms",
    component: AutocompleteDemo,
  },
  {
    id: "base-checkbox",
    name: "BaseCheckbox",
    category: "forms",
    component: CheckboxDemo,
  },
  {
    id: "base-radio",
    name: "BaseRadioGroup · BaseRadio",
    category: "forms",
    component: RadioDemo,
  },
  {
    id: "base-switch",
    name: "BaseSwitch",
    category: "forms",
    component: SwitchDemo,
  },
  {
    id: "base-signature",
    name: "BaseSignature",
    category: "forms",
    component: SignatureDemo,
  },

  {
    id: "base-date-input",
    name: "BaseDateInput",
    category: "dates",
    component: DateInputDemo,
  },
  {
    id: "base-date-time-input",
    name: "BaseDateTimeInput",
    category: "dates",
    component: DateTimeInputDemo,
  },
  {
    id: "base-month-input",
    name: "BaseMonthInput",
    category: "dates",
    component: MonthInputDemo,
  },
  {
    id: "base-year-input",
    name: "BaseYearInput",
    category: "dates",
    component: YearInputDemo,
  },
  {
    id: "base-date-picker",
    name: "BaseDatePicker",
    category: "dates",
    component: DatePickerDemo,
  },

  {
    id: "base-breadcrumb",
    name: "BaseBreadcrumb",
    category: "navigation",
    component: BreadcrumbDemo,
  },
  {
    id: "base-tabs",
    name: "BaseTabs",
    category: "navigation",
    component: TabsDemo,
  },
  {
    id: "base-stepper",
    name: "BaseStepper",
    category: "navigation",
    component: StepperDemo,
  },

  {
    id: "base-table",
    name: "BaseTable",
    category: "data",
    component: TableDemo,
  },
  {
    id: "base-search-ql",
    name: "BaseSearchQL",
    category: "data",
    component: SearchQLDemo,
  },
];
