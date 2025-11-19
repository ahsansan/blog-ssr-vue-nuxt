<script setup lang="ts">
const route = useRoute()
const tagSlug = route.params.slug as string

// Fetch articles by tag
const { data: articles } = await useAsyncData(`tag-${tagSlug}`, () =>
  queryContent('/blog')
    .where({ tags: { $contains: tagSlug } })
    .sort({ date: -1 })
    .find()
)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit'
  })
}

const getReadTime = (content: any) => {
  return Math.ceil(Math.random() * 10 + 10) + ' mins read'
}

useHead({
  title: `#${tagSlug} - Blog Tags`,
  meta: [
    { name: 'description', content: `Browse all articles tagged with ${tagSlug}` }
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

      <!-- Tag Header -->
      <header class="tag-header">
        <div class="tag-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h1>#{{ tagSlug }}</h1>
        <p>{{ articles?.length || 0 }} article{{ articles?.length !== 1 ? 's' : '' }} with this tag</p>
      </header>

      <!-- Articles Grid -->
      <section class="articles-section">
        <div class="articles-grid" v-if="articles && articles.length > 0">
          <article v-for="article in articles" :key="article._path" class="article-card">
            <NuxtLink :to="article._path" class="article-link">
              <div class="article-image">
                <div class="article-category-badge" v-if="article.category">
                  {{ article.category }}
                </div>
              </div>
              <div class="article-content">
                <div class="article-meta">
                  <span class="read-time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ getReadTime(article) }}
                  </span>
                  <span class="date">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(article.date) }}
                  </span>
                </div>
                <h3>{{ article.title }}</h3>
                <p>{{ article.description }}</p>

                <!-- Tags List -->
                <div class="article-tags">
                  <span
                    v-for="tag in article.tags"
                    :key="tag"
                    class="tag"
                    :class="{ 'active': tag === tagSlug }"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="article-author">
                  <div class="author-avatar">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366f1'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='white' font-size='35' font-family='Arial'%3ED%3C/text%3E%3C/svg%3E" alt="Author">
                  </div>
                  <div class="author-info">
                    <p class="author-name">Dr. Author Name</p>
                    <p class="author-date">{{ formatDate(article.date) }}</p>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>

        <div v-else class="no-articles">
          <p>No articles found with this tag.</p>
        </div>
      </section>
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

.tag-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.tag-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  color: white;
  margin-bottom: 1.5rem;
}

.tag-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.tag-header p {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
}

.articles-section {
  margin-bottom: 3rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.article-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.article-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.article-category-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1e293b;
  text-transform: capitalize;
}

.article-content {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.read-time,
.date {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8rem;
  color: #94a3b8;
}

.article-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-content > p {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f1f5f9;
  color: #64748b;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: lowercase;
}

.tag::before {
  content: '#';
  margin-right: 0.125rem;
}

.tag.active {
  background: #eff1ff;
  color: #6366f1;
  font-weight: 600;
}

.article-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.125rem 0;
}

.author-date {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
}

.no-articles {
  text-align: center;
  padding: 4rem 0;
}

.no-articles p {
  font-size: 1.125rem;
  color: #64748b;
}

@media (max-width: 1024px) {
  .main-content {
    margin-left: 200px;
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
    padding-top: 5rem;
  }

  .tag-header {
    padding: 1rem 0;
    margin-bottom: 2rem;
  }

  .tag-icon {
    width: 64px;
    height: 64px;
  }

  .tag-icon svg {
    width: 28px;
    height: 28px;
  }

  .tag-header h1 {
    font-size: 2rem;
  }

  .tag-header p {
    font-size: 1rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .article-image {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.75rem;
    padding-top: 4.5rem;
  }

  .tag-header h1 {
    font-size: 1.75rem;
  }

  .articles-grid {
    gap: 1rem;
  }
}
</style>
