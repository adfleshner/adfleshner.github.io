<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { profile, projects, productionApps, skillGroups } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'

const openSourceProjects = computed(() =>
  projects.filter((p) => !productionApps.some((app) => app.id === p.id) && p.featured)
)
const featuredProjects = computed(() => projects.filter((p) => p.featured))

// Interactive Focus Card Widget
interface FocusPill {
  id: string
  title: string
  subtitle: string
  description: string
  metric: string
  linkText: string
  linkTo: string
  isExternal?: boolean
}

const focusPills: FocusPill[] = [
  {
    id: 'sdks',
    title: 'SDKs',
    subtitle: 'Ad Tech',
    description: 'High-scale on-device app delivery and monetization platforms at DT with strict battery/memory budgets.',
    metric: 'Platform-Scale Delivery',
    linkText: 'Read Career History',
    linkTo: '/about'
  },
  {
    id: 'compose',
    title: 'Compose',
    subtitle: 'UI / UX',
    description: 'Modern declarative Android UIs in Jetpack Compose, reactive state management, and fluid animations.',
    metric: 'Modern Android Stack',
    linkText: 'View Selected Projects',
    linkTo: '/projects'
  },
  {
    id: 'kotlin',
    title: 'Kotlin',
    subtitle: 'Coroutines',
    description: 'Deep mastery of Kotlin Coroutines, StateFlow, structured concurrency, and clean modular Android architecture.',
    metric: '100% Kotlin-First',
    linkText: 'Explore Experience',
    linkTo: '/about'
  },
  {
    id: 'opensource',
    title: 'Open Src',
    subtitle: '64+ Repos',
    description: 'Active open-source author with 64+ public GitHub repositories, published libraries, and technical articles.',
    metric: '64+ Public Repos',
    linkText: 'Visit GitHub Profile',
    linkTo: 'https://github.com/adfleshner',
    isExternal: true
  }
]

const activeFocusIndex = ref(1) // Default: 2nd pill (Compose UI / UX)
const activeFocus = computed(() => focusPills[activeFocusIndex.value])

function cycleFocus() {
  activeFocusIndex.value = (activeFocusIndex.value + 1) % focusPills.length
}
</script>

