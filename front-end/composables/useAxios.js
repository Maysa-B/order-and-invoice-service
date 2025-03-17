import axios from 'axios'

const useAxios = () => {
    const authStore = useAuthStore()
    const env = useRuntimeConfig()
    const router = useRouter()

    const axiosConfigured = axios.create({ })

    axiosConfigured.interceptors.response.use(({ data }) => data, error => {
        return Promise.reject(error)
    })

    if (authStore.token)
        axiosConfigured.defaults.headers.common.Authorization = `Bearer ${authStore.token}`

    return axiosConfigured
}

export default useAxios