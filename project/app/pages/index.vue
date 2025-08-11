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
          <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="relative">
                <input type="text" placeholder="Where are you going?" 
                       class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
              </div>
              <div class="relative">
                <input type="date" 
                       class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
              </div>
              <div class="relative">
                <input type="date" 
                       class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Properties -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
        <p class="text-lg text-gray-600">Handpicked accommodations for your comfort</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Property Card 1 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
            <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
              $120/night
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Luxury Beach Resort</h3>
            <p class="text-gray-600 mb-4">📍 Malibu, California</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-yellow-400">★★★★★</span>
                <span class="text-gray-600">(4.9)</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-gray-500">🛏️ 2 beds</span>
                <span class="text-gray-500">🛁 1 bath</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Property Card 2 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div class="h-48 bg-gradient-to-br from-green-400 to-blue-500 relative">
            <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
              $85/night
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Cozy Mountain Cabin</h3>
            <p class="text-gray-600 mb-4">📍 Aspen, Colorado</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-yellow-400">★★★★☆</span>
                <span class="text-gray-600">(4.7)</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-gray-500">🛏️ 3 beds</span>
                <span class="text-gray-500">🛁 2 baths</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Property Card 3 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div class="h-48 bg-gradient-to-br from-pink-400 to-red-500 relative">
            <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
              $200/night
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Urban Loft Apartment</h3>
            <p class="text-gray-600 mb-4">📍 Manhattan, NYC</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-yellow-400">★★★★★</span>
                <span class="text-gray-600">(4.8)</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-gray-500">🛏️ 1 bed</span>
                <span class="text-gray-500">🛁 1 bath</span>
              </div>
            </div>
          </div>
        </div>
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
// Home page component
</script> 