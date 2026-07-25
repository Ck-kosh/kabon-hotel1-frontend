import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  ChevronRight, 
  Star, 
  Wifi, 
  Coffee, 
  Car, 
  Dumbbell, 
  Waves,
  ArrowRight
} from 'lucide-react'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    { icon: Wifi, title: 'Free Wi-Fi', desc: 'High-speed internet throughout the property' },
    { icon: Coffee, title: '24/7 Dining', desc: 'Round-the-clock room service and dining' },
    { icon: Car, title: 'Free Parking', desc: 'Complimentary valet parking service' },
    { icon: Dumbbell, title: 'Fitness Center', desc: 'State-of-the-art gym equipment' },
    { icon: Waves, title: 'Swimming Pool', desc: 'Indoor and outdoor pools' },
    { icon: Star, title: '5-Star Service', desc: 'Award-winning hospitality' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-primary-400">Kabon Hotel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Experience unparalleled luxury and comfort in the heart of the city. 
              Our world-class amenities and exceptional service ensure an unforgettable stay.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/services" className="btn-primary inline-flex items-center gap-2">
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/login" className="btn-secondary inline-flex items-center gap-2">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
      </section>

      {/* Welcome Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Your Perfect Getaway Awaits</h2>
            <p className="section-subtitle">
              Discover a world of elegance and sophistication at Kabon Hotel, 
              where every detail is crafted for your comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Kabon Hotel?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Register now to explore our full range of services, accommodations, 
            dining options, and more.
          </p>
          {!isAuthenticated && (
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Create an Account
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
