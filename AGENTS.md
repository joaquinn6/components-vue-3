# Guía para agentes

Este repositorio contiene una biblioteca privada de componentes Vue 3 tematizables. Estas reglas
aplican a todo el proyecto y deben respetarse al crear o modificar componentes.

## Arquitectura relevante

- Los componentes Vue están en `src/components`.
- La API TypeScript pública se declara en `src/public-types.ts`.
- Los componentes, directivas y tipos públicos se exportan desde `src/index.ts`.
- El contrato de tokens y los temas distribuidos están en `src/styles`.
- La referencia pública de componentes y temas está en `docs/components.md` y `docs/theming.md`.
- Antes de duplicar una solución, revisa los componentes base, las primitivas CSS, los composables
  y las directivas existentes.
- Reutiliza los componentes existentes siempre que puedan cubrir la necesidad sin alterar la
  semántica ni el comportamiento requerido. Por ejemplo, usa `BaseButton` para las acciones en
  lugar de crear botones HTML con implementación y estilos duplicados.

## Componentes y API pública

- Preserva el comportamiento, la semántica y los valores predeterminados existentes. Prioriza
  cambios aditivos y compatibles con los consumidores actuales.
- No elimines ni renombres props, eventos, modelos, slots, métodos expuestos, exportaciones o
  tokens CSS, ni cambies su significado o valor predeterminado, salvo que la tarea solicite
  explícitamente un cambio incompatible.
- Mantén sincronizado todo cambio de API pública entre la implementación del componente,
  `src/public-types.ts`, `src/index.ts` cuando corresponda y `docs/components.md`.
- Un componente nuevo debe exportarse públicamente, declarar sus tipos y quedar documentado.
- Al crear o modificar un componente, evalúa si el cambio debe representarse en el playground. Un
  componente público nuevo debe añadirse a `playground/`; para un componente existente, actualiza
  su ejemplo cuando cambien su apariencia, variantes, estados, props o interacciones observables.
  Si el cambio no aplica al playground, no añadas ejemplos artificiales y deja constancia de ello
  en la entrega.
- Todo texto visible del playground (descripciones, títulos de ejemplos, etiquetas, mensajes y
  textos pasados a las props de los componentes) debe estar disponible en inglés (`en`) y español
  (`es`) mediante `useMessages` de `playground/i18n/usePlaygroundLocale.ts`. No escribas textos
  fijos en la plantilla de una demo. Las demos nuevas se registran en `playground/demos/registry.ts`.
  Los fragmentos de código mostrados en `DemoExample` pueden quedar en inglés.
- Documenta las props nuevas, los valores o variantes aceptados, los eventos y sus payloads, los
  modelos, los slots y los métodos expuestos.
- La documentación de un componente nuevo debe incluir su propósito, un ejemplo mínimo, props con
  tipo y valor predeterminado, eventos con su payload, modelos, slots y métodos expuestos. No
  documentes capacidades que todavía no estén implementadas.
- Todo texto fijo visible o accesible debe poder sustituirse mediante una prop opcional. Esto
  incluye estados vacíos, mensajes, placeholders, títulos, instrucciones y etiquetas ARIA. Conserva
  valores predeterminados en español para no romper consumidores existentes.
- Trata las props, objetos y arreglos recibidos como inmutables. Comunica cambios mediante
  `v-model`, eventos `update:*` u otros eventos documentados. Para ediciones temporales, crea un
  borrador interno y emite el resultado.
- Si un comportamiento será compartido por más de un componente, extráelo a una primitiva,
  composable, directiva o componente común sin alterar la API ni el comportamiento actual.

## Tema y estilos

- No declares colores literales en componentes: están prohibidos valores hexadecimales, `rgb()`,
  `rgba()`, `hsl()`, `hsla()`, `color-mix()` y nombres de colores usados como valor.
- Los componentes solo pueden consumir tokens semánticos `--jnv-*`; no deben consumir directamente
  tokens de paleta. Antes de crear un token, comprueba si uno existente representa la misma
  intención visual.
