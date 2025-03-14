import { defineStore } from 'pinia'
import Cookie from 'js-cookie'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        token: null
    }),
    actions: {
        get() {
            const user = Cookie.get('user')
            const token = Cookie.get('token')

            this.user = user ? JSON.parse(user) : {}
            this.token = token ? JSON.parse(token) : ''
        },
        logout() {
            Cookie.remove('user')
            Cookie.remove('token')

            this.user = null
            this.token = null
        }
    }
})