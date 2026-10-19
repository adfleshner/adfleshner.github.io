<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { profile } from '@/data/portfolio'
import logoDark from '@/assets/logos/logo-dark.jpg'
import logoLight from '@/assets/logos/logo-light.jpg'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer-wrapper">
    <div class="container footer">
      <div class="footer-left">
        <div class="footer-brand-header">
          <div class="footer-logo-container">
            <img :src="logoDark" alt="Aaron Fleshner Logo" class="footer-logo logo-dark" width="28" height="28" />
            <img :src="logoLight" alt="Aaron Fleshner Logo" class="footer-logo logo-light" width="28" height="28" />
          </div>
          <p class="footer-brand">{{ profile.name }} — {{ profile.role }}</p>
        </div>
        <p class="footer-copy">
          © {{ currentYear }} {{ profile.name }}. Built with Vue 3, TypeScript &amp; Vite.
        </p>
      </div>

      <div class="footer-links">
        <RouterLink to="/about" class="footer-link">Resume</RouterLink>
        <RouterLink to="/projects" class="footer-link">Projects</RouterLink>
        <RouterLink to="/contact" class="footer-link">Contact</RouterLink>
        <a
          v-for="social in profile.socials"
          :key="social.label"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          {{ social.label }} ↗
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  border-top: 1px solid var(--border-subtle);
  margin-top: 4rem;
  padding: 2.5rem 0;
  background: var(--bg-glass);
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-brand-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.35rem;
}

.footer-logo-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
}

.footer-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.logo-dark {
  display: block;
}

.logo-light {
  display: none;
}

:root[data-theme='light'] .logo-dark {
  display: none;
}

:root[data-theme='light'] .logo-light {
  display: block;
}

@media (prefers-color-scheme: light) {
  :root:not([data-theme='dark']) .logo-dark {
    display: none;
  }
  :root:not([data-theme='dark']) .logo-light {
    display: block;
  }
}

.footer-brand {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0;
}

.footer-copy {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.footer-link {
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--accent-primary);
}
</style>

