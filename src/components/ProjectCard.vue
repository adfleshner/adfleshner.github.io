<script setup lang="ts">
import type { ProjectItem } from '@/data/portfolio'

defineProps<{
  project: ProjectItem
}>()
</script>

<template>
  <article class="card project-card glass-card" :class="{ 'current-card': project.current }">
    <div class="project-top">
      <div class="project-meta">
        <div class="meta-left">
          <span class="project-category">{{ project.category }}</span>
          <span v-if="project.articleUrl" class="article-pill">Medium Article</span>
        </div>
        <span
          v-if="project.metrics"
          class="project-metrics"
          :class="{ 'is-current': project.current }"
        >
          <span class="metrics-dot" :class="{ 'pulse-dot': project.current }" />
          {{ project.metrics }}
        </span>
      </div>

      <h3 class="project-title editorial-serif">{{ project.title }}</h3>
      <p class="project-tagline">{{ project.tagline }}</p>
      <p class="project-desc">{{ project.description }}</p>
    </div>

    <div class="project-bottom">
      <div class="tech-list">
        <span v-for="tech in project.technologies" :key="tech" class="tag">
          {{ tech }}
        </span>
      </div>

      <div class="project-links">
        <a
          v-if="project.articleUrl"
          :href="project.articleUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link article-link"
        >
          <svg class="article-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          <span>{{ project.articleLabel || 'Read Article' }}</span>
          <span class="link-arrow">↗</span>
        </a>

        <a
          v-if="project.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link"
        >
          <svg class="project-link-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Source Code</span>
          <span class="link-arrow">↗</span>
        </a>

        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link"
        >
          <svg class="project-link-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>{{ project.liveLabel || 'Live Demo' }}</span>
          <span class="link-arrow">↗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  height: 100%;
  padding: 1.75rem;
  border-radius: 20px;
  background: var(--bg-glass-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  transition: var(--transition-hover);
}

.project-card:hover {
  transform: var(--btn-hover-transform);
  border-color: var(--border-hover);
  box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.35);
}

.project-card.current-card {
  border-color: rgba(16, 185, 129, 0.35);
}

.project-card.current-card:hover {
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow: 0 16px 36px -12px rgba(16, 185, 129, 0.2);
}

.project-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-category {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.project-metrics {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent-emerald);
  white-space: nowrap;
}

.project-metrics.is-current {
  font-weight: 700;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  box-shadow: 0 0 12px -2px rgba(16, 185, 129, 0.25);
}

.metrics-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-emerald);
  flex-shrink: 0;
}

.metrics-dot.pulse-dot {
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  animation: dreamy-pulse 2.6s infinite cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dreamy-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  }
  60% {
    box-shadow: 0 0 0 5px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.project-title {
  font-family: var(--font-display);
  font-size: 1.32rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.project-tagline {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.94rem;
  margin-bottom: 0.65rem;
  line-height: 1.4;
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.55;
}

.project-bottom {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--border-subtle);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.project-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--transition-hover);
}

.project-link-icon {
  flex-shrink: 0;
  color: var(--text-muted);
  transition: color var(--transition-hover);
}

.link-arrow {
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: transform var(--transition-hover), color var(--transition-hover);
}

.project-link:hover {
  color: var(--accent-primary);
}

.project-link:hover .project-link-icon,
.project-link:hover .link-arrow {
  color: var(--accent-primary);
  transform: translate(1.5px, -1.5px);
}

.article-pill {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: rgba(129, 140, 248, 0.14);
  color: var(--accent-secondary);
  border: 1px solid rgba(129, 140, 248, 0.35);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.article-link {
  color: var(--accent-secondary);
}

.article-link:hover {
  color: var(--accent-primary);
}

.article-icon {
  flex-shrink: 0;
}
</style>
