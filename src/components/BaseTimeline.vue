<script setup lang="ts">
import { computed, type PropType } from "vue";
import type { BaseTimelineItem, BaseTimelinePrecision } from "../public-types";
import BaseIcon from "./BaseIcon.vue";

const props = defineProps({
  items: {
    type: Array as PropType<readonly BaseTimelineItem[]>,
    required: true,
  },
  locale: {
    type: String,
    default: "es",
  },
  presentLabel: {
    type: String,
    default: "Actualidad",
  },
  dateSeparator: {
    type: String,
    default: " – ",
  },
  ariaLabel: {
    type: String,
    default: "Línea de tiempo",
  },
  titleAs: {
    type: String as PropType<"h2" | "h3" | "h4" | "p">,
    default: "h3",
    validator: (value: string) => ["h2", "h3", "h4", "p"].includes(value),
  },
  size: {
    type: String as PropType<"sm" | "md">,
    default: "md",
    validator: (value: string) => ["sm", "md"].includes(value),
  },
});

// Solo se aceptan fechas ISO parciales: "2020" o "2020-09".
const isoDatePattern = /^(\d{4})(?:-(0[1-9]|1[0-2]))?$/;

function createFormatter(options: Intl.DateTimeFormatOptions) {
  const settings = { ...options, timeZone: "UTC" };
  try {
    return new Intl.DateTimeFormat(props.locale, settings);
  } catch {
    // Un locale inválido lanza RangeError; se conserva el idioma predeterminado.
    return new Intl.DateTimeFormat("es", settings);
  }
}

const monthFormatter = computed(() =>
  createFormatter({ year: "numeric", month: "short" }),
);
const yearFormatter = computed(() => createFormatter({ year: "numeric" }));

function formatDate(value: string, precision?: BaseTimelinePrecision) {
  const match = isoDatePattern.exec(value);
  if (!match) return value;

  const year = Number(match[1]);
  const month = match[2] ? Number(match[2]) - 1 : null;
  if (month === null || precision === "year")
    return yearFormatter.value.format(Date.UTC(year, 0, 1));

  return monthFormatter.value.format(Date.UTC(year, month, 1));
}

// Un valor fuera del formato ISO parcial se muestra, pero no se declara en datetime.
function machineDate(value: string) {
  return isoDatePattern.test(value) ? value : undefined;
}

function isCurrent(item: BaseTimelineItem) {
  return item.end === null;
}
</script>

<template>
  <ol
    class="base-timeline"
    :class="`base-timeline--${size}`"
    role="list"
    :aria-label="ariaLabel"
  >
    <li
      v-for="(item, index) in items"
      :key="item.id"
      class="base-timeline__item"
      :class="{ 'base-timeline__item--current': isCurrent(item) }"
    >
      <span
        class="base-timeline__marker"
        :class="{ 'base-timeline__marker--icon': item.icon }"
        aria-hidden="true"
      >
        <BaseIcon v-if="item.icon" :name="item.icon" size="sm" decorative />
        <span v-else class="base-timeline__dot" />
      </span>

      <div class="base-timeline__content">
        <component :is="titleAs" class="base-timeline__title">
          <span class="base-timeline__title-text">
            <slot name="title" :item="item" :index="index">
              {{ item.title }}
            </slot>
          </span>
        </component>

        <p v-if="item.subtitle" class="base-timeline__subtitle">
          {{ item.subtitle }}
        </p>

        <div class="base-timeline__meta">
          <!-- v-text evita espacios añadidos por el formato y respeta dateSeparator tal cual. -->
          <slot name="meta" :item="item" :index="index">
            <time
              :datetime="machineDate(item.start)"
              v-text="formatDate(item.start, item.precision)"
            />
            <template v-if="item.end !== undefined">
              <span v-text="dateSeparator" />
              <span v-if="isCurrent(item)" v-text="presentLabel" />
              <time
                v-else
                :datetime="machineDate(item.end)"
                v-text="formatDate(item.end, item.precision)"
              />
            </template>
          </slot>
        </div>

        <div v-if="$slots.item" class="base-timeline__body">
          <slot name="item" :item="item" :index="index" />
        </div>
      </div>
    </li>
  </ol>
