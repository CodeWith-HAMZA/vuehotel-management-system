<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Stay
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing properties, hotels, and unique accommodations worldwide
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl p-2 shadow-2xl">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                <input 
                  v-model="filters.location"
                  type="text" 
                  placeholder="Where are you going?" 
                  class="px-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                <input 
                  v-model="filters.checkIn"
                  type="date" 
                  class="px-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                <input 
                  v-model="filters.checkOut"
                  type="date" 
                  class="px-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                <button 
                  @click="searchProperties"
                  :disabled="loading"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {{ loading ? '🔍' : 'Search' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        
    <!-- Quick Filters -->
    <div class="bg-white border-b border-gray-200 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-3">
          <button 
            v-for="filter in quickFilters" 
            :key="filter.key"
            @click="applyQuickFilter(filter)"
            :disabled="filtersLoading"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              isQuickFilterActive(filter.key)
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              filtersLoading ? 'opacity-50 cursor-not-allowed' : ''
            ]"
          >
            {{ filter.icon }} {{ filter.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Advanced Filters -->
    <div class="bg-white border-b border-gray-200 py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Property Type -->
          <select 
            v-model="filters.propertyType"
            @change="applyFilters"
            :disabled="filtersLoading"
            class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 disabled:opacity-50"
          >
            <option value="">All Property Types</option>
            <option value="hotel">🏨 Hotel</option>
            <option value="hostel">🏠 Hostel</option>
            <option value="room">🛏️ Room</option>
            <option value="home">🏡 Home</option>
            <option value="house">🏠 House</option>
            <option value="apartment">🏢 Apartment</option>
          </select>
          
          <!-- Price Range -->
          <select 
            v-model="filters.priceRange"
            @change="applyFilters"
            :disabled="filtersLoading"
            class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 disabled:opacity-50"
          >
            <option value="">All Prices</option>
            <option value="0-50">💰 $0 - $50</option>
            <option value="50-100">💰 $50 - $100</option>
            <option value="100-200">💰 $100 - $200</option>
            <option value="200+">💰 $200+</option>
          </select>
          
          <!-- Guests -->
          <select 
            v-model="filters.guests"
            @change="applyFilters"
            :disabled="filtersLoading"
            class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 disabled:opacity-50"
          >
            <option value="">Any Guests</option>
            <option value="1">👤 1 Guest</option>
            <option value="2">👥 2 Guests</option>
            <option value="3">👥 3 Guests</option>
            <option value="4">👥 4+ Guests</option>
          </select>
          
          <!-- Bedrooms -->
          <select 
            v-model="filters.bedrooms"
            @change="applyFilters"
            :disabled="filtersLoading"
            class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 disabled:opacity-50"
          >
            <option value="">Any Bedrooms</option>
            <option value="1">🛏️ 1 Bedroom</option>
            <option value="2">🛏️ 2 Bedrooms</option>
            <option value="3">🛏️ 3 Bedrooms</option>
            <option value="4">🛏️ 4+ Bedrooms</option>
          </select>
        </div>
        
        <!-- Amenities & Rules Filters -->
        <div class="mt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Amenities & Rules:</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="amenity in amenityFilters" 
              :key="amenity.key"
              @click="toggleAmenityFilter(amenity.key)"
              :disabled="filtersLoading"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                filters.amenities.includes(amenity.key)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                filtersLoading ? 'opacity-50 cursor-not-allowed' : ''
              ]"
            >
              {{ amenity.icon }} {{ amenity.label }}
            </button>
          </div>
        </div>
        
        <!-- Clear Filters Button -->
        <div class="mt-4 flex justify-between items-center">
          <div class="text-sm text-gray-600">
            <span v-if="activeFiltersCount > 0" class="font-medium text-blue-600">
              {{ activeFiltersCount }} active filter{{ activeFiltersCount > 1 ? 's' : '' }}:
            </span>
            <span v-if="filters.propertyType" class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2 mt-1">
              Type: {{ formatPropertyType(filters.propertyType) }}
            </span>
            <span v-if="filters.priceRange" class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2 mt-1">
              Price: {{ filters.priceRange === '200+' ? '$200+' : `$${filters.priceRange}` }}
            </span>
            <span v-if="filters.guests" class="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-2 mt-1">
              Guests: {{ filters.guests }}+
            </span>
            <span v-if="filters.bedrooms" class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs mr-2 mt-1">
              Bedrooms: {{ filters.bedrooms }}+
            </span>
            <span v-if="filters.amenities.length > 0" class="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mr-2 mt-1">
              Amenities: {{ filters.amenities.length }} selected
            </span>
          </div>
          <button 
            @click="clearFilters"
            :disabled="filtersLoading"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="filtersLoading" class="inline-block animate-spin mr-2">🔄</span>
            🗑️ Clear All Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Show categorized sections only when no filters are applied -->
      <div v-if="!hasActiveFilters">
        <!-- Hotels Section -->
        <section class="mb-16">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">🏨 Premium Hotels</h2>
              <p class="text-gray-600">Luxurious accommodations with world-class amenities</p>
            </div>
            <NuxtLink to="/properties?type=hotel" class="text-blue-600 hover:text-blue-700 font-medium">
              View All Hotels →
            </NuxtLink>
          </div>
          
          <!-- Loading State for Hotels -->
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="i in 4" :key="i" class="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              <div class="h-48 bg-gray-200"></div>
              <div class="p-4">
                <div class="h-4 bg-gray-200 rounded mb-2"></div>
                <div class="h-3 bg-gray-200 rounded mb-2"></div>
                <div class="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          
          <!-- Hotels Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <PropertyCard 
              v-for="property in hotelProperties" 
              :key="property.id" 
              :property="property"
              class="transform hover:scale-105 transition-all duration-300"
            />
          </div>
          
          <!-- Empty State for Hotels -->
          <div v-if="!loading && hotelProperties.length === 0" class="text-center py-8">
            <div class="text-4xl mb-4">🏨</div>
            <p class="text-gray-600">No hotels available at the moment</p>
          </div>
        </section>

        <!-- Popular Hotels Section -->
        <section class="mb-16">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">⭐ Popular Properties</h2>
              <p class="text-gray-600">Recently added and trending properties</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyCard 
              v-for="property in popularHotels" 
              :key="property.id" 
              :property="property"
              :showPopular="true"
              class="transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </section>

        <!-- Apartments & Rooms Section -->
        <section class="mb-16">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">🏢 Apartments & Rooms</h2>
              <p class="text-gray-600">Modern apartments and cozy rooms for your stay</p>
            </div>
            <NuxtLink to="/properties?type=apartment" class="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <PropertyCard 
              v-for="property in noSmokingProperties" 
              :key="property.id" 
              :property="property"
              :showNoSmoking="true"
              class="transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </section>

        <!-- Houses & Apartments Section -->
        <section class="mb-16">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">🏠 Houses & Apartments</h2>
              <p class="text-gray-600">Spacious houses and comfortable apartments</p>
            </div>
            <NuxtLink to="/properties?type=house" class="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <PropertyCard 
              v-for="property in petFriendlyProperties" 
              :key="property.id" 
              :property="property"
              :showPetFriendly="true"
              class="transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </section>

        <!-- Luxury Properties Section -->
        <section class="mb-16">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">👑 Luxury Properties</h2>
              <p class="text-gray-600">Exclusive high-end accommodations for discerning travelers</p>
            </div>
            <NuxtLink to="/properties?luxury=true" class="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyCard 
              v-for="property in luxuryProperties" 
              :key="property.id" 
              :property="property"
              :showLuxury="true"
              class="transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </section>

        <!-- Budget Properties Section -->
        <section class="mb-16">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">💰 Budget Properties</h2>
              <p class="text-gray-600">Affordable stays without compromising comfort</p>
            </div>
            <NuxtLink to="/properties?budget=true" class="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <PropertyCard 
              v-for="property in budgetProperties" 
              :key="property.id" 
              :property="property"
              :showBudget="true"
              class="transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </section>
      </div>

      <!-- Filtered Results Header -->
      <div v-if="hasActiveFilters" class="mb-8">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-blue-900 mb-2">
                🔍 Filtered Results
                <span v-if="filtersLoading" class="ml-2 text-sm font-normal text-blue-600">
                  (Updating...)
                </span>
              </h2>
              <p class="text-blue-700">Showing properties matching your selected criteria</p>
            </div>
            <button 
              @click="clearFilters"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🗑️ Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- All Properties Section -->
      <section>
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              {{ hasActiveFilters ? 'Filtered Properties' : 'All Properties' }}
            </h2>
            <p class="text-gray-600">
              {{ hasActiveFilters 
                ? `Found ${properties.length} properties matching your criteria` 
                : 'Browse our complete collection of accommodations' 
              }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">Sort by:</span>
            <select 
              v-model="sortBy"
              @change="searchProperties"
              class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            >
              <option value="created_at">Newest First</option>
              <option value="price_per_night">Price: Low to High</option>
              <option value="price_per_night_desc">Price: High to Low</option>
              <option value="title">Name A-Z</option>
            </select>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 8" :key="i" class="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div class="h-48 bg-gray-200"></div>
            <div class="p-4">
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>

        <!-- Properties Grid -->
        <div v-else-if="properties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <PropertyCard 
            v-for="property in properties" 
            :key="property.id" 
            :property="property"
            class="transform hover:scale-105 transition-all duration-300"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">🏠</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ hasActiveFilters ? 'No properties found' : 'No properties available' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ hasActiveFilters 
              ? 'Try adjusting your search criteria or browse our featured sections above.' 
              : 'Check back later for new properties!' 
            }}
          </p>
          <button 
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center">
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
      </section>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()

// State
const properties = ref([])
const hotelProperties = ref([])
const popularHotels = ref([])
const noSmokingProperties = ref([])
const petFriendlyProperties = ref([])
const luxuryProperties = ref([])
const budgetProperties = ref([])
const loading = ref(true)
const filtersLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 12
const sortBy = ref('created_at')

// Filters
const filters = ref({
  location: '',
  checkIn: '',
  checkOut: '',
  propertyType: '',
  priceRange: '',
  guests: '',
  bedrooms: '',
  amenities: []
})

// Amenity filters
const amenityFilters = [
  { key: 'free_wifi', label: 'WiFi', icon: '📶' },
  { key: 'free_parking', label: 'Parking', icon: '🚗' },
  { key: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { key: 'swimming_pool', label: 'Pool', icon: '🏊' },
  { key: 'gym', label: 'Gym', icon: '💪' },
  { key: 'spa', label: 'Spa', icon: '🧖' },
  { key: 'beach_access', label: 'Beach', icon: '🏖️' },
  { key: 'air_conditioning', label: 'AC', icon: '❄️' },
  { key: 'tv', label: 'TV', icon: '📺' },
  { key: 'washer', label: 'Washer', icon: '🧺' },
  { key: 'workspace', label: 'Workspace', icon: '💻' },
  { key: 'balcony', label: 'Balcony', icon: '🌅' }
]

// Computed
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.location) count++
  if (filters.value.checkIn) count++
  if (filters.value.checkOut) count++
  if (filters.value.propertyType) count++
  if (filters.value.priceRange) count++
  if (filters.value.guests) count++
  if (filters.value.bedrooms) count++
  if (filters.value.amenities.length > 0) count++
  return count
})

