<script setup lang="ts">
import { profile, experiences, education, skillGroups } from '@/data/portfolio'
import portraitColor from '@/assets/profile.jpg'
// Authentic RollTide / USA Diving options in @/assets/photos/:
// - aaron-diving-usa.jpg         (Classic Team USA springboard pose)
// - aaron-diving-twist.jpg       (640x640 mid-twist action shot)
// - aaron-diving-board-wide.jpg  (640x640 poised on 3m springboard in natatorium)
// - aaron-diving-springboard.jpg (Overhead springboard poise over blue pool)
// - aaron-diving-fina-2011.jpg   (Standing at 2011 FINA World Championships)
// - aaron-diving-pike.jpg        (Mid-air pike dive at Alabama)
import divingPhoto from '@/assets/photos/aaron-diving-usa.jpg'
</script>

<template>
  <div class="about-page-container">
    <!-- 🏛️ Framed Header Stage -->
    <section class="stage-shell about-stage">
      <div class="about-stage-content">
        <span class="flanked-eyebrow">LEAD ENGINEER &amp; ARCHITECT</span>

        <h1 class="about-stage-title editorial-serif">
          Architecting Android systems<br />
          <span class="gradient-text-logo editorial-serif-italic">through discipline &amp; craft.</span>
        </h1>

        <p class="about-stage-subtitle">
          Over 12 years building native mobile software across diverse domains — from high-scale ad tech &amp; on-device distribution at Digital Turbine to connected fitness at lululemon, secure decentralized communications, and public safety platforms.
        </p>

        <div class="about-actions-row">
          <a
            :href="profile.resumeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
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

          <RouterLink to="/contact" class="btn btn-glass">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Get in Touch</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 📷 Editorial Bento Photo & Story Showcase -->
    <section class="container">
      <div class="editorial-bento-grid">
        <!-- Photo Card 1: Aaron Lead Portrait -->
        <div class="card bento-card bento-portrait-card glass-card">
          <div class="bento-photo-wrapper">
            <img :src="portraitColor" alt="Aaron Fleshner" class="bento-img" />
            <div class="bento-overlay" />
          </div>
          <div class="bento-caption">
            <span class="bento-pill">Lead Software Engineer</span>
            <p class="bento-title">NC, USA • Digital Turbine</p>
            <p class="bento-desc">Guiding Android SDK architecture, publisher monetization, and Compose adoption.</p>
          </div>
        </div>

        <!-- Photo Card 2: Precision & Discipline (USA Diving Background) -->
        <div class="card bento-card bento-diving-card glass-card">
          <div class="bento-photo-wrapper">
            <img :src="divingPhoto" alt="Aaron Fleshner USA Diving Competitor" class="bento-img bento-img-diving" />
            <div class="bento-overlay" />
          </div>
          <div class="bento-caption">
            <span class="bento-pill diving-pill">Precision &amp; Athletic Discipline</span>
            <p class="bento-title">Team USA Competitor &amp; Univ. of Alabama CS</p>
            <p class="bento-desc">
              The exactitude and mental composure honed through competitive diving directly informs my approach to zero-defect native engineering and high-stakes SDK reliability.
            </p>
          </div>
        </div>

        <!-- Quote Card 3: Editorial Statement -->
        <div class="card bento-card bento-quote-card glass-card">
          <div class="bento-quote-inner">
            <span class="bento-quote-mark editorial-serif">“</span>
            <p class="bento-quote-text editorial-serif">
              My creative energy thrives in finding novel ways to present information with a keen focus on enhancing the user experience.
            </p>
            <div class="bento-quote-footer">
              <img :src="profile.avatarBw" alt="Aaron Fleshner" class="bento-mini-thumb" />
              <div>
                <p class="bento-quote-author">Aaron Fleshner</p>
                <p class="bento-quote-sub">Android Focus • 12+ Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 💼 Career History / Work Experience -->
    <section class="container resume-section">
      <div class="section-header-centered">
        <span class="flanked-eyebrow">CAREER HISTORY</span>
        <h2 class="section-title editorial-serif">Work Experience</h2>
        <p class="section-subtitle">
          Track record of technical leadership, platform architecture, and cross-functional execution.
        </p>
      </div>

      <div class="timeline">
        <article
          v-for="item in experiences"
          :key="`${item.company}-${item.role}`"
          class="card timeline-item glass-card"
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
                  <span v-if="item.current" class="current-badge">Current Role</span>
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
    </section>

    <!-- 🎓 Academic Background & Tooling Grid -->
    <section class="container">
      <div class="two-col-grid">
        <!-- Education -->
        <div>
          <div class="section-header">
            <span class="eyebrow">Academic Background</span>
            <h2 class="section-title editorial-serif">Education</h2>
          </div>

          <div v-for="edu in education" :key="edu.degree" class="card edu-card glass-card">
            <div class="edu-top-row">
              <span class="timeline-period">{{ edu.period }}</span>
              <span class="edu-tag">B.S. Computer Science</span>
            </div>
            <h3 class="edu-degree">{{ edu.degree }}</h3>
            <p class="edu-school">{{ edu.institution }}</p>
            <p class="edu-details">{{ edu.details }}</p>
          </div>
        </div>

        <!-- Skills & Tooling -->
        <div>
          <div class="section-header">
            <span class="eyebrow">Core Capabilities</span>
            <h2 class="section-title editorial-serif">Skills &amp; Tooling</h2>
          </div>

          <div class="skills-stack">
            <div v-for="group in skillGroups" :key="group.category" class="card skill-box glass-card">
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
    </section>
  </div>
