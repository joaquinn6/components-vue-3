import { nextTick, onBeforeUnmount, ref, watch, type Ref } from "vue";

interface ModalDialogOptions {
  /** Estado abierto del componente. */
  open: () => boolean;
  dialog: Ref<HTMLDialogElement | null>;
  /** Se llama tras abrir el diálogo para enfocar su primer control. */
  focusInitial: () => void;
}

/**
 * Ciclo de vida compartido de un `<dialog>` modal nativo: lo abre con `showModal()`, recuerda el
 * elemento enfocado antes de abrir, lo cierra al desmontar y permite restaurar el foco.
 */
export function useModalDialog({
  open,
  dialog,
  focusInitial,
}: ModalDialogOptions) {
  const previousFocus = ref<HTMLElement | null>(null);

  function restoreFocus() {
    nextTick(() => previousFocus.value?.focus?.());
  }

  watch(
    open,
    async (isOpen) => {
      if (isOpen) {
        if (typeof document === "undefined") return;
        previousFocus.value = document.activeElement as HTMLElement | null;
        await nextTick();
        if (!dialog.value?.open) dialog.value?.showModal();
        await nextTick();
        focusInitial();
        return;
      }

      if (dialog.value?.open) dialog.value.close();
    },
    { immediate: true, flush: "post" },
  );

  onBeforeUnmount(() => {
    if (dialog.value?.open) dialog.value.close();
  });

  return { restoreFocus };
}
