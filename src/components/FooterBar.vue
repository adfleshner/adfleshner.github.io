<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { profile } from '@/data/portfolio'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-sign">
        <p class="footer-name">{{ profile.name }}</p>
        <p class="footer-line">Lead software engineer, Android. {{ profile.location }}.</p>
      </div>

      <ul class="footer-links">
        <li><RouterLink to="/projects" class="link">Work</RouterLink></li>
        <li><RouterLink to="/about" class="link">About</RouterLink></li>
        <li><RouterLink to="/contact" class="link">Contact</RouterLink></li>
        <li><a :href="profile.resumeUrl" class="link" target="_blank" rel="noopener">Résumé (PDF)</a></li>
      </ul>

      <ul class="footer-links">
        <li v-for="social in profile.socials" :key="social.url">
          <a :href="social.url" class="link" target="_blank" rel="noopener noreferrer">{{ social.label }}</a>
        </li>
        <li><a :href="`mailto:${profile.email}`" class="link">Email</a></li>
      </ul>

      <p class="footer-meta">© {{ currentYear }} · Built with Vue, set in Newsreader and IBM Plex.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--section);
  border-top: 1px solid var(--rule-strong);
  padding-top: 40px;
  padding-bottom: 40px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
}

.footer-name {
  font-family: var(--font-display);
  font-size: 26px;
  line-height: 1.1;
}

.footer-line {
  margin-top: 6px;
  font-size: 15px;
  color: var(--ink-2);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 15px;
}

.footer-meta {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-3);
}

@media (min-width: 760px) {
  .footer-inner {
    grid-template-columns: 6fr 2fr 2fr;
    align-items: start;
  }

  .footer-meta {
    grid-column: 1 / -1;
    padding-top: 20px;
    border-top: 1px solid var(--rule);
  }
}
</style>
