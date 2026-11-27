<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { profile, projects, productionApps, experiences, education } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'
import portraitBw from '@/assets/photos/aaron-portrait-bw.jpg'

const current = experiences.find((e) => e.current) ?? experiences[0]

// Open-source and side projects (everything featured that isn't a shipped app or this site)
const sideProjects = computed(() =>
  projects.filter(
    (p) => p.featured && p.id !== 'personal-site' && !productionApps.some((app) => app.id === p.id)
  )
)

// "March 2024 — Present" -> "2024–now"
function years(period: string) {
  const found = period.match(/\d{4}/g) ?? []
  const start = found[0] ?? ''
  const end = /present/i.test(period) ? 'now' : found[1] ?? ''
  return end && end !== start ? `${start}–${end}` : start
}

// Career, newest first
const career = computed(() => experiences.map((e) => ({ ...e, years: years(e.period) })))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="container hero">
      <div class="hero-text">
        <p class="label">{{ profile.role }} · {{ profile.roleFocus.replace(' Focus', '') }}</p>
        <h1 class="hero-title">
          I build thoughtful, <em>reliable</em> Android apps.
        </h1>
        <p class="hero-lede">
          Twelve years of native Android, at every scale: from statewide public-safety apps to platforms and
          storefronts with install bases around the world. Along the way, encrypted messaging, connected
          fitness, and SDKs built to tight memory and battery budgets. Before software, I dove springboard for
          Team USA.
        </p>
        <div class="hero-actions">
          <RouterLink to="/projects" class="btn">See the work</RouterLink>
          <a :href="profile.resumeUrl" class="btn btn-quiet" target="_blank" rel="noopener">Résumé (PDF)</a>
        </div>
      </div>

      <figure class="photo hero-photo">
        <div class="hero-photo-frame">
          <img :src="portraitBw" alt="Black and white portrait of Aaron Fleshner" width="946" height="960" />
        </div>
        <figcaption>{{ profile.name }}, {{ profile.location }}</figcaption>
      </figure>
    </section>

    <!-- Ledger -->
    <section class="container">
      <dl class="ledger">
        <div>
          <dt class="label">Now</dt>
          <dd>{{ current.role }}, {{ current.company }}</dd>
        </div>
        <div>
          <dt class="label">Since</dt>
          <dd>Shipping Android apps since 2012</dd>
        </div>
        <div>
          <dt class="label">Studied</dt>
          <dd>Computer Science, {{ education[0]?.institution }}</dd>
        </div>
      </dl>
    </section>

    <!-- Selected work -->
    <section class="container section">
      <header class="section-head">
        <p class="label">Shipped apps</p>
        <div class="section-head-row">
          <h2>Selected work</h2>
          <RouterLink to="/projects" class="arrow-link">All projects <span class="arrow" aria-hidden="true">→</span></RouterLink>
        </div>
      </header>

      <ProjectCard v-for="(app, i) in productionApps" :key="app.id" :project="app" :index="i + 1" compact />
    </section>

    <!-- Experience -->
    <section class="container section">
      <header class="section-head">
        <p class="label">Career</p>
        <div class="section-head-row">
          <h2>Where I’ve worked</h2>
          <RouterLink to="/about" class="arrow-link">Full history <span class="arrow" aria-hidden="true">→</span></RouterLink>
        </div>
      </header>

      <ol class="career">
        <li v-for="job in career" :key="job.company + job.period" class="career-row" :class="{ 'is-current': job.current }">
          <span class="career-years">{{ job.years }}</span>
          <span class="career-role">{{ job.role }}</span>
          <span class="career-company">{{ job.company }}<span class="career-place">{{ job.location }}</span></span>
        </li>
      </ol>
    </section>

    <!-- Open source -->
    <section class="container section">
      <header class="section-head">
        <p class="label">On GitHub</p>
        <div class="section-head-row">
          <h2>Side projects &amp; writing</h2>
          <a href="https://github.com/adfleshner" class="arrow-link ext" target="_blank" rel="noopener noreferrer">
            github.com/adfleshner <span class="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <ProjectCard v-for="p in sideProjects" :key="p.id" :project="p" compact />
    </section>

    <!-- Contact -->
    <section class="container section closing">
      <p class="label">Contact</p>
      <p class="closing-line">
        Building something on Android, or need a lead who has shipped it before?
        <a :href="`mailto:${profile.email}`" class="closing-mail">{{ profile.email }}</a>
      </p>
      <RouterLink to="/contact" class="arrow-link">Other ways to reach me <span class="arrow" aria-hidden="true">→</span></RouterLink>
    </section>
  </div>
</template>

<style scoped>
/* Hero */
.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding-top: clamp(40px, 7vw, 96px);
}

.hero-title {
  margin-top: 20px;
  font-size: clamp(3rem, 8.4vw, 6.75rem);
  line-height: 0.98;
  letter-spacing: -0.035em;
  font-variation-settings: 'opsz' 72;
}

.hero-title em {
  font-style: italic;
  color: var(--accent);
}

.hero-lede {
  margin-top: 28px;
  max-width: 54ch;
  font-size: clamp(1.05rem, 1.5vw, 1.18rem);
  color: var(--ink-2);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

.hero-photo-frame {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--bg-2);
  /* The one motion idea: the photo drops in top-down, like entering the water */
  animation: enter-water 1400ms var(--ease) 120ms both;
}

.hero-photo-frame img {
  height: 100%;
  object-position: 50% 40%;
  animation: settle 1800ms var(--ease) 120ms both;
}

.hero-photo figcaption {
  max-width: 40ch;
}

@keyframes enter-water {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes settle {
  from {
    transform: translateY(-4%) scale(1.04);
  }
  to {
    transform: none;
  }
}

@media (min-width: 960px) {
  .hero {
    grid-template-columns: 7fr 4fr;
    gap: 56px;
    align-items: end;
  }

  .hero-photo {
    margin-bottom: 8px;
  }
}

/* Ledger */
.ledger {
  display: grid;
  grid-template-columns: 1fr;
  margin: clamp(48px, 7vw, 88px) 0 0;
  border-top: 1px solid var(--rule-strong);
}

.ledger > div {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 16px;
  align-items: baseline;
  padding: 16px 0;
  border-bottom: 1px solid var(--rule);
}

.ledger dd {
  margin: 0;
  font-size: 16px;
}

@media (min-width: 860px) {
  .ledger {
    grid-template-columns: repeat(3, 1fr);
  }

  .ledger > div {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 18px 24px 18px 0;
    border-bottom: 0;
  }

  .ledger > div + div {
    padding-left: 24px;
    border-left: 1px solid var(--rule);
  }
}

/* Experience */
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

/* Closing */
.closing {
  display: grid;
  gap: 20px;
}

.closing-line {
  max-width: 24ch;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.closing-mail {
  display: inline-block;
  margin-top: 0.2em;
  color: var(--accent);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.12em;
  overflow-wrap: anywhere;
}

.closing-mail:hover {
  text-decoration-thickness: 2px;
}
</style>
