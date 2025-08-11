<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Search and Filters Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <!-- Location Search -->
          <div class="relative">
            <input type="text" placeholder="Where are you going?" 
                   class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
          </div>
          
          <!-- Check-in Date -->
          <div class="relative">
            <input type="date" 
                   class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
          </div>
          
          <!-- Check-out Date -->
          <div class="relative">
            <input type="date" 
                   class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
          </div>
          
          <!-- Search Button -->
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Search
          </button>
        </div>
        
        <!-- Additional Filters -->
        <div class="mt-4 flex flex-wrap gap-4">
          <select class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
            <option>Property Type</option>
            <option>Hotel</option>
            <option>Hostel</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
          </select>
          
          <select class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
            <option>Price Range</option>
            <option>$0 - $50</option>
            <option>$50 - $100</option>
            <option>$100 - $200</option>
            <option>$200+</option>
          </select>
          
          <select class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
            <option>Guests</option>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4+ Guests</option>
          </select>
          
          <select class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
            <option>Rating</option>
            <option>5 Stars</option>
            <option>4+ Stars</option>
            <option>3+ Stars</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Properties Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Available Properties</h2>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Sort by:</span>
          <select class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
            <option>Distance</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Property Card 1 -->
        <NuxtLink to="/property/1" class="group">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                $120/night
              </div>
              <div class="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                ⭐ 4.9
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Luxury Beach Resort</h3>
              <p class="text-gray-600 mb-2">📍 Malibu, California</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🛏️ 2 beds</span>
                <span>🛁 1 bath</span>
                <span>👥 4 guests</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Property Card 2 -->
        <NuxtLink to="/property/2" class="group">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="h-48 bg-gradient-to-br from-green-400 to-blue-500 relative">
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                $85/night
              </div>
              <div class="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                ⭐ 4.7
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Cozy Mountain Cabin</h3>
              <p class="text-gray-600 mb-2">📍 Aspen, Colorado</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🛏️ 3 beds</span>
                <span>🛁 2 baths</span>
                <span>👥 6 guests</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Property Card 3 -->
        <NuxtLink to="/property/3" class="group">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="h-48 bg-gradient-to-br from-pink-400 to-red-500 relative">
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                $200/night
              </div>
              <div class="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                ⭐ 4.8
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Urban Loft Apartment</h3>
              <p class="text-gray-600 mb-2">📍 Manhattan, NYC</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🛏️ 1 bed</span>
                <span>🛁 1 bath</span>
                <span>👥 2 guests</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Property Card 4 -->
        <NuxtLink to="/property/4" class="group">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 relative">
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                $150/night
              </div>
              <div class="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                ⭐ 4.6
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Seaside Villa</h3>
              <p class="text-gray-600 mb-2">📍 Miami, Florida</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🛏️ 4 beds</span>
                <span>🛁 3 baths</span>
                <span>👥 8 guests</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Property Card 5 -->
        <NuxtLink to="/property/5" class="group">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 relative">
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                $95/night
              </div>
              <div class="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                ⭐ 4.5
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Downtown Studio</h3>
              <p class="text-gray-600 mb-2">📍 Chicago, Illinois</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🛏️ 1 bed</span>
                <span>🛁 1 bath</span>
                <span>👥 2 guests</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Property Card 6 -->
        <NuxtLink to="/property/6" class="group">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="h-48 bg-gradient-to-br from-teal-400 to-green-500 relative">
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                $175/night
              </div>
              <div class="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                ⭐ 4.9
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Lakeside Cottage</h3>
              <p class="text-gray-600 mb-2">📍 Lake Tahoe, Nevada</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🛏️ 2 beds</span>
                <span>🛁 2 baths</span>
                <span>👥 4 guests</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Property Card 7 -->
        <NuxtLink to="/property/7" class="group">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="h-48 bg-gradient-to-br from-red-400 to-pink-500 relative">
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                $110/night
              </div>
              <div class="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                ⭐ 4.4
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Historic Townhouse</h3>
              <p class="text-gray-600 mb-2">📍 Boston, Massachusetts</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🛏️ 3 beds</span>
                <span>🛁 2 baths</span>
                <span>👥 5 guests</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Property Card 8 -->
        <NuxtLink to="/property/8" class="group">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 relative">
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                $130/night
              </div>
              <div class="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                ⭐ 4.7
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Desert Oasis</h3>
              <p class="text-gray-600 mb-2">📍 Phoenix, Arizona</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🛏️ 2 beds</span>
                <span>🛁 2 baths</span>
                <span>👥 4 guests</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div class="mt-12 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button class="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>
            Previous
          </button>
          <button class="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">2</button>
          <button class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">3</button>
          <button class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">4</button>
          <button class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">5</button>
          <button class="px-3 py-2 text-gray-500 hover:text-gray-700">
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
// Properties listing page
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
</style> 