</template>

<style scoped>
.about-page-container {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

/* ==========================================================================
   🏛️ ABOUT STAGE
   ========================================================================== */
.about-stage {
  padding: 4rem 2.5rem;
  margin-top: 1.25rem;
  text-align: center;
}

.about-stage-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 820px;
  margin: 0 auto;
}

.about-stage-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.8vw, 3.25rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.035em;
  color: var(--text-primary);
}

.about-stage-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 720px;
}

.about-actions-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.5rem;
}

/* ==========================================================================
   EDITORIAL BENTO GRID
   ========================================================================== */
.editorial-bento-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

@media (max-width: 960px) {
  .editorial-bento-grid {
    grid-template-columns: 1fr;
  }
}

.bento-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  min-height: 380px;
}

.bento-photo-wrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bento-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-img-diving {
  object-position: center 25%;
}

.bento-card:hover .bento-img {
  transform: scale(1.03);
}

.bento-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 35%,
    rgba(11, 15, 25, 0.75) 70%,
    rgba(11, 15, 25, 0.95) 100%
  );
}

[data-theme='light'] .bento-overlay {
  background: linear-gradient(
    to bottom,
    transparent 35%,
    rgba(237, 235, 228, 0.70) 70%,
    rgba(246, 245, 241, 0.94) 100%
  );
}

.bento-caption {
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.bento-pill {
  align-self: flex-start;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.16);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: var(--accent-primary);
  letter-spacing: 0.04em;
}

.diving-pill {
  background: rgba(251, 146, 60, 0.16);
  border-color: rgba(251, 146, 60, 0.35);
  color: var(--logo-coral);
}

.bento-title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
}

.bento-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

/* Quote Card */
.bento-quote-card {
  padding: 2.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--bg-glass-card);
}

.bento-quote-inner {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.bento-quote-mark {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  color: var(--accent-primary);
  opacity: 0.7;
}

.bento-quote-text {
  font-family: var(--font-display);
  font-size: 1.18rem;
  font-weight: 600;
  line-height: 1.48;
  letter-spacing: -0.015em;
  color: var(--text-primary);
}

.bento-quote-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.bento-mini-thumb {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--accent-primary);
}

.bento-quote-author {
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--text-primary);
}

.bento-quote-sub {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-muted);
}

/* ==========================================================================
   RESUME & TIMELINE
   ========================================================================== */
.resume-section {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.section-header-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.65rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;
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

.role-focus-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: var(--accent-primary);
}

.focus-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-emerald);
  box-shadow: 0 0 6px var(--accent-emerald);
}

.current-badge {
  display: inline-flex;
  align-items: center;
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
  margin-top: 0.25rem;
  font-size: 0.95rem;
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: 0.84rem;
  color: var(--accent-primary);
}

.timeline-highlights {
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.55;
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

/* ==========================================================================
   EDUCATION & SKILLS
   ========================================================================== */
.two-col-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  align-items: start;
}

.edu-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.75rem;
}

.edu-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edu-tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent-emerald);
}

.edu-degree {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 0.35rem;
  color: var(--text-primary);
}

.edu-school {
  color: var(--text-secondary);
  font-weight: 500;
}

.edu-details {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.5;
  margin-top: 0.25rem;
}

.skills-stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skill-box {
  padding: 1.5rem;
}

.skill-group-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .about-stage {
    padding: 2.25rem 1.25rem 1.75rem;
    border-radius: 20px;
  }

  .about-actions-row {
    flex-direction: column;
    width: 100%;
  }

  .about-actions-row .btn {
    width: 100%;
  }

  .bento-card {
    min-height: 300px;
  }

  .two-col-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
}
</style>
