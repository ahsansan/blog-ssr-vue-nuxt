<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

// Fetch the blog post based on the slug
const { data: article } = await useAsyncData(`article-${slug}`, () =>
  queryContent('/blog', slug as string).findOne()
)

// Handle 404 if article not found
if (!article.value) {
  throw createError({
    statusCode: 404,
    message: 'Artikel tidak ditemukan',
    fatal: true
  })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// Set page meta for SEO
useHead({
  title: article.value.title + ' - Mentalthy Blog',
  meta: [
    { name: 'description', content: article.value.description },
    { property: 'og:title', content: article.value.title },
    { property: 'og:description', content: article.value.description },
  ]
})
</script>

<template>
  <div class="blog-page">
    <BlogSidebar />

    <div class="main-content">
      <!-- Back Navigation -->
      <div class="back-navigation">
        <NuxtLink to="/blog" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </NuxtLink>
      </div>

      <!-- Article -->
      <article class="article">
        <!-- Article Header -->
        <header class="article-header">
          <div class="article-category" v-if="article.tags && article.tags[0]">
            <span class="category-badge">{{ article.tags[0] }}</span>
          </div>
          <h1>{{ article.title }}</h1>
          <p class="article-lead">{{ article.description }}</p>

          <div class="article-meta">
            <div class="author-info">
              <div class="author-avatar">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366f1'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='white' font-size='35' font-family='Arial'%3ED%3C/text%3E%3C/svg%3E" alt="Author">
              </div>
              <div>
                <p class="author-name">Dr. Author Name</p>
                <p class="author-title">Mental Health Specialist</p>
              </div>
            </div>
            <div class="meta-info">
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(article.date) }}
              </span>
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                15 mins read
              </span>
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div class="featured-image">
          <div class="image-placeholder"></div>
        </div>

        <!-- Article Content -->
        <div class="article-content">
          <ContentRenderer :value="article">
            <template #empty>
              <p>Content not available.</p>
            </template>
          </ContentRenderer>
        </div>

        <!-- Category and Tags -->
        <div class="article-meta-footer">
          <div v-if="article.category" class="article-category-section">
            <h3>Category</h3>
            <NuxtLink :to="`/blog/category/${article.categorySlug}`" class="category-link">
              {{ article.category }}
            </NuxtLink>
          </div>

          <div v-if="article.tags" class="article-tags">
            <h3>Tags</h3>
            <div class="tags-list">
              <NuxtLink
                v-for="tag in article.tags"
                :key="tag"
                :to="`/blog/tag/${tag}`"
                class="tag"
              >
                #{{ tag }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  display: flex;
  min-height: 100vh;
  background: #fafafa;
}

.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 2rem 3rem;
  max-width: 1200px;
}

.back-navigation {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6366f1;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #f8f9ff;
}

.article {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 2.5rem;
}

.article-category {
  margin-bottom: 1rem;
}

.category-badge {
  display: inline-block;
  background: #eff1ff;
  color: #6366f1;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

.article-header h1 {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  margin: 0 0 1rem 0;
}

.article-lead {
  font-size: 1.25rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 2rem 0;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.author-title {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.meta-info {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.featured-image {
  margin-bottom: 2.5rem;
  border-radius: 12px;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.article-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #334155;
}

.article-content :deep(h1) {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.article-content :deep(h2) {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.article-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.article-content :deep(li) {
  margin-bottom: 0.75rem;
}

.article-content :deep(strong) {
  font-weight: 700;
  color: #1e293b;
}

.article-content :deep(code) {
  background-color: #f1f5f9;
  color: #6366f1;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
}

.article-content :deep(pre) {
  background-color: #1e293b;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.article-content :deep(pre code) {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #6366f1;
  padding-left: 1.5rem;
  margin-left: 0;
  margin-bottom: 1.5rem;
  color: #64748b;
  font-style: italic;
  background: #f8f9ff;
  padding: 1rem 1.5rem;
  border-radius: 0 8px 8px 0;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 2rem 0;
}

.article-content :deep(a) {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-meta-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.article-category-section {
  display: flex;
  flex-direction: column;
}

.article-category-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.category-link {
  display: inline-flex;
  align-items: center;
  background: #eff1ff;
  color: #6366f1;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  width: fit-content;
}

.category-link:hover {
  background: #e0e3ff;
  transform: translateY(-2px);
}

.article-tags h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: #f1f5f9;
  color: #64748b;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-block;
}

.tag:hover {
  background: #eff1ff;
  color: #6366f1;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .main-content {
    margin-left: 200px;
    padding: 2rem;
  }

  .article {
    padding: 2rem;
  }

  .article-header h1 {
    font-size: 2.25rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
    padding-top: 5rem;
  }

  .back-navigation {
    margin-bottom: 1.5rem;
  }

  .back-link {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }

  .article {
    padding: 1.5rem;
    border-radius: 12px;
  }

  .article-header {
    margin-bottom: 2rem;
  }

  .category-badge {
    font-size: 0.8rem;
    padding: 0.375rem 0.75rem;
  }

  .article-header h1 {
    font-size: 1.875rem;
  }

  .article-lead {
    font-size: 1.05rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
  }

  .author-info {
    gap: 0.75rem;
  }

  .author-avatar {
    width: 48px;
    height: 48px;
  }

  .author-name {
    font-size: 0.9rem;
  }

  .author-title {
    font-size: 0.8rem;
  }

  .meta-info {
    width: 100%;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .meta-item {
    font-size: 0.8rem;
  }

  .featured-image {
    margin-bottom: 2rem;
  }

  .image-placeholder {
    height: 250px;
  }

  .article-content {
    font-size: 1rem;
    line-height: 1.7;
  }

  .article-content :deep(h1) {
    font-size: 1.75rem;
    margin-top: 2rem;
  }

  .article-content :deep(h2) {
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  .article-content :deep(h3) {
    font-size: 1.25rem;
    margin-top: 1.5rem;
  }

  .article-content :deep(pre) {
    padding: 1rem;
    font-size: 0.875rem;
  }

  .article-content :deep(code) {
    font-size: 0.85em;
  }

  .article-meta-footer {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
  }

  .article-category-section h3,
  .article-tags h3 {
    font-size: 1rem;
  }

  .tag {
    font-size: 0.8rem;
    padding: 0.375rem 0.75rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.75rem;
    padding-top: 4.5rem;
  }

  .article {
    padding: 1rem;
  }

  .article-header h1 {
    font-size: 1.5rem;
  }

  .article-lead {
    font-size: 0.95rem;
  }

  .article-meta {
    padding: 1rem;
  }

  .author-avatar {
    width: 40px;
    height: 40px;
  }

  .image-placeholder {
    height: 200px;
  }

  .article-content {
    font-size: 0.95rem;
  }

  .article-content :deep(h1) {
    font-size: 1.5rem;
  }

  .article-content :deep(h2) {
    font-size: 1.25rem;
  }

  .article-content :deep(h3) {
    font-size: 1.125rem;
  }

  .article-content :deep(blockquote) {
    padding: 0.75rem 1rem;
  }

  .tags-list {
    gap: 0.5rem;
  }
}
</style>