<template>
  <div class="home-page-container">
    <!-- 🏛️ The Flagship Floating Stage Hero -->
    <section class="stage-shell hero-stage" aria-label="Lead Engineer Showcase">
      <div class="hero-stage-grid">
        <!-- ================================================================ -->
        <!-- LEFT COLUMN: Monumental Serif Headline + CTAs + Circular Metric -->
        <!-- ================================================================ -->
        <div class="stage-left-col">
          <div class="stage-eyebrow-row">
            <span class="stage-eyebrow">LEAD ENGINEER • ANDROID • ARCHITECTURE</span>
          </div>

          <h1 class="stage-headline editorial-serif">
            Engineering that<br />
            <span class="gradient-text-logo editorial-serif-italic">feels closer.</span>
          </h1>

          <p class="stage-lead-text">
            {{ profile.headline }}
          </p>

          <!-- Pill CTA Row -->
          <div class="stage-actions">
            <RouterLink to="/projects" class="btn btn-primary stage-cta-pill">
              <span>View Projects</span>
              <svg class="btn-icon btn-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </RouterLink>

            <RouterLink to="/about" class="btn btn-glass stage-cta-pill">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>Experience &amp; Resume</span>
            </RouterLink>
          </div>

          <!-- Bottom-Left Frosted Glass Stats Bar -->
          <div class="stage-stats-card">
            <div
              v-for="stat in profile.stats"
              :key="stat.label"
              class="stage-stat-item"
            >
              <span class="stage-stat-value gradient-text-logo">{{ stat.value }}</span>
              <span class="stage-stat-label">{{ stat.label }}</span>
            </div>
          </div>

          <div class="stage-mini-stats-row">
            <span class="mini-stat-badge">
              <span class="badge-dot" />
              <span>DT Lead Engineer</span>
            </span>
            <span class="mini-stat-badge">
              <span class="badge-dot" />
              <span>100% Kotlin-First</span>
            </span>
          </div>
        </div>

        <!-- ================================================================ -->
        <!-- CENTER COLUMN: Editorial Portrait Showcase & Ambient Aura -->
        <!-- ================================================================ -->
        <div class="stage-center-col">
          <div class="portrait-stage-container">
            <!-- Atmospheric Logo-Spectrum Radial Aura -->
            <div class="portrait-ambient-aura" aria-hidden="true" />

            <div class="portrait-frame">
              <img
                :src="profile.avatarUrl"
                :alt="profile.name"
                class="portrait-image"
                width="380"
                height="480"
              />
              <div class="portrait-vignette-mask" />
            </div>

            <!-- Floating Portrait Location Pill -->
            <div class="portrait-caption-pill">
              <span class="status-dot-emerald" />
              <span>{{ profile.location }} • @digitalturbine</span>
            </div>
          </div>
        </div>

        <!-- ================================================================ -->
        <!-- RIGHT COLUMN: Watermark + Glass Interactive Focus Card            -->
        <!-- ================================================================ -->
        <div class="stage-right-col">
          <!-- Top-Right Stacked Watermark -->
          <div class="hero-watermark-stack" aria-hidden="true">
            <span>THOUGHTFUL</span>
            <span>RELIABLE</span>
            <span>SCALABLE</span>
            <span>ANDROID</span>
          </div>

          <!-- Floating Frosted Glass Card -->
          <div class="hero-focus-card">
            <div class="focus-card-header">
              <div class="card-author-left">
                <div class="card-avatar-box">
                  <img :src="profile.avatarBw" :alt="profile.name" class="card-avatar" width="34" height="34" />
                  <span class="card-live-dot" />
                </div>
                <div class="card-author-meta">
                  <span class="card-author-name">{{ profile.name }}</span>
                  <span class="card-author-sub">Lead Software Engineer</span>
                </div>
              </div>
              <span class="card-focus-tag">● Android Focus</span>
            </div>

            <div class="focus-card-body">
              <div class="focus-section-label-row">
                <span class="focus-section-label">Explore Engineering Focus</span>
                <button
                  type="button"
                  class="focus-cycle-btn"
                  aria-label="Next focus topic"
                  @click="cycleFocus"
                >
                  <span>Next</span>
                  <span class="btn-arrow">→</span>
                </button>
              </div>

              <!-- 4 Vertical Interactive Selector Pills -->
              <div class="focus-pills-row" role="tablist">
                <button
                  v-for="(pill, index) in focusPills"
                  :key="pill.id"
                  type="button"
                  class="focus-tab-pill"
                  :class="{ active: activeFocusIndex === index }"
                  role="tab"
                  :aria-selected="activeFocusIndex === index"
                  @click="activeFocusIndex = index"
                >
                  <span class="tab-pill-title">{{ pill.title }}</span>
                  <span class="tab-pill-sub">{{ pill.subtitle }}</span>
                </button>
              </div>

              <!-- Dynamic Preview Strip -->
              <div class="focus-detail-strip">
                <div class="strip-header">
                  <span class="strip-metric">{{ activeFocus.metric }}</span>
                  <span class="strip-dot" />
                  <span class="strip-cat">{{ activeFocus.title }}</span>
                </div>
                <p class="strip-description">
                  {{ activeFocus.description }}
                </p>

                <div class="strip-action-row">
                  <a
                    v-if="activeFocus.isExternal"
                    :href="activeFocus.linkTo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="strip-link"
                  >
                    <span>{{ activeFocus.linkText }}</span>
                    <span>↗</span>
                  </a>
                  <RouterLink
                    v-else
                    :to="activeFocus.linkTo"
                    class="strip-link"
                  >
                    <span>{{ activeFocus.linkText }}</span>
                    <span>→</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================================================================ -->
      <!-- FULL-WIDTH STAGE FOOTER: Pillars Row + Editorial Signature       -->
      <!-- ================================================================ -->
      <div class="stage-footer-bar">
        <!-- 3 Minimalist Line-Icon Pillars (Bottom Row) -->
        <div class="stage-pillars-row">
          <div class="pillar-item">
            <div class="pillar-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div class="pillar-text">
              <span class="pillar-line1">Lead Android</span>
              <span class="pillar-line2">Engineer</span>
            </div>
          </div>

          <div class="pillar-divider" aria-hidden="true" />

          <div class="pillar-item">
            <div class="pillar-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div class="pillar-text">
              <span class="pillar-line1">SDK Engineering</span>
              <span class="pillar-line2">&amp; Monetization</span>
            </div>
          </div>

          <div class="pillar-divider" aria-hidden="true" />

          <div class="pillar-item">
            <div class="pillar-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div class="pillar-text">
              <span class="pillar-line1">Kotlin First</span>
              <span class="pillar-line2">&amp; Jetpack Compose</span>
            </div>
          </div>
        </div>

        <!-- Editorial Stage Signature -->
        <div class="stage-signature">
          <span class="sig-rule">──────</span>
          <span class="sig-serif editorial-serif">Thoughtful Android Craft</span>
          <span class="sig-italic editorial-serif-italic">Built to Last</span>
        </div>
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- BELOW THE STAGE: Transition Section Header                       -->
    <!-- ================================================================ -->
    <section class="container transition-section">
      <div class="transition-header-box">
        <span class="flanked-eyebrow">A MORE THOUGHTFUL APPROACH</span>
        <h2 class="transition-title editorial-serif">
          Software architecture, on your terms.
        </h2>
        <p class="transition-subtitle">
          Crafted with clean separation of concerns, high-scale SDK performance, and intuitive, fluid user experiences.
        </p>
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- PRODUCTION APPLICATIONS SECTION (RESEARCHED APPS)                -->
    <!-- ================================================================ -->
    <section id="production-apps" class="container section" aria-label="Production Android Applications">
      <div class="section-header-row">
        <div class="section-header">
          <span class="eyebrow">Proven in Production</span>
          <h2 class="section-title editorial-serif">Production Applications</h2>
          <p class="section-subtitle">
            Carrier-grade SDK platforms, statewide civic tools, and commercial Android applications engineered across my career.
          </p>
        </div>

        <RouterLink to="/projects" class="btn btn-glass">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span>All 12+ Projects</span>
          <svg class="btn-icon btn-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </RouterLink>
      </div>

      <div class="projects-grid">
        <ProjectCard
          v-for="project in productionApps"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- OPEN-SOURCE CRAFT & DEVELOPER TOOLS SECTION                      -->
    <!-- ================================================================ -->
    <section class="container section" aria-label="Open-Source Craft and Developer Tools">
      <div class="section-header-row">
        <div class="section-header">
          <span class="eyebrow">Open-Source Craft</span>
          <h2 class="section-title editorial-serif">Developer Libraries &amp; Tools</h2>
          <p class="section-subtitle">
            Public repositories, Android performance guides, and reactive Kotlin utilities published on GitHub and Medium.
          </p>
        </div>

        <a
          href="https://github.com/adfleshner"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-glass"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>64+ GitHub Repos</span>
          <svg class="btn-icon btn-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      <div class="projects-grid">
        <ProjectCard
          v-for="project in openSourceProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- TECHNICAL STACK BENTO SECTION -->
    <!-- ================================================================ -->
    <section class="container section">
      <div class="section-header">
        <span class="eyebrow">Technical Mastery</span>
        <h2 class="section-title editorial-serif">Engineering Stack</h2>
        <p class="section-subtitle">
          Languages, core frameworks, and platforms refined over 12+ years of production Android leadership.
        </p>
      </div>

      <div class="skills-grid">
        <div v-for="group in skillGroups" :key="group.category" class="card skill-card glass-card">
          <div class="skill-card-top">
            <span class="skill-card-indicator" />
            <h3 class="skill-category">{{ group.category }}</h3>
          </div>
          <div class="skill-tags">
            <span v-for="skill in group.skills" :key="skill" class="tag">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* ==========================================================================
   🏛️ HERO STAGE
   ========================================================================== */