</template>

<style scoped>
/* El ol declara role="list" porque Safari retira la semántica de lista con list-style: none. */
.base-timeline {
  padding: var(--space-0);
  margin: var(--space-0);
  color: var(--jnv-color-text-body);
  list-style: none;
}

.base-timeline--sm {
  --base-timeline-marker-size: var(--jnv-timeline-sm-marker-size);
  --base-timeline-gap: var(--jnv-timeline-sm-gap);
  --base-timeline-column-gap: var(--space-3);
  --base-timeline-title-size: var(--font-size-sm);
  --base-timeline-detail-size: var(--font-size-xs);
}

.base-timeline--md {
  --base-timeline-marker-size: var(--jnv-timeline-md-marker-size);
  --base-timeline-gap: var(--jnv-timeline-md-gap);
  --base-timeline-column-gap: var(--space-4);
  --base-timeline-title-size: var(--font-size-md);
  --base-timeline-detail-size: var(--font-size-sm);
}

.base-timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: var(--base-timeline-marker-size) minmax(0, 1fr);
  column-gap: var(--base-timeline-column-gap);
  padding-bottom: var(--base-timeline-gap);
}

.base-timeline__item:last-child {
  padding-bottom: var(--space-0);
}

/* La línea une el centro de cada marcador con el del siguiente; los marcadores la cubren. */
.base-timeline__item:not(:last-child)::before {
  position: absolute;
  top: calc(var(--base-timeline-marker-size) / 2);
  bottom: calc(var(--base-timeline-marker-size) / -2);
  left: calc(
    var(--base-timeline-marker-size) / 2 - var(--border-width-accent) / 2
  );
  width: var(--border-width-accent);
  background: var(--jnv-timeline-line-color);
  content: "";
}

.base-timeline__marker {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: var(--base-timeline-marker-size);
  height: var(--base-timeline-marker-size);
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-round);
  color: var(--jnv-timeline-marker-color);
}

.base-timeline__marker--icon {
  box-sizing: border-box;
  border: var(--border-width-accent) solid var(--jnv-timeline-marker-color);
  background: var(--jnv-timeline-marker-background);
}

.base-timeline__dot {
  box-sizing: border-box;
  width: calc(var(--base-timeline-marker-size) / 2.5);
  height: calc(var(--base-timeline-marker-size) / 2.5);
  border: var(--border-width-accent) solid var(--jnv-timeline-marker-color);
  border-radius: var(--radius-round);
  background: var(--jnv-timeline-marker-background);
}

.base-timeline__item--current .base-timeline__marker {
  color: var(--jnv-timeline-marker-current-color);
}

.base-timeline__item--current .base-timeline__marker--icon {
  border-color: var(--jnv-timeline-marker-current-color);
  background: var(--jnv-timeline-marker-current-background);
}

.base-timeline__item--current .base-timeline__dot {
  border-color: var(--jnv-timeline-marker-current-color);
  background: var(--jnv-timeline-marker-current-color);
  box-shadow: 0 0 0 var(--space-1) var(--jnv-timeline-marker-current-background);
}

.base-timeline__content {
  min-width: var(--space-0);
  overflow-wrap: anywhere;
}

/* La altura mínima centra la primera línea del título con el marcador. */
.base-timeline__title {
  display: flex;
  min-height: var(--base-timeline-marker-size);
  align-items: center;
  margin: var(--space-0);
  color: var(--jnv-color-text-heading);
  font-size: var(--base-timeline-title-size);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-heading);
}

.base-timeline__title-text {
  min-width: var(--space-0);
}

.base-timeline__subtitle {
  margin: var(--space-0);
  color: var(--jnv-color-text-body);
  font-size: var(--base-timeline-detail-size);
  line-height: var(--line-height-base);
}

.base-timeline__meta {
  margin-top: var(--space-1);
  color: var(--jnv-timeline-date-color);
  font-size: var(--base-timeline-detail-size);
  line-height: var(--line-height-base);
}

.base-timeline__body {
  margin-top: var(--space-2);
  font-size: var(--base-timeline-detail-size);
  line-height: var(--line-height-base);
}
</style>
