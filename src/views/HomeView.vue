<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { profile, projects, productionApps, experiences, education } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'
import divingUsa from '@/assets/photos/aaron-diving-usa.jpg'

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

// Career, oldest first, numbered like rounds on a dive sheet
const sheet = computed(() =>
  [...experiences].reverse().map((e, i) => ({ ...e, round: i + 1, years: years(e.period) }))
)
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
          Twelve years of native Android: sheriff’s-office alerts and statewide traffic cameras in Alabama,
          an encrypted messenger with no cloud, the lululemon Studio Mirror app, and now SDKs that run on
          hundreds of millions of phones at Digital Turbine. Before software, I dove springboard for Team USA.
        </p>
        <div class="hero-actions">
          <RouterLink to="/projects" class="btn">See the work</RouterLink>
          <a :href="profile.resumeUrl" class="btn btn-quiet" target="_blank" rel="noopener">Résumé (PDF)</a>
        </div>
      </div>

      <figure class="photo hero-photo">
        <div class="hero-photo-frame">
          <img :src="divingUsa" alt="Aaron in a tight tuck mid-dive, competing for Team USA" width="1296" height="729" />
        </div>
        <figcaption>Competing for Team USA. Same habit now: get the details right before you hit the water.</figcaption>
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

    <!-- Dive sheet -->
    <section class="container section">
      <header class="section-head">
        <p class="label">Career</p>
        <div class="section-head-row">
          <h2>The dive sheet</h2>
          <RouterLink to="/about" class="arrow-link">Full history <span class="arrow" aria-hidden="true">→</span></RouterLink>
        </div>
      </header>

      <p class="sheet-note muted">
        Divers hand in a sheet listing every dive, in order, before they compete. Here is mine for the last
        twelve years, in the order performed.
      </p>

      <table class="sheet">
        <thead>
          <tr>
            <th scope="col">Rd</th>
            <th scope="col">Role</th>
            <th scope="col">Team</th>
            <th scope="col" class="sheet-years">Years</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in sheet" :key="row.company + row.period" :class="{ 'is-current': row.current }">
            <td class="sheet-round">{{ row.round }}</td>
            <td class="sheet-role">{{ row.role }}</td>
            <td class="sheet-team">{{ row.company }}<span class="sheet-place">{{ row.location }}</span></td>
            <td class="sheet-years">{{ row.years }}</td>
          </tr>
        </tbody>
      </table>
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
  object-position: 64% 50%;
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

/* Dive sheet */
.sheet-note {
  max-width: 60ch;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 15.5px;
}

.sheet {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

.sheet th {
  padding: 10px 12px 10px 0;
  border-bottom: 1px solid var(--rule);
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: left;
  color: var(--ink-3);
}

.sheet td {
  padding: 18px 12px 18px 0;
  border-bottom: 1px solid var(--rule);
  vertical-align: baseline;
}

.sheet-round {
  width: 48px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-3);
}

.sheet-role {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  line-height: 1.2;
}

.sheet-team {
  color: var(--ink-2);
}

.sheet-place {
  display: block;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-3);
}

.sheet-years {
  font-family: var(--font-mono);
  font-size: 13px;
  text-align: right !important;
  white-space: nowrap;
  padding-right: 0 !important;
}

.is-current .sheet-round,
.is-current .sheet-years {
  color: var(--accent);
}

@media (max-width: 640px) {
  .sheet thead {
    display: none;
  }

  .sheet tr {
    display: grid;
    grid-template-columns: 32px 1fr auto;
    gap: 4px 8px;
    padding: 16px 0;
    border-bottom: 1px solid var(--rule);
  }

  .sheet td {
    padding: 0;
    border: 0;
  }

  .sheet-round {
    grid-row: 1 / span 2;
    width: auto;
  }

  .sheet-team {
    grid-column: 2 / -1;
    font-size: 15px;
  }

  .sheet-years {
    grid-column: 3;
    grid-row: 1;
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
