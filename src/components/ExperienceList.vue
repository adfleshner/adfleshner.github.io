<script setup lang="ts">
import { experiences } from '@/data/portfolio'

// "March 2024 — Present" -> "2024–now"
function years(period: string) {
  const found = period.match(/\d{4}/g) ?? []
  const start = found[0] ?? ''
  const end = /present/i.test(period) ? 'now' : found[1] ?? ''
  return end && end !== start ? `${start}–${end}` : start
}
</script>

<template>
  <div>
    <article v-for="item in experiences" :key="item.company + item.period" class="job">
      <div class="job-side">
        <span class="job-years" :class="{ 'is-current': item.current }">{{ years(item.period) }}</span>
      </div>

      <div class="job-main">
        <h3 class="job-role">
          {{ item.role }}<span v-if="item.roleFocus" class="job-focus">, {{ item.roleFocus.replace(' Focus', '') }}</span>
        </h3>
        <p class="job-company">{{ item.company }} · {{ item.location }} · {{ item.period }}</p>
        <ul class="job-points">
          <li v-for="point in item.highlights" :key="point">{{ point }}</li>
        </ul>
        <ul class="tech">
          <li v-for="tech in item.technologies" :key="tech">{{ tech }}</li>
        </ul>
      </div>
    </article>
  </div>
</template>

<style scoped>
.job {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding-top: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--rule);
}

.job-side {
  display: flex;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-3);
}

.job-years.is-current {
  color: var(--accent);
}

.job-role {
  font-size: clamp(1.6rem, 2.8vw, 2.1rem);
}

.job-focus {
  color: var(--ink-3);
}

.job-company {
  margin-top: 8px;
  font-size: 15px;
  color: var(--ink-2);
}

.job-points {
  display: grid;
  gap: 10px;
  max-width: 68ch;
  margin: 20px 0 18px;
  padding-left: 1.1em;
  color: var(--ink-2);
  font-size: 16px;
}

.job-points li::marker {
  color: var(--ink-3);
}

@media (min-width: 860px) {
  .job {
    grid-template-columns: 3fr 9fr;
    gap: 24px;
  }

  .job-side {
    flex-direction: column;
    gap: 4px;
    padding-top: 10px;
  }
}


@media print {
  .job {
    break-inside: avoid;
  }
}
</style>
