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
  <div class="container section">
    <div class="section-header">
      <span class="eyebrow">Contact</span>
      <h1 class="section-title">Get in Touch</h1>
      <p class="section-subtitle">
        Have a question about my projects, an idea to discuss, or just want to connect? Reach out directly or send a message below.
      </p>
    </div>

    <div class="contact-grid">
      <!-- Direct Contact Info -->
      <div class="contact-sidebar">
        <div class="card info-card">
          <h2 class="info-heading">Direct Channels</h2>
          <p class="info-text">
            I typically respond within 24 hours. Feel free to email me directly or connect on social platforms.
          </p>

          <div class="email-box">
            <div>
              <span class="channel-label">Email</span>
              <a :href="`mailto:${profile.email}`" class="channel-value">{{ profile.email }}</a>
            </div>
            <button type="button" class="btn btn-outline copy-btn" @click="copyEmail">
              {{ copiedEmail ? 'Copied!' : 'Copy' }}
            </button>
          </div>

          <div class="social-list">
            <a
              v-for="social in profile.socials"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-row"
            >
              <span class="social-name">{{ social.label }}</span>
              <span class="social-handle">{{ social.handle }} ↗</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="card form-card">
        <div v-if="submitted" class="success-banner">
          <h3>Thanks for reaching out, {{ form.name }}!</h3>
          <p>
            Your message has been prepared. You can also send it directly via your email client to
            <a :href="`mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`">
              {{ profile.email }}
            </a>.
          </p>
          <button type="button" class="btn btn-outline" @click="resetForm">
            Send Another Message
          </button>
        </div>

        <form v-else class="contact-form" @submit.prevent="handleSubmit">
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
              placeholder="Project inquiry / Opportunity"
              class="field-input"
            />
          </label>

          <label class="field">
            <span class="field-label">Message</span>
            <textarea
              v-model="form.message"
              rows="5"
              required
              placeholder="Tell me a bit about what you're working on..."
              class="field-input"
            />
          </label>

          <button type="submit" class="btn btn-primary submit-btn" :disabled="isSending">
            <span v-if="isSending">Sending...</span>
            <span v-else>Send Message →</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 2rem;
  align-items: start;
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.info-heading {
  font-size: 1.25rem;
  font-weight: 700;
}

.info-text {
  color: var(--text-secondary);
  font-size: 0.94rem;
}

.email-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
}

.channel-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  color: var(--text-muted);
}

.channel-value {
  font-weight: 600;
  color: var(--accent-primary);
}

.copy-btn {
  padding: 0.4rem 0.85rem;
  font-size: 0.82rem;
}

.social-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.social-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  transition: border-color 0.2s ease;
}

.social-row:hover {
  border-color: var(--accent-primary);
}

.social-name {
  font-weight: 600;
  font-size: 0.92rem;
}

.social-handle {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.field-input {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  padding: 0.72rem 0.95rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
  color: var(--text-primary);
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.field-input:focus {
  border-color: var(--accent-primary);
}

.submit-btn {
  align-self: flex-start;
}

.success-banner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
}

.success-banner a {
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
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

