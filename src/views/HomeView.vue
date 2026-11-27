<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { profile, experiences, education, yearsExperience, careerStartYear } from '@/data/portfolio'
import portraitBw from '@/assets/photos/aaron-portrait-bw.jpg'

const current = experiences.find((e) => e.current) ?? experiences[0]

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
          {{ yearsExperience }} years of native Android, from statewide public-safety apps to install bases around the world.
          Before software, I dived internationally for Team USA.
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
          <dd>Shipping Android apps since {{ careerStartYear }}</dd>
        </div>
        <div>
          <dt class="label">Studied</dt>
          <dd>Computer Science, {{ education[0]?.institution }}</dd>
        </div>
      </dl>
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
  padding-top: clamp(16px, 2.5vw, 32px);
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

/* Closing */
.closing {
  display: grid;
  gap: 20px;
}

.closing-line {
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  line-height: 1.3;
  letter-spacing: -0.01em;
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
