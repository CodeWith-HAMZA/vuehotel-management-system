<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Properties</h1>
            <p class="text-gray-600 mt-1">Manage and monitor all your listed properties</p>
          </div>
          <NuxtLink to="/list-property" class="btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add New Property
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse space-y-6">
        <div class="h-12 bg-gray-200 rounded w-1/3"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="bg-white rounded-2xl shadow-lg p-6">
            <div class="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-6 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Properties</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalProperties }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Active Bookings</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.activeBookings }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p class="text-2xl font-bold text-gray-900">${{ stats.monthlyRevenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Average Rating</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.averageRating }}/5</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Properties Grid -->
      <div v-if="properties.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🏠</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No properties listed yet</h3>
        <p class="text-gray-600 mb-6">Start listing your properties to earn money from guests!</p>
        <NuxtLink to="/list-property" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Your First Property
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="property in properties" 
          :key="property.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <!-- Property Image -->
          <div class="relative">
            <img 
              :src="property.image" 
              :alt="property.name"
              class="w-full h-48 object-cover"
            >
            <div class="absolute top-4 right-4">
              <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>

          <!-- Property Details -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ property.name }}</h3>
            <p class="text-gray-600 mb-3">
              📍 {{ property.location }}
            </p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="text-2xl font-bold text-blue-600">${{ property.price }}</div>
              <div class="text-sm text-gray-500">per night</div>
            </div>

            <!-- Property Stats -->
            <div class="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div class="text-center">
                <div class="font-medium text-gray-900">{{ property.bookings }}</div>
                <div class="text-gray-500">Bookings</div>
              </div>
              <div class="text-center">
                <div class="font-medium text-gray-900">{{ property.occupancy }}%</div>
                <div class="text-gray-500">Occupancy</div>
              </div>
              <div class="text-center">
                <div class="font-medium text-gray-900">{{ property.rating }}</div>
                <div class="text-gray-500">Rating</div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex space-x-2">
              <NuxtLink 
                :to="`/owner/property/${property.id}`"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium text-center transition-colors"
              >
                Manage
              </NuxtLink>
              <button 
                @click="editProperty(property.id)"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
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
const properties = ref([])
const stats = ref({
  totalProperties: 0,
  activeBookings: 0,
  monthlyRevenue: 0,
  averageRating: 0
})

// Fetch owner properties
const fetchProperties = async () => {
  loading.value = true
  
  try {
    // Get current user
    const { data: { user: authUser }, error: userError } = await client.auth.getUser()
    
    if (userError || !authUser) {
      console.error('User not authenticated:', userError)
      return
    }
    
    user.value = authUser
    
    // Fetch properties
    const { data, error } = await client
      .from('properties')
      .select('*')
      .eq('owner_id', authUser.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Process properties with additional data
    properties.value = data.map(property => ({
      id: property.id,
      name: property.title,
      location: `${property.city}, ${property.state}`,
      image: property.images?.[0] || '/placeholder-property.jpg',
      price: property.price_per_night,
      bookings: 0, // Will be updated
      occupancy: 0, // Will be calculated
      rating: 4.5 // Placeholder
    }))
    
    // Fetch booking stats for properties
    if (properties.value.length > 0) {
      const propertyIds = properties.value.map(p => p.id)
      const { data: bookings, error: bookingsError } = await client
        .from('bookings')
        .select('*')
        .in('property_id', propertyIds)
      
      if (!bookingsError && bookings) {
        // Update property stats
        properties.value = properties.value.map(property => {
          const propertyBookings = bookings.filter(b => b.property_id === property.id)
          const confirmedBookings = propertyBookings.filter(b => b.status === 'confirmed')
          
          return {
            ...property,
            bookings: propertyBookings.length,
            occupancy: calculateOccupancy(confirmedBookings),
            rating: calculateAverageRating(propertyBookings)
          }
        })
        
        // Calculate overall stats
        const totalBookings = bookings.length
        const activeBookings = bookings.filter(b => b.status === 'confirmed').length
        const monthlyRevenue = calculateMonthlyRevenue(bookings)
        
        stats.value = {
          totalProperties: properties.value.length,
          activeBookings,
          monthlyRevenue,
          averageRating: 4.5 // Placeholder
        }
      }
    }
    
    console.log('Properties fetched:', properties.value)
    
  } catch (error) {
    console.error('Error fetching properties:', error)
  } finally {
    loading.value = false
  }
}

// Helper functions
const calculateOccupancy = (confirmedBookings) => {
  if (confirmedBookings.length === 0) return 0
  
  const totalNights = confirmedBookings.reduce((sum, booking) => {
    const checkIn = new Date(booking.check_in_date)
    const checkOut = new Date(booking.check_out_date)
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    return sum + nights
  }, 0)
  
  // Assuming 30 days per month for calculation
  return Math.round((totalNights / 30) * 100)
}

const calculateAverageRating = (bookings) => {
  // Placeholder - you can implement actual rating calculation
  return 4.5
}

const calculateMonthlyRevenue = (bookings) => {
  const thisMonth = new Date()
  thisMonth.setDate(1)
  
  return bookings
    .filter(b => b.status === 'confirmed' && new Date(b.created_at) >= thisMonth)
    .reduce((sum, booking) => sum + parseFloat(booking.total_amount), 0)
}

const editProperty = (propertyId) => {
  // Navigate to edit property page
  navigateTo(`/owner/property/${propertyId}/edit`)
}

// Lifecycle
onMounted(() => {
  fetchProperties()
})
</script>

<style scoped>
/* Button styles */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center;
}
</style> 