<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { profile } from '@/data/portfolio'
import afMarkTransparent from '@/assets/logos/af-mark-transparent.png'
import logoDark from '@/assets/logos/logo-dark.jpg'
import logoLight from '@/assets/logos/logo-light.jpg'

const route = useRoute()
const isLight = ref(false)
const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About & Resume', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' }
]

// Sliding indicator state
const navPillTrackRef = ref<HTMLElement | null>(null)
const pillStyle = ref({
  transform: 'translateX(0px)',
  width: '0px',
  opacity: 0
})

function updatePillPosition() {
  if (!navPillTrackRef.value) return
  // Find the active link inside the nav track
  const activeLink = navPillTrackRef.value.querySelector('.nav-pill-link.active') as HTMLElement | null
  if (activeLink) {
    const trackRect = navPillTrackRef.value.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    const left = linkRect.left - trackRect.left
    pillStyle.value = {
      transform: `translateX(${left}px)`,
      width: `${linkRect.width}px`,
      opacity: 1
    }
  } else {
    pillStyle.value = {
      ...pillStyle.value,
      opacity: 0
    }
  }
}

watch(
  () => route.path,
  () => {
    nextTick(() => {
      updatePillPosition()
    })
  }
)

function applyTheme(light: boolean) {
  document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark')
  const themeColor = light ? '#f6f5f1' : '#0b0f19'
  let metaTheme = document.querySelector('meta[name="theme-color"]:not([media])')
  if (!metaTheme) {
    metaTheme = document.createElement('meta')
    metaTheme.setAttribute('name', 'theme-color')
    document.head.appendChild(metaTheme)
  }
  metaTheme.setAttribute('content', themeColor)
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
  const currentAttr = document.documentElement.getAttribute('data-theme')
  if (currentAttr === 'light') {
    isLight.value = true
    applyTheme(true)
  } else {
    const saved = localStorage.getItem('theme-preference')
    if (saved === 'light') {
      isLight.value = true
      applyTheme(true)
    } else {
      isLight.value = false
      applyTheme(false)
    }
  }

  nextTick(() => {
    updatePillPosition()
  })
  window.addEventListener('resize', updatePillPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePillPosition)
})
</script>

<template>
  <header class="navbar-wrapper">
    <div class="container navbar">
      <!-- Left: Brand Monogram & Name -->
      <RouterLink to="/" class="brand" @click="closeMobileMenu">
        <div class="brand-monogram-box">
          <img
            :src="afMarkTransparent"
            alt="AF Monogram"
            class="brand-mark"
            width="32"
            height="32"
            onerror="this.style.display='none'"
          />
          <img
            :src="logoDark"
            alt="Aaron Fleshner Logo"
            class="fallback-logo logo-dark"
            width="28"
            height="28"
          />
          <img
            :src="logoLight"
            alt="Aaron Fleshner Logo"
            class="fallback-logo logo-light"
            width="28"
            height="28"
          />
        </div>
        <div class="brand-text-group">
          <span class="brand-name">{{ profile.name }}</span>
          <span class="brand-dot" aria-hidden="true" />
        </div>
      </RouterLink>

      <!-- Center: Floating Frosted Pill Nav Track with Sliding Pill -->
      <nav ref="navPillTrackRef" class="nav-pill-track" aria-label="Main navigation">
        <!-- Animated sliding pill indicator -->
        <div class="nav-sliding-pill" :style="pillStyle" aria-hidden="true"></div>

        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-pill-link"
          active-class="active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Right: Theme Toggle + Pill CTA -->
      <div class="nav-actions">
        <button
          type="button"
          class="theme-btn"
          :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
          @click="toggleTheme"
        >
          <svg v-if="isLight" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
          <span>Let's Talk</span>
          <svg class="btn-icon btn-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
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

    <!-- Mobile Drawer -->
    <div v-if="mobileMenuOpen" class="mobile-drawer container">
      <div class="mobile-drawer-card">
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
        <RouterLink to="/contact" class="btn btn-primary mobile-cta-btn" @click="closeMobileMenu">
          <span>Let's Talk →</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: transparent;
  pointer-events: none;
  transition: background-color var(--transition-speed) var(--transition-ease),
              border-color var(--transition-speed) var(--transition-ease),
              box-shadow var(--transition-speed) var(--transition-ease);
}

