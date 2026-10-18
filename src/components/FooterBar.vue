<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { profile } from '@/data/portfolio'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer-wrapper">
    <div class="container footer">
      <div class="footer-left">
        <p class="footer-brand">{{ profile.name }} — {{ profile.role }}</p>
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

.footer-brand {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
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

