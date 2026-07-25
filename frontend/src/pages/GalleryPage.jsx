import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { protectedAPI } from '../services/api'
import { Image, Search, Loader2, Filter } from 'lucide-react'

const GALLERY_CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'interior', label: 'Interior' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'rooms', label: 'Rooms' },
  { value: 'dining', label: 'Dining' },
  { value: 'events', label: 'Events' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'spa', label: 'Spa & Wellness' },
  { value: 'other', label: 'Other' },
]

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const { data: gallery, loading, error } = useFetch(() => 
    protectedAPI.getGallery({ search: searchTerm, category: selectedCategory })
  )

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title">Gallery</h1>
        <p className="section-subtitle">Explore the beauty of Kabon Hotel through our gallery</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {gallery?.results?.map((item) => (
            <div key={item.id} className="card group cursor-pointer overflow-hidden">
              <div className="relative aspect-square bg-gray-200">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                {item.is_featured && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category_display}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {gallery?.results?.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          <Image className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No images found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