.hero-stage {
  padding: 3.5rem 3rem 2.75rem;
  margin-top: 1.25rem;
}

@media (max-width: 1100px) {
  .hero-stage {
    padding: 2.75rem 2rem 2.25rem;
  }
}

@media (max-width: 640px) {
  .hero-stage {
    padding: 2rem 1.25rem 1.75rem;
    border-radius: 20px;
  }
}

.hero-stage-grid {
  display: grid;
  grid-template-columns: 1fr 0.95fr 1.12fr;
  gap: 2rem;
  align-items: center;
}

@media (max-width: 1180px) {
  .hero-stage-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.25rem;
  }

  .stage-center-col {
    grid-column: 2;
    grid-row: 1 / span 2;
  }

  .stage-right-col {
    grid-column: 1;
  }
}

@media (max-width: 860px) {
  .hero-stage-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .stage-center-col {
    grid-column: auto;
    grid-row: auto;
  }

  .stage-right-col {
    grid-column: auto;
  }
}

/* ==========================================================================
   LEFT COLUMN
   ========================================================================== */
.stage-left-col {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  z-index: 2;
}

.stage-eyebrow-row {
  display: flex;
  align-items: center;
}

.stage-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--accent-primary);
  text-transform: uppercase;
}

.stage-headline {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 3.6vw, 3.45rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: var(--text-primary);
}

