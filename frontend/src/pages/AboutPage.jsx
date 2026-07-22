import React from 'react'
import { Award, Users, Globe, Heart, Star, TrendingUp } from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { icon: Star, value: '4.9', label: 'Guest Rating' },
    { icon: Users, value: '50K+', label: 'Happy Guests' },
    { icon: Globe, value: '25+', label: 'Years of Excellence' },
    { icon: Award, value: '15', label: 'Industry Awards' },
  ]

  const values = [
    { icon: Heart, title: 'Guest First', desc: 'Every decision we make starts with our guests in mind.' },
    { icon: Award, title: 'Excellence', desc: 'We strive for perfection in every aspect of our service.' },
    { icon: TrendingUp, title: 'Innovation', desc: 'Constantly evolving to exceed modern hospitality standards.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Kabon Hotel</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A legacy of luxury, comfort, and exceptional hospitality since 2001.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in 2001, Kabon Hotel has grown from a boutique establishment to one of the 
              most prestigious hotels in the region. Our commitment to excellence and personalized 
              service has earned us numerous accolades and a loyal clientele from around the world.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With over 200 luxurious rooms and suites, world-class dining options, state-of-the-art 
              conference facilities, and a dedicated team of hospitality professionals, we continue 
              to set new standards in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
