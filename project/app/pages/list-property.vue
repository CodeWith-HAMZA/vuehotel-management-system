<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">List Your Property</h1>
        <p class="text-lg text-gray-600">Share your amazing space with travelers around the world</p>
      </div>

      <!-- Progress Bar -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-medium text-gray-700">Step 1 of 4</span>
          <span class="text-sm text-gray-500">25% Complete</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full" style="width: 25%"></div>
        </div>
      </div>

      <!-- Property Listing Form -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Basic Information -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                <input 
                  v-model="formData.title"
                  type="text" 
                  placeholder="e.g., Luxury Beach Resort" 
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                <select 
                  v-model="formData.property_type"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select property type</option>
                  <option value="hotel">Hotel</option>
                  <option value="hostel">Hostel</option>
                  <option value="room">Room</option>
                  <option value="home">Home</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <input 
                  v-model="formData.address"
                  type="text" 
                  placeholder="Street address" 
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input 
                  v-model="formData.city"
                  type="text" 
                  placeholder="City" 
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                <input 
                  v-model="formData.state"
                  type="text" 
                  placeholder="State or province" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <input 
                  v-model="formData.country"
                  type="text" 
                  placeholder="Country" 
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
                <input 
                  v-model="formData.postal_code"
                  type="text" 
                  placeholder="ZIP or postal code" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                <input 
                  v-model="formData.latitude"
                  type="number" 
                  step="0.00000001"
                  placeholder="e.g., 40.7128" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                <input 
                  v-model="formData.longitude"
                  type="number" 
                  step="0.00000001"
                  placeholder="e.g., -74.0060" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </div>
          </div>

          <!-- Property Details -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Number of Bedrooms *</label>
                <select 
                  v-model="formData.bedrooms"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Number of Bathrooms *</label>
                <select 
                  v-model="formData.bathrooms"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select bathrooms</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Maximum Guests *</label>
                <select 
                  v-model="formData.max_guests"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select guests</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7+</option>
                </select>
              </div>
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea 
                v-model="formData.description"
                rows="4" 
                placeholder="Describe your property, amenities, and what makes it special..." 
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          <!-- Pricing -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Pricing</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Price per Night (USD) *</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 text-gray-500">$</span>
                  <input 
                    v-model="formData.price_per_night"
                    type="number" 
                    step="0.01"
                    min="0"
                    placeholder="0.00" 
                    required
                    class="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select 
                  v-model="formData.currency"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Amenities -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="swimming_pool"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">🏊‍♂️ Swimming Pool</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="free_parking"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">🚗 Free Parking</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="free_wifi"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">📶 Free WiFi</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="kitchen"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">🍽️ Kitchen</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="gym"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">🏋️‍♂️ Gym</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="service_24_7"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">🛎️ 24/7 Service</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="beach_access"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">🏖️ Beach Access</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="spa"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">💆‍♀️ Spa</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="selectedAmenities"
                  type="checkbox" 
                  value="pet_friendly"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">🐕 Pet Friendly</span>
              </div>
            </div>
          </div>

          <!-- Photos -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Photos</h2>
            
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div class="text-4xl mb-4">📸</div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Upload Photos</h3>
              <p class="text-gray-600 mb-4">Add high-quality photos to showcase your property</p>
              <input 
                ref="fileInput"
                type="file" 
                multiple 
                accept="image/*"
                @change="handleFileUpload"
                class="hidden"
              >
              <button 
                type="button" 
                @click="$refs.fileInput.click()"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Choose Files
              </button>
              <p class="text-sm text-gray-500 mt-2">Up to 20 photos, 10MB each</p>
              
              <!-- Preview uploaded images -->
              <div v-if="uploadedImages.length > 0" class="mt-6">
                <h4 class="text-lg font-medium text-gray-900 mb-3">Uploaded Images:</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div 
                    v-for="(image, index) in uploadedImages" 
                    :key="index"
                    class="relative group border rounded-lg overflow-hidden"
                    :class="{
                      'border-gray-200': image.status === 'pending',
                      'border-blue-300': image.status === 'uploading',
                      'border-green-300': image.status === 'success',
                      'border-red-300': image.status === 'error'
                    }"
                  >
                    <img 
                      :src="image.preview" 
                      :alt="`Property image ${index + 1}`"
                      class="w-full h-24 object-cover"
                    >
                    
                    <!-- Upload Status Overlay -->
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div class="text-white text-center">
                        <div v-if="image.status === 'pending'" class="text-sm">
                          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                          Pending
                        </div>
                        <div v-else-if="image.status === 'uploading'" class="text-sm">
                          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                          Uploading...
                        </div>
                        <div v-else-if="image.status === 'success'" class="text-sm">
                          <div class="text-green-400 text-xl mb-1">✓</div>
                          Uploaded
                        </div>
                        <div v-else-if="image.status === 'error'" class="text-sm">
                          <div class="text-red-400 text-xl mb-1">✗</div>
                          Failed
                        </div>
                      </div>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div v-if="image.status === 'uploading'" class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div 
                        class="h-full bg-blue-500 transition-all duration-300"
                        :style="{ width: `${image.progress}%` }"
                      ></div>
                    </div>
                    
                    <!-- Error Message -->
                    <div v-if="image.status === 'error'" class="absolute top-0 left-0 right-0 bg-red-500 text-white text-xs p-1 text-center">
                      {{ image.error || 'Upload failed' }}
                    </div>
                    
                    <!-- Remove Button -->
                    <button 
                      @click="removeImage(index)"
                      type="button"
                      class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Remove image"
                    >
                      ×
                    </button>
                    
                    <!-- Retry Button for Failed Uploads -->
                    <button 
                      v-if="image.status === 'error'"
                      @click="retryImageUpload(index)"
                      type="button"
                      class="absolute top-1 left-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                      title="Retry upload"
                    >
                      ↻
                    </button>
                  </div>
                </div>
                
                <!-- Upload Summary -->
                <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div class="flex justify-between items-center text-sm text-gray-600">
                    <span>
                      {{ uploadedImages.filter(img => img.status === 'success').length }} of {{ uploadedImages.length }} images uploaded
                    </span>
                    <span v-if="uploadedImages.some(img => img.status === 'error')" class="text-red-600">
                      {{ uploadedImages.filter(img => img.status === 'error').length }} failed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- House Rules -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">House Rules</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
                <input 
                  v-model="houseRules"
                  type="checkbox" 
                  value="no_smoking"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">No smoking</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="houseRules"
                  type="checkbox" 
                  value="no_parties"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">No parties</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="houseRules"
                  type="checkbox" 
                  value="no_pets"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">No pets</span>
              </div>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="houseRules"
                  type="checkbox" 
                  value="quiet_hours"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">Quiet hours</span>
              </div>
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Additional Rules (Optional)</label>
              <textarea 
                v-model="additionalRules"
                rows="3" 
                placeholder="Any additional rules or important information for guests..." 
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-between pt-8 border-t border-gray-200">
            <button 
              type="button" 
              @click="saveDraft"
              :disabled="loading"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : 'Save Draft' }}
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Creating Property...' : 'Create Property' }}
            </button>
          </div>

          <!-- Success/Error Messages -->
          <div v-if="message" class="mt-4 p-4 rounded-lg" :class="messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
            {{ message }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Form data
const formData = ref({
  title: '',
  description: '',
  property_type: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postal_code: '',
  latitude: null,
  longitude: null,
  price_per_night: '',
  currency: 'USD',
  bedrooms: '',
  bathrooms: '',
  max_guests: '',
  amenities: [],
  images: [],
  is_available: true
})

// Form state
const selectedAmenities = ref([])
const houseRules = ref([])
const additionalRules = ref('')
const uploadedImages = ref([])
const loading = ref(false)
const message = ref('')
const messageType = ref('')
const uploadProgress = ref(0)

// File input ref
const fileInput = ref(null)

// Toast notification system
const showToast = (message, type = 'success', duration = 5000) => {
  // Remove existing toast
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
  
  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove()
    }
  }, duration)
  
  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.remove()
  })
}

