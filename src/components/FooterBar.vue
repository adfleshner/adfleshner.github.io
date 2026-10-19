<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { profile } from '@/data/portfolio'
import afMarkTransparent from '@/assets/logos/af-mark-transparent.png'
import logoDark from '@/assets/logos/logo-dark.jpg'
import logoLight from '@/assets/logos/logo-light.jpg'

const currentYear = new Date().getFullYear()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About & Resume', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <footer class="footer-wrapper">
    <div class="container footer-content">
      <!-- Top Row: Editorial Tagline & Monogram -->
      <div class="footer-top-grid">
        <div class="footer-brand-column">
          <div class="footer-monogram-row">
            <div class="footer-monogram-box">
              <img
                :src="afMarkTransparent"
                alt="AF Monogram"
                class="footer-mark"
                width="28"
                height="28"
                onerror="this.style.display='none'"
              />
              <img
                :src="logoDark"
                alt="Aaron Fleshner Logo"
                class="fallback-logo logo-dark"
                width="24"
                height="24"
              />
              <img
                :src="logoLight"
                alt="Aaron Fleshner Logo"
                class="fallback-logo logo-light"
                width="24"
                height="24"
              />
            </div>
            <div>
              <p class="footer-brand-title">{{ profile.name }}</p>
              <p class="footer-brand-sub">{{ profile.role }} • {{ profile.roleFocus }}</p>
            </div>
          </div>
          <p class="footer-editorial-tagline editorial-serif-italic">
            "Engineering that feels effortless."
          </p>
          <p class="footer-location-sub">
            Based in {{ profile.location }} — Crafting high-performance Android systems and elegant user experiences.
          </p>
        </div>

        <div class="footer-links-grid">
          <div class="footer-nav-col">
            <span class="footer-col-header">Navigation</span>
            <RouterLink
              v-for="item in navLinks"
              :key="item.to"
              :to="item.to"
              class="footer-link-pill"
            >
              {{ item.label }}
            </RouterLink>
          </div>

          <div class="footer-nav-col">
            <span class="footer-col-header">Direct Channels</span>
            <a
              v-for="social in profile.socials"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link-pill"
            >
              <span>{{ social.label }}</span>
              <span class="footer-link-arrow">↗</span>
            </a>
            <RouterLink to="/contact" class="footer-link-pill">
              <span>Message</span>
              <span class="footer-link-arrow">→</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Bottom Row: Hairline divider & Copyright -->
      <div class="footer-bottom-row">
        <p class="footer-copy">
          © {{ currentYear }} {{ profile.name }}. Built with Vue 3, TypeScript &amp; Vite.
        </p>
        <span class="footer-tech-pill">
          <span class="footer-tech-dot" />
          <span>Kotlin &amp; Android Focus</span>
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  border-top: 1px solid var(--border-subtle);
  margin-top: 5rem;
  padding: 4rem 0 2.5rem;
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.footer-top-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: start;
}

.footer-brand-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-monogram-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.footer-monogram-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  flex-shrink: 0;
}

.footer-mark {
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
}

.fallback-logo {
  display: none;
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.footer-brand-title {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 0.1rem;
}

.footer-brand-sub {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.footer-editorial-tagline {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--text-primary);
  letter-spacing: -0.025em;
}

.footer-location-sub {
  color: var(--text-secondary);
  font-size: 0.92rem;
  max-width: 480px;
  line-height: 1.55;
}

.footer-links-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.footer-nav-col {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-col-header {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-muted);
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.footer-link-pill {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.65rem;
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition-hover);
}

.footer-link-pill:hover {
  color: var(--accent-primary);
  background: var(--accent-glow);
  transform: translateX(2px);
}

.footer-link-arrow {
  color: var(--text-muted);
  font-size: 0.85rem;
  transition: transform var(--transition-hover), color var(--transition-hover);
}

.footer-link-pill:hover .footer-link-arrow {
  color: var(--accent-primary);
  transform: translate(2px, -2px);
}

.footer-bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border-subtle);
}

.footer-copy {
  color: var(--text-muted);
  font-size: 0.84rem;
}

.footer-tech-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-secondary);
}

.footer-tech-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-emerald);
  box-shadow: 0 0 6px var(--accent-emerald);
}

@media (max-width: 768px) {
  .footer-top-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .footer-links-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .footer-links-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
