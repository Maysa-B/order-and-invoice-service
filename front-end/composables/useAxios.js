import axios from 'axios'

const useAxios = () => {
    const authStore = useAuthStore()
    const axiosConfigured = axios.create({
        baseURL: 'http://localhost:4000'
    })

    axiosConfigured.interceptors.response.use(({ data }) => data, error => {
        if (error.status === 401) console.log('redirect') // adicionar função de redirect
    })

    if (authStore.token)
        axiosConfigured.defaults.headers.common.Authorization = `Bearer ${authStore.token}`

    return axiosConfigured
}

export default useAxios