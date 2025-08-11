// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],

  supabase: {
    url: 'https://cxmznzutnsidqmcgcuuc.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4bXpuenV0bnNpZHFtY2djdXVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDgxMTI4NCwiZXhwIjoyMDcwMzg3Mjg0fQ.AiKYQn3cc6BXZJpDL4w_YlRq-5bJZospl7Ez4Hcw6UY',
    redirect: false
  },

  app: {
    head: {
      title: 'HotelHub - Your Perfect Stay Awaits',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover and book amazing accommodations worldwide. From luxury resorts to cozy homes, find your perfect stay with HotelHub.' },
        { name: 'keywords', content: 'hotel, booking, accommodation, travel, vacation, resort, hostel, apartment' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  }
})