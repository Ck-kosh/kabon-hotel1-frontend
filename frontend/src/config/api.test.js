import { describe, expect, it } from 'vitest'
import { resolveApiBaseUrl } from './api'

describe('resolveApiBaseUrl', () => {
  it('uses the configured VITE_API_URL when present', () => {
    const env = { DEV: false, VITE_API_URL: 'https://example.com/api' }

    expect(resolveApiBaseUrl(env)).toBe('https://example.com/api')
  })

  it('falls back to localhost during development', () => {
    const env = { DEV: true, VITE_API_URL: '' }

    expect(resolveApiBaseUrl(env)).toBe('http://localhost:8000/api')
  })

  it('falls back to the deployed backend URL in production', () => {
    const env = { DEV: false, VITE_API_URL: '' }

    expect(resolveApiBaseUrl(env)).toBe('https://kabon-hotel1-backend.onrender.com/api')
  })
})