const hasActiveFilters = computed(() => activeFiltersCount.value > 0)

// Quick filters
const quickFilters = [
  { key: 'hotels', label: 'Hotels', icon: '🏨' },
  { key: 'apartments', label: 'Apartments', icon: '🏢' },
  { key: 'houses', label: 'Houses', icon: '🏠' },
  { key: 'luxury', label: 'Luxury', icon: '👑' },
  { key: 'budget', label: 'Budget', icon: '💰' },
  { key: 'pet-friendly', label: 'Pet Friendly', icon: '🐕' },
  { key: 'no-smoking', label: 'No Smoking', icon: '🚭' },
  { key: 'popular', label: 'Popular', icon: '⭐' }
]

const isQuickFilterActive = (filterKey) => {
  switch (filterKey) {
    case 'hotels':
      return filters.value.propertyType === 'hotel'
    case 'apartments':
      return filters.value.propertyType === 'apartment'
    case 'houses':
      return filters.value.propertyType === 'house'
    case 'luxury':
      return filters.value.priceRange === '200+'
    case 'budget':
      return filters.value.priceRange === '0-100'
    default:
      return false
  }
}

// Helper functions
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

// Methods
const applyQuickFilter = (filter) => {
  
  switch (filter.key) {
    case 'hotels':
      filters.value.propertyType = 'hotel'
      break
    case 'apartments':
      filters.value.propertyType = 'apartment'
      break
    case 'houses':
      filters.value.propertyType = 'house'
      break
    case 'luxury':
      filters.value.priceRange = '200+'
      break
    case 'budget':
      filters.value.priceRange = '0-100'
      break
    case 'pet-friendly':
      // Will be handled in the pet-friendly section
      break
    case 'no-smoking':
      // Will be handled in the no-smoking section
      break
    case 'popular':
      // Will be handled in the popular section
      break
  }
  
  applyFilters()
}

