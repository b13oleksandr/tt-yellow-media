export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  //@ts-ignore
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: ''
    }
  },

  css: [
    '@/assets/css/main.css',
  ]
})
