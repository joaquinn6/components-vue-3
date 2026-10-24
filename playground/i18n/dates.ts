import { useMessages } from "./usePlaygroundLocale";

/**
 * Textos accesibles compartidos por los campos de fecha.
 * El calendario de @vuepic/vue-datepicker (meses y días) sigue en su idioma predeterminado,
 * porque traducirlo requiere objetos Locale de date-fns.
 */
export function useDateFieldMessages() {
  return useMessages({
    en: { clear: "Clear date", info: "More information" },
    es: { clear: "Borrar fecha", info: "Más información" },
  });
}
