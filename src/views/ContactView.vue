<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { profile } from '@/data/portfolio'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  // Honeypot trap field (hidden from humans, bots fill this out)
  companyWebsite: ''
})

const submitted = ref(false)
const copiedEmail = ref(false)
const isSending = ref(false)
const formLoadTime = ref(0)

onMounted(() => {
  formLoadTime.value = Date.now()
})

async function handleSubmit() {
  // Anti-Spam Check 1: Honeypot trap (if a bot entered any value, silently discard)
  if (form.companyWebsite.trim().length > 0) {
    submitted.value = true
    return
  }

  // Anti-Spam Check 2: Submission velocity (less than 1.2s indicates an automated script)
  const elapsed = Date.now() - formLoadTime.value
  if (elapsed < 1200) {
    submitted.value = true
    return
  }

  isSending.value = true

  // Check if a Formspree endpoint is configured via VITE_FORMSPREE_ENDPOINT
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY

  if (formspreeEndpoint) {
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _gotcha: form.companyWebsite
        })
      })

      if (response.ok) {
        submitted.value = true
      } else {
        openMailClient()
        submitted.value = true
      }
    } catch {
      openMailClient()
      submitted.value = true
    } finally {
      isSending.value = false
    }
  } else if (web3formsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          botcheck: form.companyWebsite
        })
      })

      const data = await response.json()
      if (data.success) {
        submitted.value = true
      } else {
        openMailClient()
        submitted.value = true
      }
    } catch {
      openMailClient()
      submitted.value = true
    } finally {
      isSending.value = false
    }
  } else {
    // Default: open user's mail client with pre-filled details
    openMailClient()
    submitted.value = true
    isSending.value = false
  }
}

