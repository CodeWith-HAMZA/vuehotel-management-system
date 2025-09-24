<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse space-y-8">
        <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        <div class="h-96 bg-gray-200 rounded-2xl"></div>
        <div class="h-32 bg-gray-200 rounded-2xl"></div>
        <div class="h-32 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center py-12">
        <div class="text-6xl mb-4">❌</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Property Not Found</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <NuxtLink 
          to="/properties"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Properties
        </NuxtLink>
      </div>
    </div>

    <!-- Property Details -->
    <div v-else-if="property" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <NuxtLink to="/properties" class="text-gray-700 hover:text-blue-600">Properties</NuxtLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-500">{{ property.title }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Image Gallery -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="relative">
              <img 
                v-if="property.images && property.images.length > 0"
                :src="property.images[0]"
                :alt="property.title"
                class="w-full h-96 object-cover"
              >
              <div v-else class="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span class="text-white text-6xl">🏠</span>
              </div>
              
              <div class="absolute top-4 left-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ property.is_featured ? 'Featured' : formatPropertyType(property.property_type) }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span class="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  ${{ property.price_per_night }}/night
                </span>
              </div>
            </div>
            
            <!-- Additional Images Grid -->
            <div v-if="property.images && property.images.length > 1" class="grid grid-cols-4 gap-2 p-4">
              <img 
                v-for="(image, index) in property.images.slice(1, 5)" 
                :key="index"
                :src="image"
                :alt="`${property.title} - Image ${index + 2}`"
                class="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              >
            </div>
          </div>

          <!-- Property Information -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ property.title }}</h1>
                <p class="text-gray-600 mb-2">
                  📍 {{ formatLocation(property.city, property.state, property.country) }}
                </p>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <div class="flex text-yellow-400">
                      <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    </div>
                    <span class="ml-2 text-gray-600">4.9 (128 reviews)</span>
                  </div>
                  <span v-if="property.owner?.verified" class="text-green-600 font-medium">Verified Host</span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-blue-600">${{ property.price_per_night }}</p>
                <p class="text-gray-500">per night</p>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-xl font-semibold mb-4">About this place</h2>
              <p class="text-gray-600 leading-relaxed mb-4">
                {{ property.description || 'Experience luxury living at its finest in this stunning property. This exclusive accommodation offers world-class amenities and unparalleled service.' }}
              </p>
              
              <!-- Property Details -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="text-center">
                  <div class="text-2xl mb-2">🛏️</div>
                  <div class="font-medium">{{ property.bedrooms }}</div>
                  <div class="text-sm text-gray-500">{{ property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms' }}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl mb-2">🛁</div>
                  <div class="font-medium">{{ property.bathrooms }}</div>
                  <div class="text-sm text-gray-500">{{ property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms' }}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl mb-2">👥</div>
                  <div class="font-medium">{{ property.max_guests }}</div>
                  <div class="text-sm text-gray-500">{{ property.max_guests === 1 ? 'Guest' : 'Guests' }}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl mb-2">🏠</div>
                  <div class="font-medium">{{ formatPropertyType(property.property_type) }}</div>
                  <div class="text-sm text-gray-500">Type</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Amenities -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4">What this place offers</h2>
            <div v-if="property.amenities && property.amenities.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="amenity in property.amenities" 
                :key="amenity"
                class="amenity-item"
              >
                <div class="amenity-icon">{{ getAmenityIcon(amenity) }}</div>
                <div>
                  <p class="amenity-text font-medium">{{ formatAmenity(amenity) }}</p>
                  <p class="text-gray-500 text-sm">{{ getAmenityDescription(amenity) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500 text-center py-8">
              No amenities listed for this property.
            </div>
          </div>

          <!-- Owner Information -->
          <div v-if="property.owner" class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4">About the host</h2>
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {{ getOwnerInitials(property.owner) }}
              </div>
              <div>
                <h3 class="text-lg font-medium">{{ property.owner.first_name }} {{ property.owner.last_name }}</h3>
                <p class="text-gray-600">{{ property.owner.email }}</p>
                <p class="text-sm text-gray-500">Member since {{ formatDate(property.owner.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8 space-y-6">
            <!-- User's Existing Bookings -->
            <div v-if="userBookings.length > 0" class="bg-white rounded-2xl shadow-lg p-6">
              <h3 class="text-lg font-semibold mb-4">Your Bookings</h3>
              <div class="space-y-3">
                <div 
                  v-for="userBooking in userBookings" 
                  :key="userBooking.id"
                  class="border border-gray-200 rounded-lg p-3"
                >
                  <div class="flex justify-between items-start mb-2">
                    <span class="text-sm font-medium">
                      {{ new Date(userBooking.check_in_date).toLocaleDateString() }} - 
                      {{ new Date(userBooking.check_out_date).toLocaleDateString() }}
                    </span>
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      userBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      userBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      userBooking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    ]">
                      {{ userBooking.status }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">
                    {{ userBooking.total_nights }} night(s) • ${{ userBooking.total_amount }}
                  </p>
                  <p v-if="userBooking.guest_notes" class="text-xs text-gray-500 mt-1">
                    {{ userBooking.guest_notes }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- New Booking Form -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h3 class="text-xl font-semibold mb-4">Book your stay</h3>
              
              <!-- Debug Info (remove in production) -->
              <div class="mb-4 p-3 bg-gray-50 rounded-lg text-xs">
                <p><strong>Debug Info:</strong></p>
                <p>Check-in: {{ booking.checkIn || 'Not set' }}</p>
                <p>Check-out: {{ booking.checkOut || 'Not set' }}</p>
                <p>Guests: {{ booking.guests }}</p>
                <p>Can Book: {{ canBook }}</p>
                <p>Date Available: {{ isDateAvailable }}</p>
                <p>Date Conflict: {{ checkDateConflict(booking.checkIn, booking.checkOut) }}</p>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                  <input 
                    v-model="booking.checkIn" 
                    type="date" 
                    :min="new Date().toISOString().split('T')[0]"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                  <p v-if="!isDateAvailable && booking.checkIn" class="text-red-500 text-xs mt-1">
                    Please select a valid check-in date
                  </p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                  <input 
                    v-model="booking.checkOut" 
                    type="date" 
                    :min="booking.checkIn || new Date().toISOString().split('T')[0]"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                  <p v-if="!isDateAvailable && booking.checkOut" class="text-red-500 text-xs mt-1">
                    Please select a valid check-out date
                  </p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                  <select v-model="booking.guests" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option v-for="i in property.max_guests" :key="i" :value="i">
                      {{ i }} {{ i === 1 ? 'guest' : 'guests' }}
                    </option>
                  </select>
                </div>
                
                <!-- Date conflict warning -->
                <div v-if="booking.checkIn && booking.checkOut && checkDateConflict(booking.checkIn, booking.checkOut)" 
                     class="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p class="text-red-700 text-sm">
                    ⚠️ These dates are not available. Please select different dates.
                  </p>
                </div>
                
                <!-- Minimum stay notice -->
                <div v-if="calculateNights() > 0 && calculateNights() < 1" 
                     class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p class="text-yellow-700 text-sm">
                    ℹ️ Minimum stay is 1 night.
                  </p>
                </div>
                
                <div class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between text-sm mb-2">
                    <span>${{ property.price_per_night }} × {{ calculateNights() }} nights</span>
                    <span>${{ calculateSubtotal() }}</span>
                  </div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Service fee</span>
                    <span>${{ calculateServiceFee() }}</span>
                  </div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Taxes</span>
                    <span>${{ calculateTaxes() }}</span>
                  </div>
                  <div class="border-t border-gray-200 pt-2">
                    <div class="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${{ calculateTotal() }}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  @click="handleBooking"
                  :disabled="!canBook || bookingLoading"
                  class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {{ bookingLoading ? 'Booking...' : (canBook ? 'Reserve Now' : 'Select dates to book') }}
                </button>
                
                <p class="text-xs text-gray-500 text-center">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for the property detail page */
.sticky {
  position: sticky;
  top: 2rem;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Amenity item styles */
.amenity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.amenity-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.amenity-text {
  color: #374151;
}
</style>

<script setup>
const route = useRoute()
const client = useSupabaseClient()

// State
const property = ref(null)
const loading = ref(true)
const error = ref(null)
const bookingLoading = ref(false)
const availableDates = ref([])

// Booking form
const booking = ref({
  checkIn: '',
  checkOut: '',
  guests: 1
})

// Computed
const canBook = computed(() => {
  // Must have both dates selected
  if (!booking.value.checkIn || !booking.value.checkOut) {
    console.log('canBook: false - missing dates', { checkIn: booking.value.checkIn, checkOut: booking.value.checkOut })
    return false
  }
  
  const checkIn = new Date(booking.value.checkIn)
  const checkOut = new Date(booking.value.checkOut)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Check if dates are valid
  if (checkIn < today) {
    console.log('canBook: false - check-in in past', { checkIn, today })
    return false
  }
  if (checkOut <= checkIn) {
    console.log('canBook: false - invalid date range', { checkIn, checkOut })
    return false
  }
  
  // Check if dates conflict with existing bookings
  if (checkDateConflict(booking.value.checkIn, booking.value.checkOut)) {
    console.log('canBook: false - date conflict detected')
    return false
  }
  
  console.log('canBook: true - all checks passed')
  return true
})

// Check if selected dates are available
const isDateAvailable = computed(() => {
  if (!booking.value.checkIn || !booking.value.checkOut) return true
  
  // Check if dates are in the past
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const checkIn = new Date(booking.value.checkIn)
  const checkOut = new Date(booking.value.checkOut)
  
  if (checkIn < today) return false
  if (checkOut <= checkIn) return false
  
  return true
})

// Check if current user has existing bookings for this property
const userBookings = ref([])
const currentUser = ref(null)

const fetchUserBookings = async () => {
  try {
    const { data: { user }, error: userError } = await client.auth.getUser()
    
    if (userError || !user) return
    
    currentUser.value = user
    
    const { data, error } = await client
      .from('bookings')
      .select('*')
      .eq('property_id', route.params.id)
      .eq('guest_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    userBookings.value = data || []
    console.log('User bookings:', data)
    
  } catch (err) {
    console.error('Error fetching user bookings:', err)
  }
}

// Methods
const formatPropertyType = (type) => {
  const typeMap = {
    'hotel': 'Hotel',
    'hostel': 'Hostel',
    'room': 'Room',
    'home': 'Home',
    'house': 'House',
    'apartment': 'Apartment'
  }
  return typeMap[type] || type
}

const formatLocation = (city, state, country) => {
  const parts = [city, state, country].filter(Boolean)
  return parts.join(', ')
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

const getAmenityDescription = (amenity) => {
  const descriptionMap = {
    'swimming_pool': 'Private or shared pool access',
    'free_parking': 'Secure parking on premises',
    'free_wifi': 'High-speed internet included',
    'kitchen': 'Fully equipped kitchen',
    'gym': 'Fitness center access',
    'service_24_7': 'Round-the-clock assistance',
    'beach_access': 'Direct beach access',
    'spa': 'Spa and wellness services',
    'pet_friendly': 'Pets welcome'
  }
  return descriptionMap[amenity] || 'Available amenity'
}

const formatDate = (dateString) => {
  if (!dateString) return 'Recently'
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'today'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

const getOwnerInitials = (owner) => {
  if (!owner) return 'U'
  const { first_name, last_name } = owner
  return `${first_name?.[0] || ''}${last_name?.[0] || ''}`.toUpperCase() || 'U'
}

const calculateNights = () => {
  if (!booking.value.checkIn || !booking.value.checkOut) return 0
  const checkIn = new Date(booking.value.checkIn)
  const checkOut = new Date(booking.value.checkOut)
  const diffTime = checkOut - checkIn
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const calculateSubtotal = () => {
  if (!property.value) return 0
  return property.value.price_per_night * calculateNights()
}

const calculateServiceFee = () => {
  return Math.round(calculateSubtotal() * 0.05) // 5% service fee
}

const calculateTaxes = () => {
  return Math.round(calculateSubtotal() * 0.08) // 8% tax
}

const calculateTotal = () => {
  return calculateSubtotal() + calculateServiceFee() + calculateTaxes()
}


const handleBooking = async () => {

  if (!canBook.value) return
  
  bookingLoading.value = true
  try {
    // Get current user (you'll need to implement user authentication)
    const { data: { user }, error: userError } = await client.auth.getUser()
    
    if (userError || !user) {
      alert('Please log in to make a booking')
      bookingLoading.value = false
      return
    }
    
    // Check if user is trying to book their own property
    if (user.id === property.value.owner_id) {
      alert('You cannot book your own property')
      bookingLoading.value = false
      return
    }
    
    // Check for date conflicts
    if (checkDateConflict(booking.value.checkIn, booking.value.checkOut)) {
      alert('These dates are not available. Please select different dates.')
      return
    }
    
    // Create the booking
    const { data: newBooking, error: bookingError } = await client
      .from('bookings')
      .insert({
        property_id: property.value.id,
        guest_id: user.id,
        owner_id: property.value.owner_id,
        check_in_date: booking.value.checkIn,
        check_out_date: booking.value.checkOut,
        total_nights: calculateNights(),
        total_amount: calculateTotal(),
        status: 'pending',
        guest_notes: `Booking for ${booking.value.guests} guest(s)`
      })
      .select()
      .single()
    
    if (bookingError) throw bookingError
    
    // Show success message
    alert(`Booking submitted successfully! Your booking ID is: ${newBooking.id}`)
    
    // Reset form
    booking.value = {
      checkIn: '',
      checkOut: '',
      guests: 1
    }
    
    
    console.log('Booking created:', newBooking)
    
    const width = 500
  const height = 700
  const left = (window.innerWidth - width) / 2
  const top = (window.innerHeight - height) / 2

  window.open(
    'https://buy.stripe.com/test_28E8wR5671Ng4sieWK2Ry00', // 👈 your Stripe checkout link
    'StripeCheckout',
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
  )
  } catch (error) {
    console.error('Error creating booking:', error)
    alert(`Failed to create booking: ${error.message}`)
  } finally {
    bookingLoading.value = false
  }
}

// Fetch property data
const fetchProperty = async () => {
  loading.value = true
  error.value = null
  
  try {
    const { data, error: fetchError } = await client
      .from('properties')
      .select(`
        *,
        owner:users!properties_owner_id_fkey(
          id,
          first_name,
          last_name,
          email,
          verified,
          created_at
        )
      `)
      .eq('id', route.params.id)
      .single()
    
    if (fetchError) throw fetchError
    
    if (!data) {
      error.value = 'Property not found'
      return
    }
    
    property.value = data
    console.log('Property fetched:', data)
    
  } catch (err) {
    console.error('Error fetching property:', err)
    error.value = err.message || 'Failed to fetch property details'
  } finally {
    loading.value = false
  }
}

// Fetch existing bookings for availability
const fetchBookings = async () => {
  try {
    const { data, error } = await client
      .from('bookings')
      .select('check_in_date, check_out_date, status')
      .eq('property_id', route.params.id)
      .in('status', ['confirmed', 'pending'])
    
    if (error) throw error
    
    availableDates.value = data || []
    console.log('Existing bookings:', data)
    
  } catch (err) {
    console.error('Error fetching bookings:', err)
  }
}

// Check if dates conflict with existing bookings
const checkDateConflict = (checkIn, checkOut) => {
  // If no dates are selected, there's no conflict
  if (!checkIn || !checkOut) return false
  
  // .some ek bhi true return hua cb sy to true return krega otherwise false return krega
  return availableDates.value.some(booking => {
    if (booking.status === 'cancelled') return false
    
    // convert the string date to date object
    const existingCheckIn = new Date(booking.check_in_date)
    const existingCheckOut = new Date(booking.check_out_date)
    const newCheckIn = new Date(checkIn)
    const newCheckOut = new Date(checkOut)
    
    
    // check if the new check-in date is before the existing check-out date and the new check-out date is after the existing check-in date
    return (newCheckIn < existingCheckOut && newCheckOut > existingCheckIn)
  })
}

// Lifecycle
onMounted(() => {
  if (route.params.id) {
    fetchProperty()
    fetchBookings() // Fetch bookings on mount
    fetchUserBookings() // Fetch user bookings on mount
  }
})

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchProperty()
    fetchBookings() // Fetch bookings on route change
    fetchUserBookings() // Fetch user bookings on route change
  }
})

// Watch for booking form changes
watch(booking, (newBooking) => {
  console.log('Booking form changed:', newBooking)
  console.log('canBook value:', canBook.value)
}, { deep: true })
</script> 