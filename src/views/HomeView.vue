<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { profile, projects, skillGroups } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'

const featuredProjects = computed(() => projects.filter((p) => p.featured))
</script>

<template>
  <div class="container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-header-row">
        <img v-if="profile.avatarUrl" :src="profile.avatarUrl" :alt="profile.name" class="hero-avatar" />
        <div v-if="profile.availableForWork" class="status-pill">
          <span class="status-dot" />
          <span>{{ profile.availabilityText }}</span>
        </div>
      </div>

      <h1 class="hero-title">
        Hi, I'm <span class="gradient-text">{{ profile.firstName }}</span>.<br />
        {{ profile.headline }}
      </h1>

      <p class="hero-subtitle">
        {{ profile.subheadline }}
      </p>

      <div class="hero-actions">
        <RouterLink to="/projects" class="btn btn-primary">
          View Projects →
        </RouterLink>
        <RouterLink to="/about" class="btn btn-outline">
          Experience &amp; Resume
        </RouterLink>
        <RouterLink to="/contact" class="btn btn-outline">
          Get in Touch
        </RouterLink>
      </div>

      <div class="stats-grid">
        <div v-for="stat in profile.stats" :key="stat.label" class="stat-item">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="section">
      <div class="section-header-row">
        <div class="section-header">
          <span class="eyebrow">Selected Work</span>
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle">
            Recent applications, libraries, and developer tools I've designed and built.
          </p>
        </div>

        <RouterLink to="/projects" class="btn btn-outline">
          All Projects →
        </RouterLink>
      </div>

      <div class="projects-grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- Core Stack Section -->
    <section class="section">
      <div class="section-header">
        <span class="eyebrow">Technical Stack</span>
        <h2 class="section-title">What I Work With</h2>
        <p class="section-subtitle">
          Core languages, frameworks, and infrastructure tools I use every day.
        </p>
      </div>

      <div class="skills-grid">
        <div v-for="group in skillGroups" :key="group.category" class="card skill-card">
          <h3 class="skill-category">{{ group.category }}</h3>
          <div class="skill-tags">
            <span v-for="skill in group.skills" :key="skill" class="tag">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 5.5rem 0 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

.hero-header-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.hero-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid var(--accent-primary);
  box-shadow: 0 0 24px var(--accent-glow);
  object-fit: cover;
}

.hero-title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
  max-width: 840px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: clamp(1.05rem, 2vw, 1.22rem);
  color: var(--text-secondary);
  max-width: 660px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.4rem;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-top: 1.75rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.section-header-row .section-header {
  margin-bottom: 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-category {
  font-size: 1.1rem;
  font-weight: 700;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>

