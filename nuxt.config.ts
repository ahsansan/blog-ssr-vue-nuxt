// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/content'],

  content: {
    // Konfigurasi untuk Nuxt Content
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'css', 'html']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // Generate static site
  nitro: {
    preset: 'static'
  }
})
