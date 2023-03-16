// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    private: {
      OPENAI_KEY: process.env.OPENAI_KEY
    }
  },
})
