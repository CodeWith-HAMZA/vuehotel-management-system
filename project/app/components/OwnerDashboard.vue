<template>
  <div>
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <p v-if="stats.totalProperties === 0" class="text-xs text-gray-500">List properties to get started</p>
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
            <p class="text-sm font-medium text-gray-600">Total Revenue</p>
            <p class="text-2xl font-bold text-gray-900">${{ stats.totalRevenue.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    <!-- Main Dashboard Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Activity -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Pending Booking Requests -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Pending Booking Requests</h3>
            <NuxtLink to="/owner/bookings" class="text-blue-600 hover:text-blue-700 font-medium">View All</NuxtLink>
          </div>
          
          <div v-if="pendingBookings.length === 0" class="text-center py-8">
            <div class="text-4xl mb-4">📋</div>
            <h4 class="text-lg font-medium text-gray-900 mb-2">No pending requests</h4>
            <p class="text-gray-600 mb-4">All booking requests have been processed!</p>
            <p class="text-sm text-gray-500">This could mean:</p>
            <ul class="text-sm text-gray-500 mt-2">
              <li>• You don't have any properties listed yet</li>
              <li>• All bookings have been approved/rejected</li>
              <li>• No guests have booked your properties</li>
            </ul>
            <div v-if="userProperties.length === 0" class="mt-4">
              <NuxtLink to="/list-property" class="btn-primary">Add Your First Property</NuxtLink>
            </div>
          </div>
          
          <div v-else class="space-y-4">
            <div v-for="booking in pendingBookings.slice(0, 5)" :key="booking.id" 
                 class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div class="flex items-center space-x-4">
                <img :src="booking.propertyImage" :alt="booking.propertyName" 
                     class="w-16 h-16 object-cover rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">{{ booking.propertyName }}</h4>
                  <p class="text-sm text-gray-600">{{ booking.dates }}</p>
                  <p class="text-sm text-gray-500">{{ booking.guestName }} • {{ booking.guests }} guest(s)</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ booking.total }}</p>
                <div class="mt-2 space-x-2">
                  <button @click="approveBooking(booking.id)" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium">
                    Approve
                  </button>
                  <button @click="rejectBooking(booking.id)" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- My Properties -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">My Properties</h3>
            <NuxtLink to="/owner/properties" class="text-blue-600 hover:text-blue-700 font-medium">Manage All</NuxtLink>
          </div>
          
          <div v-if="userProperties.length === 0" class="text-center py-8">
            <div class="text-4xl mb-4">🏠</div>
            <h4 class="text-lg font-medium text-gray-900 mb-2">No properties listed yet</h4>
            <p class="text-gray-600 mb-4">Start listing your properties to earn money!</p>
            <p class="text-sm text-gray-500 mb-4">Once you list properties, you'll see:</p>
            <ul class="text-sm text-gray-500 mb-4 text-left max-w-md mx-auto">
              <li>• Booking requests from guests</li>
              <li>• Revenue tracking</li>
              <li>• Property performance metrics</li>
            </ul>
            <NuxtLink to="/list-property" class="btn-primary">Add First Property</NuxtLink>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="property in userProperties.slice(0, 4)" :key="property.id" 
                 class="border border-gray-200 rounded-lg p-4 hover:border-blue-300">
              <div class="flex items-center space-x-4">
                <img :src="property.image" :alt="property.name" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ property.name }}</h4>
                  <p class="text-sm text-gray-600">{{ property.location }}</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <span class="text-sm text-gray-500">${{ property.price }}/night</span>
                    <span class="text-sm text-gray-500">{{ property.bookings }} bookings</span>
                  </div>
                </div>
                <div class="text-right">
                  <NuxtLink :to="`/owner/property/${property.id}`" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Manage
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Revenue -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Recent Revenue</h3>
            <NuxtLink to="/owner/analytics" class="text-blue-600 hover:text-blue-700 font-medium">View Analytics</NuxtLink>
          </div>
          
          <div class="space-y-4">
            <div v-for="revenue in recentRevenue.slice(0, 5)" :key="revenue.id" 
                 class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ revenue.propertyName }}</p>
                  <p class="text-sm text-gray-600">{{ revenue.bookingDate }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-green-600">+${{ revenue.amount }}</p>
                <p class="text-xs text-gray-500">{{ revenue.status }}</p>
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
            <NuxtLink to="/list-property" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <span class="text-gray-700 group-hover:text-gray-900">Add New Property</span>
              </div>
            </NuxtLink>
            
            <NuxtLink to="/owner/bookings" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                  </svg>
                </div>
                <span class="text-gray-700 group-hover:text-gray-900">Manage Bookings</span>
              </div>
            </NuxtLink>
            
            <NuxtLink to="/owner/properties" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <span class="text-gray-700 group-hover:text-gray-900">My Properties</span>
              </div>
            </NuxtLink>
            
            <NuxtLink to="/owner/analytics" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <span class="text-gray-700 group-hover:text-gray-900">View Analytics</span>
              </div>
            </NuxtLink>
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

        <!-- Performance Summary -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h4 class="font-medium text-gray-900 mb-4">Performance Summary</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">This Month</span>
              <span class="text-sm font-medium">${{ stats.monthlyRevenue.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Occupancy Rate</span>
              <span class="text-sm font-medium">{{ stats.occupancyRate }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Response Time</span>
              <span class="text-sm font-medium">{{ stats.responseTime }}h</span>
            </div>
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
  totalProperties: 0,
  totalRevenue: 0,
  totalBookings: 0,
  averageRating: 0,
  monthlyRevenue: 0,
  occupancyRate: 0,
  responseTime: 0
})

const pendingBookings = ref([])
const userProperties = ref([])
const recentRevenue = ref([])
const notifications = ref([])

// Fetch owner dashboard data
const fetchOwnerData = async () => {
  try {
    // Fetch owner's properties
    const { data: properties, error: propertiesError } = await client
      .from('properties')
      .select('*')
      .eq('owner_id', props.user.id)
    
    if (propertiesError) throw propertiesError
    
    userProperties.value = properties.map(property => ({
      id: property.id,
      name: property.title,
      location: `${property.city}, ${property.state}`,
      image: property.images?.[0] || '/placeholder-property.jpg',
      price: property.price_per_night,
      bookings: 0 // Will be updated when we fetch bookings
    }))
    
    // Fetch bookings for owner's properties
    const { data: bookings, error: bookingsError } = await client
      .from('bookings')
      .select('*')
      .in('property_id', properties.map(p => p.id))
      .order('created_at', { ascending: false })
    
    if (bookingsError) throw bookingsError
    
    // Now fetch property and guest details separately if needed
    let propertyMap = {}
    let guestMap = {}
    
    if (bookings && bookings.length > 0) {
      // Fetch property details for these bookings
      const propertyIds = [...new Set(bookings.map(b => b.property_id))]
      const { data: propertyDetails, error: propertyError } = await client
        .from('properties')
        .select('id, title, images')
        .in('id', propertyIds)
      
      if (!propertyError && propertyDetails) {
        propertyDetails.forEach(prop => {
          propertyMap[prop.id] = prop
        })
        
        // Fetch guest details
        const guestIds = [...new Set(bookings.map(b => b.guest_id))]
        const { data: guestDetails, error: guestError } = await client
          .from('users')
          .select('id, first_name, last_name')
          .in('id', guestIds)
        
        if (!guestError && guestDetails) {
          guestDetails.forEach(guest => {
            guestMap[guest.id] = guest
          })
          
          // Now process the data with the fetched details
          pendingBookings.value = bookings
            .filter(booking => booking.status === 'pending')
            .map(booking => ({
              id: booking.id,
              propertyName: propertyMap[booking.property_id]?.title || 'Unknown Property',
              propertyImage: propertyMap[booking.property_id]?.images?.[0] || '/placeholder-property.jpg',
              dates: `${new Date(booking.check_in_date).toLocaleDateString()} - ${new Date(booking.check_out_date).toLocaleDateString()}`,
              guestName: `${guestMap[booking.guest_id]?.first_name || 'Unknown'} ${guestMap[booking.guest_id]?.last_name || 'Guest'}`,
              guests: 1,
              total: booking.total_amount
            }))
        }
      }
    }
    
    // Process recent revenue
    if (bookings && bookings.length > 0 && propertyMap) {
      recentRevenue.value = bookings
        .filter(booking => booking.status === 'confirmed')
        .slice(0, 5)
        .map(booking => ({
          id: booking.id,
          propertyName: propertyMap[booking.property_id]?.title || 'Unknown Property',
          amount: booking.total_amount,
          bookingDate: new Date(booking.created_at).toLocaleDateString(),
          status: 'Confirmed'
        }))
    }
    
    // Calculate statistics
    stats.value.totalProperties = properties.length
    stats.value.totalBookings = bookings.length
    stats.value.totalRevenue = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, booking) => sum + parseFloat(booking.total_amount), 0)
    
    // Calculate monthly revenue
    const thisMonth = new Date()
    thisMonth.setDate(1)
    stats.value.monthlyRevenue = bookings
      .filter(b => b.status === 'confirmed' && new Date(b.created_at) >= thisMonth)
      .reduce((sum, booking) => sum + parseFloat(booking.total_amount), 0)
    
    // Calculate occupancy rate (simplified)
    const totalNights = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, booking) => {
        const checkIn = new Date(booking.check_in_date)
        const checkOut = new Date(booking.check_out_date)
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
        return sum + nights
      }, 0)
    
    const totalPropertyNights = properties.length * 30 // Assuming 30 days per month
    stats.value.occupancyRate = totalPropertyNights > 0 ? Math.round((totalNights / totalPropertyNights) * 100) : 0
    
    // Placeholder values
    stats.value.averageRating = 4.8
    stats.value.responseTime = 2
    
    // Generate notifications
    notifications.value = generateNotifications(bookings, properties)
    
    // Update property booking counts
    userProperties.value = userProperties.value.map(property => ({
      ...property,
      bookings: bookings.filter(b => b.property_id === property.id).length
    }))
    
  } catch (error) {
    console.error('Error fetching owner data:', error)
  }
}

