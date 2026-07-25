const normalizeBaseUrl = (value) => value.trim().replace(/\/+$/, '')

export const resolveApiBaseUrl = (env = import.meta.env) => {
  const configuredBaseUrl = normalizeBaseUrl(env.VITE_API_URL || '')

  if (configuredBaseUrl) {
    return configuredBaseUrl
  }

  if (env.DEV) {
    return 'http://localhost:8000/api'
  }

  return 'https://kabon-hotel1-backend.onrender.com/api'
}

export const API_BASE_URL = resolveApiBaseUrl()

export const buildApiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}
