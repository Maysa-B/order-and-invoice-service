export default defineNuxtRouteMiddleware(() => {
    const router = useRouter()
    const authStore = useAuthStore()

    authStore.get()

    if (!authStore.token) {
        authStore.logout()
        return router.push('/login') 
        // add "You must be logged to view this page" warning
    }
})