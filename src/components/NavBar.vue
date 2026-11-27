<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { profile } from '@/data/portfolio'

const route = useRoute()
const isDark = ref(false)
const menuOpen = ref(false)
const scrolled = ref(false)

const navItems = [
  { label: 'Work', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

const darkQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

function syncThemeColor() {
  const color = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
  let meta = document.querySelector('meta[name="theme-color"]:not([media])')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', color)
}

function readTheme() {
  const attr = document.documentElement.getAttribute('data-theme')
  isDark.value = attr ? attr === 'dark' : Boolean(darkQuery?.matches)
}

function toggleTheme() {
  const next = isDark.value ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem('theme-preference', next)
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
  isDark.value = next === 'dark'
  syncThemeColor()
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function onSystemChange() {
  if (!document.documentElement.getAttribute('data-theme')) {
    readTheme()
    syncThemeColor()
  }
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  }
)

onMounted(() => {
  readTheme()
  syncThemeColor()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  darkQuery?.addEventListener('change', onSystemChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  darkQuery?.removeEventListener('change', onSystemChange)
})
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
    <div class="container nav-inner">
      <RouterLink to="/" class="wordmark" aria-label="Aaron Fleshner, home">
        <span class="wordmark-name">{{ profile.name }}</span>
        <span class="wordmark-role">Android engineer</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Primary">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-link">
          {{ item.label }}
        </RouterLink>
        <button
          type="button"
          class="theme-toggle"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          {{ isDark ? 'Light' : 'Dark' }}
        </button>
      </nav>

      <button
        type="button"
        class="menu-button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>

    <div v-show="menuOpen" id="mobile-menu" class="mobile-menu">
      <div class="container">
        <RouterLink to="/" class="mobile-link">Home</RouterLink>
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="mobile-link">
          {{ item.label }}
        </RouterLink>
        <button type="button" class="mobile-link mobile-theme" @click="toggleTheme">
          {{ isDark ? 'Light theme' : 'Dark theme' }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg);
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}

.nav.is-scrolled,
.nav.is-open {
  border-bottom-color: var(--rule);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 68px;
}

.wordmark {
  display: flex;
  align-items: baseline;
  gap: 12px;
  min-width: 0;
  text-decoration: none;
  color: var(--ink);
}

.wordmark-name {
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.wordmark-role {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-3);
  white-space: nowrap;
}

.nav-links {
  display: none;
  align-items: center;
  gap: 32px;
}

.nav-link {
  position: relative;
  padding: 6px 0;
  font-size: 15px;
  color: var(--ink-2);
  text-decoration: none;
  transition: color var(--dur) var(--ease);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--ink);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.theme-toggle,
.menu-button {
  padding: 6px 0;
  border: 0;
  background: none;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-3);
  cursor: pointer;
}

.theme-toggle {
  min-width: 44px;
  padding-left: 20px;
  border-left: 1px solid var(--rule);
}

.theme-toggle:hover,
.menu-button:hover {
  color: var(--accent);
}

.menu-button {
  min-height: 44px;
  color: var(--ink);
}

.mobile-menu {
  border-top: 1px solid var(--rule);
  padding: 8px 0 20px;
}

.mobile-link {
  display: block;
  width: 100%;
  padding: 14px 0;
  border: 0;
  border-bottom: 1px solid var(--rule);
  background: none;
  font-family: var(--font-display);
  font-size: 28px;
  text-align: left;
  color: var(--ink);
  text-decoration: none;
  cursor: pointer;
}

.mobile-link.router-link-exact-active {
  color: var(--accent);
}

.mobile-theme {
  border-bottom: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-3);
}

@media (max-width: 420px) {
  .wordmark-role {
    display: none;
  }
}

@media (min-width: 760px) {
  .nav-links {
    display: flex;
  }

  .menu-button,
  .mobile-menu {
    display: none !important;
  }
}
</style>