// Methods
const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files)
  
  // Validate file count
  if (uploadedImages.value.length + files.length > 20) {
    showToast('Maximum 20 images allowed', 'error')
    return
  }
  
  // Validate each file
  for (const file of files) {
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      showToast(`File "${file.name}" is too large. Maximum size is 10MB.`, 'error')
      continue
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      showToast(`File "${file.name}" is not an image.`, 'error')
      continue
    }
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImages.value.push({
        file: file,
        preview: e.target.result,
        status: 'pending', // pending, uploading, success, error
        progress: 0
      })
    }
    reader.readAsDataURL(file)
  }
  
  // Clear file input
  event.target.value = ''
}

const removeImage = (index) => {
  const image = uploadedImages.value[index]
  
  // If image was uploaded to storage, delete it
  if (image.url && image.status === 'success') {
    deleteImageFromStorage(image.url)
  }
  
  uploadedImages.value.splice(index, 1)
}

const retryImageUpload = async (index) => {
  const image = uploadedImages.value[index]
  
  // Reset status to pending
  uploadedImages.value[index] = {
    ...image,
    status: 'pending',
    progress: 0,
    error: null
  }
  
  // Try to upload again
  try {
    await uploadImageToStorage(image.file, index)
  } catch (error) {
    console.error('Retry upload failed:', error)
    showToast(`Failed to retry upload for "${image.file.name}"`, 'error')
  }
}

