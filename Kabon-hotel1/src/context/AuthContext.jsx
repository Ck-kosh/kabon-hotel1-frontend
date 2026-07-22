import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/user/`)
      setUser(response.data)
      setIsAuthenticated(true)
    } catch (error) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, { username, password })
      const { access, refresh } = response.data
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
      await fetchUser()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed. Please check your credentials.' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/`, userData)
      const { access, refresh } = response.data
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
      setUser(response.data.user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Registration failed.' 
      }
    }
  }

  const logout = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        await axios.post(`${API_URL}/auth/logout/`, { refresh })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      delete axios.defaults.headers.common['Authorization']
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const isAdmin = () => {
    return user?.role === 'admin' || user?.is_admin
  }

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