.stage-lead-text {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 420px;
}

.nowrap-pill {
  white-space: nowrap;
}

.stage-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.25rem;
}

.stage-cta-pill {
  padding: 0.68rem 1.35rem;
}

/* Frosted Glass Engineering Stats Bar */
.stage-stats-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 0.75rem;
  padding: 1.1rem 1.35rem;
  border-radius: 18px;
  background: var(--bg-glass-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
  max-width: 440px;
}

.stage-stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: relative;
}

.stage-stat-item:not(:first-child) {
  padding-left: 1rem;
  border-left: 1px solid var(--border-subtle);
}

.stage-stat-value {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.45rem;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.stage-stat-label {
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.3;
}

@media (max-width: 480px) {
  .stage-stats-card {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .stage-stat-item:not(:first-child) {
    padding-left: 0;
    border-left: none;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-subtle);
  }
}

.stage-mini-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: -0.35rem;
}

.mini-stat-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  background: var(--bg-glass-card);
  border: 1px solid var(--border-subtle);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-secondary);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--logo-teal);
  box-shadow: 0 0 6px var(--logo-teal);
}

/* ==========================================================================
   CENTER COLUMN: Editorial Portrait Showcase
   ========================================================================== */
.stage-center-col {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.portrait-stage-container {
  position: relative;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.portrait-ambient-aura {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 380px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(45, 212, 191, 0.18) 35%, rgba(251, 146, 60, 0.10) 65%, transparent 75%);
  filter: blur(40px);
  pointer-events: none;
  z-index: -1;
}

[data-theme='light'] .portrait-ambient-aura {
  background: radial-gradient(circle, rgba(3, 105, 161, 0.16) 0%, rgba(13, 148, 136, 0.12) 35%, rgba(234, 88, 12, 0.08) 65%, transparent 75%);
  filter: blur(44px);
}

.portrait-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  height: auto;
  min-height: 440px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 24px 54px -16px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
}

.portrait-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.portrait-frame:hover .portrait-image {
  transform: scale(1.025);
}

.portrait-vignette-mask {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    transparent 55%,
    rgba(17, 24, 39, 0.65) 85%,
    rgba(17, 24, 39, 0.95) 100%
  );
}

[data-theme='light'] .portrait-vignette-mask {
  background: linear-gradient(
    to bottom,
    transparent 55%,
    rgba(246, 245, 241, 0.45) 82%,
    rgba(246, 245, 241, 0.92) 100%
  );
}

.portrait-caption-pill {
  position: absolute;
  bottom: 16px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.95rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f8fafc;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

[data-theme='light'] .portrait-caption-pill {
  background: rgba(255, 255, 255, 0.9);
  color: #292524;
  border: 1px solid rgba(41, 37, 36, 0.12);
}

.status-dot-emerald {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-emerald);
  box-shadow: 0 0 8px var(--accent-emerald);
}

/* ==========================================================================
   RIGHT COLUMN: Watermark + Glass Interactive Focus Card
   ========================================================================== */
.stage-right-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}

/* Stacked Watermark */
.hero-watermark-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  line-height: 1.6;
  color: var(--text-muted);
  opacity: 0.65;
  user-select: none;
}

/* Floating Frosted Glass Card */
.hero-focus-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.6rem 1.65rem;
  border-radius: 22px;
  background: var(--bg-glass-card);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
  transition: var(--transition-hover);
  width: 100%;
}

.hero-focus-card:hover {
  border-color: var(--border-hover);
}

.focus-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.card-author-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.card-avatar-box {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: visible;
}

.card-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border-subtle);
}

.card-live-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent-emerald);
  border: 2px solid var(--bg-elevated);
}

.card-author-meta {
  display: flex;
  flex-direction: column;
}

.card-author-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.2;
}

.card-author-sub {
  font-size: 0.76rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.card-focus-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: var(--accent-primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.focus-card-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.focus-section-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.1rem;
}

.focus-section-label {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  font-weight: 600;
}

.focus-cycle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--accent-primary);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: color var(--transition-hover);
}

.focus-cycle-btn:hover {
  color: var(--logo-teal);
}

.focus-cycle-btn:hover .btn-arrow {
  transform: translateX(2px);
}