const deleteImageFromStorage = async (imageUrl) => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/')
    const filePath = urlParts.slice(-2).join('/') // Get last two parts for bucket/filename
    
    const { error } = await client.storage
      .from('images')
      .remove([filePath])
    
    if (error) {
      console.error('Error deleting image from storage:', error)
      showToast('Failed to delete image from storage', 'warning')
    }
  } catch (error) {
    console.error('Error deleting image:', error)
  }
}

const uploadImageToStorage = async (file, index) => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `properties/${fileName}`
    
    // Update status to uploading
    uploadedImages.value[index].status = 'uploading'
    uploadedImages.value[index].progress = 0
    
    // Upload to Supabase Storage
    const { data, error } = await client.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      throw error
    }
    
    // Get public URL
    const { data: { publicUrl } } = client.storage
      .from('images')
      .getPublicUrl(filePath)
    
    // Update image data
    uploadedImages.value[index] = {
      ...uploadedImages.value[index],
      url: publicUrl,
      status: 'success',
      progress: 100,
      storagePath: filePath
    }
    
    return publicUrl
    
  } catch (error) {
    console.error('Error uploading image:', error)
    
    // Update status to error
    uploadedImages.value[index].status = 'error'
    uploadedImages.value[index].error = error.message
    
    // Show specific error messages
    if (error.message.includes('File size')) {
      showToast(`Image "${file.name}" is too large`, 'error')
    } else if (error.message.includes('quota')) {
      showToast('Storage quota exceeded. Please contact support.', 'error')
    } else if (error.message.includes('network')) {
      showToast(`Failed to upload "${file.name}". Please check your connection.`, 'error')
    } else {
      showToast(`Failed to upload "${file.name}": ${error.message}`, 'error')
    }
    
    return null
  }
}

