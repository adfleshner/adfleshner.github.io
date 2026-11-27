<script setup lang="ts">
import type { ProjectItem } from '@/data/portfolio'

/**
 * One project as a row in a numbered list (no card chrome).
 * `index` is shown as the row number; `compact` hides the long description.
 */
withDefaults(
  defineProps<{
    project: ProjectItem
    index?: number
    compact?: boolean
  }>(),
  { index: undefined, compact: false }
)

function pad(n: number) {
  return String(n).padStart(2, '0')
}
</script>

<template>
  <article class="row" :class="{ 'no-num': index === undefined }">
    <span v-if="index !== undefined" class="row-num" aria-hidden="true">{{ pad(index) }}</span>

    <div class="row-main">
      <h3 class="row-title">{{ project.title }}</h3>
      <p class="row-tagline">{{ project.tagline }}</p>
      <p v-if="!compact" class="row-desc">{{ project.description }}</p>
      <ul class="tech row-tech">
        <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
      </ul>
    </div>

    <div class="row-side">
      <span v-if="project.metrics" class="row-meta">
        <span v-if="project.current" class="live-dot" aria-hidden="true" />{{ project.metrics }}
      </span>
      <div class="row-links">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="arrow-link ext"
        >
          {{ project.liveLabel || 'Visit' }} <span class="arrow" aria-hidden="true">↗</span>
        </a>
        <a
          v-if="project.articleUrl"
          :href="project.articleUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="arrow-link ext"
        >
          {{ project.articleLabel || 'Article' }} <span class="arrow" aria-hidden="true">↗</span>
        </a>
        <a
          v-if="project.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="arrow-link ext"
        >
          Source <span class="arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  padding-top: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--rule);
}

.row-num {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-3);
}

.row-title {
  font-size: clamp(1.6rem, 2.8vw, 2.15rem);
  line-height: 1.1;
}

.row-tagline {
  margin-top: 8px;
  font-size: 17px;
  color: var(--ink);
}

.row-desc {
  margin-top: 10px;
  max-width: 62ch;
  font-size: 15.5px;
  color: var(--ink-2);
}

.row-tech {
  margin-top: 14px;
}

.row-side {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px 20px;
}

.row-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-3);
  white-space: nowrap;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
}

.row-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}

@media (min-width: 860px) {
  .row {
    grid-template-columns: 3fr 6fr 3fr;
    gap: 24px;
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .row.no-num .row-main {
    grid-column: 2;
  }

  .row-num {
    padding-top: 10px;
  }

  .row-side {
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    padding-top: 10px;
    text-align: right;
  }

  .row-links {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
