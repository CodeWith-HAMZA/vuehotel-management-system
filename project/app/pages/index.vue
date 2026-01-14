<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Stay
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing hotels, hostels, and homes for your next adventure
          </p>
          
          <!-- Search Bar -->
           <button @click="goToProperties" class="text-black bg-white hover:opacity-70 opacity-90 py-4 px-16 rounded-lg">
            Explore Properties
           </button>
           
        </div>
      </div>
    </div>

    <!-- Featured Properties -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
        <p class="text-lg text-gray-600">Handpicked accommodations for your comfort</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-6">
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-3 bg-gray-200 rounded mb-4"></div>
            <div class="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
      
      <!-- Featured Properties Grid -->
      <div v-else-if="featuredProperties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PropertyCard 
          v-for="property in featuredProperties" 
          :key="property.id" 
          :property="property"
          :showPopular="true"
          class="transform hover:scale-105 transition-all duration-300"
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🏠</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No featured properties available</h3>
        <p class="text-gray-600 mb-6">Check back later for new featured listings!</p>
        <NuxtLink to="/properties" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block">
          Browse All Properties
        </NuxtLink>
      </div>
    </div>

    <!-- Owner Section -->
    <div class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Are You a Property Owner?</h2>
          <p class="text-lg text-gray-600">List your properties and start earning today</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">📝</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Easy Listing</h3>
            <p class="text-gray-600">Create beautiful listings with photos and detailed information</p>
          </div>
          
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">💰</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Earn Money</h3>
            <p class="text-gray-600">Set your own prices and earn from every booking</p>
          </div>
          
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">📊</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Manage Bookings</h3>
            <p class="text-gray-600">Track reservations and manage your property efficiently</p>
          </div>
        </div>
        
        <div class="text-center mt-8">
          <NuxtLink to="/list-property" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Start Listing Today
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const client = useSupabaseClient()

// State
const featuredProperties = ref([])
const loading = ref(true)

// Fetch featured properties (popular/recently added)
const fetchFeaturedProperties = async () => {
  loading.value = true
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
    featuredProperties.value = data || []
    console.log('Featured properties fetched:', featuredProperties.value.length)
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    featuredProperties.value = []
  } finally {
    loading.value = false
  }
}

function goToProperties(){
  router.push('/properties')
}

// Fetch featured properties on mount
onMounted(() => {
  fetchFeaturedProperties()
})
</script> 