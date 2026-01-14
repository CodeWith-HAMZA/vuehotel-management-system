<template>
  <div>
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Bookings</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalBookings }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Spent</p>
            <p class="text-2xl font-bold text-gray-900">${{ stats.totalSpent.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Average Rating</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.averageRating }}/5</p>
          </div>
        </div>
      </div> -->

      <!-- <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Favorite Properties</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.favoriteProperties }}</p>
          </div>
        </div>
      </div> -->
    </div>

    <!-- Main Dashboard Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Activity -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Recent Bookings -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <NuxtLink to="/bookings" class="text-blue-600 hover:text-blue-700 font-medium">View All</NuxtLink>
          </div>
          
          <div v-if="recentBookings.length === 0" class="text-center py-8">
            <div class="text-4xl mb-4">🏠</div>
            <h4 class="text-lg font-medium text-gray-900 mb-2">No bookings yet</h4>
            <p class="text-gray-600 mb-4">Start exploring properties and make your first booking!</p>
            <NuxtLink to="/properties" class="btn-primary">Browse Properties</NuxtLink>
          </div>
          
          <div v-else class="space-y-4">
            <div v-for="booking in recentBookings.slice(0, 5)" :key="booking.id" 
                 class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div class="flex items-center space-x-4">
                <img :src="booking.propertyImage" :alt="booking.propertyName" 
                     class="w-16 h-16 object-cover rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">{{ booking.propertyName }}</h4>
                  <p class="text-sm text-gray-600">{{ booking.dates }}</p>
                  <p class="text-sm text-gray-500">{{ booking.guests }} guest(s)</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ booking.total }}</p>
                <span :class="getStatusClass(booking.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ booking.status }}
                </span>
                <div class="mt-2 space-x-2">
                  <button @click="viewBookingDetails(booking.id)" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                  <button v-if="booking.status === 'pending'" @click="cancelBooking(booking.id)" class="text-red-600 hover:text-red-700 text-sm font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Trips -->
        <div v-if="upcomingTrips.length > 0" class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Upcoming Trips</h3>
            <NuxtLink to="/trips" class="text-blue-600 hover:text-blue-700 font-medium">View All</NuxtLink>
          </div>
          
          <div class="space-y-4">
            <div v-for="trip in upcomingTrips.slice(0, 3)" :key="trip.id" 
                 class="border border-gray-200 rounded-lg p-4 hover:border-blue-300">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <img :src="trip.propertyImage" :alt="trip.propertyName" 
                       class="w-16 h-16 object-cover rounded-lg">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ trip.propertyName }}</h4>
                    <p class="text-sm text-gray-600">{{ trip.dates }}</p>
                    <p class="text-sm text-gray-500">{{ trip.guests }} guest(s)</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-900">${{ trip.total }}</p>
                  <button @click="viewBookingDetails(trip.id)" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <NuxtLink to="/properties" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-700">Book New Stay</span>
              </div>
            </NuxtLink>
            
            <!-- <NuxtLink to="/favorites" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span class="text-gray-700">View Favorites</span>
              </div>
            </NuxtLink> -->
            
            <NuxtLink to="/bookings" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="text-gray-700">My Bookings</span>
              </div>
            </NuxtLink>
            
            <button @click="showHelpModal = true" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-700">Get Help</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Notifications -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Recent Notifications</h3>
          <div v-if="notifications.length === 0" class="text-center py-4">
            <p class="text-gray-500 text-sm">No notifications yet</p>
          </div>
          <div v-else class="space-y-3">
            <div v-for="notification in notifications.slice(0, 5)" :key="notification.id" 
                 class="p-3 rounded-lg" :class="getNotificationClass(notification.type)">
              <p class="text-sm text-gray-700">{{ notification.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
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
const client = useSupabaseClient()

// Props
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['refresh-data'])

// State
const stats = ref({
  totalBookings: 0,
  totalSpent: 0,
  averageRating: 0,
  favoriteProperties: 0
})

const recentBookings = ref([])
const upcomingTrips = ref([])
const notifications = ref([])
const showHelpModal = ref(false)

// Fetch guest dashboard data
const fetchGuestData = async () => {
  try {
    // Fetch user's bookings
    const { data: bookings, error: bookingsError } = await client
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
      .eq('guest_id', props.user.id)
      .order('created_at', { ascending: false })
    
    if (bookingsError) throw bookingsError
    
    // Process bookings data
    recentBookings.value = bookings.map(booking => ({
      id: booking.id,
      propertyName: booking.property.title,
      propertyImage: booking.property.images?.[0] || '/placeholder-property.jpg',
      dates: `${new Date(booking.check_in_date).toLocaleDateString()} - ${new Date(booking.check_out_date).toLocaleDateString()}`,
      guests: 1,
      total: booking.total_amount,
      status: booking.status,
      checkIn: booking.check_in_date,
      checkOut: booking.check_out_date
    }))
    
    // Separate upcoming trips (future confirmed bookings)
    const now = new Date()
    upcomingTrips.value = recentBookings.value.filter(booking => {
      const checkIn = new Date(booking.checkIn)
      return checkIn > now && booking.status === 'confirmed'
    })
    
    // Calculate statistics
    stats.value.totalBookings = bookings.length
    stats.value.totalSpent = bookings.reduce((sum, booking) => sum + parseFloat(booking.total_amount), 0)
    stats.value.averageRating = 4.5 // Placeholder
    stats.value.favoriteProperties = 3 // Placeholder
    
    // Generate notifications
    notifications.value = generateNotifications(bookings)
    
  } catch (error) {
    console.error('Error fetching guest data:', error)
  }
}

// Generate notifications based on user activity
const generateNotifications = (bookings) => {
  const notifications = []
  
  // Check for upcoming trips
  const now = new Date()
  const upcomingBookings = bookings.filter(booking => {
    const checkIn = new Date(booking.check_in_date)
    const daysUntil = Math.ceil((checkIn - now) / (1000 * 60 * 60 * 24))
    return daysUntil > 0 && daysUntil <= 7 && booking.status === 'confirmed'
  })
  
  upcomingBookings.forEach(booking => {
    const daysUntil = Math.ceil((new Date(booking.check_in_date) - now) / (1000 * 60 * 60 * 24))
    notifications.push({
      id: `upcoming-${booking.id}`,
      type: 'info',
      message: `Your trip to ${booking.property.title} is in ${daysUntil} day${daysUntil > 1 ? 's' : ''}!`,
      time: 'Just now'
    })
  })
  
  // Check for pending bookings
  const pendingBookings = bookings.filter(booking => booking.status === 'pending')
  if (pendingBookings.length > 0) {
    notifications.push({
      id: 'pending-bookings',
      type: 'warning',
      message: `You have ${pendingBookings.length} pending booking${pendingBookings.length > 1 ? 's' : ''} waiting for confirmation.`,
      time: 'Just now'
    })
  }
  
  // Add welcome notification for new users
  if (bookings.length === 0) {
    notifications.push({
      id: 'welcome',
      type: 'success',
      message: 'Welcome to Explore & Go! Start exploring properties and make your first booking.',
      time: 'Just now'
    })
  }
  
  return notifications
}

// Get status styling
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

// Get notification styling
const getNotificationClass = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border border-green-200'
    case 'info':
      return 'bg-blue-50 border border-blue-200'
    case 'warning':
      return 'bg-yellow-50 border border-yellow-200'
    default:
      return 'bg-gray-50 border border-gray-200'
  }
}

// Handle booking actions
const viewBookingDetails = (bookingId) => {
  navigateTo(`/booking/${bookingId}`)
}

const cancelBooking = async (bookingId) => {
  if (!confirm('Are you sure you want to cancel this booking?')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
    
    if (error) throw error
    
    // Refresh data
    await fetchGuestData()
    emit('refresh-data')
    
    // Show success message
    alert('Booking cancelled successfully!')
    
  } catch (error) {
    console.error('Error cancelling booking:', error)
    alert('Failed to cancel booking. Please try again.')
  }
}

// Lifecycle
onMounted(() => {
  fetchGuestData()
})

// Watch for user changes
watch(() => props.user, () => {
  if (props.user) {
    fetchGuestData()
  }
})
</script>

<style scoped>
/* Button styles */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors;
}
</style> 