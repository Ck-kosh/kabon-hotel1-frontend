import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { protectedAPI } from '../services/api'
import { Building2, Search, Loader2, Clock, MapPin } from 'lucide-react'

const FacilitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: facilities, loading, error } = useFetch(() => 
    protectedAPI.getFacilities({ search: searchTerm })
  )

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title">Hotel Facilities</h1>
        <p className="section-subtitle">World-class amenities designed for your comfort and enjoyment</p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search facilities..."
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities?.results?.map((facility) => (
            <div key={facility.id} className="card hover:shadow-lg transition-shadow">
              {facility.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{facility.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{facility.description}</p>

                <div className="space-y-2">
                  {facility.opening_hours && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{facility.opening_hours}</span>
                    </div>
                  )}
                  {facility.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    facility.is_available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {facility.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {facilities?.results?.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No facilities found.</p>
        </div>
      )}
    </div>
  )
}

export default FacilitiesPage
