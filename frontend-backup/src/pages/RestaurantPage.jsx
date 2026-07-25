import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { protectedAPI } from '../services/api'
import { UtensilsCrossed, Search, Loader2, Clock, Users } from 'lucide-react'

const RestaurantPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: restaurants, loading, error } = useFetch(() => 
    protectedAPI.getRestaurants({ search: searchTerm })
  )

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title">Restaurant & Dining</h1>
        <p className="section-subtitle">Savor exquisite culinary experiences at our dining venues</p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search dining options..."
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurants?.results?.map((restaurant) => (
            <div key={restaurant.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto bg-gray-200">
                  {restaurant.image ? (
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UtensilsCrossed className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {restaurant.dining_type_display}
                    </span>
                    {restaurant.cuisine && (
                      <span className="text-xs text-gray-500">{restaurant.cuisine}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{restaurant.description}</p>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.opening_hours}</span>
                    </div>
                    {restaurant.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Capacity: {restaurant.capacity} guests</span>
                      </div>
                    )}
                    {restaurant.dress_code && (
                      <div className="text-gray-500">
                        Dress Code: {restaurant.dress_code}
                      </div>
                    )}
                  </div>

                  {restaurant.menu_highlights && restaurant.menu_highlights.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-700 mb-2">Menu Highlights</p>
                      <div className="flex flex-wrap gap-1.5">
                        {restaurant.menu_highlights.map((item, idx) => (
                          <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {restaurants?.results?.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No dining options found.</p>
        </div>
      )}
    </div>
  )
}

export default RestaurantPage
