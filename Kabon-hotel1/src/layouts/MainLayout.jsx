import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Home, 
  Grid, 
  Image, 
  Building2, 
  BedDouble, 
  UtensilsCrossed, 
  CalendarDays, 
  Phone, 
  Info, 
  User, 
  LogIn, 
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react'

const MainLayout = ({ children }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const publicLinks = [
    { path: '/', label: 'Home', icon: Home },
  ]

  const protectedLinks = [
    { path: '/services', label: 'Services', icon: Grid },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/facilities', label: 'Facilities', icon: Building2 },
    { path: '/accommodation', label: 'Accommodation', icon: BedDouble },
    { path: '/restaurant', label: 'Restaurant', icon: UtensilsCrossed },
    { path: '/events', label: 'Events', icon: CalendarDays },
    { path: '/contact', label: 'Contact', icon: Phone },
    { path: '/about', label: 'About Us', icon: Info },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KH</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Kabon Hotel</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && protectedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isAdmin() && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    {user?.username}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-3 space-y-1">
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && protectedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}

              {isAdmin() && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-amber-600 hover:bg-amber-50"
                >
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KH</span>
                </div>
                <span className="text-xl font-bold text-white">Kabon Hotel</span>
              </div>
              <p className="text-sm text-gray-400">
                Experience luxury and comfort at Kabon Hotel. Your perfect getaway destination.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/accommodation" className="hover:text-white transition-colors">Accommodation</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/restaurant" className="hover:text-white transition-colors">Restaurant</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/facilities" className="hover:text-white transition-colors">Facilities</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">info@kabonhotel.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2026 Kabon Hotel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
