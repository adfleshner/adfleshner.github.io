<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { profile } from '@/data/portfolio'

const isLight = ref(false)
const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About & Resume', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' }
]

function applyTheme(light: boolean) {
  document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark')
}

function toggleTheme() {
  isLight.value = !isLight.value
  localStorage.setItem('theme-preference', isLight.value ? 'light' : 'dark')
  applyTheme(isLight.value)
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

onMounted(() => {
  const saved = localStorage.getItem('theme-preference')
  if (saved === 'light') {
    isLight.value = true
    applyTheme(true)
  }
})
</script>

<template>
  <header class="navbar-wrapper">
    <div class="container navbar">
      <RouterLink to="/" class="brand" @click="closeMobileMenu">
        <span class="brand-badge">{{ profile.initials }}</span>
        <span class="brand-name">{{ profile.name }}</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="nav-actions">
        <button
          type="button"
          class="theme-btn"
          :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
          @click="toggleTheme"
        >
          <svg v-if="isLight" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>

        <RouterLink to="/contact" class="btn btn-primary nav-cta">
          Let's Talk
        </RouterLink>

        <button
          type="button"
          class="mobile-toggle"
          aria-label="Toggle navigation menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line v-if="!mobileMenuOpen" x1="3" y1="6" x2="21" y2="6" />
            <line v-if="!mobileMenuOpen" x1="3" y1="12" x2="21" y2="12" />
            <line v-if="!mobileMenuOpen" x1="3" y1="18" x2="21" y2="18" />
            <line v-if="mobileMenuOpen" x1="18" y1="6" x2="6" y2="18" />
            <line v-if="mobileMenuOpen" x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="mobile-drawer container">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="mobile-link"
        active-class="active"
        @click="closeMobileMenu"
      >
        {{ item.label }}
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-glass);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
  font-size: 1.05rem;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav-link {
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.92rem;
  font-weight: 500;
  transition: var(--transition-hover);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--accent-glow);
}

.nav-link.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.theme-btn,
.mobile-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--btn-transition);
}

.theme-btn:hover,
.mobile-toggle:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  transform: var(--btn-hover-transform);
}

.theme-btn:active,
.mobile-toggle:active {
  transform: var(--btn-active-transform);
  transition-duration: 0.12s;
}

.nav-cta {
  padding: 0.5rem 1rem;
  font-size: 0.88rem;
}

.mobile-toggle {
  display: none;
}

.mobile-drawer {
  display: none;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  gap: 0.35rem;
}

.mobile-link {
  padding: 0.65rem 0.9rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.mobile-link.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

@media (max-width: 768px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .mobile-toggle {
    display: inline-flex;
  }

  .mobile-drawer {
    display: flex;
  }
}
</style>

