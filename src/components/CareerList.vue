<script setup lang="ts">
import { experiences } from '@/data/portfolio'

// "March 2024 — Present" -> "2024–now"
function years(period: string) {
  const found = period.match(/\d{4}/g) ?? []
  const start = found[0] ?? ''
  const end = /present/i.test(period) ? 'now' : found[1] ?? ''
  return end && end !== start ? `${start}–${end}` : start
}

// Newest first
const career = experiences.map((e) => ({ ...e, years: years(e.period) }))
</script>

<template>
  <ol class="career">
    <li v-for="job in career" :key="job.company + job.period" class="career-row" :class="{ 'is-current': job.current }">
      <span class="career-years">{{ job.years }}</span>
      <span class="career-role">{{ job.role }}</span>
      <span class="career-company">{{ job.company }}<span class="career-place">{{ job.location }}</span></span>
    </li>
  </ol>
</template>

<style scoped>
.career {
  margin: 0;
  padding: 0;
  list-style: none;
}

.career-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--rule);
}

.career-years {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-3);
  white-space: nowrap;
}

.is-current .career-years {
  color: var(--accent);
}

.career-role {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.2vw, 1.6rem);
  line-height: 1.2;
}

.career-company {
  color: var(--ink-2);
}

.career-place {
  display: block;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-3);
}

@media (min-width: 860px) {
  .career-row {
    grid-template-columns: 3fr 5fr 4fr;
    gap: 24px;
    align-items: baseline;
  }
}

</style>
