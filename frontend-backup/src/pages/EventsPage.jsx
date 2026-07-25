import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { protectedAPI } from '../services/api'
import { CalendarDays, Search, Loader2, Users, DollarSign, CheckCircle } from 'lucide-react'

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: events, loading, error } = useFetch(() => 
    protectedAPI.getEvents({ search: searchTerm })
  )

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title">Events & Conference</h1>
        <p className="section-subtitle">Premium venues for your meetings, conferences, and special events</p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events?.results?.map((event) => (
            <div key={event.id} className="card hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {event.facility_type_display}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mt-2">{event.name}</h3>
                  </div>
                  {event.hourly_rate && (
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary-600">${event.hourly_rate}</span>
                      <span className="text-sm text-gray-500">/hr</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-primary-600" />
                    <span>Capacity: {event.capacity} people</span>
                  </div>
                  {event.floor_plan && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary-600" />
                      <span className="truncate">{event.floor_plan}</span>
                    </div>
                  )}
                </div>

                {event.equipment && event.equipment.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Available Equipment</p>
                    <div className="flex flex-wrap gap-1.5">
                      {event.equipment.map((item, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    event.is_available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {event.is_available ? 'Available for Booking' : 'Currently Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {events?.results?.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          <CalendarDays className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No event venues found.</p>
        </div>
      )}
    </div>
  )
}

export default EventsPage
