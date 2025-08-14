<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Dashboard Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p class="text-gray-600 mt-1">Welcome back, {{ userName || 'Guest' }}!</p>
          </div>
          <div class="flex space-x-3">
            <NuxtLink to="/properties" class="btn-outline">
              Browse Properties
            </NuxtLink>
            <button class="btn-outline">View Profile</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="bg-white rounded-2xl shadow-lg p-6">
            <div class="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div v-for="i in 2" :key="i" class="bg-white rounded-2xl shadow-lg p-6">
              <div class="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="space-y-6">
            <div v-for="i in 2" :key="i" class="bg-white rounded-2xl shadow-lg p-6">
              <div class="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
            </div>
            
    <!-- Dashboard Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Conditionally render dashboard based on user type -->
       <!-- <span v-if="true">Shaddu shoabi</span> -->
      <GuestDashboard 
        v-if="userType === 'client' && user" 
        :user="user"
        @refresh-data="fetchDashboardData"
      />
      
      <OwnerDashboard 
        v-else-if="userType === 'owner' && user" 
        :user="user"
        @refresh-data="fetchDashboardData"
      />
      
      <!-- Fallback for unknown user type -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">❓</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">User Type Not Determined</h3>
        <p class="text-gray-600 mb-6">Unable to determine dashboard type. Please check your user profile.</p>
        <button @click="fetchDashboardData" class="btn-primary">Refresh Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const user = ref(null)
const loading = ref(true)
const userType = ref('')
const userName = ref('')

// Fetch user data and dashboard information
const fetchDashboardData = async () => {
  loading.value = true
  
  try {
    // Get current authenticated user
    const { data: { user: authUser }, error: userError } = await client.auth.getUser()
    
    if (userError || !authUser) {
      console.error('User not authenticated:', userError)
      return
    }
    
    user.value = authUser
    
    // Fetch user profile to determine user type
    const { data: profile, error: profileError } = await client
      .from('users')
      .select('first_name, last_name, email, user_type, created_at')
      .eq('id', authUser.id)
      .single()
    
    if (profileError) throw profileError
    
    userName.value = `${profile.first_name} ${profile.last_name}`
    userType.value = profile.user_type || 'client' // Default to client if no user_type
    
    console.log('Dashboard data fetched:', {
      user: profile,
      userType: userType.value
    })
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchDashboardData()
})
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

/* Button styles */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors;
}

.btn-outline {
  @apply border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors;
}
</style> 