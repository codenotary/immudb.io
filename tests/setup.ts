import { vi } from 'vitest'
import { config } from '@vue/test-utils'

/**
 * Global test setup for VitePress migration testing
 */

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Configure Vue Test Utils
config.global.stubs = {
  teleport: true,
  transition: false,
}

// Mock environment variables
process.env.ALGOLIA_API_KEY = 'test-api-key'
process.env.ALGOLIA_INDEX = 'test-index'
process.env.ALGOLIA_APP_ID = 'test-app-id'
