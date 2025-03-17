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
        logout(router) {
            Cookie.remove('user')
            Cookie.remove('token')

            this.user = null
            this.token = null

            router && router.push('/')
        },
        setCookies(user, token) {
            Cookie.set('user', JSON.stringify(user))
            Cookie.set('token', JSON.stringify(token))

            this.token = token
            this.user = user
        }
    }
})