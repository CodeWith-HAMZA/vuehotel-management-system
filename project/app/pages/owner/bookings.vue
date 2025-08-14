<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Property Bookings</h1>
            <p class="text-gray-600 mt-1">Manage all bookings for your properties</p>
          </div>
          <div class="flex space-x-3">
            <button @click="refreshBookings" class="btn-outline">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
            <NuxtLink to="/owner/properties" class="btn-outline">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              My Properties
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse space-y-6">
        <div class="h-12 bg-gray-200 rounded w-1/3"></div>
        <div class="space-y-4">
          <div v-for="i in 5" :key="i" class="bg-white rounded-lg p-6">
            <div class="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.pendingBookings }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Confirmed</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.confirmedBookings }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900">${{ stats.totalRevenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              v-model="filters.status"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Property</label>
            <select 
              v-model="filters.propertyId"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Properties</option>
              <option v-for="property in userProperties" :key="property.id" :value="property.id">
                {{ property.title }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              v-model="filters.dateRange"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
          
          <div class="flex items-end">
            <button @click="clearFilters" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Bookings List -->
      <div class="space-y-6">
        <!-- Empty State -->
        <div v-if="filteredBookings.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📋</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ hasActiveFilters ? 'No bookings match your filters' : 'No bookings yet' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ hasActiveFilters ? 'Try adjusting your filter criteria' : 'Bookings will appear here once guests start booking your properties.' }}
          </p>
          <NuxtLink 
            v-if="!hasActiveFilters"
            to="/owner/properties" 
            class="btn-primary"
          >
            Manage Properties
          </NuxtLink>
        </div>

        <!-- Bookings -->
        <div v-else class="space-y-4">
          <div 
            v-for="booking in paginatedBookings" 
            :key="booking.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="p-6">
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <!-- Property Info -->
                <div class="flex items-start space-x-4 mb-4 lg:mb-0">
                  <img 
                    :src="booking.propertyImage" 
                    :alt="booking.propertyName"
                    class="w-24 h-24 object-cover rounded-lg"
                  >
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">
                      {{ booking.propertyName }}
                    </h3>
                    <div class="space-y-2">
                      <p class="text-gray-600">
                        👤 <strong>{{ booking.guestName }}</strong> • {{ booking.guests }} guest{{ booking.guests > 1 ? 's' : '' }}
                        <span v-if="loadingGuests" class="ml-2 text-blue-500 text-sm">(Loading...)</span>
                      </p>
                      <p v-if="booking.guestEmail && booking.guestEmail !== 'Not provided'" class="text-gray-600">
                        📧 {{ booking.guestEmail }}
                      </p>
                      <p v-else class="text-gray-500 text-sm">
                        📧 Guest email not available
                      </p>
                      <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 {{ booking.dates }}</span>
                        <span>💰 ${{ booking.total }}/night</span>
                        <span>🕐 {{ formatDate(booking.created_at) }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Booking Details -->
                <div class="flex flex-col lg:items-end space-y-3">
                  <!-- Status and Total -->
                  <div class="text-right">
                    <div class="text-2xl font-bold text-gray-900 mb-1">
                      ${{ booking.total }}
                    </div>
                    <span :class="getStatusClass(booking.status)" class="inline-flex px-3 py-1 text-sm font-medium rounded-full">
                      {{ formatStatus(booking.status) }}
                    </span>
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-col sm:flex-row gap-2">
                    <NuxtLink 
                      :to="`/owner/booking/${booking.id}`"
                      class="btn-outline text-center"
                    >
                      View Details
                    </NuxtLink>
                    
                    <button 
                      v-if="booking.status === 'pending'"
                      @click="approveBooking(booking.id)"
                      class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Approve
                    </button>
                    
                    <button 
                      v-if="booking.status === 'pending'"
                      @click="rejectBooking(booking.id)"
                      class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Reject
                    </button>
                    
                    <button 
                      v-if="booking.status === 'confirmed'"
                      @click="markCompleted(booking.id)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>

              <!-- Additional Info -->
              <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">Booking ID:</span>
                    <span class="ml-2 font-mono text-gray-700">{{ booking.id.slice(0, 8) }}...</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Total nights:</span>
                    <span class="ml-2 text-gray-700">{{ calculateNights(booking.checkIn, booking.checkOut) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Guest contact:</span>
                    <span class="ml-2 text-gray-700">{{ booking.guestEmail || 'Not provided' }}</span>
                  </div>
                </div>
                <div class="mt-3 pt-3 border-t border-gray-100">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-gray-500">Check-in:</span>
                      <span class="ml-2 text-gray-700">{{ formatDate(booking.checkIn) }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">Check-out:</span>
                      <span class="ml-2 text-gray-700">{{ formatDate(booking.checkOut) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8">
          <nav class="flex items-center space-x-2">
            <button 
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="changePage(page)"
              :class="[
                'px-3 py-2 rounded-lg transition-colors',
                page === currentPage 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              {{ page }}
            </button>
            
            <button 
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const user = ref(null)
const loading = ref(true)

// State
const bookings = ref([])
const userProperties = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10
const loadingGuests = ref(false)

// Stats
const stats = ref({
  totalBookings: 0,
  pendingBookings: 0,
  confirmedBookings: 0,
  totalRevenue: 0
})

// Filters
const filters = ref({
  status: '',
  propertyId: '',
  dateRange: ''
})

// Computed
const filteredBookings = computed(() => {
  let filtered = bookings.value

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(booking => 
      booking.status.toLowerCase() === filters.value.status.toLowerCase()
    )
  }

  // Property filter
  if (filters.value.propertyId) {
    filtered = filtered.filter(booking => 
      booking.property_id === filters.value.propertyId
    )
  }

  // Date range filter
  if (filters.value.dateRange) {
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    switch (filters.value.dateRange) {
      case 'upcoming':
        filtered = filtered.filter(booking => new Date(booking.checkIn) > now)
        break
      case 'past':
        filtered = filtered.filter(booking => new Date(booking.checkOut) < now)
        break
      case 'this-month':
        filtered = filtered.filter(booking => {
          const checkIn = new Date(booking.checkIn)
          return checkIn >= thisMonth && checkIn <= now
        })
        break
    }
  }

  return filtered
})

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredBookings.value.slice(start, end)
})

const hasActiveFilters = computed(() => {
  return filters.value.status || filters.value.propertyId || filters.value.dateRange
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const formatStatus = (status) => {
  const statusMap = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'completed': 'Completed',
    'cancelled': 'Cancelled'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const diffTime = checkOutDate - checkInDate
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
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

const clearFilters = () => {
  filters.value = {
    status: '',
    propertyId: '',
    dateRange: ''
  }
  currentPage.value = 1
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const approveBooking = async (bookingId) => {
  if (!confirm('Are you sure you want to approve this booking?')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', bookingId)
    
    if (error) throw error
    
    await fetchBookings()
    alert('Booking approved successfully!')
    
  } catch (error) {
    console.error('Error approving booking:', error)
    alert('Failed to approve booking. Please try again.')
  }
}

const rejectBooking = async (bookingId) => {
  if (!confirm('Are you sure you want to reject this booking?')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
    
    if (error) throw error
    
    await fetchBookings()
    alert('Booking rejected successfully!')
    
  } catch (error) {
    console.error('Error rejecting booking:', error)
    alert('Failed to reject booking. Please try again.')
  }
}

const markCompleted = async (bookingId) => {
  if (!confirm('Mark this booking as completed?')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'completed' })
      .eq('id', bookingId)
    
    if (error) throw error
    
    await fetchBookings()
    alert('Booking marked as completed!')
    
  } catch (error) {
    console.error('Error updating booking:', error)
    alert('Failed to update booking. Please try again.')
  }
}

const refreshBookings = () => {
  fetchBookings()
}

// Fetch data
const fetchBookings = async () => {
  loading.value = true
  
  try {
    // Get current user
    const { data: { user: authUser }, error: userError } = await client.auth.getUser()
    
    if (userError || !authUser) {
      console.error('User not authenticated:', userError)
      return
    }
    
    user.value = authUser
    
    // Fetch user's properties first
    const { data: properties, error: propertiesError } = await client
      .from('properties')
      .select('id, title')
      .eq('owner_id', authUser.id)
    
    if (propertiesError) throw propertiesError
    
    userProperties.value = properties
    
    if (properties.length === 0) {
      bookings.value = []
      stats.value = { totalBookings: 0, pendingBookings: 0, confirmedBookings: 0, totalRevenue: 0 }
      loading.value = false
      return
    }
    
    // Fetch bookings for user's properties
    const propertyIds = properties.map(p => p.id)
    const { data, error: bookingsError } = await client
      .from('bookings')
      .select('*')
      .in('property_id', propertyIds)
      .order('created_at', { ascending: false })
    
    if (bookingsError) throw bookingsError
    
    // Get guest IDs from bookings
    const guestIds = [...new Set(data.map(booking => booking.guest_id))]
    console.log('Guest IDs found:', guestIds)
    
    // Fetch guest details
    let guestMap = {}
    if (guestIds.length > 0) {
      loadingGuests.value = true
      const { data: guestData, error: guestError } = await client
        .from('users')
        .select('id, first_name, last_name, email')
        .in('id', guestIds)
      
      if (guestError) {
        console.error('Error fetching guest data:', guestError)
      } else if (guestData) {
        console.log('Guest data fetched:', guestData)
        guestData.forEach(guest => {
          guestMap[guest.id] = guest
        })
      }
      loadingGuests.value = false
    }
    
    console.log('Guest map created:', guestMap)
    
    // Process bookings data
    bookings.value = data.map(booking => {
      const property = properties.find(p => p.id === booking.property_id)
      const guest = guestMap[booking.guest_id]
      
      // Ensure we have valid guest data
      const guestName = guest ? 
        `${guest.first_name || ''} ${guest.last_name || ''}`.trim() || 'Guest' : 
        'Guest'
      
      const guestEmail = guest?.email || 'Not provided'
      const numberOfGuests = booking.number_of_guests || 1
      
      return {
        id: booking.id,
        property_id: booking.property_id,
        propertyName: property?.title || 'Unknown Property',
        propertyImage: '/placeholder-property.jpg', // You can fetch actual images if needed
        guestName: guestName,
        guestEmail: guestEmail,
        guests: numberOfGuests,
        checkIn: booking.check_in_date,
        checkOut: booking.check_out_date,
        dates: `${new Date(booking.check_in_date).toLocaleDateString()} - ${new Date(booking.check_out_date).toLocaleDateString()}`,
        total: booking.total_amount,
        status: booking.status,
        created_at: booking.created_at
      }
    })
    
    // Calculate stats
    stats.value.totalBookings = data.length
    stats.value.pendingBookings = data.filter(b => b.status === 'pending').length
    stats.value.confirmedBookings = data.filter(b => b.status === 'confirmed').length
    stats.value.totalRevenue = data
      .filter(b => b.status === 'confirmed')
      .reduce((sum, booking) => sum + parseFloat(booking.total_amount), 0)
    
    // Calculate total pages
    totalPages.value = Math.ceil(filteredBookings.value.length / itemsPerPage)
    
    console.log('Owner bookings fetched:', bookings.value)
    
  } catch (error) {
    console.error('Error fetching owner bookings:', error)
  } finally {
    loading.value = false
  }
}

// Watch for filter changes
watch(filters, () => {
  currentPage.value = 1
  totalPages.value = Math.ceil(filteredBookings.value.length / itemsPerPage)
}, { deep: true })

// Lifecycle
onMounted(() => {
  fetchBookings()
})
</script>

<style scoped>
/* Button styles */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center;
}

.btn-outline {
  @apply border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors;
}
</style> 