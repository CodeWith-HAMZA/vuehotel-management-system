<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse space-y-8">
        <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        <div class="h-32 bg-gray-200 rounded-2xl"></div>
        <div class="h-64 bg-gray-200 rounded-2xl"></div>
        <div class="h-32 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center py-12">
        <div class="text-6xl mb-4">❌</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Booking Not Found</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <NuxtLink 
          to="/bookings"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to My Bookings
        </NuxtLink>
      </div>
    </div>

    <!-- Booking Details -->
    <div v-else-if="booking" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">Home</NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <NuxtLink to="/bookings" class="text-gray-700 hover:text-blue-600">My Bookings</NuxtLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-500">Booking #{{ booking.id.slice(0, 8) }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Property Summary -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center space-x-4">
              <img 
                :src="booking.propertyImage" 
                :alt="booking.propertyName"
                class="w-20 h-20 object-cover rounded-lg"
              >
              <div>
                <h2 class="text-xl font-semibold text-gray-900">{{ booking.propertyName }}</h2>
                <p class="text-gray-600">
                  📍 {{ formatLocation(booking.property.city, booking.property.state, booking.property.country) }}
                </p>
                <div class="flex items-center space-x-2 mt-1">
                  <div class="flex text-yellow-400">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  </div>
                  <span class="text-gray-600 text-sm">4.9 (128 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Details -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Booking Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-gray-900 mb-3">Stay Information</h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Check-in:</span>
                    <span class="font-medium">{{ formatDate(booking.checkIn) }}</span>
              </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Check-out:</span>
                    <span class="font-medium">{{ formatDate(booking.checkOut) }}</span>
              </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Total nights:</span>
                    <span class="font-medium">{{ calculateNights(booking.checkIn, booking.checkOut) }}</span>
            </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Guests:</span>
                    <span class="font-medium">{{ booking.guests }} guest(s)</span>
              </div>
            </div>
          </div>

                    <div>
                <h4 class="font-medium text-gray-900 mb-3">Booking Information</h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Booking ID:</span>
                    <span class="font-mono text-sm">{{ booking.id }}</span>
                      </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Booked on:</span>
                    <span class="font-medium">{{ formatDate(booking.created_at) }}</span>
                    </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Status:</span>
                    <span :class="getStatusClass(booking.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ formatStatus(booking.status) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Last updated:</span>
                    <span class="font-medium">{{ formatDate(booking.updated_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Guest Information -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Guest Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  :value="userProfile?.first_name || ''" 
                  disabled
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  :value="userProfile?.last_name || ''" 
                  disabled
                  class="w-full px-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  :value="userProfile?.email || ''" 
                  disabled
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  :value="userProfile?.phone || 'Not provided'" 
                  disabled
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                >
              </div>
            </div>
          </div>

          <!-- Notes and Messages -->
          <div v-if="booking.guest_notes || booking.owner_notes" class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Notes & Messages</h3>
            <div class="space-y-4">
              <div v-if="booking.guest_notes">
                <h4 class="font-medium text-gray-900 mb-2">Your Notes</h4>
                <p class="text-gray-700 bg-gray-50 p-3 rounded-lg">{{ booking.guest_notes }}</p>
              </div>
              <div v-if="booking.owner_notes">
                <h4 class="font-medium text-gray-900 mb-2">Host Message</h4>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">{{ booking.owner_notes }}</p>
              </div>
            </div>
          </div>

          <!-- Property Amenities -->
          <div v-if="booking.property.amenities && booking.property.amenities.length > 0" class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Property Amenities</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="amenity in booking.property.amenities" 
                :key="amenity"
                class="flex items-center space-x-3"
              >
                <span class="text-2xl">{{ getAmenityIcon(amenity) }}</span>
                <span class="text-gray-700">{{ formatAmenity(amenity) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8 space-y-6">
            <!-- Price Breakdown -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h3 class="text-lg font-semibold mb-4">Price Breakdown</h3>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Room rate</span>
                  <span>${{ booking.property.price_per_night }} × {{ calculateNights(booking.checkIn, booking.checkOut) }} nights</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subtotal</span>
                  <span>${{ calculateSubtotal() }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Service fee</span>
                  <span>${{ calculateServiceFee() }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Taxes</span>
                  <span>${{ calculateTaxes() }}</span>
                </div>
                <div class="border-t border-gray-200 pt-2">
                  <div class="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${{ booking.total }}</span>
                  </div>
                </div>
              </div>

              <!-- Status Actions -->
              <div class="space-y-3">
                <button 
                  v-if="booking.status === 'pending'"
                  @click="cancelBooking"
                  class="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel Booking
                </button>
                
                <button 
                  v-if="booking.status === 'confirmed' && isUpcoming(booking.checkIn)"
                  @click="modifyBooking"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Modify Booking
              </button>

                <button 
                  v-if="booking.status === 'confirmed' && isUpcoming(booking.checkIn)"
                  @click="contactHost"
                  class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Host
                </button>

                <button 
                  v-if="booking.status === 'confirmed'"
                  @click="downloadPDF"
                  class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Download Booking Report</span>
                </button>
              </div>
              </div>

              <!-- Cancellation Policy -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h4 class="font-medium text-gray-900 mb-2">Cancellation Policy</h4>
                <p class="text-sm text-gray-600">
                  Free cancellation up to 24 hours before check-in. 
                  No refunds for cancellations made within 24 hours of arrival.
                </p>
              </div>

            <!-- Help & Support -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h4 class="font-medium text-gray-900 mb-2">Need Help?</h4>
              <p class="text-sm text-gray-600 mb-3">
                Questions about your booking? We're here to help!
              </p>
              <button @click="showHelpModal = true" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Modal -->
    <div v-if="showHelpModal" class="fixed inset-0 z-50 overflow-y-auto" @click.self="showHelpModal = false">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="showHelpModal = false"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900">Need Help?</h3>
              <button @click="showHelpModal = false" class="text-gray-400 hover:text-gray-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">We're here to help!</h4>
                <p class="text-gray-600 mb-4">
                  If you have any questions, concerns, or need assistance with your bookings, our support team is ready to help you.
                </p>
              </div>

              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-start space-x-3">
                  <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-blue-900 mb-1">Contact Support</p>
                    <a href="mailto:zohaibahmed@gmail.com" class="text-blue-600 hover:text-blue-700 font-semibold text-lg break-all">
                      zohaibahmed@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <h5 class="font-semibold text-gray-900">Common Questions:</h5>
                <div class="space-y-2 text-sm text-gray-600">
                  <div class="flex items-start space-x-2">
                    <span class="text-blue-600 mt-1">•</span>
                    <span>How do I modify or cancel my booking?</span>
                  </div>
                  <div class="flex items-start space-x-2">
                    <span class="text-blue-600 mt-1">•</span>
                    <span>What is the cancellation policy?</span>
                  </div>
                  <div class="flex items-start space-x-2">
                    <span class="text-blue-600 mt-1">•</span>
                    <span>How do I contact the property owner?</span>
                  </div>
                  <div class="flex items-start space-x-2">
                    <span class="text-blue-600 mt-1">•</span>
                    <span>What payment methods are accepted?</span>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600">
                  <strong>Response Time:</strong> Our support team typically responds within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="showHelpModal = false" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
            <a 
              href="mailto:zohaibahmed@gmail.com"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const client = useSupabaseClient()

// State
const booking = ref(null)
const userProfile = ref(null)
const loading = ref(true)
const error = ref(null)
const showHelpModal = ref(false)

// Computed
const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const diffTime = checkOutDate - checkInDate
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const calculateSubtotal = () => {
  if (!booking.value?.property?.price_per_night) return 0
  return booking.value.property.price_per_night * calculateNights(booking.value.checkIn, booking.value.checkOut)
}

const calculateServiceFee = () => {
  return Math.round(calculateSubtotal() * 0.05) // 5% service fee
}

const calculateTaxes = () => {
  return Math.round(calculateSubtotal() * 0.08) // 8% tax
}

const isUpcoming = (checkIn) => {
  if (!checkIn) return false
  return new Date(checkIn) > new Date()
}

// Methods
const formatLocation = (city, state, country) => {
  const parts = [city, state, country].filter(Boolean)
  return parts.join(', ')
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatStatus = (status) => {
  const statusMap = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'completed': 'Completed',
    'cancelled': 'Cancelled'
  }
  return statusMap[status] || status
}

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatAmenity = (amenity) => {
  const amenityMap = {
    'swimming_pool': 'Swimming Pool',
    'free_parking': 'Free Parking',
    'free_wifi': 'Free WiFi',
    'kitchen': 'Kitchen',
    'gym': 'Gym',
    'service_24_7': '24/7 Service',
    'beach_access': 'Beach Access',
    'spa': 'Spa',
    'pet_friendly': 'Pet Friendly'
  }
  return amenityMap[amenity] || amenity
}

const getAmenityIcon = (amenity) => {
  const iconMap = {
    'swimming_pool': '🏊‍♂️',
    'free_parking': '🚗',
    'free_wifi': '📶',
    'kitchen': '🍳',
    'gym': '🏋️‍♂️',
    'service_24_7': '🕐',
    'beach_access': '🏖️',
    'spa': '🧖‍♀️',
    'pet_friendly': '🐾'
  }
  return iconMap[amenity] || '✨'
}

const cancelBooking = async () => {
  if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', route.params.id)
    
    if (error) throw error
    
    // Refresh booking data
    await fetchBooking()
    
    // Show success message
    alert('Booking cancelled successfully!')
    
  } catch (error) {
    console.error('Error cancelling booking:', error)
    alert('Failed to cancel booking. Please try again.')
  }
}

const modifyBooking = () => {
  // Navigate to booking modification page
  navigateTo(`/booking/${route.params.id}/modify`)
}

const contactHost = () => {
  // Implement host contact functionality
  alert('Contact host functionality coming soon!')
}

const downloadPDF = async () => {
  if (!booking.value) return
  
  try {
    // Dynamically import jsPDF
    const { jsPDF } = await import('jspdf')
    
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20
    
    // Helper function to add text with wrapping
    const addText = (text, x, y, options = {}) => {
      const { fontSize = 10, fontStyle = 'normal', color = [0, 0, 0], align = 'left' } = options
      doc.setFontSize(fontSize)
      doc.setFont('helvetica', fontStyle)
      doc.setTextColor(color[0], color[1], color[2])
      
      const maxWidth = pageWidth - x - 20
      const lines = doc.splitTextToSize(text, maxWidth)
      doc.text(lines, x, y, { align })
      return y + (lines.length * fontSize * 0.4) + 5
    }
    
    // Header
    doc.setFillColor(59, 130, 246) // Blue color
    doc.rect(0, 0, pageWidth, 40, 'F')
    
    addText('Explore & Go', 20, 25, { fontSize: 24, fontStyle: 'bold', color: [255, 255, 255] })
    addText('Booking Confirmation Report', 20, 35, { fontSize: 12, color: [255, 255, 255] })
    
    yPosition = 50
    
    // Booking ID and Status
    addText(`Booking ID: ${booking.value.id}`, 20, yPosition, { fontSize: 10, fontStyle: 'bold' })
    yPosition += 10
    addText(`Status: ${formatStatus(booking.value.status)}`, 20, yPosition, { fontSize: 10, fontStyle: 'bold', color: [34, 197, 94] })
    yPosition += 15
    
    // Property Information Section
    doc.setDrawColor(200, 200, 200)
    doc.line(20, yPosition, pageWidth - 20, yPosition)
    yPosition += 10
    
    addText('PROPERTY INFORMATION', 20, yPosition, { fontSize: 14, fontStyle: 'bold' })
    yPosition += 10
    addText(booking.value.propertyName, 20, yPosition, { fontSize: 12, fontStyle: 'bold' })
    yPosition += 8
    addText(`Location: ${formatLocation(booking.value.property.city, booking.value.property.state, booking.value.property.country)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 8
    addText(`Rating: 4.9/5 (128 reviews)`, 20, yPosition, { fontSize: 10 })
    yPosition += 15
    
    // Stay Information Section
    doc.line(20, yPosition, pageWidth - 20, yPosition)
    yPosition += 10
    
    addText('STAY INFORMATION', 20, yPosition, { fontSize: 14, fontStyle: 'bold' })
    yPosition += 10
    addText(`Check-in: ${formatDate(booking.value.checkIn)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 8
    addText(`Check-out: ${formatDate(booking.value.checkOut)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 8
    addText(`Total Nights: ${calculateNights(booking.value.checkIn, booking.value.checkOut)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 8
    addText(`Guests: ${booking.value.guests} guest(s)`, 20, yPosition, { fontSize: 10 })
    yPosition += 15
    
    // Guest Information Section
    if (userProfile.value) {
      doc.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 10
      
      addText('GUEST INFORMATION', 20, yPosition, { fontSize: 14, fontStyle: 'bold' })
      yPosition += 10
      addText(`Name: ${userProfile.value.first_name} ${userProfile.value.last_name}`, 20, yPosition, { fontSize: 10 })
      yPosition += 8
      addText(`Email: ${userProfile.value.email}`, 20, yPosition, { fontSize: 10 })
      yPosition += 8
      addText(`Phone: ${userProfile.value.phone || 'Not provided'}`, 20, yPosition, { fontSize: 10 })
      yPosition += 15
    }
    
    // Price Breakdown Section
    doc.line(20, yPosition, pageWidth - 20, yPosition)
    yPosition += 10
    
    addText('PRICE BREAKDOWN', 20, yPosition, { fontSize: 14, fontStyle: 'bold' })
    yPosition += 10
    
    const subtotal = calculateSubtotal()
    const serviceFee = calculateServiceFee()
    const taxes = calculateTaxes()
    
    addText(`Room Rate: $${booking.value.property.price_per_night} × ${calculateNights(booking.value.checkIn, booking.value.checkOut)} nights`, 20, yPosition, { fontSize: 10 })
    yPosition += 8
    addText(`Subtotal: $${subtotal.toFixed(2)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 8
    addText(`Service Fee: $${serviceFee.toFixed(2)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 8
    addText(`Taxes: $${taxes.toFixed(2)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 10
    
    doc.line(20, yPosition, pageWidth - 20, yPosition)
    yPosition += 10
    
    addText(`TOTAL: $${booking.value.total}`, 20, yPosition, { fontSize: 14, fontStyle: 'bold' })
    yPosition += 15
    
    // Booking Details Section
    doc.line(20, yPosition, pageWidth - 20, yPosition)
    yPosition += 10
    
    addText('BOOKING DETAILS', 20, yPosition, { fontSize: 14, fontStyle: 'bold' })
    yPosition += 10
    addText(`Booked on: ${formatDate(booking.value.created_at)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 8
    addText(`Last updated: ${formatDate(booking.value.updated_at)}`, 20, yPosition, { fontSize: 10 })
    yPosition += 15
    
    // Cancellation Policy
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = 20
    }
    
    doc.line(20, yPosition, pageWidth - 20, yPosition)
    yPosition += 10
    
    addText('CANCELLATION POLICY', 20, yPosition, { fontSize: 14, fontStyle: 'bold' })
    yPosition += 10
    addText('Free cancellation up to 24 hours before check-in. No refunds for cancellations made within 24 hours of arrival.', 20, yPosition, { fontSize: 10 })
    yPosition += 15
    
    // Footer
    const footerY = pageHeight - 20
    doc.setDrawColor(200, 200, 200)
    doc.line(20, footerY - 10, pageWidth - 20, footerY - 10)
    addText('Thank you for choosing Explore & Go!', pageWidth / 2, footerY, { fontSize: 10, align: 'center', color: [100, 100, 100] })
    addText('For support, contact: zohaibahmed@gmail.com', pageWidth / 2, footerY + 5, { fontSize: 8, align: 'center', color: [150, 150, 150] })
    
    // Save the PDF
    const fileName = `Booking-${booking.value.id.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please make sure jsPDF is installed: npm install jspdf')
  }
}

// Fetch booking data
const fetchBooking = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Get current user
    const { data: { user: authUser }, error: userError } = await client.auth.getUser()
    
    if (userError || !authUser) {
      error.value = 'User not authenticated'
      return
    }
    
    // Fetch booking details
    const { data, error: bookingError } = await client
      .from('bookings')
      .select(`
        *,
        property:properties(
          id,
          title,
          images,
          city,
          state,
          country,
          price_per_night,
          amenities
        )
      `)
      .eq('id', route.params.id)
      .eq('guest_id', authUser.id)
      .single()
    
    if (bookingError) throw bookingError
    
    if (!data) {
      error.value = 'Booking not found'
      return
    }
    
    // Process booking data
    booking.value = {
      id: data.id,
      propertyName: data.property.title,
      propertyImage: data.property.images?.[0] || '/placeholder-property.jpg',
      property: data.property,
      checkIn: data.check_in_date,
      checkOut: data.check_out_date,
      guests: 1, // You can add guest count to bookings table if needed
      total: data.total_amount,
      status: data.status,
      guest_notes: data.guest_notes,
      owner_notes: data.owner_notes,
      created_at: data.created_at,
      updated_at: data.updated_at
    }
    
    // Fetch user profile
    const { data: profile, error: profileError } = await client
      .from('users')
      .select('first_name, last_name, email, phone')
      .eq('id', authUser.id)
      .single()
    
    if (!profileError) {
      userProfile.value = profile
    }
    
    console.log('Booking fetched:', booking.value)
    
  } catch (err) {
    console.error('Error fetching booking:', err)
    error.value = err.message || 'Failed to fetch booking details'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  if (route.params.id) {
    fetchBooking()
  }
})

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchBooking()
  }
})
</script>

<style scoped>
/* Custom styles for the booking details page */
.sticky {
  position: sticky;
  top: 2rem;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
</style> 