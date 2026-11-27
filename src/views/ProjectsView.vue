<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, productionApps, productionAppIds } from '@/data/portfolio'
import type { ProjectItem } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'
import ExperienceList from '@/components/ExperienceList.vue'
import { useRoute, useRouter } from 'vue-router'
import { profile, experiences } from '@/data/portfolio'

// Two tabs on the Work page; the active one lives in the URL (?tab=experience) so it can be linked to.
type Tab = 'projects' | 'experience'
const route = useRoute()
const router = useRouter()
const tab = computed<Tab>(() => (route.query.tab === 'experience' ? 'experience' : 'projects'))
function selectTab(next: Tab) {
  router.replace({ query: next === 'projects' ? {} : { tab: next } })
}
const firstYear = Math.min(...experiences.map((e) => Number(e.period.match(/\d{4}/)?.[0] ?? 9999)))

const categories = ['All', 'Android', 'Open Source', 'Systems & Tools', 'Web & Tools'] as const
type CategoryFilter = (typeof categories)[number]

const activeCategory = ref<CategoryFilter>('All')
const searchQuery = ref('')

function matchesSearch(project: ProjectItem): boolean {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return true
  return (
    project.title.toLowerCase().includes(q) ||
    project.description.toLowerCase().includes(q) ||
    project.technologies.some((t) => t.toLowerCase().includes(q))
  )
}

// Code projects (repos, tools, libraries) — released apps live in their own section.
const filteredProjects = computed(() => {
  return projects.filter((project) => {
    if ((productionAppIds as readonly string[]).includes(project.id)) return false

    let matchesCategory = false
    if (activeCategory.value === 'All') {
      matchesCategory = true
    } else if (activeCategory.value === 'Open Source') {
      matchesCategory = Boolean(project.repoUrl) || project.category === 'Open Source'
    } else {
      matchesCategory = project.category === activeCategory.value
    }
    return matchesCategory && matchesSearch(project)
  })
})

// Released apps — shown whenever the category filter is "All" or "Android".
const filteredApps = computed(() => {
  if (activeCategory.value !== 'All' && activeCategory.value !== 'Android') return []
  return productionApps.filter(matchesSearch)
})
</script>

<template>
  <div>
    <header class="container page-head">
      <p class="label">Work</p>
      <template v-if="tab === 'projects'">
        <h1>Apps in people’s pockets, and <em>code on GitHub.</em></h1>
        <p class="lede">
          The shipped apps range from statewide public-safety tools to apps with worldwide install bases, plus
          one personal tool for divers. The repositories are things I built to learn something properly, a few
          of them with an article attached.
        </p>
      </template>
      <template v-else>
        <h1>Every role since <em>{{ firstYear }}.</em></h1>
        <p class="lede">
          Newest first. The same history fits on one page in the
          <a :href="profile.resumeUrl" class="link" target="_blank" rel="noopener">résumé (PDF)</a>.
        </p>
      </template>
    </header>

    <div class="container">
      <div class="tabs" role="tablist" aria-label="Work">
        <button
          id="tab-projects"
          type="button"
          role="tab"
          class="tab"
          :aria-selected="tab === 'projects'"
          aria-controls="panel"
          @click="selectTab('projects')"
        >
          Projects <span class="tab-count">{{ projects.length }}</span>
        </button>
        <button
          id="tab-experience"
          type="button"
          role="tab"
          class="tab"
          :aria-selected="tab === 'experience'"
          aria-controls="panel"
          @click="selectTab('experience')"
        >
          Experience <span class="tab-count">{{ experiences.length }}</span>
        </button>
      </div>
    </div>

    <section
      id="panel"
      class="container"
      role="tabpanel"
      :aria-labelledby="tab === 'projects' ? 'tab-projects' : 'tab-experience'"
    >
      <template v-if="tab === 'projects'">
        <div class="controls">
          <div class="filters" role="group" aria-label="Filter projects by category">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              class="filter"
              :aria-pressed="activeCategory === cat"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>

          <label class="search">
            <span class="sr-only">Filter projects by technology or keyword</span>
            <input v-model="searchQuery" type="search" placeholder="Search: Kotlin, maps, C++…" />
          </label>
        </div>

        <div v-if="filteredApps.length > 0" class="group">
          <header class="section-head">
            <p class="label">{{ filteredApps.length }} shipped</p>
            <h2>Released apps</h2>
          </header>
          <ProjectCard v-for="(project, i) in filteredApps" :key="project.id" :project="project" :index="i + 1" />
        </div>

        <div v-if="filteredProjects.length > 0" class="group">
          <header class="section-head">
            <p class="label">{{ filteredProjects.length }} repositories</p>
            <h2>Code &amp; open source</h2>
          </header>
          <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
        </div>

        <div v-if="filteredApps.length === 0 && filteredProjects.length === 0" class="empty">
          <p>
            Nothing matches “{{ searchQuery }}”<template v-if="activeCategory !== 'All'"> in {{ activeCategory }}</template>.
          </p>
          <button type="button" class="btn btn-quiet" @click="activeCategory = 'All'; searchQuery = ''">
            Clear filters
          </button>
        </div>
      </template>

      <ExperienceList v-else />
    </section>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid var(--rule-strong);
}

.tab {
  position: relative;
  padding: 0 0 14px;
  border: 0;
  background: none;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.4vw, 1.75rem);
  color: var(--ink-3);
  cursor: pointer;
  transition: color var(--dur) var(--ease);
}

.tab::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease);
}

.tab:hover {
  color: var(--ink);
}

.tab[aria-selected='true'] {
  color: var(--ink);
}

.tab[aria-selected='true']::after {
  transform: scaleX(1);
}

.tab-count {
  font-family: var(--font-mono);
  font-size: 12px;
  vertical-align: super;
  color: var(--ink-3);
}

.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--rule);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 22px;
}

.filter {
  position: relative;
  min-height: 36px;
  padding: 0;
  border: 0;
  background: none;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--ink-3);
  white-space: nowrap;
  cursor: pointer;
  transition: color var(--dur) var(--ease);
}

.filter:hover {
  color: var(--ink);
}

.filter[aria-pressed='true'] {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.45em;
}

.search {
  flex: 1 1 220px;
  max-width: 320px;
}

.search input {
  width: 100%;
  min-height: 40px;
  padding: 0 0 4px;
  border: 0;
  border-bottom: 1px solid var(--rule);
  border-radius: 0;
  background: transparent;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  transition: border-color var(--dur) var(--ease);
}

.search input::placeholder {
  color: var(--ink-3);
}

.search input:focus {
  outline: none;
  border-bottom-color: var(--accent);
}

.group {
  padding-top: clamp(56px, 7vw, 88px);
}

.empty {
  display: grid;
  justify-items: start;
  gap: 16px;
  padding: 56px 0;
  font-family: var(--font-display);
  font-size: 1.6rem;
}

@media (max-width: 640px) {
  .search {
    max-width: none;
  }
}
</style>
