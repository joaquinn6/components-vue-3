import type { ComputedRef, InjectionKey } from "vue";

export type CollapseItemValue = string | number;
export type CollapseVariant = "plain" | "card";

/** Contexto privado que `BaseCollapseGroup` comparte con sus `BaseCollapse`. */
export interface CollapseGroupContext {
  variant: ComputedRef<CollapseVariant>;
  isOpen: (value: CollapseItemValue) => boolean;
  /** Devuelve `false` cuando el grupo rechaza el cambio. */
  setOpen: (value: CollapseItemValue, open: boolean) => boolean;
}

export const collapseGroupKey: InjectionKey<CollapseGroupContext> =
  Symbol("BaseCollapseGroup");
