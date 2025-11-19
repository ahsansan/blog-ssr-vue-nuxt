---
title: Membuat Static Site Generator dengan Nuxt Content
description: Cara membuat blog static site generator menggunakan Nuxt Content dan Markdown files
date: "2024-01-25T08:00:00+07:00"
featuredImage: /images/posts/static-site-generator.webp
titleTag: √ Membuat Static Site Generator dengan Nuxt Content - Blog Ahsan
category: Tutorial
categorySlug: tutorial
tags: [nuxt, ssg, static-site, markdown, nuxt-content]
---

# Membuat Static Site Generator dengan Nuxt Content

Static Site Generator (SSG) adalah cara modern untuk membuat website yang cepat, aman, dan mudah di-deploy. Dengan Nuxt Content, kita bisa membuat SSG dengan mudah.

## Apa itu Static Site Generator?

SSG adalah tools yang mengubah konten (biasanya Markdown) menjadi HTML statis. Keuntungannya:

- **Performance** - File HTML statis sangat cepat
- **Security** - Tidak ada database atau server-side code
- **SEO** - Search engine bisa crawl dengan mudah
- **Hosting murah** - Bisa di-host di Netlify, Vercel, GitHub Pages gratis

## Setup Nuxt Content

Install Nuxt Content module:

```bash
pnpm add @nuxt/content
```

Konfigurasi di `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/content'],

  content: {
    highlight: {
      theme: 'github-dark'
    }
  },

  nitro: {
    preset: 'static'
  }
})
```

## Struktur Folder

Buat struktur folder seperti ini:

```
content/
  blog/
    artikel-1.md
    artikel-2.md
pages/
  blog/
    index.vue
    [slug].vue
```

## Membuat Halaman Blog

Halaman index untuk listing artikel:

```vue
<script setup>
const { data: articles } = await useAsyncData('articles', () =>
  queryContent('/blog')
    .sort({ date: -1 })
    .find()
)
</script>

<template>
  <div>
    <h1>Blog Articles</h1>
    <div v-for="article in articles" :key="article._path">
      <NuxtLink :to="article._path">
        {{ article.title }}
      </NuxtLink>
    </div>
  </div>
</template>
```

## Dynamic Route untuk Artikel

File `[slug].vue` untuk menampilkan artikel:

```vue
<script setup>
const route = useRoute()
const { data: article } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryContent('/blog', route.params.slug).findOne()
)
</script>

<template>
  <article>
    <h1>{{ article.title }}</h1>
    <ContentRenderer :value="article" />
  </article>
</template>
```

## Generate Static Files

Untuk generate static files:

```bash
pnpm run generate
```

Files akan di-generate ke folder `.output/public/` dan siap di-deploy!

## Deploy

Deploy ke Netlify atau Vercel sangat mudah:

1. Push code ke GitHub
2. Connect repository di Netlify/Vercel
3. Set build command: `pnpm run generate`
4. Set publish directory: `.output/public`
5. Deploy!

## Kesimpulan

Dengan Nuxt Content, membuat blog SSG menjadi sangat mudah. Kamu bisa fokus menulis konten dalam Markdown, dan Nuxt akan handle sisanya.

Happy coding!
