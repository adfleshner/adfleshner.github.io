<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { profile, experiences, education, skillGroups } from '@/data/portfolio'
import portraitBw from '@/assets/photos/aaron-portrait-bw.jpg'
import divingUsa from '@/assets/photos/aaron-diving-usa.jpg'

// "March 2024 — Present" -> "2024–now"
function years(period: string) {
  const found = period.match(/\d{4}/g) ?? []
  const start = found[0] ?? ''
  const end = /present/i.test(period) ? 'now' : found[1] ?? ''
  return end && end !== start ? `${start}–${end}` : start
}

const total = experiences.length
</script>

<template>
  <div class="about">
    <header class="container page-head">
      <p class="label">About</p>
      <h1>Twelve years of Android, and a <em>springboard</em> before that.</h1>
      <div class="head-actions">
        <a :href="profile.resumeUrl" class="btn" target="_blank" rel="noopener">Download résumé (PDF)</a>
        <RouterLink to="/contact" class="btn btn-quiet">Get in touch</RouterLink>
      </div>
    </header>

    <!-- Story -->
    <section class="container story ruled-top">
      <figure class="photo story-portrait">
        <img :src="portraitBw" alt="Black and white portrait of Aaron Fleshner" width="946" height="960" />
        <figcaption>{{ profile.name }}, {{ profile.location }}</figcaption>
      </figure>

      <div class="story-text">
        <p v-for="para in profile.aboutParagraphs" :key="para">{{ para }}</p>
        <p>
          Before any of that I was a competitive diver, at the University of Alabama and for Team USA, including
          the 2011 FINA World Championships. Diving is a sport of small corrections made under pressure, and it
          turned out to be decent training for shipping SDKs onto other people’s phones.
        </p>

        <figure class="photo story-diving">
          <img :src="divingUsa" alt="Aaron on the springboard in a Team USA competition" width="1296" height="729" />
          <figcaption>Competing for Team USA.</figcaption>
        </figure>
      </div>
    </section>

    <!-- Experience -->
    <section class="container section">
      <header class="section-head">
        <p class="label">Experience</p>
        <h2>The full dive sheet</h2>
      </header>

      <article v-for="(item, i) in experiences" :key="item.company + item.period" class="job">
        <div class="job-side">
          <span class="job-round">Rd {{ total - i }}</span>
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
    </section>

    <!-- Skills and education -->
    <section class="container section">
      <header class="section-head">
        <p class="label">Toolbox</p>
        <h2>Skills &amp; education</h2>
      </header>

      <div class="skills">
        <div v-for="group in skillGroups" :key="group.category" class="skill-group">
          <h3 class="label">{{ group.category }}</h3>
          <ul>
            <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>

      <div v-for="edu in education" :key="edu.degree" class="edu">
        <h3 class="label">Education</h3>
        <div>
          <p class="edu-degree">{{ edu.degree }}</p>
          <p class="muted">{{ edu.institution }} · {{ edu.period }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-head h1 {
  max-width: 16ch;
}

.head-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

/* Story */
.story {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding-top: 32px;
}

.story-portrait {
  max-width: 420px;
  align-self: start;
}

.story-portrait img {
  aspect-ratio: 1;
  object-fit: cover;
}

.story-text {
  display: grid;
  gap: 20px;
  max-width: 62ch;
  font-size: 18px;
  color: var(--ink-2);
}

.story-text > p:first-child {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.4vw, 1.75rem);
  line-height: 1.3;
  color: var(--ink);
}

.story-diving {
  margin-top: 16px;
}

.story-diving img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

@media (min-width: 960px) {
  .story {
    grid-template-columns: 4fr 1fr 7fr;
  }

  .story-text {
    grid-column: 3;
  }
}

/* Experience */
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

/* Skills */
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 32px 24px;
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--rule);
}

.skill-group ul {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
  font-size: 16px;
}

.edu {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding-top: 28px;
}

.edu-degree {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.2;
}

@media (min-width: 860px) {
  .edu {
    grid-template-columns: 3fr 9fr;
    gap: 24px;
    align-items: baseline;
  }
}

/* Print: a clean one-column résumé */
@media print {
  .head-actions,
  .story-portrait,
  .story-diving {
    display: none !important;
  }

  .story {
    display: block;
    border: 0;
  }

  .job,
  .skill-group {
    break-inside: avoid;
  }
}
</style>
