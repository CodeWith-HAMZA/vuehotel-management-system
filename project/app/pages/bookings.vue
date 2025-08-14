<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p class="text-gray-600 mt-1">Manage and track all your property bookings</p>
          </div>
          <NuxtLink to="/properties" class="btn-primary">
            Browse More Properties
          </NuxtLink>
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
      <!-- Filters and Search -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <input 
              v-model="filters.search"
              type="text" 
              placeholder="Search properties, locations..." 
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <!-- Status Filter -->
          <div>
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
          
          <!-- Date Filter -->
          <div>
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
        </div>
        
        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
          <span 
            v-for="(value, key) in activeFilters" 
            :key="key"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {{ key }}: {{ value }}
            <button 
              @click="clearFilter(key)"
              class="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
          <button 
            @click="clearAllFilters"
            class="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Bookings List -->
      <div class="space-y-6">
        <!-- Empty State -->
        <div v-if="filteredBookings.length === 0 && !loading" class="text-center py-12">
          <div class="text-6xl mb-4">🏠</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ hasActiveFilters ? 'No bookings match your filters' : 'No bookings yet' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ hasActiveFilters ? 'Try adjusting your search criteria' : 'Start exploring properties and make your first booking!' }}
          </p>
          <NuxtLink 
            v-if="!hasActiveFilters"
            to="/properties" 
            class="btn-primary"
          >
            Browse Properties
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
                    <p class="text-gray-600 mb-2">
                      📍 {{ formatLocation(booking.property.city, booking.property.state, booking.property.country) }}
                    </p>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📅 {{ booking.dates }}</span>
                      <span>👥 {{ booking.guests }} guest(s)</span>
                      <span>💰 ${{ booking.total }}/night</span>
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
                      :to="`/booking/${booking.id}`"
                      class="btn-outline text-center"
                    >
                      View Details
                    </NuxtLink>
                    
                    <button 
                      v-if="booking.status === 'pending'"
                      @click="cancelBooking(booking.id)"
                      class="btn-outline text-red-600 border-red-300 hover:bg-red-50 text-center"
                    >
                      Cancel
                    </button>
                    
                    <button 
                      v-if="booking.status === 'confirmed' && isUpcoming(booking.checkIn)"
                      @click="modifyBooking(booking.id)"
                      class="btn-outline text-blue-600 border-blue-300 hover:bg-blue-50 text-center"
                    >
                      Modify
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
                    <span class="text-gray-500">Booked on:</span>
                    <span class="ml-2 text-gray-700">{{ formatDate(booking.created_at) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Total nights:</span>
                    <span class="ml-2 text-gray-700">{{ calculateNights(booking.checkIn, booking.checkOut) }}</span>
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
              class="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:opacity-50"
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
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10

// Filters
const filters = ref({
  search: '',
  status: '',
  dateRange: ''
})

// Computed
const filteredBookings = computed(() => {
  let filtered = bookings.value

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(booking => 
      booking.propertyName.toLowerCase().includes(search) ||
      formatLocation(booking.property.city, booking.property.state, booking.property.country).toLowerCase().includes(search)
    )
  }

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(booking => 
      booking.status.toLowerCase() === filters.value.status.toLowerCase()
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
  return filters.value.search || filters.value.status || filters.value.dateRange
})

const activeFilters = computed(() => {
  const active = {}
  if (filters.value.search) active['Search'] = filters.value.search
  if (filters.value.status) active['Status'] = filters.value.status
  if (filters.value.dateRange) active['Date Range'] = filters.value.dateRange
  return active
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
const formatLocation = (city, state, country) => {
  const parts = [city, state, country].filter(Boolean)
  return parts.join(', ')
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

const isUpcoming = (checkIn) => {
  if (!checkIn) return false
  return new Date(checkIn) > new Date()
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

const clearFilter = (key) => {
  switch (key) {
    case 'Search':
      filters.value.search = ''
      break
    case 'Status':
      filters.value.status = ''
      break
    case 'Date Range':
      filters.value.dateRange = ''
      break
  }
  currentPage.value = 1
}

const clearAllFilters = () => {
  filters.value = {
    search: '',
    status: '',
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

const cancelBooking = async (bookingId) => {
  if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
    
    if (error) throw error
    
    // Refresh bookings
    await fetchBookings()
    
    // Show success message
    alert('Booking cancelled successfully!')
    
  } catch (error) {
    console.error('Error cancelling booking:', error)
    alert('Failed to cancel booking. Please try again.')
  }
}

const modifyBooking = (bookingId) => {
  // Navigate to booking modification page
  navigateTo(`/booking/${bookingId}/modify`)
}

// Fetch bookings
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
    
    // Fetch user's bookings
    const { data, error } = await client
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
      .eq('guest_id', authUser.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Process bookings data
    bookings.value = data.map(booking => ({
      id: booking.id,
      propertyName: booking.property.title,
      propertyImage: booking.property.images?.[0] || '/placeholder-property.jpg',
      property: booking.property,
      dates: `${new Date(booking.check_in_date).toLocaleDateString()} - ${new Date(booking.check_out_date).toLocaleDateString()}`,
      checkIn: booking.check_in_date,
      checkOut: booking.check_out_date,
      guests: 1, // You can add guest count to bookings table if needed
      total: booking.total_amount,
      status: booking.status,
      created_at: booking.created_at
    }))
    
    // Calculate total pages
    totalPages.value = Math.ceil(filteredBookings.value.length / itemsPerPage)
    
    console.log('Bookings fetched:', bookings.value)
    
  } catch (error) {
    console.error('Error fetching bookings:', error)
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
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors;
}

.btn-outline {
  @apply border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors;
}
</style> 