const uploadAllImages = async () => {
  const uploadPromises = []
  
  for (let i = 0; i < uploadedImages.value.length; i++) {
    const image = uploadedImages.value[i]
    if (image.status === 'pending') {
      uploadPromises.push(uploadImageToStorage(image.file, i))
    }
  }
  
  if (uploadPromises.length === 0) {
    return uploadedImages.value
      .filter(img => img.status === 'success')
      .map(img => img.url)
  }
  
  try {
    showToast(`Uploading ${uploadPromises.length} images...`, 'info')
    
    const results = await Promise.allSettled(uploadPromises)
    
    // Count successful uploads
    const successfulUploads = results.filter(result => result.status === 'fulfilled' && result.value).length
    const failedUploads = results.length - successfulUploads
    
    if (successfulUploads > 0) {
      showToast(`Successfully uploaded ${successfulUploads} images${failedUploads > 0 ? `, ${failedUploads} failed` : ''}`, 
        failedUploads > 0 ? 'warning' : 'success')
    }
    
    if (failedUploads > 0) {
      showToast('Some images failed to upload. Please check the errors above.', 'error')
    }
    
    // Return only successful image URLs
    return uploadedImages.value
      .filter(img => img.status === 'success')
      .map(img => img.url)
      
  } catch (error) {
    console.error('Error in batch upload:', error)
    showToast('Failed to upload images. Please try again.', 'error')
    return []
  }
}

const showMessage = (msg, type = 'success') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}

const saveDraft = async () => {
  // TODO: Implement draft saving functionality
  showToast('Draft saving functionality coming soon!', 'warning')
}

const validateForm = () => {
  if (!formData.value.title.trim()) {
    showToast('Property title is required', 'error')
    return false
  }
  if (!formData.value.property_type) {
    showToast('Property type is required', 'error')
    return false
  }
  if (!formData.value.address.trim()) {
    showToast('Address is required', 'error')
    return false
  }
  if (!formData.value.city.trim()) {
    showToast('City is required', 'error')
    return false
  }
  if (!formData.value.country.trim()) {
    showToast('Country is required', 'error')
    return false
  }
  if (!formData.value.price_per_night || formData.value.price_per_night <= 0) {
    showToast('Valid price per night is required', 'error')
    return false
  }
  if (!formData.value.bedrooms) {
    showToast('Number of bedrooms is required', 'error')
    return false
  }
  if (!formData.value.bathrooms) {
    showToast('Number of bathrooms is required', 'error')
    return false
  }
  if (!formData.value.max_guests) {
    showToast('Maximum guests is required', 'error')
    return false
  }
  if (!formData.value.description.trim()) {
    showToast('Property description is required', 'error')
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  if (!user.value) {
    showToast('Please log in to create a property', 'error')
    return
  }

  if (!validateForm()) {
    return
  }

  loading.value = true
  
  try {
    // Upload images first
    const imageUrls = await uploadAllImages()
    
    // Check if we have any images uploaded
    if (imageUrls.length === 0 && uploadedImages.value.length > 0) {
      showToast('Please wait for all images to upload before submitting', 'warning')
      loading.value = false
      return
    }
    
    // Prepare amenities array
    formData.value.amenities = selectedAmenities.value
    
    // Create property
    const { data: property, error: propertyError } = await client
      .from('properties')
      .insert([{
        ...formData.value,
        owner_id: user.value.id,
        images: imageUrls,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (propertyError) throw propertyError
    
    showToast('Property created successfully!', 'success')
    
    // Redirect to property page or dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
    
  } catch (error) {
    console.error('Error creating property:', error)
    
    // Handle specific database errors
    if (error.message.includes('foreign key')) {
      showToast('User authentication error. Please log in again.', 'error')
    } else if (error.message.includes('check constraint')) {
      showToast('Invalid property type selected.', 'error')
    } else if (error.message.includes('not null')) {
      showToast('Please fill in all required fields.', 'error')
    } else {
      showToast(`Failed to create property: ${error.message}`, 'error')
    }
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  if (!user.value) {
    router.push('/login')
  }
})
</script>

<style scoped>
/* Custom styles for the listing form */
.form-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 2rem;
}

.form-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
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

/* Image upload status styles */
.image-status-overlay {
  backdrop-filter: blur(2px);
}

/* Progress bar animation */
.progress-bar {
  transition: width 0.3s ease-in-out;
}

/* Hover effects for image controls */
.image-controls button {
  transition: all 0.2s ease-in-out;
}

.image-controls button:hover {
  transform: scale(1.1);
}
</style> 