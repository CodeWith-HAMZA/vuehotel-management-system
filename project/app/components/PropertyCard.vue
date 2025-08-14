<template>
  <NuxtLink :to="`/property/${property.id}`" class="group block">
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
      <!-- Property Image -->
      <div class="h-48 relative overflow-hidden">
        <img 
          v-if="property.images && property.images.length > 0"
          :src="property.images[0]"
          :alt="property.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        >
        <div v-else class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <span class="text-white text-2xl">🏠</span>
        </div>
        
        <!-- Price Badge -->
        <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
          ${{ property.price_per_night }}/night
        </div>
        
        <!-- Property Type Badge -->
        <div class="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {{ formatPropertyType(property.property_type) }}
        </div>

        <!-- Special Badges -->
        <div v-if="showPopular" class="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          ⭐ Popular
        </div>
        
        <div v-if="showNoSmoking" class="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          🏢 Apartment
        </div>
        
        <div v-if="showPetFriendly" class="absolute top-4 left-4 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          🏠 House
        </div>
        
        <div v-if="showLuxury" class="absolute top-4 left-4 bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          👑 Luxury
        </div>
        
        <div v-if="showBudget" class="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          💰 Budget
        </div>

        <!-- Rating Badge -->
        <div v-if="property.rating" class="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
          ⭐ {{ property.rating }}/5
        </div>
        <!-- Fallback Rating Badge -->
        <div v-else class="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
          ⭐ 4.5/5
        </div>
      </div>
      
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {{ property.title }}
        </h3>
        
        <p class="text-gray-600 mb-2 flex items-center">
          <span class="mr-1">📍</span>
          <span class="line-clamp-1">
            {{ formatLocation(property.city, property.state, property.country) }}
          </span>
        </p>
        
        <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>🛏️ {{ property.bedrooms || 'N/A' }} {{ (property.bedrooms || 0) === 1 ? 'bed' : 'beds' }}</span>
          <span>🛁 {{ property.bathrooms || 'N/A' }} {{ (property.bathrooms || 0) === 1 ? 'bath' : 'baths' }}</span>
          <span>👥 {{ property.max_guests || 'N/A' }} {{ (property.max_guests || 0) === 1 ? 'guest' : 'guests' }}</span>
        </div>
        
        <!-- Amenities Preview -->
        <div v-if="property.amenities && property.amenities.length > 0" class="flex flex-wrap gap-1 mb-3">
          <span 
            v-for="amenity in property.amenities.slice(0, 3)" 
            :key="amenity"
            class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            {{ formatAmenity(amenity) }}
          </span>
          <span v-if="property.amenities.length > 3" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{{ property.amenities.length - 3 }} more
          </span>
        </div>
        
        <!-- House Rules -->
        <div class="flex flex-wrap gap-1 mb-3">
          <!-- Since we don't have these fields in the database, we'll show some common amenities instead -->
          <span v-if="property.amenities && property.amenities.includes('free_wifi')" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            📶 WiFi
          </span>
          <span v-if="property.amenities && property.amenities.includes('free_parking')" class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
            🚗 Parking
          </span>
          <span v-if="property.amenities && property.amenities.includes('kitchen')" class="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
            🍳 Kitchen
          </span>
          <span v-if="property.amenities && property.amenities.includes('swimming_pool')" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            🏊 Pool
          </span>
        </div>
        
        <!-- Owner Info -->
        <div class="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
          <span>Listed {{ formatDate(property.created_at) }}</span>
          <span v-if="property.owner" class="flex items-center">
            <span class="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-1">
              <span class="text-blue-600 text-xs font-medium">
                {{ getOwnerInitials(property.owner) }}
              </span>
            </span>
            {{ property.owner.first_name }}
          </span>
        </div>

        <!-- Additional Info for Special Cards -->
        <div v-if="showPopular" class="mt-2 text-xs text-blue-600">
          📊 Popular property with great reviews
        </div>
        
        <div v-if="showLuxury" class="mt-2 text-xs text-yellow-600">
          💎 Premium amenities included
        </div>
        
        <div v-if="showBudget" class="mt-2 text-xs text-green-600">
          💰 Great value for money
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
// Props
const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  showPopular: {
    type: Boolean,
    default: false
  },
  showNoSmoking: {
    type: Boolean,
    default: false
  },
  showPetFriendly: {
    type: Boolean,
    default: false
  },
  showLuxury: {
    type: Boolean,
    default: false
  },
  showBudget: {
    type: Boolean,
    default: false
  }
})

// Methods
const formatPropertyType = (type) => {
  const typeMap = {
    'hotel': 'Hotel',
    'hostel': 'Hostel',
    'room': 'Room',
    'home': 'Home',
    'house': 'House',
    'apartment': 'Apartment',
    'villa': 'Villa',
    'cabin': 'Cabin',
    'condo': 'Condo',
    'loft': 'Loft',
    'studio': 'Studio'
  }
  return typeMap[type] || type
}

const formatLocation = (city, state, country) => {
  const parts = [city, state, country].filter(Boolean)
  return parts.join(', ')
}

const formatAmenity = (amenity) => {
  const amenityMap = {
    'swimming_pool': 'Pool',
    'free_parking': 'Parking',
    'free_wifi': 'WiFi',
    'kitchen': 'Kitchen',
    'gym': 'Gym',
    'service_24_7': '24/7 Service',
    'beach_access': 'Beach',
    'spa': 'Spa',
    'pet_friendly': 'Pet Friendly',
    'air_conditioning': 'AC',
    'heating': 'Heating',
    'tv': 'TV',
    'washer': 'Washer',
    'dryer': 'Dryer',
    'workspace': 'Workspace',
    'balcony': 'Balcony',
    'fireplace': 'Fireplace',
    'elevator': 'Elevator',
    'breakfast': 'Breakfast',
    'cleaning': 'Cleaning'
  }
  return amenityMap[amenity] || amenity
}

const formatDate = (dateString) => {
  if (!dateString) return 'recently'
  
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
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
</style> 