/** Nombre visible de un componente sin el prefijo `Base` (BaseRadioGroup → RadioGroup). */
export function displayName(componentName: string) {
  return componentName.replace(/\bBase(?=[A-Z])/g, "");
}
