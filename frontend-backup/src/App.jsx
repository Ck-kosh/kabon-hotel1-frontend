import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'



import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ServicesPage from './pages/ServicesPage'
import GalleryPage from './pages/GalleryPage'
import FacilitiesPage from './pages/FacilitiesPage'
import AccommodationPage from './pages/AccommodationPage'
import RestaurantPage from './pages/RestaurantPage'
import EventsPage from './pages/EventsPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import ProfilePage from './pages/ProfilePage'
import AdminDashboard from './pages/AdminDashboard'
import NotFoundPage from './pages/NotFoundPage'

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" />
  </div>
)

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: window.location.pathname } }} replace />
  }
  return children
}



const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin()) return <Navigate to="/" replace />

  return children
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
      <Route path="/register" element={<MainLayout><RegisterPage /></MainLayout>} />

      <Route path="/services" element={<MainLayout><ProtectedRoute><ServicesPage /></ProtectedRoute></MainLayout>} />
      <Route path="/gallery" element={<MainLayout><ProtectedRoute><GalleryPage /></ProtectedRoute></MainLayout>} />
      <Route path="/facilities" element={<MainLayout><ProtectedRoute><FacilitiesPage /></ProtectedRoute></MainLayout>} />
      <Route path="/accommodation" element={<MainLayout><ProtectedRoute><AccommodationPage /></ProtectedRoute></MainLayout>} />
      <Route path="/restaurant" element={<MainLayout><ProtectedRoute><RestaurantPage /></ProtectedRoute></MainLayout>} />
      <Route path="/events" element={<MainLayout><ProtectedRoute><EventsPage /></ProtectedRoute></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ProtectedRoute><ContactPage /></ProtectedRoute></MainLayout>} />
      <Route path="/about" element={<MainLayout><ProtectedRoute><AboutPage /></ProtectedRoute></MainLayout>} />
      <Route path="/profile" element={<MainLayout><ProtectedRoute><ProfilePage /></ProtectedRoute></MainLayout>} />

      <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
    </Routes>
  )
}

export default App