.btn-arrow {
  transition: transform var(--transition-hover);
}

/* 4 Interactive Selector Pills */
.focus-pills-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.focus-tab-pill {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: var(--btn-transition);
  text-align: left;
}

.focus-tab-pill:hover {
  border-color: var(--accent-primary);
  transform: var(--btn-hover-transform);
}

.focus-tab-pill.active {
  background: var(--btn-pill-gradient);
  border-color: transparent;
  box-shadow: 0 4px 14px -3px var(--accent-glow);
}

.focus-tab-pill.active .tab-pill-title,
.focus-tab-pill.active .tab-pill-sub {
  color: #ffffff;
}

.tab-pill-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.tab-pill-sub {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  margin-top: 0.2rem;
}

/* Dynamic Preview Strip inside glass card */
.focus-detail-strip {
  padding: 1.1rem 1.15rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

[data-theme='light'] .focus-detail-strip {
  background: rgba(41, 37, 36, 0.03);
}

.strip-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
}

.strip-metric {
  color: var(--accent-emerald);
  font-weight: 600;
}

.strip-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-muted);
}

.strip-cat {
  color: var(--text-muted);
}

.strip-description {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.strip-action-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.35rem;
}

.strip-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent-primary);
  text-decoration: none;
  transition: color var(--transition-hover);
}

.strip-link:hover {
  color: var(--logo-teal);
}

/* ==========================================================================
   FULL-WIDTH STAGE FOOTER: Pillars Row + Editorial Signature
   ========================================================================== */
.stage-footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 2.25rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border-subtle);
  position: relative;
  z-index: 2;
  width: 100%;
}

/* 3 Minimalist Line-Icon Pillars */
.stage-pillars-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  border-radius: 16px;
  background: var(--bg-glass-card);
  border: 1px solid var(--border-subtle);
  gap: 0.85rem;
  flex: 1;
  max-width: 720px;
}

.pillar-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1 1 0;
  min-width: 0;
}

.pillar-icon-box {
  color: var(--accent-primary);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.pillar-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  min-width: 0;
}

.pillar-line1 {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
}

.pillar-line2 {
  font-size: 0.7rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.pillar-divider {
  width: 1px;
  height: 28px;
  background: var(--border-subtle);
  flex-shrink: 0;
  margin: 0 0.35rem;
}

/* Bottom Editorial Signature */
.stage-signature {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.sig-rule {
  letter-spacing: -2px;
  opacity: 0.4;
}

.sig-serif {
  color: var(--text-primary);
  font-weight: 600;
}

.sig-italic {
  color: var(--accent-primary);
  font-weight: 700;
}

@media (max-width: 960px) {
  .stage-footer-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 1.25rem;
    margin-top: 1.75rem;
    padding-top: 1.5rem;
  }

  .stage-pillars-row {
    max-width: 100%;
  }

  .stage-signature {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .stage-pillars-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.15rem;
  }

  .pillar-divider {
    display: none;
  }

  .pillar-item {
    width: 100%;
  }
}

/* ==========================================================================
   TRANSITION SECTION (Below Stage)
   ========================================================================== */
.transition-section {
  padding-top: 3rem;
  padding-bottom: 1rem;
}

.transition-header-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.85rem;
  max-width: 780px;
  margin: 0 auto;
}

.transition-title {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3.4vw, 2.65rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.transition-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 620px;
  line-height: 1.6;
}

/* ==========================================================================
   BENTO PROJECTS & SKILLS
   ========================================================================== */
.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.section-header-row .section-header {
  margin-bottom: 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.75rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  padding: 1.75rem;
}

.skill-card-top {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.skill-card-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--logo-gradient);
}

.skill-category {
  font-size: 1.1rem;
  font-weight: 700;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .projects-grid,
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .stage-pillars-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }

  .pillar-divider {
    display: none;
  }

  .focus-pills-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .portrait-stage-container {
    max-width: 320px;
  }

  .portrait-frame {
    min-height: 380px;
  }

  .hero-watermark-stack {
    align-items: flex-start;
  }
}

@media (max-width: 420px) {
  .stage-actions {
    flex-direction: column;
    width: 100%;
  }

  .stage-cta-pill {
    width: 100%;
    justify-content: center;
  }

  .portrait-stage-container {
    max-width: 280px;
  }

  .portrait-frame {
    min-height: 340px;
  }

  .hero-focus-card {
    padding: 1.15rem;
  }
}
</style>
