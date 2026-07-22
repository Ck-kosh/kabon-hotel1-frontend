import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { protectedAPI } from '../services/api'
import { Grid, Search, Loader2, Tag } from 'lucide-react'

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const { data: categories } = useFetch(() => protectedAPI.getCategories(), [])
  const { data: services, loading, error } = useFetch(
    () => protectedAPI.getServices({ search: searchTerm, category: selectedCategory }),
    [searchTerm, selectedCategory]
  )

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title">Our Services</h1>
        <p className="section-subtitle">Discover the exceptional services we offer at Kabon Hotel</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field sm:w-64"
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services?.results ?? (Array.isArray(services) ? services : []))?.map((service) => (
            <div key={service.id} className="card hover:shadow-lg transition-shadow">
              {service.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-primary-600 font-medium">{service.category_name}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                <div className="flex items-center justify-between">
                  {service.price && (
                    <span className="text-lg font-bold text-primary-600">${service.price}</span>
                  )}
                  {service.duration && (
                    <span className="text-sm text-gray-500">{service.duration}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(services?.results ?? (Array.isArray(services) ? services : []))?.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          <Grid className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No services found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ServicesPage
