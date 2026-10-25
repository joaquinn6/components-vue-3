import { readFile } from "node:fs/promises";

const files = [
  "BaseAlert",
  "BaseBadge",
  "BaseToast",
  "BaseAutocomplete",
  "BaseBreadcrumb",
  "BaseDropdownMenu",
  "BaseButton",
  "BaseCard",
  "BaseCheckbox",
  "BaseConfirmDialog",
  "BaseDialog",
  "BaseFieldInfo",
  "BaseFormColumns",
  "BaseFormRow",
  "BaseFormSection",
  "BaseHeading",
  "BaseIcon",
  "BaseInput",
  "BaseLink",
  "BasePhoneInput",
  "BaseRadio",
  "BaseRadioGroup",
  "BaseSelect",
  "BaseSearchQL",
  "BaseSignature",
  "BaseStepper",
  "BaseSwitch",
  "BaseTable",
  "BaseText",
  "BaseTabs",
  "BaseTextarea",
  "BaseTimeline",
  "BaseDateInput",
  "BaseDatePicker",
  "BaseDateTimeInput",
  "BaseYearInput",
  "BaseMonthInput",
].map((name) => `src/components/${name}.vue`);

const forbidden = /#[\da-f]{3,8}\b|\brgba?\(|\bhsla?\(|\bcolor-mix\(/i;
const violations = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  content.split(/\r?\n/).forEach((line, index) => {
    if (forbidden.test(line))
      violations.push(`${file}:${index + 1}: ${line.trim()}`);
  });
}

if (violations.length) {
  console.error(
    "Los componentes base no pueden declarar colores ni color-mix():\n" +
      violations.join("\n"),
  );
  process.exitCode = 1;
}
