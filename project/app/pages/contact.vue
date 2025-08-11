<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Have questions or need help? We're here to assist you with any inquiries about our platform.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <!-- Contact Information -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
        
        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-xl">📧</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Email</h3>
              <p class="text-gray-600">support@hotelhub.com</p>
              <p class="text-gray-600">business@hotelhub.com</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-xl">📞</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Phone</h3>
              <p class="text-gray-600">+1 (555) 123-4567</p>
              <p class="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-xl">📍</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Office</h3>
              <p class="text-gray-600">123 Main Street</p>
              <p class="text-gray-600">New York, NY 10001</p>
              <p class="text-gray-600">United States</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-xl">💬</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Live Chat</h3>
              <p class="text-gray-600">Available 24/7</p>
              <p class="text-gray-600">Click the chat icon below</p>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="mt-12">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <span class="text-xl">📘</span>
            </a>
            <a href="#" class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
              <span class="text-xl">🐦</span>
            </a>
            <a href="#" class="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
              <span class="text-xl">📷</span>
            </a>
            <a href="#" class="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
              <span class="text-xl">💼</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="form.firstName"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="form.lastName"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select 
              id="subject" 
              v-model="form.subject"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="partnership">Partnership</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea 
              id="message" 
              v-model="form.message"
              rows="5"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us how we can help you..."
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="mt-20">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
      
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">How do I list my property?</h3>
          <p class="text-gray-600">Simply click on "List Property" in the navigation, fill out our comprehensive form, and upload photos. Our team will review and approve your listing within 24 hours.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">What are the booking fees?</h3>
          <p class="text-gray-600">We charge a 5% service fee on all bookings. This helps us maintain our platform and provide 24/7 customer support to both guests and hosts.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">How do I cancel a booking?</h3>
          <p class="text-gray-600">You can cancel bookings through your dashboard or by contacting our support team. Cancellation policies vary by property and are clearly stated during the booking process.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Is my payment information secure?</h3>
          <p class="text-gray-600">Yes! We use industry-standard encryption and work with trusted payment processors to ensure your financial information is always protected.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Reset form
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  }
  
  isSubmitting.value = false
  
  // Show success message (you can implement a proper notification system)
  alert('Thank you for your message! We\'ll get back to you soon.')
}
</script> 