const applyFilters = () => {
  filtersLoading.value = true
  currentPage.value = 1
  searchProperties()
}

const toggleAmenityFilter = (amenityKey) => {
  const index = filters.value.amenities.indexOf(amenityKey)
  if (index > -1) {
    filters.value.amenities.splice(index, 1)
  } else {
    filters.value.amenities.push(amenityKey)
  }
  applyFilters()
}

const fetchHotelProperties = async () => {
  try {
    const { data, error } = await client
      .from('properties')
      .select(`
        *,
        owner:users!properties_owner_id_fkey(
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq('is_available', true)
      .eq('property_type', 'hotel')
      .order('created_at', { ascending: false })
      .limit(8)
    
    if (error) throw error
    hotelProperties.value = data || []
    console.log('Hotel properties fetched:', hotelProperties.value.length)
  } catch (error) {
    console.error('Error fetching hotel properties:', error)
  }
}

const fetchPopularHotels = async () => {
  try {
    const { data, error } = await client
      .from('properties')
      .select(`
        *,
        owner:users!properties_owner_id_fkey(
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq('is_available', true)
      .order('created_at', { ascending: false })
      .limit(6)
    
    if (error) throw error
    popularHotels.value = data || []
    console.log('Popular hotels fetched:', popularHotels.value.length)
  } catch (error) {
    console.error('Error fetching popular hotels:', error)
  }
}

const fetchNoSmokingProperties = async () => {
  try {
    // Since we don't have allow_smoking field, let's get properties that might be no-smoking
    // We'll get a mix of different property types for now
    const { data, error } = await client
      .from('properties')
      .select(`
        *,
        owner:users!properties_owner_id_fkey(
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq('is_available', true)
      .in('property_type', ['apartment', 'room'])
      .order('created_at', { ascending: false })
      .limit(8)
    
    if (error) throw error
    noSmokingProperties.value = data || []
    console.log('No smoking properties fetched:', noSmokingProperties.value.length)
  } catch (error) {
    console.error('Error fetching no smoking properties:', error)
  }
}

const fetchPetFriendlyProperties = async () => {
  try {
    // Since we don't have allow_pets field, let's get properties that might be pet-friendly
    // We'll get houses and apartments for now
    const { data, error } = await client
      .from('properties')
      .select(`
        *,
        owner:users!properties_owner_id_fkey(
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq('is_available', true)
      .in('property_type', ['house', 'apartment'])
      .order('created_at', { ascending: false })
      .limit(8)
    
    if (error) throw error
    petFriendlyProperties.value = data || []
    console.log('Pet friendly properties fetched:', petFriendlyProperties.value.length)
  } catch (error) {
    console.error('Error fetching pet friendly properties:', error)
  }
}

const fetchLuxuryProperties = async () => {
  try {
    const { data, error } = await client
      .from('properties')
      .select(`
        *,
        owner:users!properties_owner_id_fkey(
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq('is_available', true)
      .gte('price_per_night', 200)
      .order('price_per_night', { ascending: false })
      .limit(6)
    
    if (error) throw error
    luxuryProperties.value = data || []
    console.log('Luxury properties fetched:', luxuryProperties.value.length)
  } catch (error) {
    console.error('Error fetching luxury properties:', error)
  }
}

const fetchBudgetProperties = async () => {
  try {
    const { data, error } = await client
      .from('properties')
      .select(`
        *,
        owner:users!properties_owner_id_fkey(
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq('is_available', true)
      .lte('price_per_night', 100)
      .order('price_per_night', { ascending: true })
      .limit(8)
    
    if (error) throw error
    budgetProperties.value = data || []
    console.log('Budget properties fetched:', budgetProperties.value.length)
  } catch (error) {
    console.error('Error fetching budget properties:', error)
  }
}

const buildQuery = () => {
  let query = client
    .from('properties')
    .select(`
      *,
      owner:users!properties_owner_id_fkey(
        id,
        first_name,
        last_name,
        email
      )
    `)
    .eq('is_available', true)
  
  // Apply filters
  if (filters.value.location) {
    query = query.ilike('city', `%${filters.value.location}%`)
  }
  
  if (filters.value.propertyType) {
    query = query.eq('property_type', filters.value.propertyType)
  }
  
  if (filters.value.priceRange) {
    const [min, max] = filters.value.priceRange.split('-')
    if (max === '+') {
      query = query.gte('price_per_night', parseInt(min))
    } else {
      query = query.gte('price_per_night', parseInt(min)).lte('price_per_night', parseInt(max))
    }
  }
  
  if (filters.value.guests) {
    query = query.gte('max_guests', parseInt(filters.value.guests))
  }

  if (filters.value.bedrooms) {
    query = query.eq('bedrooms', parseInt(filters.value.bedrooms))
  }

  if (filters.value.amenities && filters.value.amenities.length > 0) {
    query = query.in('amenities', filters.value.amenities)
  }
  
  // Apply sorting
  if (sortBy.value === 'price_per_night_desc') {
    query = query.order('price_per_night', { ascending: false })
  } else if (sortBy.value === 'title') {
    query = query.order('title', { ascending: true })
  } else if (sortBy.value === 'rating') {
    query = query.order('rating', { ascending: false })
  } else {
    query = query.order(sortBy.value, { ascending: false })
  }
  
  return query
}

const searchProperties = async () => {
  loading.value = true
  
  try {
    const query = buildQuery()
    const { data, error } = await query
      .range((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage - 1)
    
    if (error) throw error
    
    properties.value = data || []
    totalPages.value = Math.max(1, Math.ceil(properties.value.length / itemsPerPage))
    
  } catch (error) {
    console.error('Error fetching properties:', error)
    showToast(`Failed to fetch properties: ${error.message}`, 'error')
    properties.value = []
    totalPages.value = 1
  } finally {
    loading.value = false
    filtersLoading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    searchProperties()
  }
}

const clearFilters = () => {
  filtersLoading.value = true // Set loading to true when clearing filters
  filters.value = {
    location: '',
    checkIn: '',
    checkOut: '',
    propertyType: '',
    priceRange: '',
    guests: '',
    bedrooms: '',
    amenities: []
  }
  currentPage.value = 1
  searchProperties()
}

// Toast notification system
const showToast = (message, type = 'success', duration = 5000) => {
  const existingToast = document.querySelector('.toast-notification')
  if (existingToast) {
    existingToast.remove()
  }

  const toast = document.createElement('div')
  toast.className = `toast-notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    type === 'warning' ? 'bg-yellow-500 text-white' : 
    'bg-blue-500 text-white'
  }`
  
  toast.innerHTML = `
    <div class="flex items-center space-x-2">
      <span class="text-lg">${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
      <span>${message}</span>
    </div>
  `
  
  document.body.appendChild(toast)
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove()
    }
  }, duration)
  
  toast.addEventListener('click', () => {
    toast.remove()
  })
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchHotelProperties(),
    fetchPopularHotels(),
    fetchNoSmokingProperties(),
    fetchPetFriendlyProperties(),
    fetchLuxuryProperties(),
    fetchBudgetProperties(),
  searchProperties()
  ])
})

// Watch for filter changes
watch(filters, () => {
  currentPage.value = 1
  applyFilters()
}, { deep: true })
</script>

<style scoped>
/* Custom styles for the properties page */
.property-card:hover {
  transform: translateY(-2px);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Toast notification styles */
.toast-notification {
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 