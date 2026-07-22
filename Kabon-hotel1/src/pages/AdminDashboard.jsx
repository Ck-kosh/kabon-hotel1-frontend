import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { adminAPI } from '../services/api'
import { Link } from 'react-router-dom'
import { 
  LayoutDashboard, Users, Grid, Image, Building2, BedDouble, 
  UtensilsCrossed, CalendarDays, Phone, Home, Loader2,
  Activity, ArrowRight
} from 'lucide-react'

const AdminDashboard = () => {
  const { data: stats, loading, error } = useFetch(() => adminAPI.getDashboard())

  const statCards = [
    { label: 'Total Users', value: stats?.total_users, icon: Users, color: 'bg-blue-50 text-blue-600', link: '/admin/users' },
    { label: 'Services', value: stats?.total_services, icon: Grid, color: 'bg-green-50 text-green-600', link: '/admin/services' },
    { label: 'Gallery Images', value: stats?.total_gallery, icon: Image, color: 'bg-purple-50 text-purple-600', link: '/admin/gallery' },
    { label: 'Facilities', value: stats?.total_facilities, icon: Building2, color: 'bg-amber-50 text-amber-600', link: '/admin/facilities' },
    { label: 'Accommodations', value: stats?.total_accommodations, icon: BedDouble, color: 'bg-rose-50 text-rose-600', link: '/admin/accommodation' },
    { label: 'Restaurants', value: stats?.total_restaurants, icon: UtensilsCrossed, color: 'bg-orange-50 text-orange-600', link: '/admin/restaurant' },
    { label: 'Event Venues', value: stats?.total_event_facilities, icon: CalendarDays, color: 'bg-cyan-50 text-cyan-600', link: '/admin/events' },
    { label: 'Contact Info', value: 'Manage', icon: Phone, color: 'bg-gray-50 text-gray-600', link: '/admin/contact' },
  ]

  const quickLinks = [
    { label: 'Manage Services', icon: Grid, path: '/admin/services' },
    { label: 'Manage Gallery', icon: Image, path: '/admin/gallery' },
    { label: 'Manage Users', icon: Users, path: '/admin/users' },
    { label: 'Homepage Content', icon: Home, path: '/admin/homepage' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-7 h-7 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your hotel content and settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-600">{error}</div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className="card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{card.value ?? 0}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {link.label}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-600" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card p-6 lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>

                {stats?.recent_activities?.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recent_activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.user_name || 'System'}</span>
                            {' '}<span className="text-gray-500">{activity.action_display}</span>
                            {' '}<span className="font-medium">{activity.model_name}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(activity.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