function openMailClient() {
  const mailtoUri = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
    `From: ${form.name} (${form.email})\n\n${form.message}`
  )}`
  window.location.href = mailtoUri
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  form.companyWebsite = ''
  formLoadTime.value = Date.now()
  submitted.value = false
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copiedEmail.value = true
    setTimeout(() => {
      copiedEmail.value = false
    }, 2000)
  } catch {
    // Fallback if clipboard API is unavailable
  }
}
</script>

<template>
  <div class="contact-page-container">
    <!-- 🏛️ Framed Header Stage -->
    <section class="stage-shell contact-stage">
      <div class="contact-stage-content">
        <span class="flanked-eyebrow">DIRECT CHANNELS</span>

        <h1 class="contact-stage-title editorial-serif">
          Let's discuss architecture,<br />
          <span class="gradient-text-logo editorial-serif-italic">projects &amp; opportunities.</span>
        </h1>

        <p class="contact-stage-subtitle">
          Based in NC, USA. Always open to high-impact Android technical discussions, SDK architecture challenges, and collaborative engineering.
        </p>
      </div>
    </section>

    <!-- Main Content Grid -->
    <section class="container">
      <div class="contact-grid">
        <!-- Direct Contact Info Sidebar -->
        <div class="contact-sidebar">
          <div class="card info-card glass-card">
            <div class="info-card-header">
              <span class="eyebrow">Connect</span>
              <h2 class="info-heading editorial-serif">Direct Channels</h2>
            </div>

            <!-- Email Channel Card (Envelope Icon + Address + Icon-Only Copy Button) -->
            <div class="email-box">
              <a :href="`mailto:${profile.email}`" class="email-link-group" title="Send an email">
                <span class="channel-icon-box">
                  <svg class="channel-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span class="channel-value">{{ profile.email }}</span>
              </a>

              <button
                type="button"
                class="icon-copy-btn"
                :class="{ copied: copiedEmail }"
                :aria-label="copiedEmail ? 'Email copied' : 'Copy email address'"
                :title="copiedEmail ? 'Copied!' : 'Copy email address'"
                @click="copyEmail"
              >
                <svg v-if="copiedEmail" class="copy-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <svg v-else class="copy-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>

            <!-- Compact 2-Column Social Icon Cards -->
            <div class="social-grid">
              <a
                v-for="social in profile.socials"
                :key="social.label"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-card"
                :aria-label="social.label"
              >
                <span class="channel-icon-box social-icon-box">
                  <!-- GitHub Icon -->
                  <svg
                    v-if="social.label.toLowerCase().includes('github')"
                    class="channel-svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                  </svg>

                  <!-- LinkedIn Icon -->
                  <svg
                    v-else-if="social.label.toLowerCase().includes('linkedin')"
                    class="channel-svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                  </svg>

                  <!-- Fallback Link Icon -->
                  <svg
                    v-else
                    class="channel-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </span>

                <span class="social-name">{{ social.label }}</span>

                <svg class="social-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <!-- Icon-Paired Location & Timezone Footer -->
            <div class="location-meta-row">
              <span class="location-badge" title="Location">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{{ profile.location }}</span>
              </span>

              <span class="meta-divider" aria-hidden="true" />

              <span class="location-badge" title="Timezone">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span>ET (UTC-5)</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="card form-card glass-card">
          <div v-if="submitted" class="success-banner">
            <div class="success-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 class="editorial-serif success-title">Thanks for reaching out, {{ form.name }}!</h3>
            <p class="success-desc">
              Your message has been prepared. You can also send it directly via your mail client to
              <a :href="`mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`">
                {{ profile.email }}
              </a>.
            </p>
            <button type="button" class="btn btn-outline" @click="resetForm">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              <span>Send Another Message</span>
            </button>
          </div>

          <form v-else class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-header">
              <h2 class="form-title editorial-serif">Send a Message</h2>
              <p class="form-sub">Fill out the brief fields below to start a conversation.</p>
            </div>

            <!-- Honeypot anti-spam trap (invisible to humans, lures bots) -->
            <div class="hp-trap" aria-hidden="true">
              <label for="companyWebsite">Leave this field blank</label>
              <input
                id="companyWebsite"
                v-model="form.companyWebsite"
                type="text"
                name="company_website"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <div class="form-row">
              <label class="field">
                <span class="field-label">Your Name</span>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  class="field-input"
                />
              </label>

              <label class="field">
                <span class="field-label">Email Address</span>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  class="field-input"
                />
              </label>
            </div>

            <label class="field">
              <span class="field-label">Subject</span>
              <input
                v-model="form.subject"
                type="text"
                required
                placeholder="Android Architecture / Consulting / Opportunity"
                class="field-input"
              />
            </label>

            <label class="field">
              <span class="field-label">Message</span>
              <textarea
                v-model="form.message"
                rows="5"
                required
                placeholder="Tell me a bit about what you're working on or what you'd like to discuss..."
                class="field-input"
              />
            </label>

            <button type="submit" class="btn btn-primary submit-btn" :disabled="isSending">
              <svg v-if="isSending" class="btn-icon btn-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <svg v-else class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              <span>{{ isSending ? 'Sending...' : 'Send Message' }}</span>
              <svg v-if="!isSending" class="btn-icon btn-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* ==========================================================================
   🏛️ CONTACT STAGE
   ========================================================================== */
.contact-stage {
  padding: 4rem 2.5rem;
  margin-top: 1.25rem;
  text-align: center;
}

.contact-stage-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 820px;
  margin: 0 auto;
}

.contact-stage-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.8vw, 3.25rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.035em;
  color: var(--text-primary);
}

.contact-stage-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 680px;
}

/* ==========================================================================
   CONTACT GRID
   ========================================================================== */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 2rem;
  align-items: start;
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  padding: 1.85rem;
}

.info-card-header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-heading {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-primary);
}

/* ==========================================================================
   ICON-FIRST CHANNEL CARDS
   ========================================================================== */
.channel-icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--accent-glow);
  border: 1px solid var(--border-subtle);
  color: var(--accent-primary);
  flex-shrink: 0;
  transition: border-color var(--btn-transition), background-color var(--btn-transition), color var(--btn-transition);
}

.channel-svg {
  width: 17px;
  height: 17px;
}

/* Email Channel Row */
.email-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  padding: 0.75rem 0.85rem;
  border-radius: 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  min-width: 0;
  transition: border-color var(--btn-transition), box-shadow var(--btn-transition);
}

.email-box:hover {
  border-color: var(--border-highlight);
}

.email-link-group {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  text-decoration: none;
  color: inherit;
}

.email-link-group:hover .channel-icon-box {
  border-color: var(--accent-primary);
}

.email-link-group:hover .channel-value {
  color: var(--accent-primary);
}

.channel-value {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.92rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color var(--btn-transition);
}

.icon-copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-subtle);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  cursor: pointer;
  flex-shrink: 0;
  transition: var(--btn-transition);
}

[data-theme='light'] .icon-copy-btn {
  background: rgba(41, 37, 36, 0.04);
}

.icon-copy-btn:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  background: var(--accent-glow);
  transform: var(--btn-hover-transform);
}

.icon-copy-btn:active {
  transform: var(--btn-active-transform);
  transition-duration: 0.12s;
}

.icon-copy-btn.copied {
  color: var(--accent-emerald);
  border-color: rgba(52, 211, 153, 0.45);
  background: rgba(52, 211, 153, 0.12);
}

.copy-svg {
  width: 16px;
  height: 16px;
}

/* Compact 2-Column Social Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.social-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 0.85rem;
  border-radius: 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  min-width: 0;
  transition: var(--btn-transition);
}

.social-icon-box {
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
}

[data-theme='light'] .social-icon-box {
  background: rgba(41, 37, 36, 0.04);
}

.social-card:hover {
  border-color: var(--accent-primary);
  transform: var(--btn-hover-transform);
  box-shadow: 0 6px 18px -6px var(--accent-glow);
}

.social-card:active {
  transform: var(--btn-active-transform);
  transition-duration: 0.12s;
}

.social-card:hover .social-icon-box {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  background: var(--accent-glow);
}

.social-name {
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--text-primary);
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.social-arrow-svg {
  width: 14px;
  height: 14px;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: transform var(--btn-transition), color var(--btn-transition);
}

.social-card:hover .social-arrow-svg {
  color: var(--accent-primary);
  transform: translate(1.5px, -1.5px);
}

/* Icon-Paired Location & Timezone Footer */
.location-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  padding-top: 0.35rem;
  border-top: 1px solid var(--border-subtle);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
}

.meta-icon {
  width: 13.5px;
  height: 13.5px;
  color: var(--accent-primary);
  flex-shrink: 0;
}

.meta-divider {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--border-highlight);
}

/* ==========================================================================
   CONTACT FORM
   ========================================================================== */
.form-card {
  padding: 2.25rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.form-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.form-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-primary);
}

.form-sub {
  color: var(--text-secondary);
  font-size: 0.92rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.field-input {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  padding: 0.78rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-primary);
  outline: none;
  resize: vertical;
  transition: border-color var(--transition-hover), box-shadow var(--transition-hover);
}

.field-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.submit-btn {
  align-self: flex-start;
  margin-top: 0.5rem;
  padding: 0.75rem 1.6rem;
}

.success-banner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.15rem;
  padding: 1.5rem 0;
}

.success-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.15);
  border: 1px solid rgba(52, 211, 153, 0.35);
  color: var(--accent-emerald);
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-primary);
}

.success-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.success-desc a {
  color: var(--accent-primary);
  text-decoration: underline;
}

.hp-trap {
  position: absolute !important;
  left: -9999px !important;
  top: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  opacity: 0 !important;
  pointer-events: none !important;
  overflow: hidden !important;
}

@media (max-width: 820px) {
  .contact-stage {
    padding: 2.25rem 1.25rem 1.75rem;
    border-radius: 20px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .social-grid {
    grid-template-columns: 1fr;
  }

  .form-card {
    padding: 1.5rem 1.25rem;
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
