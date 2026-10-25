import {
  BaseBadge,
  BaseButton,
  BaseFormColumns,
  BaseBreadcrumb,
  BaseIcon,
  BaseRadio,
  BaseSearchQL,
  BaseSelect,
  BaseStepper,
  BaseTable,
  BaseTabs,
  BaseTimeline,
  BaseToast,
  loading,
} from "@joaquinn6/jnv-ui-components";
import type {
  BaseBadgeProps,
  BaseButtonProps,
  BaseBreadcrumbItem,
  BaseIconName,
  BaseIconProps,
  BaseBreadcrumbProps,
  BaseRadioProps,
  BaseSearchQLChange,
  BaseSearchQLProps,
  BaseSelectProps,
  BaseStepperProps,
  BaseStepperStep,
  BaseTableProps,
  BaseTabsProps,
  BaseTimelineItem,
  BaseTimelineProps,
  BaseToastProps,
  LoadingDirective,
} from "@joaquinn6/jnv-ui-components";

const buttonProps: BaseButtonProps = {
  variant: "secondary",
  size: "md",
  type: "submit",
};
void buttonProps;

const breadcrumbItems: BaseBreadcrumbItem[] = [
  { name: "Inicio", to: { name: "home" } },
  {
    name: "Pedido",
    to: { name: "order-detail", params: { id: "HTK-1042" } },
  },
  { name: "Editar pedido" },
];
const breadcrumbProps: BaseBreadcrumbProps = {
  value: breadcrumbItems,
  divider: ">",
  ariaLabel: "Migas de pan",
};
void breadcrumbProps;

const radioProps: BaseRadioProps = {
  id: "choice-a",
  name: "choice",
  value: "a",
  label: "A",
};
void radioProps;

const selectProps: BaseSelectProps = {
  options: [{ label: "A", value: "a" }],
};
void selectProps;

const searchQLProps: BaseSearchQLProps = {
  modelValue: [
    { name: "customer.name", value: ".*Ada.*" },
    { name: "status", value: "delivered" },
  ],
  filters: [{ name: "customer.name", label: "Cliente", regex: true }],
  defaultFilters: [
    {
      name: "status",
      label: "Estado",
      multiple: true,
      options: [{ value: "delivered", label: "Entregado" }],
    },
  ],
};
const searchQLChange: BaseSearchQLChange[] = [
  { name: "customer.name", value: ".*Ada.*" },
  { name: "status", value: "delivered" },
];
void searchQLProps;
void searchQLChange;

const tabsProps: BaseTabsProps = {
  tabs: [{ label: "General", value: "general" }],
  modelValue: "general",
};
void tabsProps;

const stepperSteps: BaseStepperStep[] = [
  { value: "order", label: "Pedido", description: "Identifica tu pedido." },
  { value: "shipping", label: "Envío", disabled: true },
];
const stepperProps: BaseStepperProps = {
  modelValue: "order",
  steps: stepperSteps,
  variant: "vertical",
  navigable: true,
};
void stepperProps;

const timelineItems: readonly BaseTimelineItem[] = [
  {
    id: "a",
    title: "Frontend",
    start: "2022-03",
    end: null,
    icon: "briefcase",
  },
  {
    id: "b",
    title: "Ingeniería",
    start: "2016",
    end: "2020",
    precision: "year",
  },
];
const timelineProps: BaseTimelineProps = {
  items: timelineItems,
  locale: "en",
  titleAs: "h4",
  size: "sm",
};
void timelineProps;

const invalidTimeline: BaseTimelineProps = {
  items: timelineItems,
  // @ts-expect-error Timeline sizes are intentionally restricted.
  size: "lg",
};
void invalidTimeline;

const badgeProps: BaseBadgeProps = { label: "Entregado", tone: "success" };
void badgeProps;

const toastProps: BaseToastProps = {
  open: true,
  title: "Guardado",
  tone: "success",
  duration: 3000,
  position: "bottom-right",
};
void toastProps;

const tableProps: BaseTableProps = {
  rows: [],
  columns: [{ key: "name", label: "Nombre" }],
  totalItems: 0,
  pageSize: 10,
  size: "md",
  paginationStyle: "floating",
};
void tableProps;

const iconName: BaseIconName = "github";
const iconProps: BaseIconProps = {
  name: iconName,
  size: "sm",
  decorative: true,
};
// BaseIconProps.name keeps accepting any string for backwards compatibility.
const legacyIconProps: BaseIconProps = { name: "custom" as string };
void iconProps;
void legacyIconProps;

// @ts-expect-error Unknown names are not part of the BaseIconName union.
const invalidIconName: BaseIconName = "unknown";
void invalidIconName;

// vue-tsc resolves template props through InstanceType<typeof Component>["$props"]. If
// TypedComponent's default Model (never) distributes, the instance becomes never and every
// component usage fails with "not assignable to parameter of type 'never'".
type IsNever<T> = [T] extends [never] ? true : false;
const buttonInstanceIsNever: IsNever<InstanceType<typeof BaseButton>> = false;
const iconInstanceIsNever: IsNever<InstanceType<typeof BaseIcon>> = false;
const buttonInstanceProps: BaseButtonProps = (
  {} as InstanceType<typeof BaseButton>
).$props;
void buttonInstanceIsNever;
void iconInstanceIsNever;
void buttonInstanceProps;

// @ts-expect-error Component variants are intentionally restricted.
const invalidButton: BaseButtonProps = { variant: "unknown" };
void invalidButton;

// @ts-expect-error Badge tones are intentionally restricted.
const invalidBadge: BaseBadgeProps = { tone: "unknown" };
void invalidBadge;

// @ts-expect-error BaseRadio requires id, name, value and label.
const invalidRadio: BaseRadioProps = { id: "missing" };
void invalidRadio;

const invalidStepper: BaseStepperProps = {
  modelValue: "order",
  steps: stepperSteps,
  // @ts-expect-error Stepper variants are intentionally restricted.
  variant: "unknown",
};
void invalidStepper;

void BaseButton;
void BaseBreadcrumb;
void BaseRadio;
void BaseSearchQL;
void BaseSelect;
void BaseStepper;
void BaseTable;
void BaseTabs;
void BaseTimeline;
void BaseToast;
void BaseBadge;
void BaseFormColumns;
void BaseIcon;

const loadingDirective: LoadingDirective = loading;
void loadingDirective;
