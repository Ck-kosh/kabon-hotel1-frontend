import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { protectedAPI } from '../services/api'
import { BedDouble, Search, Loader2, Users, Maximize, Star } from 'lucide-react'

const AccommodationPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: accommodations, loading, error } = useFetch(() => 
    protectedAPI.getAccommodations({ search: searchTerm })
  )

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title">Accommodation</h1>
        <p className="section-subtitle">Luxurious rooms and suites tailored to your needs</p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search rooms..."
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
          {accommodations?.results?.map((room) => (
            <div key={room.id} className="card hover:shadow-lg transition-shadow">
              <div className="relative h-56 bg-gray-200 overflow-hidden">
                {room.images?.[0]?.image_url ? (
                  <img 
                    src={room.images[0].image_url} 
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BedDouble className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                {room.featured && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                  <span className="text-sm text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
                    {room.room_type_display}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Up to {room.max_guests} guests</span>
                  </div>
                  {room.room_size && (
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{room.room_size}</span>
                    </div>
                  )}
                </div>

                {room.amenities && room.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{room.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">${room.price_per_night}</span>
                    <span className="text-sm text-gray-500"> / night</span>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    room.is_available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {room.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {accommodations?.results?.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          <BedDouble className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No accommodations found.</p>
        </div>
      )}
    </div>
  )
}

export default AccommodationPage
