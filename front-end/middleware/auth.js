export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()

    authStore.get()

    if (!authStore.token) {
        authStore.logout()
    }
})