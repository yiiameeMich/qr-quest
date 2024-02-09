export default defineNuxtConfig({
  app: {
    head: {
      title: 'QR.QUEST',
    },
  },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  devtools: { enabled: true },
  ssr: false,
})
