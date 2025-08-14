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
          to="/owner/bookings"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Bookings
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
                <NuxtLink to="/owner/bookings" class="text-gray-700 hover:text-blue-600">My Bookings</NuxtLink>
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
           
          <!-- Notes and Messages -->
          <div v-if="booking.guest_notes || booking.owner_notes" class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Notes & Messages</h3>
            <div class="space-y-4">
              <div v-if="booking.guest_notes">
                <h4 class="font-medium text-gray-900 mb-2">Guest Notes</h4>
                <p class="text-gray-700 bg-gray-50 p-3 rounded-lg">{{ booking.guest_notes }}</p>
              </div>
              <div v-if="booking.owner_notes">
                <h4 class="font-medium text-gray-900 mb-2">Your Notes</h4>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">{{ booking.owner_notes }}</p>
              </div>
            </div>
          </div>

          <!-- Add Owner Notes -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Add Notes</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Notes for Guest</label>
                <textarea 
                  v-model="newOwnerNotes"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Add any notes or messages for the guest..."
                ></textarea>
              </div>
              <button 
                @click="saveOwnerNotes"
                :disabled="!newOwnerNotes.trim()"
                class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save Notes
              </button>
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
                  @click="approveBooking"
                  class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Approve Booking
                </button>
                
                <button 
                  v-if="booking.status === 'pending'"
                  @click="rejectBooking"
                  class="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Reject Booking
                </button>
                
                <button 
                  v-if="booking.status === 'confirmed'"
                  @click="markCompleted"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Mark as Completed
                </button>
                
                <button 
                  v-if="booking.status === 'confirmed'"
                  @click="contactGuest"
                  class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {{ guestInfo?.email ? `Contact Guest (${guestInfo.email})` : 'Contact Guest' }}
                </button>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h4 class="font-medium text-gray-900 mb-4">Quick Actions</h4>
              <div class="space-y-3">
                <NuxtLink 
                  :to="`/owner/property/${booking.property_id}`"
                  class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-center"
                >
                  Manage Property
                </NuxtLink>
                
                <NuxtLink 
                  to="/owner/bookings"
                  class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-center"
                >
                  View All Bookings
                </NuxtLink>
                
                <!-- <button 
                  @click="downloadInvoice"
                  class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Download Invoice
                </button> -->
              </div>
            </div>

            <!-- Help & Support -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h4 class="font-medium text-gray-900 mb-2">Need Help?</h4>
              <p class="text-sm text-gray-600 mb-3">
                Questions about this booking? We're here to help!
              </p>
              <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
            </div>
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
const guestInfo = ref(null)
const loading = ref(true)
const error = ref(null)
const newOwnerNotes = ref('')

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

const approveBooking = async () => {
  if (!confirm('Are you sure you want to approve this booking?')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', route.params.id)
    
    if (error) throw error
    
    // Refresh booking data
    await fetchBooking()
    
    // Show success message
    alert('Booking approved successfully!')
    
  } catch (error) {
    console.error('Error approving booking:', error)
    alert('Failed to approve booking. Please try again.')
  }
}

const rejectBooking = async () => {
  if (!confirm('Are you sure you want to reject this booking?')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', route.params.id)
    
    if (error) throw error
    
    // Refresh booking data
    await fetchBooking()
    
    // Show success message
    alert('Booking rejected successfully!')
    
  } catch (error) {
    console.error('Error rejecting booking:', error)
    alert('Failed to reject booking. Please try again.')
  }
}

const markCompleted = async () => {
  if (!confirm('Mark this booking as completed?')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'completed' })
      .eq('id', route.params.id)
    
    if (error) throw error
    
    // Refresh booking data
    await fetchBooking()
    
    // Show success message
    alert('Booking marked as completed!')
    
  } catch (error) {
    console.error('Error updating booking:', error)
    alert('Failed to update booking. Please try again.')
  }
}

const saveOwnerNotes = async () => {
  if (!newOwnerNotes.value.trim()) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ owner_notes: newOwnerNotes.value })
      .eq('id', route.params.id)
    
    if (error) throw error
    
    // Refresh booking data
    await fetchBooking()
    
    // Clear input
    newOwnerNotes.value = ''
    
    // Show success message
    alert('Notes saved successfully!')
    
  } catch (error) {
    console.error('Error saving notes:', error)
    alert('Failed to save notes. Please try again.')
  }
}

const contactGuest = () => {
  if (guestInfo.value?.email) {
    // Show guest contact information
    const message = `Guest Contact Information:\n\n` +
                   `Name: ${guestInfo.value.first_name || ''} ${guestInfo.value.last_name || ''}\n` +
                   `Email: ${guestInfo.value.email}\n` +
                   `Phone: ${guestInfo.value.phone || 'Not provided'}\n\n` +
                   `You can contact the guest directly using the information above.`
    
    alert(message)
  } else {
    alert('Guest contact information is not available for this booking.')
  }
}

const downloadInvoice = () => {
  // Implement invoice download functionality
  alert('Invoice download functionality coming soon!')
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
          price_per_night
        )
      `)
      .eq('id', route.params.id)
      .single()
    
    if (bookingError) throw bookingError
    
    if (!data) {
      error.value = 'Booking not found'
      return
    }
    
    // Verify this booking belongs to one of the user's properties
    const { data: userProperties, error: propertiesError } = await client
      .from('properties')
      .select('id')
      .eq('owner_id', authUser.id)
    
    if (propertiesError) throw propertiesError
    
    const isOwner = userProperties.some(prop => prop.id === data.property_id)
    if (!isOwner) {
      error.value = 'You do not have permission to view this booking'
      return
    }
    
    // Process booking data
    booking.value = {
      id: data.id,
      property_id: data.property_id,
      propertyName: data.property.title,
      propertyImage: data.property.images?.[0] || '/placeholder-property.jpg',
      property: data.property,
      checkIn: data.check_in_date,
      checkOut: data.check_out_date,
      guests: data.number_of_guests || 1,
      total: data.total_amount,
      status: data.status,
      guest_notes: data.guest_notes,
      owner_notes: data.owner_notes,
      created_at: data.created_at,
      updated_at: data.updated_at,
      guest_id: data.guest_id // Add guest_id to the booking object
    }
    
    // Fetch guest information
    if (data.guest_id) {
      console.log('Fetching guest info for ID:', data.guest_id)
      
      const { data: guest, error: guestError } = await client
        .from('users')
        .select('first_name, last_name, email, phone')
        .eq('id', data.guest_id).maybeSingle()         
      
      if (guestError) {
        console.error('Error fetching guest data:', guestError)
        guestInfo.value = null
      } else {

      console.log('Guest info fetched successfully:', guest)
        guestInfo.value = guest
        console.log('Guest info fetched successfully:', guest)
      }
    } else {
      console.warn('No guest_id found in booking data:', data)
      guestInfo.value = null
    }
    
    console.log('Owner booking details fetched:', booking.value)
    console.log('Guest info state:', guestInfo.value)
    console.log('Full booking data from database:', data)
    
  } catch (err) {
    console.error('Error fetching owner booking:', err)
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
/* Custom styles for the owner booking details page */
.sticky {
  position: sticky;
  top: 2rem;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
</style> 