.navbar-wrapper > * {
  pointer-events: auto;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
}

/* Brand */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  text-decoration: none;
}

.brand-monogram-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  flex-shrink: 0;
  transition: transform var(--transition-hover), border-color var(--transition-hover), box-shadow var(--transition-hover);
  position: relative;
}

.brand:hover .brand-monogram-box {
  transform: translateY(-1.5px);
  border-color: var(--accent-primary);
  box-shadow: 0 4px 14px -3px var(--accent-glow);
}

.brand-mark {
  width: 26px;
  height: 26px;
  object-fit: contain;
  display: block;
}

.fallback-logo {
  display: none;
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.brand-text-group {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.brand-name {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.015em;
  color: var(--text-primary);
}

.brand-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--logo-gradient);
  box-shadow: 0 0 8px var(--accent-primary);
  flex-shrink: 0;
}

/* Floating Frosted Pill Nav Track */
.nav-pill-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.2);
}

[data-theme='light'] .nav-pill-track {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 16px -4px rgba(41, 37, 36, 0.06);
}

/* Sliding pill indicator behind active links */
.nav-sliding-pill {
  position: absolute;
  top: 0.3rem;
  bottom: 0.3rem;
  left: 0;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1),
              width 0.38s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.25s ease;
  z-index: 1;
}

[data-theme='light'] .nav-sliding-pill {
  background: #ffffff;
  border-color: rgba(41, 37, 36, 0.08);
  box-shadow: 0 2px 8px -2px rgba(41, 37, 36, 0.08);
}

.nav-pill-link {
  position: relative;
  z-index: 2;
  padding: 0.42rem 0.95rem;
  border-radius: 999px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 500;
  transition: color var(--transition-speed) var(--transition-ease),
              background var(--transition-speed) var(--transition-ease);
  text-decoration: none;
}

.nav-pill-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
}

[data-theme='light'] .nav-pill-link:hover {
  background: rgba(41, 37, 36, 0.04);
}

.nav-pill-link.active {
  color: var(--text-primary);
  font-weight: 600;
  background: transparent;
}

[data-theme='light'] .nav-pill-link.active {
  color: var(--accent-primary);
  background: transparent;
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;
}

.theme-btn,
.mobile-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
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
  padding: 0.48rem 1.15rem;
  font-size: 0.86rem;
}

.mobile-toggle {
  display: none;
}

/* Mobile Drawer */
.mobile-drawer {
  display: none;
  padding-bottom: 1.25rem;
  padding-top: 0.5rem;
}

.mobile-drawer-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.25rem;
  border-radius: 20px;
  background: rgba(21, 30, 46, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
}

[data-theme='light'] .mobile-drawer-card {
  background: rgba(255, 255, 255, 0.88);
  border-color: rgba(41, 37, 36, 0.08);
  box-shadow: 0 10px 30px -10px rgba(41, 37, 36, 0.12);
}

.mobile-link {
  padding: 0.65rem 1rem;
  border-radius: 999px;
  color: var(--text-secondary);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition-hover);
}

.mobile-link:hover,
.mobile-link.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

.mobile-cta-btn {
  margin-top: 0.5rem;
  width: 100%;
}

@media (max-width: 820px) {
  .navbar-wrapper {
    background: rgba(11, 15, 25, 0.82);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-subtle);
    box-shadow: 0 4px 20px -6px rgba(0, 0, 0, 0.35);
  }

  [data-theme='light'] .navbar-wrapper {
    background: rgba(246, 245, 241, 0.85);
    border-bottom-color: rgba(41, 37, 36, 0.08);
    box-shadow: 0 4px 20px -6px rgba(41, 37, 36, 0.06);
  }

  .nav-pill-track,
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

@media (max-width: 400px) {
  .brand-name {
    font-size: 0.94rem;
  }
}
</style>
