<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, productionApps, productionAppIds } from '@/data/portfolio'
import type { ProjectItem } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'

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
      <h1>Apps in people’s pockets, and <em>code on GitHub.</em></h1>
      <p class="lede">
        The shipped apps range from statewide public-safety tools to apps with worldwide install bases, plus
        one personal tool for divers. The repositories are things I built to learn something properly, a few
        of them with an article attached.
      </p>
    </header>

    <section class="container">
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
    </section>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
  padding-top: 18px;
  padding-bottom: 18px;
  border-top: 1px solid var(--rule-strong);
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
