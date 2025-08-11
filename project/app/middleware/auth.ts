export default defineNuxtRouteMiddleware(async (to, from) => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  // Only apply to protected routes
  const protectedRoutes = ['/dashboard', '/list-property', '/booking']
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))

  if (isProtectedRoute) {
    // Check if user is authenticated
    if (!user.value) {
      // Redirect to login only for protected routes
      return navigateTo('/login')
    }
  }

  // For public routes, allow access
  return
}) 