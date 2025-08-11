<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Dashboard Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-600 mt-1">Welcome back, {{ userName }}!</p>
          </div>
          <div class="flex space-x-3">
            <button v-if="userRole === 'owner'" @click="showAddPropertyModal = true" class="btn-primary">
              + Add New Property
            </button>
            <button class="btn-outline">View Profile</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <p class="text-sm font-medium text-gray-600">Revenue</p>
              <p class="text-2xl font-bold text-gray-900">${{ stats.revenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Rating</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.rating }}/5</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ userRole === 'owner' ? 'Properties' : 'Favorites' }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ userRole === 'owner' ? stats.totalProperties : stats.favorites }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Activity -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Recent Bookings -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <button class="text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            
            <div class="space-y-4">
              <div v-for="booking in recentBookings" :key="booking.id" 
                   class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div class="flex items-center space-x-4">
                  <img :src="booking.propertyImage" :alt="booking.propertyName" 
                       class="w-16 h-16 object-cover rounded-lg">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ booking.propertyName }}</h4>
                    <p class="text-sm text-gray-600">{{ booking.dates }}</p>
                    <p class="text-sm text-gray-500">{{ booking.guests }} guests</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-900">${{ booking.total }}</p>
                  <span :class="getStatusClass(booking.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                    {{ booking.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Property Management (Owner Only) -->
          <div v-if="userRole === 'owner'" class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">My Properties</h3>
              <button @click="showAddPropertyModal = true" class="btn-primary">+ Add Property</button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="property in userProperties" :key="property.id" 
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
                    <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Trips (Client Only) -->
          <div v-if="userRole === 'client'" class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Upcoming Trips</h3>
              <button class="text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            
            <div class="space-y-4">
              <div v-for="trip in upcomingTrips" :key="trip.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:border-blue-300">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img :src="trip.propertyImage" :alt="trip.propertyName" 
                         class="w-16 h-16 object-cover rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">{{ trip.propertyName }}</h4>
                      <p class="text-sm text-gray-600">{{ trip.dates }}</p>
                      <p class="text-sm text-gray-500">{{ trip.guests }} guests</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">${{ trip.total }}</p>
                    <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
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
              <button class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span class="text-gray-700">Book New Stay</span>
                </div>
              </button>
              
              <button v-if="userRole === 'owner'" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span class="text-gray-700">Add New Property</span>
                </div>
              </button>
              
              <button class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span class="text-gray-700">View Reports</span>
                </div>
              </button>
              
              <button class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
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
            <div class="space-y-3">
              <div v-for="notification in notifications" :key="notification.id" 
                   class="p-3 rounded-lg" :class="getNotificationClass(notification.type)">
                <p class="text-sm text-gray-700">{{ notification.message }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showUserMenu = ref(false)
const showAddPropertyModal = ref(false)
const userRole = ref('client') // 'client' or 'owner'
const userName = ref('John Doe')
const userInitials = computed(() => userName.value.split(' ').map(n => n[0]).join(''))

const stats = ref({
  totalBookings: 24,
  revenue: 15420,
  rating: 4.8,
  totalProperties: 3,
  favorites: 12
})

const recentBookings = ref([
  {
    id: 1,
    propertyName: 'Luxury Beach Resort',
    propertyImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    dates: 'Jan 15-18, 2024',
    guests: 2,
    total: 897,
    status: 'Confirmed'
  },
  {
    id: 2,
    propertyName: 'Mountain View Cabin',
    propertyImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    dates: 'Jan 22-25, 2024',
    guests: 4,
    total: 650,
    status: 'Pending'
  }
])

const userProperties = ref([
  {
    id: 1,
    name: 'Luxury Beach Resort',
    location: 'Malibu, CA',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 299,
    bookings: 15
  },
  {
    id: 2,
    name: 'Mountain View Cabin',
    location: 'Aspen, CO',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 199,
    bookings: 8
  }
])

const upcomingTrips = ref([
  {
    id: 1,
    propertyName: 'Luxury Beach Resort',
    propertyImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    dates: 'Jan 15-18, 2024',
    guests: 2,
    total: 897
  }
])

const notifications = ref([
  {
    id: 1,
    type: 'success',
    message: 'Your booking at Luxury Beach Resort has been confirmed!',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'info',
    message: 'New review received for Mountain View Cabin',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'warning',
    message: 'Payment pending for upcoming trip',
    time: '2 days ago'
  }
])

const getStatusClass = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-100 text-green-800'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

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
</script>

<style scoped>
/* Custom styles for the dashboard */
.sticky {
  position: sticky;
  top: 2rem;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
</style> 