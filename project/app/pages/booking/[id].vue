<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <NuxtLink to="/property/1" class="text-gray-700 hover:text-blue-600">Luxury Beach Resort</NuxtLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-500">Book Your Stay</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Booking Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Property Summary -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center space-x-4">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Luxury Beach Resort" class="w-20 h-20 object-cover rounded-lg">
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Luxury Beach Resort</h2>
                <p class="text-gray-600">📍 Malibu Beach, California</p>
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

          <!-- Date Selection -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Select Your Dates</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <input type="date" class="form-input" v-model="checkInDate" min="2024-01-01">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <input type="date" class="form-input" v-model="checkOutDate" :min="checkInDate">
              </div>
            </div>
            <div class="mt-4 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-blue-800 text-sm">
                  Selected: {{ bookingSummary.nights }} night{{ bookingSummary.nights !== 1 ? 's' : '' }} • 
                  {{ formatDate(checkInDate) }} - {{ formatDate(checkOutDate) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Room Selection -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Choose Your Room</h3>
            <div class="space-y-4">
              <div v-for="room in availableRooms" :key="room.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                   :class="{ 'border-blue-500 bg-blue-50': selectedRoom === room.id }"
                   @click="selectedRoom = room.id">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img :src="room.image" :alt="room.name" class="w-16 h-16 object-cover rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">{{ room.name }}</h4>
                      <p class="text-gray-600 text-sm">{{ room.description }}</p>
                      <div class="flex items-center space-x-4 mt-1">
                        <span class="text-sm text-gray-500">👥 {{ room.maxGuests }} guests</span>
                        <span class="text-sm text-gray-500">🛏️ {{ room.beds }} bed{{ room.beds !== 1 ? 's' : '' }}</span>
                        <span class="text-sm text-gray-500">🛁 {{ room.bathrooms }} bathroom{{ room.bathrooms !== 1 ? 's' : '' }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xl font-bold text-blue-600">${{ room.price }}</p>
                    <p class="text-gray-500 text-sm">per night</p>
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
                <input type="text" class="form-input" v-model="guestInfo.firstName" placeholder="Enter first name">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" class="form-input" v-model="guestInfo.lastName" placeholder="Enter last name">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" class="form-input" v-model="guestInfo.email" placeholder="Enter email address">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" class="form-input" v-model="guestInfo.phone" placeholder="Enter phone number">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <textarea class="form-textarea" v-model="guestInfo.specialRequests" 
                          placeholder="Any special requests or requirements?" rows="3"></textarea>
              </div>
            </div>
          </div>

          <!-- Additional Services -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Additional Services</h3>
            <div class="space-y-3">
              <div v-for="service in additionalServices" :key="service.id" 
                   class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" :id="service.id" v-model="service.selected" 
                         class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                  <label :for="service.id" class="text-sm font-medium text-gray-700">{{ service.name }}</label>
                </div>
                <span class="text-sm font-medium text-gray-900">${{ service.price }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h3 class="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Room rate</span>
                  <span>${{ bookingSummary.selectedRoomPrice }} × {{ bookingSummary.nights }} nights</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Additional services</span>
                  <span>${{ bookingSummary.additionalServicesTotal }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Service fee</span>
                  <span>${{ bookingSummary.serviceFee }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Taxes</span>
                  <span>${{ bookingSummary.taxes }}</span>
                </div>
                <div class="border-t border-gray-200 pt-2">
                  <div class="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${{ bookingSummary.totalAmount }}</span>
                  </div>
                </div>
              </div>

              <button @click="proceedToPayment" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                Proceed to Payment
              </button>

              <div class="mt-4 text-center">
                <p class="text-xs text-gray-500">
                  You won't be charged until you confirm your booking
                </p>
              </div>

              <!-- Cancellation Policy -->
              <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-2">Cancellation Policy</h4>
                <p class="text-sm text-gray-600">
                  Free cancellation up to 24 hours before check-in. 
                  No refunds for cancellations made within 24 hours of arrival.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const checkInDate = ref('2024-01-15')
const checkOutDate = ref('2024-01-18')
const selectedRoom = ref(1)

const guestInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialRequests: ''
})

const availableRooms = ref([
  {
    id: 1,
    name: 'Ocean View Suite',
    description: 'Spacious suite with panoramic ocean views',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 299,
    maxGuests: 4,
    beds: 2,
    bathrooms: 2
  },
  {
    id: 2,
    name: 'Garden Villa',
    description: 'Private villa surrounded by tropical gardens',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 399,
    maxGuests: 6,
    beds: 3,
    bathrooms: 2
  },
  {
    id: 3,
    name: 'Beachfront Bungalow',
    description: 'Cozy bungalow steps from the beach',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 199,
    maxGuests: 2,
    beds: 1,
    bathrooms: 1
  }
])

const additionalServices = ref([
  { id: 1, name: 'Airport Transfer', price: 75, selected: false },
  { id: 2, name: 'Spa Package', price: 120, selected: false },
  { id: 3, name: 'Dinner Reservation', price: 85, selected: false },
  { id: 4, name: 'Car Rental', price: 95, selected: false },
  { id: 5, name: 'Guided Tour', price: 65, selected: false }
])

const bookingSummary = computed(() => {
  const start = new Date(checkInDate.value)
  const end = new Date(checkOutDate.value)
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  
  const selectedRoomData = availableRooms.value.find(room => room.id === selectedRoom.value)
  const roomPrice = selectedRoomData ? selectedRoomData.price : 0
  
  const servicesTotal = additionalServices.value
    .filter(service => service.selected)
    .reduce((sum, service) => sum + service.price, 0)
  
  const subtotal = roomPrice * nights + servicesTotal
  const serviceFee = Math.round(subtotal * 0.05)
  const taxes = Math.round(subtotal * 0.08)
  const total = subtotal + serviceFee + taxes
  
  return {
    nights,
    selectedRoomPrice: roomPrice,
    additionalServicesTotal: servicesTotal,
    serviceFee,
    taxes,
    totalAmount: total
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const proceedToPayment = () => {
  // Handle payment processing
  alert('Redirecting to payment gateway...')
}
</script>

<style scoped>
/* Custom styles for the booking page */
.sticky {
  position: sticky;
  top: 2rem;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
</style> 