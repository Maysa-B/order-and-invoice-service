import axios from 'axios'

const useAxios = () => {
    const authStore = useAuthStore()
    const env = useRuntimeConfig()
    const router = useRouter()

    const axiosConfigured = axios.create({
        baseURL: env.public.API_URL
    })

    axiosConfigured.interceptors.response.use(({ data }) => data, error => {
        if (error.status === 401) {
            authStore.logout()
            return router.push('/login') 
            // add "You must be logged to view this page" warning
        }
    })

    if (authStore.token)
        axiosConfigured.defaults.headers.common.Authorization = `Bearer ${authStore.token}`

    return axiosConfigured
}

export default useAxios