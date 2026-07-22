import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { publicAPI } from '../services/api'
import { Phone, Mail, MapPin, Globe, Clock, Loader2 } from 'lucide-react'

const ContactPage = () => {
  const { data: contacts, loading, error } = useFetch(() => publicAPI.getContactInfo())
  const contact = contacts?.[0]

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">Get in touch with us for inquiries, reservations, or feedback</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-600">{error}</div>
      ) : contact ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{contact.hotel_name}</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600 text-sm mt-1">{contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600 text-sm mt-1">{contact.phone}</p>
                  {contact.emergency_contact && (
                    <p className="text-red-600 text-sm mt-1">
                      Emergency: {contact.emergency_contact}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600 text-sm mt-1">{contact.email}</p>
                </div>
              </div>

              {contact.website && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Website</h3>
                    <a href={contact.website} target="_blank" rel="noopener noreferrer"
                      className="text-primary-600 text-sm mt-1 hover:underline">
                      {contact.website}
                    </a>
                  </div>
                </div>
              )}

              {contact.business_hours && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Business Hours</h3>
                    <div className="text-gray-600 text-sm mt-1 space-y-1">
                      {Object.entries(contact.business_hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between max-w-xs">
                          <span className="capitalize">{day}:</span>
                          <span>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Social Media */}
            {contact.social_media && Object.keys(contact.social_media).length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {Object.entries(contact.social_media).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <span className="text-sm font-medium capitalize">{platform[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map Placeholder */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
            <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Map integration placeholder</p>
                <p className="text-sm mt-1">Coordinates: {contact.latitude}, {contact.longitude}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <Phone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Contact information not available.</p>
        </div>
      )}
    </div>
  )
}

export default ContactPage
