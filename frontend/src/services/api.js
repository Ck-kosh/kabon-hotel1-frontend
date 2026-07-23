import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
//const API_URL = 'https://kabon-hotel1-backend.onrender.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refresh = localStorage.getItem('refresh_token')
        const response = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh })
        const { access } = response.data
        localStorage.setItem('access_token', access)
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`
        originalRequest.headers.Authorization = `Bearer ${access}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default api

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (data) => api.post('/auth/register/', data),
  logout: (refresh) => api.post('/auth/logout/', { refresh }),
  getUser: () => api.get('/auth/user/'),
  updateProfile: (data) => api.put('/auth/profile/', data),
}

// Public API
export const publicAPI = {
  getHomeContent: () => api.get('/home/'),
  getContactInfo: () => api.get('/contact/'),
}

// Protected API
export const protectedAPI = {
  getCategories: () => api.get('/categories/'),
  getServices: (params) => api.get('/services/', { params }),
  getService: (id) => api.get(`/services/${id}/`),
  getGallery: (params) => api.get('/gallery/', { params }),
  getGalleryItem: (id) => api.get(`/gallery/${id}/`),
  getFacilities: (params) => api.get('/facilities/', { params }),
  getFacility: (id) => api.get(`/facilities/${id}/`),
  getAccommodations: (params) => api.get('/accommodation/', { params }),
  getAccommodation: (id) => api.get(`/accommodation/${id}/`),
  getRestaurants: (params) => api.get('/restaurant/', { params }),
  getRestaurant: (id) => api.get(`/restaurant/${id}/`),
  getEvents: (params) => api.get('/events/', { params }),
  getEvent: (id) => api.get(`/events/${id}/`),
}

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard/'),
  getUsers: (params) => api.get('/admin/users/', { params }),
  getUser: (id) => api.get(`/admin/users/${id}/`),
  updateUser: (id, data) => api.put(`/admin/users/${id}/`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}/`),

  getCategories: () => api.get('/admin/categories/'),
  createCategory: (data) => api.post('/admin/categories/', data),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}/`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}/`),

  getServices: () => api.get('/admin/services/'),
  createService: (data) => api.post('/admin/services/', data),
  updateService: (id, data) => api.put(`/admin/services/${id}/`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}/`),

  getGallery: () => api.get('/admin/gallery/'),
  createGallery: (data) => api.post('/admin/gallery/', data),
  updateGallery: (id, data) => api.put(`/admin/gallery/${id}/`, data),
  deleteGallery: (id) => api.delete(`/admin/gallery/${id}/`),

  getFacilities: () => api.get('/admin/facilities/'),
  createFacility: (data) => api.post('/admin/facilities/', data),
  updateFacility: (id, data) => api.put(`/admin/facilities/${id}/`, data),
  deleteFacility: (id) => api.delete(`/admin/facilities/${id}/`),

  getAccommodations: () => api.get('/admin/accommodation/'),
  createAccommodation: (data) => api.post('/admin/accommodation/', data),
  updateAccommodation: (id, data) => api.put(`/admin/accommodation/${id}/`, data),
  deleteAccommodation: (id) => api.delete(`/admin/accommodation/${id}/`),

  getRestaurants: () => api.get('/admin/restaurant/'),
  createRestaurant: (data) => api.post('/admin/restaurant/', data),
  updateRestaurant: (id, data) => api.put(`/admin/restaurant/${id}/`, data),
  deleteRestaurant: (id) => api.delete(`/admin/restaurant/${id}/`),

  getEvents: () => api.get('/admin/events/'),
  createEvent: (data) => api.post('/admin/events/', data),
  updateEvent: (id, data) => api.put(`/admin/events/${id}/`, data),
  deleteEvent: (id) => api.delete(`/admin/events/${id}/`),

  getContact: () => api.get('/admin/contact/'),
  createContact: (data) => api.post('/admin/contact/', data),
  updateContact: (id, data) => api.put(`/admin/contact/${id}/`, data),

  getHomepage: () => api.get('/admin/homepage/'),
  createHomepage: (data) => api.post('/admin/homepage/', data),
  updateHomepage: (id, data) => api.put(`/admin/homepage/${id}/`, data),
  deleteHomepage: (id) => api.delete(`/admin/homepage/${id}/`),

  getActivityLogs: (params) => api.get('/admin/activity-logs/', { params }),
}
