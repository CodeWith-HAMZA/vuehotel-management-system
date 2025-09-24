<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'

// ✅ Publishable key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_1234567890')

const handleStripeCheckout = async () => {
  const stripe = await stripePromise

  if (!stripe) {
    alert('Stripe failed to load')
    return
  }

  // ⚡ Using Stripe.js with a Price ID (set up in Stripe Dashboard)
  const { error } = await stripe.redirectToCheckout({
    lineItems: [
      { price: 'price_1QWxyzABC123', quantity: 1 } // 👈 Replace with your Price ID
    ],
    mode: 'payment',
    successUrl: window.location.origin + '/success',
    cancelUrl: window.location.origin + '/cancel'
  })

  if (error) {
    console.error('Stripe checkout error:', error.message)
  }
}
</script>

<template>
  <button
    @click="handleStripeCheckout"
    class="bg-green-600 text-white px-4 py-2 rounded"
  >
    Reserve Now & Pay
  </button>
</template>