// Generate notifications based on owner activity
const generateNotifications = (bookings, properties) => {
  const notifications = []
  
  // Check for new booking requests
  const newBookings = bookings.filter(booking => 
    booking.status === 'pending' && 
    new Date(booking.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
  )
  
  if (newBookings.length > 0) {
    notifications.push({
      id: 'new-bookings',
      type: 'info',
      message: `You have ${newBookings.length} new booking request${newBookings.length > 1 ? 's' : ''} to review.`,
      time: 'Just now'
    })
  }
  
  // Check for confirmed bookings
  const confirmedBookings = bookings.filter(booking => 
    booking.status === 'confirmed' && 
    new Date(booking.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
  )
  
  if (confirmedBookings.length > 0) {
    notifications.push({
      id: 'confirmed-bookings',
      type: 'success',
      message: `${confirmedBookings.length} booking${confirmedBookings.length > 1 ? 's' : ''} confirmed!`,
      time: 'Just now'
    })
  }
  
  // Check for pending bookings (any pending bookings)
  const pendingBookings = bookings.filter(booking => booking.status === 'pending')
  if (pendingBookings.length > 0) {
    notifications.push({
      id: 'pending-bookings',
      type: 'warning',
      message: `You have ${pendingBookings.length} pending booking request${pendingBookings.length > 1 ? 's' : ''} waiting for your approval.`,
      time: 'Just now'
    })
  }
  
  // Add welcome notification for new owners
  if (properties.length === 0) {
    notifications.push({
      id: 'welcome-owner',
      type: 'success',
      message: 'Welcome to Explore & Go! Start listing your properties to earn money.',
      time: 'Just now'
    })
  }
  
  // Add notification if no notifications were generated
  if (notifications.length === 0) {
    notifications.push({
      id: 'no-activity',
      type: 'info',
      message: 'No recent activity. Your dashboard will update as you receive bookings.',
      time: 'Just now'
    })
  }
  
  return notifications
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
const approveBooking = async (bookingId) => {
  if (!confirm('Are you sure you want to approve this booking?')) return
  
  try {
    const { error } = await client
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', bookingId)
    
    if (error) throw error
    
    // Refresh data
    await fetchOwnerData()
    emit('refresh-data')
    
    // Show success message
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
    
    // Refresh data
    await fetchOwnerData()
    emit('refresh-data')
    
    // Show success message
    alert('Booking rejected successfully!')
    
  } catch (error) {
    console.error('Error rejecting booking:', error)
    alert('Failed to reject booking. Please try again.')
  }
}

// Lifecycle
onMounted(() => {
  fetchOwnerData()
})

// Watch for user changes
watch(() => props.user, () => {
  if (props.user) {
    fetchOwnerData()
  }
})
</script>

<style scoped>
/* Button styles */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors;
}
</style> 