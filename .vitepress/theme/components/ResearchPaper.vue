<template>
  <div class="research-paper-modal" v-if="modelValue" @click.self="onClose">
    <div class="modal-content">
      <button class="close-button" @click="onClose" aria-label="Close">×</button>

      <h2>Download Research Paper</h2>

      <div v-if="sent" class="alert alert-success">
        <span class="icon">✓</span>
        <p>Email sent successfully!</p>
      </div>

      <div v-if="error" class="alert alert-error">
        <span class="icon">✕</span>
        <p>Something went wrong. Please try again later!</p>
      </div>

      <p class="description">
        We'll send you the research paper via email.
      </p>

      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            :disabled="sending"
          />
          <span v-if="emailError" class="error-text">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <div ref="recaptchaContainer"></div>
        </div>

        <div class="form-group">
          <button type="submit" :disabled="!verified || sending" class="submit-button">
            {{ sending ? 'Sending..' : 'Send me the document' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { API_URL } from '../util/api'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const verified = ref(false)
const sending = ref(false)
const error = ref(false)
const sent = ref(false)
const email = ref('')
const emailError = ref('')
const recaptchaContainer = ref<HTMLElement | null>(null)
const sitekey = '6LeHGL4ZAAAAALlN7PGMzqnNBM6GVwhlJ-ZeiCV8'

let recaptchaWidgetId: number | null = null

const validateEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

const onVerify = (response: string) => {
  if (response) {
    verified.value = true
  }
}

const loadRecaptcha = async () => {
  if (typeof window === 'undefined' || !window.grecaptcha) return

  await nextTick()

  if (recaptchaContainer.value && window.grecaptcha.render) {
    try {
      recaptchaWidgetId = window.grecaptcha.render(recaptchaContainer.value, {
        sitekey,
        callback: onVerify
      })
    } catch (e) {
      console.error('Recaptcha render error:', e)
    }
  }
}

const onSubmit = async () => {
  if (!verified.value) {
    return
  }

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  emailError.value = ''
  sending.value = true

  const data = {
    email: email.value
  }

  try {
    await axios.post(`${API_URL}/research-paper`, data, {
      withCredentials: true
    })

    sent.value = true
  } catch (err) {
    error.value = true
  } finally {
    sending.value = false
    verified.value = false

    setTimeout(() => {
      sent.value = false
      error.value = false
      emit('update:modelValue', false)
    }, 3000)
  }
}

const onClose = () => {
  emit('update:modelValue', false)
}

watch(() => props.modelValue, async (newVal) => {
  if (newVal && typeof window !== 'undefined') {
    // Load recaptcha script if not already loaded
    if (!window.grecaptcha) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
      script.async = true
      script.defer = true
      window.onRecaptchaLoad = () => {
        loadRecaptcha()
      }
      document.head.appendChild(script)
    } else {
      loadRecaptcha()
    }
  }
})

onMounted(() => {
  if (props.modelValue) {
    loadRecaptcha()
  }
})

// TypeScript declaration for grecaptcha
declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoad: () => void
  }
}
</script>

<style lang="scss" scoped>
.research-paper-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
}

h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.description {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #666;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  &.alert-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .icon {
    font-weight: bold;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
  }
}

.form-group {
  margin-bottom: 1rem;
}

input[type="email"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
}

.error-text {
  color: #721c24;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
}
</style>
