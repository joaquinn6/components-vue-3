<script setup lang="ts">
import { computed } from "vue";
import {
  BaseBadge,
  BaseText,
  BaseTimeline,
  type BaseTimelineItem,
} from "../../src/index";
import DemoExample from "../components/DemoExample.vue";
import DemoSection from "../components/DemoSection.vue";
import { useMessages, usePlaygroundLocale } from "../i18n/usePlaygroundLocale";

const { locale } = usePlaygroundLocale();

const t = useMessages({
  en: {
    description:
      "Vertical history of periods such as work experience, education or releases. It is not a progress indicator.",
    experienceTitle: "Monthly · in progress, icon, item slot",
    educationTitle: "Yearly · precision, size, presentLabel",
    experienceLabel: "Work experience",
    educationLabel: "Education",
    present: "Present",
    frontendRole: "Frontend developer",
    frontendCompany: "Acme Studio",
    frontendAchievement: "Led the migration of the design system to Vue 3.",
    supportRole: "Support analyst",
    supportCompany: "Northwind Logistics",
    supportAchievement: "Reduced the average resolution time by 30%.",
    internRole: "Web development intern",
    internCompany: "Contoso Labs",
    technologies: "Technologies",
    degree: "Systems engineering",
    university: "National University",
    course: "UX design certificate",
    courseSchool: "Online academy",
    masters: "Master's in software architecture",
    mastersSchool: "Technical Institute",
  },
  es: {
    description:
      "Historial vertical de periodos como experiencia laboral, educación o versiones. No es un indicador de progreso.",
    experienceTitle: "Mensual · en curso, icono, slot item",
    educationTitle: "Anual · precision, size, presentLabel",
    experienceLabel: "Experiencia laboral",
    educationLabel: "Educación",
    present: "Actualidad",
    frontendRole: "Desarrollador frontend",
    frontendCompany: "Acme Studio",
    frontendAchievement: "Lideró la migración del sistema de diseño a Vue 3.",
    supportRole: "Analista de soporte",
    supportCompany: "Northwind Logistics",
    supportAchievement: "Redujo un 30 % el tiempo medio de resolución.",
    internRole: "Practicante de desarrollo web",
    internCompany: "Contoso Labs",
    technologies: "Tecnologías",
    degree: "Ingeniería en sistemas",
    university: "Universidad Nacional",
    course: "Certificado en diseño UX",
    courseSchool: "Academia en línea",
    masters: "Máster en arquitectura de software",
    mastersSchool: "Instituto Tecnológico",
  },
});

const experience = computed<BaseTimelineItem[]>(() => [
  {
    id: "frontend",
    title: t.value.frontendRole,
    subtitle: t.value.frontendCompany,
    start: "2022-03",
    end: null,
    icon: "briefcase",
  },
  {
    id: "support",
    title: t.value.supportRole,
    subtitle: t.value.supportCompany,
    start: "2019-09",
    end: "2022-02",
    icon: "support",
  },
  {
    id: "intern",
    title: t.value.internRole,
    subtitle: t.value.internCompany,
    start: "2019-01",
    end: "2019-06",
    icon: "code",
  },
]);

const achievements = computed<Record<string, string>>(() => ({
  frontend: t.value.frontendAchievement,
  support: t.value.supportAchievement,
}));

const technologies: Record<string, string[]> = {
  frontend: ["Vue", "TypeScript", "Vite"],
  support: ["SQL", "Zendesk"],
  intern: ["HTML", "CSS"],
};

const education = computed<BaseTimelineItem[]>(() => [
  {
    id: "masters",
    title: t.value.masters,
    subtitle: t.value.mastersSchool,
    start: "2023-02",
    end: null,
    precision: "year",
  },
  {
    id: "course",
    title: t.value.course,
    subtitle: t.value.courseSchool,
    start: "2021",
  },
  {
    id: "degree",
    title: t.value.degree,
    subtitle: t.value.university,
    start: "2014",
    end: "2018",
  },
]);

const experienceCode = `<script setup>
const experience = [
  { id: "frontend", title: "Frontend developer", subtitle: "Acme Studio", start: "2022-03", end: null, icon: "briefcase" },
  { id: "support", title: "Support analyst", subtitle: "Northwind Logistics", start: "2019-09", end: "2022-02", icon: "support" },
  { id: "intern", title: "Web development intern", subtitle: "Contoso Labs", start: "2019-01", end: "2019-06", icon: "code" },
];
<\/script>

<template>
  <BaseTimeline :items="experience" locale="en" present-label="Present" aria-label="Work experience" title-as="h4">
    <template #item="{ item }">
      <p v-if="achievements[item.id]">{{ achievements[item.id] }}</p>
      <ul aria-label="Technologies">
        <li v-for="tech in technologies[item.id]" :key="tech">
          <BaseBadge width="auto" :label="tech" />
        </li>
      </ul>
    </template>
  </BaseTimeline>
</template>`;

const educationCode = `<BaseTimeline
  :items="[
    { id: 'masters', title: 'Master\\'s in software architecture', start: '2023-02', end: null, precision: 'year' },
    { id: 'course', title: 'UX design certificate', start: '2021' },
    { id: 'degree', title: 'Systems engineering', start: '2014', end: '2018' },
  ]"
  locale="en"
  present-label="Present"
  aria-label="Education"
  title-as="h4"
  size="sm"
/>`;
</script>

<template>
  <DemoSection
    id="base-timeline"
    name="BaseTimeline"
    :description="t.description"
  >
    <DemoExample :title="t.experienceTitle" :code="experienceCode">
      <BaseTimeline
        :items="experience"
        :locale="locale"
        :present-label="t.present"
        :aria-label="t.experienceLabel"
        title-as="h4"
      >
        <template #item="{ item }">
          <div class="timeline-demo__details">
            <BaseText v-if="achievements[item.id]" variant="sm">
              {{ achievements[item.id] }}
            </BaseText>
            <ul
              class="timeline-demo__tags"
              role="list"
              :aria-label="t.technologies"
            >
              <li v-for="tech in technologies[item.id]" :key="tech">
                <BaseBadge width="auto" :label="tech" />
              </li>
            </ul>
          </div>
        </template>
      </BaseTimeline>
    </DemoExample>

    <DemoExample :title="t.educationTitle" :code="educationCode">
      <BaseTimeline
        :items="education"
        :locale="locale"
        :present-label="t.present"
        :aria-label="t.educationLabel"
        title-as="h4"
        size="sm"
      />
    </DemoExample>
  </DemoSection>
</template>

<style scoped>
.timeline-demo__details {
  display: grid;
  gap: var(--space-2);
}

.timeline-demo__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: var(--space-0);
  margin: var(--space-0);
  list-style: none;
}
</style>
