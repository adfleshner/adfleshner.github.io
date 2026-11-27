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
  <div>
    <header class="container page-head">
      <p class="label">Contact</p>
      <h1>Email is the <em>quickest</em> way to reach me.</h1>
      <p class="lede">
        Android roles, SDK questions, a project that needs a lead, or a note about something on this site. I read
        everything that lands in my inbox.
      </p>
    </header>

    <section class="container contact ruled-top">
      <div class="direct">
        <p class="label">Direct</p>
        <a :href="`mailto:${profile.email}`" class="direct-mail">{{ profile.email }}</a>
        <button type="button" class="arrow-link copy" @click="copyEmail">
          {{ copiedEmail ? 'Copied' : 'Copy address' }}
        </button>

        <ul class="direct-list">
          <li v-for="social in profile.socials" :key="social.url">
            <span class="label">{{ social.label }}</span>
            <a :href="social.url" class="link" target="_blank" rel="noopener noreferrer">
              {{ social.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') }}
            </a>
          </li>
          <li>
            <span class="label">Based in</span>
            <span>{{ profile.location }}</span>
          </li>
        </ul>
      </div>

      <div class="form-wrap">
        <p class="label">Or leave a message</p>

        <div v-if="submitted" class="sent" role="status">
          <p class="sent-title">Thanks, it’s on its way.</p>
          <p class="muted">I’ll reply to the address you gave. If your mail app opened instead, just hit send there.</p>
          <button type="button" class="btn btn-quiet" @click="resetForm">Write another</button>
        </div>

        <form v-else class="form" @submit.prevent="handleSubmit">
          <div class="field-row">
            <label class="field">
              <span class="field-label">Name</span>
              <input v-model="form.name" type="text" name="name" autocomplete="name" required />
            </label>
            <label class="field">
              <span class="field-label">Email</span>
              <input v-model="form.email" type="email" name="email" autocomplete="email" required />
            </label>
          </div>

          <label class="field">
            <span class="field-label">Subject</span>
            <input v-model="form.subject" type="text" name="subject" required />
          </label>

          <label class="field">
            <span class="field-label">Message</span>
            <textarea v-model="form.message" name="message" rows="6" required />
          </label>

          <!-- Honeypot: hidden from people, bots fill it in -->
          <div class="honeypot" aria-hidden="true">
            <label>
              Company website
              <input v-model="form.companyWebsite" type="text" name="company_website" tabindex="-1" autocomplete="off" />
            </label>
          </div>

          <div>
            <button type="submit" class="btn" :disabled="isSending">
              {{ isSending ? 'Sending…' : 'Send message' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  padding-top: 32px;
}

@media (min-width: 960px) {
  .contact {
    grid-template-columns: 5fr 1fr 6fr;
  }

  .form-wrap {
    grid-column: 3;
  }
}

.direct {
  display: grid;
  justify-items: start;
  align-content: start;
  gap: 14px;
}

.direct-mail {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.4vw, 2.5rem);
  line-height: 1.1;
  letter-spacing: -0.015em;
  color: var(--accent);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.14em;
  overflow-wrap: anywhere;
}

.copy {
  padding: 4px 0;
  border: 0;
  background: none;
  cursor: pointer;
  color: var(--ink-2);
}

.direct-list {
  width: 100%;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--rule);
}

.direct-list li {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 12px;
  align-items: baseline;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);
  font-size: 15.5px;
  overflow-wrap: anywhere;
}

.form {
  display: grid;
  gap: 28px;
  margin-top: 20px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
}

@media (min-width: 640px) {
  .field-row {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: grid;
  gap: 6px;
}

.field-label {
  font-size: 14px;
  color: var(--ink-2);
}

.field input,
.field textarea {
  width: 100%;
  padding: 8px 0;
  border: 0;
  border-bottom: 1px solid var(--rule-strong);
  border-radius: 0;
  background: transparent;
  font-family: var(--font-body);
  font-size: 17px;
  color: var(--ink);
  transition: border-color var(--dur) var(--ease);
}

.field textarea {
  resize: vertical;
  min-height: 140px;
  line-height: 1.5;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-bottom-color: var(--accent);
  box-shadow: 0 1px 0 var(--accent);
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.sent {
  display: grid;
  justify-items: start;
  gap: 14px;
  margin-top: 20px;
  padding: 28px 0;
  border-top: 1px solid var(--accent);
}

.sent-title {
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1.1;
}
</style>
