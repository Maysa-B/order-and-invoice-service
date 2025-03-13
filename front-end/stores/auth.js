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
        }
    }
})