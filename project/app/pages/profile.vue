<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Profile</h1>
        <p class="mt-2 text-lg text-gray-600">
          Manage your account information and preferences
        </p>
      </div>

      <!-- Profile Content -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Profile Header -->
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-white">
          <div class="flex items-center space-x-6">
            <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
              {{ userInitials }}
            </div>
            <div>
              <h2 class="text-3xl font-bold">{{ fullName }}</h2>
              <p class="text-green-100 text-lg">{{ userProfile?.email }}</p>
              <div class="mt-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {{ userTypeLabel }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Details -->
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Personal Information -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div class="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                    {{ userProfile?.first_name || 'Not provided' }}
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <div class="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                    {{ userProfile?.last_name || 'Not provided' }}
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div class="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                    {{ userProfile?.email || 'Not provided' }}
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div class="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                    {{ userProfile?.phone || 'Not provided' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Account Information -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Account Information
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                  <div class="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                    {{ userTypeLabel }}
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <div class="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                    {{ formattedDate }}
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span class="text-green-700 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="editProfile"
                class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
              
              <button
                @click="changePassword"
                class="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Change Password
              </button>
              
              <button
                @click="deleteAccount"
                class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
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
const user = useSupabaseUser()
const router = useRouter()

// User state
const userProfile = ref(null)
const loading = ref(true)

// Computed properties
const userInitials = computed(() => {
  if (!userProfile.value) return 'U'
  const { first_name, last_name } = userProfile.value
  return `${first_name?.[0] || ''}${last_name?.[0] || ''}`.toUpperCase() || 'U'
})

const fullName = computed(() => {
  if (!userProfile.value) return 'User'
  const { first_name, last_name } = userProfile.value
  return `${first_name || ''} ${last_name || ''}`.trim() || 'User'
})

const userTypeLabel = computed(() => {
  if (!userProfile.value?.user_type) return 'Guest'
  return userProfile.value.user_type === 'owner' ? 'Property Owner' : 'Guest'
})

const formattedDate = computed(() => {
  if (!userProfile.value?.created_at) return 'Unknown'
  return new Date(userProfile.value.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Methods
const fetchUserProfile = async (userId) => {
  try {
    const { data, error } = await client
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (!error && data) {
      userProfile.value = data
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
  } finally {
    loading.value = false
  }
}

const editProfile = () => {
  // TODO: Implement edit profile functionality
  alert('Edit profile functionality coming soon!')
}

const changePassword = () => {
  // TODO: Implement change password functionality
  alert('Change password functionality coming soon!')
}

const deleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    // TODO: Implement delete account functionality
    alert('Delete account functionality coming soon!')
  }
}

// Lifecycle
onMounted(async () => {
  if (user.value) {
    await fetchUserProfile(user.value.id)
  } else {
    // Redirect to login if not authenticated
    // await router.push('/login')
    return
  }
})

// Watch for user changes
watch(user, async (newUser) => {
  if (newUser) {
    await fetchUserProfile(newUser.id)
  } else {
    // Redirect to login if user is not authenticated
    //  await router.push('/login')
    return
  }
})
</script>

<style scoped>
/* Custom styles for the profile page */
.bg-gradient-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-green-600 {
  --tw-gradient-from: #059669;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(5, 150, 105, 0));
}

.to-emerald-600 {
  --tw-gradient-to: #0d9488;
}
</style> 