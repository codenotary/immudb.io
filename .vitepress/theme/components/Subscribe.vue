<template>
  <div class="subscribe-modal" v-if="modelValue" @click.self="onClose">
    <div class="modal-content">
      <button class="close-button" @click="onClose" aria-label="Close">×</button>

      <h2>Sign up for beta of Cloud Ledger DB</h2>
      <p class="description">
        Be the first to know when our Cloud Ledger DB service is released and get exclusive subscriber content.
      </p>

      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <input
            v-model="contactName"
            type="text"
            placeholder="Enter your name"
            required
            :disabled="submitting"
          />
          <span v-if="nameError" class="error-text">{{ nameError }}</span>
        </div>

        <div class="form-group">
          <input
            v-model="contactEmail"
            type="email"
            placeholder="Enter your email"
            required
            :disabled="submitting"
          />
          <span v-if="emailError" class="error-text">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <button type="submit" :disabled="submitting" class="submit-button">
            {{ submitting ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { API_URL } from '../util/api'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const contactName = ref('')
const contactEmail = ref('')
const nameError = ref('')
const emailError = ref('')
const submitting = ref(false)

const validateEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

const validateName = (value: string): boolean => {
  return value.trim().length > 0
}

const onSubmit = async () => {
  // Reset errors
  nameError.value = ''
  emailError.value = ''

  // Validate
  if (!validateName(contactName.value)) {
    nameError.value = 'Name is required'
    return
  }

  if (!validateEmail(contactEmail.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  submitting.value = true

  const names = contactName.value.split(' ')
  const firstName = names[0]
  const lastName = names.slice(1).join(' ') || ''

  const data = {
    contact: {
      email: contactEmail.value,
      firstName,
      lastName
    }
  }

  try {
    await axios.post(`${API_URL}/subscribe`, data)

    // Success - close modal
    emit('update:modelValue', false)

    // Reset form
    contactName.value = ''
    contactEmail.value = ''
  } catch (err) {
    emailError.value = 'Failed to subscribe. Please try again later.'
  } finally {
    submitting.value = false
  }
}

const onClose = () => {
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.subscribe-modal {
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

.form-group {
  margin-bottom: 1rem;
}

input {
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
