const env = process.env

const { AUTH_SERVICE, ORDER_SERVICE, PAYMENT_SERVICE } = env

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  modules: ['@pinia/nuxt'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      AUTH_SERVICE,
      ORDER_SERVICE,
      PAYMENT_SERVICE
    }
  }
})
