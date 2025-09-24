export default defineNuxtRouteMiddleware(async (to, from) => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  // Define public routes that should be accessible without authentication
  const publicRoutes = ['/', '/properties', '/property', '/about', '/contact', '/login', '/signup']
  const isPublicRoute = publicRoutes.some(route => to.path === route || to.path.startsWith(route))

  // Define protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/list-property', '/booking']
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))

  // If user is authenticated and trying to access login/signup, redirect to dashboard
  if (user.value && (to.path === '/login' || to.path === '/signup')) {
    return navigateTo('/dashboard')
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!user.value && isProtectedRoute) {
    return navigateTo('/login')
  }

  // Allow access to all public routes
  if (isPublicRoute) {
    return
  }

  // For all other routes, allow access
  return
}) 