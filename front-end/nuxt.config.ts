const env = process.env

const { API_URL } = env

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@pinia/nuxt'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL
    }
  }
})
