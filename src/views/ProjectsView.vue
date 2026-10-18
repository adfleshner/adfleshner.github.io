<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'

const categories = ['All', 'Android', 'Systems & Tools', 'Web & Tools', 'Open Source'] as const
type CategoryFilter = (typeof categories)[number]

const activeCategory = ref<CategoryFilter>('All')
const searchQuery = ref('')

const filteredProjects = computed(() => {
  return projects.filter((project) => {
    const matchesCategory =
      activeCategory.value === 'All' || project.category === activeCategory.value

    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchesCategory

    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.technologies.some((t) => t.toLowerCase().includes(q))

    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div class="container section">
    <div class="section-header">
      <span class="eyebrow">Portfolio</span>
      <h1 class="section-title">Projects &amp; Case Studies</h1>
      <p class="section-subtitle">
        Browse full-stack web applications, open-source packages, and developer tools I've built.
      </p>
    </div>

    <div class="controls-bar">
      <div class="filter-pills" role="tablist" aria-label="Filter projects by category">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="filter-pill"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <input
        v-model="searchQuery"
        type="search"
        class="search-input"
        placeholder="Filter by tech or keyword..."
        aria-label="Filter projects by technology or keyword"
      />
    </div>

    <div v-if="filteredProjects.length > 0" class="projects-grid">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>

    <div v-else class="card empty-state">
      <p>No projects match your current filter. Try clearing the search or selecting "All".</p>
      <button
        type="button"
        class="btn btn-outline"
        @click="activeCategory = 'All'; searchQuery = ''"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
.controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.25rem;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill {
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill:hover {
  color: var(--text-primary);
  border-color: var(--accent-primary);
}

.filter-pill.active {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: #ffffff;
  border-color: transparent;
}

.search-input {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-primary);
  min-width: 240px;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: var(--accent-primary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 1.5rem;
  color: var(--text-secondary);
}
</style>

