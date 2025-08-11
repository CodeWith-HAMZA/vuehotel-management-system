<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Property Details -->
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
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-500">Luxury Beach Resort</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Image Gallery -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                   alt="Luxury Beach Resort" class="w-full h-96 object-cover">
              <div class="absolute top-4 left-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
              </div>
              <div class="absolute top-4 right-4">
                <span class="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-lg">$299/night</span>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2 p-4">
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Room 1" class="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80">
              <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Room 2" class="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80">
              <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Room 3" class="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Room 4" class="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80">
            </div>
          </div>

          <!-- Property Information -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Luxury Beach Resort</h1>
                <p class="text-gray-600 mb-2">📍 Malibu Beach, California</p>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <div class="flex text-yellow-400">
                      <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    </div>
                    <span class="ml-2 text-gray-600">4.9 (128 reviews)</span>
                  </div>
                  <span class="text-green-600 font-medium">Superhost</span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-blue-600">$299</p>
                <p class="text-gray-500">per night</p>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-xl font-semibold mb-4">About this place</h2>
              <p class="text-gray-600 leading-relaxed mb-4">
                Experience luxury living at its finest in our stunning beachfront resort. This exclusive property offers breathtaking ocean views, 
                world-class amenities, and unparalleled service. Perfect for romantic getaways, family vacations, or business retreats.
              </p>
              <p class="text-gray-600 leading-relaxed">
                Our resort features private beach access, infinity pools, spa services, and gourmet dining options. Each room is meticulously 
                designed with premium materials and modern technology to ensure your comfort and satisfaction.
              </p>
            </div>
          </div>

          <!-- Amenities -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4">What this place offers</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="amenity-item">
                <div class="amenity-icon">🏊‍♂️</div>
                <div>
                  <p class="amenity-text font-medium">Private Pool</p>
                  <p class="text-gray-500 text-sm">Infinity pool with ocean view</p>
                </div>
              </div>
              <div class="amenity-item">
                <div class="amenity-icon">🏖️</div>
                <div>
                  <p class="amenity-text font-medium">Beach Access</p>
                  <p class="text-gray-500 text-sm">Private beach entrance</p>
                </div>
              </div>
              <div class="amenity-item">
                <div class="amenity-icon">🚗</div>
                <div>
                  <p class="amenity-text font-medium">Free Parking</p>
                  <p class="text-gray-500 text-sm">Secure parking on premises</p>
                </div>
              </div>
              <div class="amenity-item">
                <div class="amenity-icon">🍽️</div>
                <div>
                  <p class="amenity-text font-medium">Restaurant</p>
                  <p class="text-gray-500 text-sm">Fine dining on site</p>
                </div>
              </div>
              <div class="amenity-item">
                <div class="amenity-icon">🧖‍♀️</div>
                <div>
                  <p class="amenity-text font-medium">Spa Services</p>
                  <p class="text-gray-500 text-sm">Full-service spa</p>
                </div>
              </div>
              <div class="amenity-item">
                <div class="amenity-icon">🏋️‍♂️</div>
                <div>
                  <p class="amenity-text font-medium">Fitness Center</p>
                  <p class="text-gray-500 text-sm">24/7 gym access</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold">Reviews</h2>
              <button class="text-blue-600 hover:text-blue-700 font-medium">View all reviews</button>
            </div>
            
            <div class="space-y-6">
              <div class="review-item">
                <div class="flex items-start space-x-4">
                  <div class="review-avatar bg-blue-600">SM</div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <span class="review-author">Sarah M.</span>
                      <div class="flex text-yellow-400">
                        <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      </div>
                      <span class="review-date">2 weeks ago</span>
                    </div>
                    <p class="review-text">
                      Absolutely stunning property! The ocean view was breathtaking and the amenities were top-notch. 
                      The staff was incredibly friendly and helpful. Will definitely return!
                    </p>
                  </div>
                </div>
              </div>

              <div class="review-item">
                <div class="flex items-start space-x-4">
                  <div class="review-avatar bg-green-600">MJ</div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <span class="review-author">Michael J.</span>
                      <div class="flex text-yellow-400">
                        <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      </div>
                      <span class="review-date">1 month ago</span>
                    </div>
                    <p class="review-text">
                      Perfect location for our anniversary trip. The room was immaculate and the service was exceptional. 
                      The private beach access made it feel like our own paradise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <div class="booking-form">
              <h3 class="text-xl font-semibold mb-4">Book your stay</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                  <input type="date" class="booking-input" value="2024-01-15">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                  <input type="date" class="booking-input" value="2024-01-18">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                  <select class="booking-input">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <select class="booking-input">
                    <option>Ocean View Suite</option>
                    <option>Garden Villa</option>
                    <option>Beachfront Bungalow</option>
                  </select>
                </div>
                
                <div class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between text-sm mb-2">
                    <span>$299 × 3 nights</span>
                    <span>$897</span>
                  </div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Service fee</span>
                    <span>$45</span>
                  </div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Taxes</span>
                    <span>$72</span>
                  </div>
                  <div class="border-t border-gray-200 pt-2">
                    <div class="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>$1,014</span>
                    </div>
                  </div>
                </div>
                
                <button class="booking-button">
                  Reserve Now
                </button>
                
                <p class="text-xs text-gray-500 text-center">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for the property detail page */
.sticky {
  position: sticky;
  top: 2rem;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
</style> 