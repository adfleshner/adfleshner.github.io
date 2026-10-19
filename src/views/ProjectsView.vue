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
  <div class="projects-page-container">
    <!-- 🏛️ Framed Header Stage -->
    <section class="stage-shell projects-stage">
      <div class="projects-stage-content">
        <span class="flanked-eyebrow">SELECTED WORK</span>

        <h1 class="projects-stage-title editorial-serif">
          Production Android &amp;<br />
          <span class="gradient-text-logo editorial-serif-italic">open-source craft.</span>
        </h1>

        <p class="projects-stage-subtitle">
          A curated index of native Android applications, developer libraries, and performance tooling built with Kotlin, Jetpack Compose, and clean reactive architecture.
        </p>

        <!-- Stats Row -->
        <div class="projects-stat-pills">
          <span class="stat-pill">
            <span class="stat-dot" />
            <span>64+ GitHub Repositories</span>
          </span>
          <span class="stat-pill">
            <span class="stat-dot" />
            <span>100% Kotlin-First</span>
          </span>
          <span class="stat-pill">
            <span class="stat-dot" />
            <span>Medium Published Technical Author</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Filters & Controls Bar -->
    <section class="container">
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

        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            class="search-input"
            placeholder="Search by tech or keyword..."
            aria-label="Filter projects by technology or keyword"
          />
        </div>
      </div>

      <!-- Released Apps -->
      <div v-if="filteredApps.length > 0" class="projects-section">
        <div class="section-heading">
          <h2 class="section-title editorial-serif">Released Apps</h2>
          <p class="section-subtitle">Shipped Android apps I've worked on professionally and personally.</p>
        </div>
        <div class="projects-grid">
          <ProjectCard v-for="project in filteredApps" :key="project.id" :project="project" />
        </div>
      </div>

      <!-- Code Projects -->
      <div v-if="filteredProjects.length > 0" class="projects-section">
        <div class="section-heading">
          <h2 class="section-title editorial-serif">Code &amp; Open Source</h2>
          <p class="section-subtitle">Repositories, libraries, and tooling you can explore on GitHub.</p>
        </div>
        <div class="projects-grid">
          <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredApps.length === 0 && filteredProjects.length === 0" class="card empty-state glass-card">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-icon">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <p class="empty-text">No projects match "{{ searchQuery }}" in category "{{ activeCategory }}".</p>
        <button
          type="button"
          class="btn btn-outline"
          @click="activeCategory = 'All'; searchQuery = ''"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span>Reset Filters</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.projects-page-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* ==========================================================================
   🏛️ PROJECTS STAGE
   ========================================================================== */
.projects-stage {
  padding: 4rem 2.5rem;
  margin-top: 1.25rem;
  text-align: center;
}

.projects-stage-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 820px;
  margin: 0 auto;
}

.projects-stage-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.8vw, 3.25rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.035em;
  color: var(--text-primary);
}

.projects-stage-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 680px;
}

.projects-stat-pills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-top: 0.5rem;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  background: var(--bg-glass-card);
  border: 1px solid var(--border-subtle);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-secondary);
}

.stat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--logo-teal);
  box-shadow: 0 0 6px var(--logo-teal);
}

/* ==========================================================================
   CONTROLS BAR
   ========================================================================== */
.controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
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
  padding: 0.5rem 1.15rem;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--btn-transition);
}

.filter-pill:hover {
  color: var(--text-primary);
  border-color: var(--accent-primary);
  transform: var(--btn-hover-transform);
}

.filter-pill.active {
  background: var(--btn-pill-gradient);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 14px -3px var(--accent-glow);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 320px;
}

.search-icon {
  position: absolute;
  left: 0.95rem;
  width: 1rem;
  height: 1rem;
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  padding: 0.55rem 1rem 0.55rem 2.4rem;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-primary);
  width: 100%;
  outline: none;
  transition: border-color var(--transition-hover), box-shadow var(--transition-hover);
}

.search-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

/* ==========================================================================
   PROJECTS GRID
   ========================================================================== */
.projects-section + .projects-section {
  margin-top: 3.5rem;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 1.75rem;
}

@media (max-width: 768px) {
  .projects-stage {
    padding: 2.25rem 1.25rem 1.75rem;
    border-radius: 20px;
  }

  .controls-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: 100%;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

.empty-state {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 3.5rem 1.5rem;
  color: var(--text-secondary);
}

.empty-icon {
  color: var(--text-muted);
  opacity: 0.6;
}

.empty-text {
  font-size: 1rem;
}
</style>
