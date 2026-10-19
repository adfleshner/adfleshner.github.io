<script setup lang="ts">
import { profile, experiences, education, skillGroups } from '@/data/portfolio'
</script>

<template>
  <div class="container page-wrapper">
    <!-- Bio Header -->
    <div class="about-top">
      <div class="section-header">
        <span class="eyebrow">About &amp; Resume</span>
        <h1 class="section-title">{{ profile.name }}</h1>
        <div class="about-role">
          <span class="role-line">
            <span>{{ profile.role }}</span>
            <span v-if="profile.roleFocus" class="role-focus-badge">
              <span class="focus-dot" />
              {{ profile.roleFocus }}
            </span>
          </span>
          <span class="about-sep">•</span>
          <span>{{ profile.location }}</span>
        </div>
      </div>

      <div class="about-actions">
        <a
          :href="profile.resumeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary resume-download-btn"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download Resume (PDF)</span>
          <svg class="btn-icon btn-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>

    <div class="card bio-card">
      <p v-for="(paragraph, index) in profile.aboutParagraphs" :key="index" class="bio-paragraph">
        {{ paragraph }}
      </p>
    </div>

    <!-- Experience Timeline -->
    <div class="resume-section">
      <div class="section-header">
        <span class="eyebrow">Career History</span>
        <h2 class="section-title">Work Experience</h2>
      </div>

      <div class="timeline">
        <article
          v-for="item in experiences"
          :key="`${item.company}-${item.role}`"
          class="card timeline-item"
        >
          <div class="timeline-header">
            <div>
              <h3 class="timeline-role">
                <span class="role-title-text">{{ item.role }}</span>
                <span class="role-badges">
                  <span v-if="item.roleFocus" class="role-focus-badge">
                    <span class="focus-dot" />
                    {{ item.roleFocus }}
                  </span>
                  <span v-if="item.current" class="current-badge">Current</span>
                </span>
              </h3>
              <p class="timeline-company">{{ item.company }} • {{ item.location }}</p>
            </div>
            <span class="timeline-period">{{ item.period }}</span>
          </div>

          <ul class="timeline-highlights">
            <li v-for="point in item.highlights" :key="point">
              {{ point }}
            </li>
          </ul>

          <div class="timeline-tech">
            <span v-for="tech in item.technologies" :key="tech" class="tag">
              {{ tech }}
            </span>
          </div>
        </article>
      </div>
    </div>

    <!-- Education & Skills Grid -->
    <div class="two-col-grid">
      <div>
        <div class="section-header">
          <span class="eyebrow">Academic Background</span>
          <h2 class="section-title">Education</h2>
        </div>

        <div v-for="edu in education" :key="edu.degree" class="card edu-card">
          <span class="timeline-period">{{ edu.period }}</span>
          <h3 class="edu-degree">{{ edu.degree }}</h3>
          <p class="edu-school">{{ edu.institution }}</p>
          <p class="edu-details">{{ edu.details }}</p>
        </div>
      </div>

      <div>
        <div class="section-header">
          <span class="eyebrow">Capabilities</span>
          <h2 class="section-title">Skills &amp; Tooling</h2>
        </div>

        <div class="skills-stack">
          <div v-for="group in skillGroups" :key="group.category" class="card skill-box">
            <h3 class="skill-group-title">{{ group.category }}</h3>
            <div class="timeline-tech">
              <span v-for="skill in group.skills" :key="skill" class="tag">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2.25rem;
}

.about-top .section-header {
  margin-bottom: 0;
}

.about-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-left: auto;
  flex-wrap: wrap;
}

.resume-download-btn {
  white-space: nowrap;
}

.about-role {
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.65rem;
}

.role-line {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.about-sep {
  opacity: 0.4;
}

.role-focus-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(52, 211, 153, 0.14));
  border: 1px solid rgba(52, 211, 153, 0.35);
  color: var(--text-primary);
  box-shadow: 0 0 14px rgba(52, 211, 153, 0.12);
  letter-spacing: -0.01em;
  vertical-align: middle;
}

.focus-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-emerald);
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.8);
}

.focus-italic {
  font-style: italic;
  font-weight: 400;
  opacity: 0.75;
}

.bio-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
}

.bio-paragraph {
  color: var(--text-secondary);
  font-size: 1.05rem;
}

.resume-section {
  margin-bottom: 4rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.timeline-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.timeline-role {
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.65rem;
}

.role-badges {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.current-badge {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  background: rgba(52, 211, 153, 0.15);
  color: var(--accent-emerald);
  border: 1px solid rgba(52, 211, 153, 0.35);
}

.timeline-company {
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 0.2rem;
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: 0.84rem;
  color: var(--accent-primary);
}

.timeline-highlights {
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.two-col-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 640px) {
  .two-col-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.edu-card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.edu-degree {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.edu-school {
  color: var(--text-primary);
  font-weight: 500;
}

.edu-details {
  color: var(--text-secondary);
  font-size: 0.94rem;
  margin-top: 0.35rem;
}

.skills-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-box {
  padding: 1.35rem;
}

.skill-group-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
</style>