- Todo token nuevo debe declararse en `src/styles/jnv-tokens-contract.css`, recibir un valor en
  `src/styles/themes/jnv.css` y `src/styles/themes/jnv-light.css`, y documentarse en
  `docs/theming.md`. Si el token afecta a una prop pública (por ejemplo, el ancho de un `size`),
  descríbelo también en el JSDoc de esa prop en `src/public-types.ts`.
- Nunca consumas un token que no exista. Antes de usar una variable CSS (`--jnv-*`, `--space-*`,
  `--radius-*`, `--shadow-*`, etc.), comprueba que esté definida en `src/styles/primitives.css`, en
  el contrato o en los temas; una variable indefinida invalida la declaración en silencio.
- Al crear un componente, inclúyelo en el alcance de `scripts/check-base-colors.mjs`.
- Los componentes nuevos deben llamarse `BaseXxx` y usar clases CSS con prefijo `base-xxx`.
- Mantén los estilos del componente encapsulados con `scoped`. Solo usa estilos globales cuando una
  integración externa lo requiera; justifica la excepción y limita sus selectores al componente.
- No dependas de clases privadas ni de la estructura interna de un portal consumidor. Los estilos
  globales compartidos deben vivir en las hojas centrales cargadas desde `src/styles.css`.

## Accesibilidad y ciclo de vida

- Usa elementos HTML semánticos y conserva la operación completa por teclado, el foco visible y
  predecible, y los estados ARIA sincronizados con el estado real del componente.
- Toda acción con icono o sin texto visible debe tener una etiqueta accesible configurable.
- Al modificar un componente interactivo, comprueba que no se degraden la navegación por teclado,
  la administración del foco, los mensajes de error ni las regiones `aria-live` existentes.
- Cada instancia debe generar identificadores únicos y mantener su estado mutable aislado. No
  compartas estado mutable entre instancias.
- Limpia en `onUnmounted` listeners globales, temporizadores, observadores y cualquier otro recurso
  creado por el componente.
- Limita el acceso a `window` y `document` al ciclo de vida del componente y protégelo cuando el
  código pueda ejecutarse fuera del navegador.

## Dependencias

- No agregues dependencias de ejecución sin autorización explícita.
- Si se autoriza una dependencia, explica por qué Vue, una utilidad local o una dependencia
  existente no son suficientes. Determina correctamente si corresponde a `dependencies`,
  `peerDependencies` o una dependencia opcional, externalízala en la compilación cuando aplique y
  documenta sus requisitos de instalación.

## Validación de cambios

- Para todo cambio en componentes, ejecuta:

  ```bash
  pnpm check:types
  pnpm check:consumer-types
  pnpm check:base-colors
  pnpm build
  ```

- Ejecuta Prettier únicamente sobre los archivos modificados. No reformatees archivos ajenos al
  cambio para corregir problemas preexistentes.
- Cuando se modifique el playground, ejecuta además `pnpm check:playground-types` y comprueba el
  ejemplo afectado en `pnpm dev` con los temas JNV oscuro y claro.
- Si una validación no puede ejecutarse o falla por una condición preexistente, indícalo claramente
  en la entrega.
- Verifica los cambios visuales o interactivos con los temas JNV oscuro y claro, y en los estados que
  apliquen: normal, hover, `focus-visible`, disabled, loading, error, success y tamaños soportados.
- Prueba sin ratón cualquier interacción por teclado. En una corrección, registra el escenario
  reproducido antes del cambio y validado después.

## Compatibilidad, versiones y publicación

- Si una tarea exige un cambio incompatible, documenta la migración y señala el incremento SemVer
  recomendado. Las funcionalidades compatibles corresponden a `MINOR` y las correcciones
  compatibles a `PATCH`; sigue la política vigente del proyecto para cambios incompatibles durante
  la etapa `0.x`.
- Salvo solicitud explícita, no cambies la versión de `package.json`, no crees etiquetas, no
  publiques el paquete ni modifiques credenciales o configuración del registro. En una entrega
  ordinaria, limita el reporte a indicar el impacto SemVer recomendado.
