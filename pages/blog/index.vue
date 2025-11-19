<script setup lang="ts">
const { data: articles } = await useAsyncData('articles', () =>
  queryContent('/blog')
    .sort({ date: -1 })
    .find()
)

// Mock categories data
const categories = [
  { name: 'Sleep', count: 25, image: '💤' },
  { name: 'Stress', count: 14, image: '😰' },
  { name: 'Mindfulness', count: 28, image: '🧘' }
]

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
  title: 'Blog - Mentalthy',
  meta: [
    { name: 'description', content: 'Here is the information about your activity and mental condition' }
  ]
})
</script>

<template>
  <div class="blog-page">
    <BlogSidebar />

    <div class="main-content">
      <!-- Header -->
      <header class="blog-header">
        <div class="header-left">
          <h1>Blog</h1>
          <p>Here is the information about your activity and mental condition. How to relieve stress? How to be patient? You will find everything here!</p>
        </div>
        <div class="header-right">
          <button class="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button class="notification-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="notification-badge"></span>
          </button>
          <div class="user-avatar">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366f1'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='white' font-size='40' font-family='Arial'%3EU%3C/text%3E%3C/svg%3E" alt="User">
          </div>
        </div>
      </header>

      <!-- Top Categories -->
      <section class="categories-section">
        <div class="section-header">
          <h2>Top categories</h2>
          <span class="badge">10</span>
          <button class="see-all">
            See all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div class="categories-grid">
          <div v-for="cat in categories" :key="cat.name" class="category-card">
            <div class="category-icon">{{ cat.image }}</div>
            <div class="category-info">
              <h3>{{ cat.name }}</h3>
              <p>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ cat.count }} articles
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Articles -->
      <section class="articles-section">
        <div class="section-header">
          <h2>Articles</h2>
          <span class="badge">35+</span>
          <div class="section-actions">
            <select class="sort-select">
              <option>Sort by</option>
              <option>Date</option>
              <option>Title</option>
            </select>
            <button class="filter-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="articles-grid">
          <article v-for="article in articles" :key="article._path" class="article-card">
            <NuxtLink :to="article._path" class="article-link">
              <div class="article-image">
                <div class="article-category-badge" v-if="article.tags && article.tags[0]">
                  {{ article.tags[0] }}
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

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
}

.header-left h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.header-left p {
  font-size: 0.95rem;
  color: #64748b;
  max-width: 600px;
  line-height: 1.6;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-btn,
.notification-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.search-btn:hover,
.notification-btn:hover {
  background: #f8f9ff;
  border-color: #6366f1;
  color: #6366f1;
}

.notification-btn {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.categories-section,
.articles-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.badge {
  background: #f1f5f9;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.see-all {
  margin-left: auto;
  background: #eff1ff;
  color: #6366f1;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.see-all:hover {
  background: #e0e3ff;
}

.section-actions {
  margin-left: auto;
  display: flex;
  gap: 0.75rem;
}

.sort-select {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
}

.filter-btn {
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: #f8f9ff;
  border-color: #6366f1;
  color: #6366f1;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.category-icon {
  width: 64px;
  height: 64px;
  background: #f8f9ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.category-info h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.category-info p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0;
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
  margin: 0 0 1.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

  .blog-header {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .header-left h1 {
    font-size: 2rem;
  }

  .header-left p {
    font-size: 0.875rem;
  }

  .header-right {
    width: 100%;
    justify-content: flex-end;
  }

  .search-btn,
  .notification-btn {
    width: 36px;
    height: 36px;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
  }

  .categories-section,
  .articles-section {
    margin-bottom: 2rem;
  }

  .section-header {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .section-header h2 {
    font-size: 1.25rem;
  }

  .see-all {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }

  .section-actions {
    width: 100%;
    margin-left: 0;
    justify-content: flex-end;
  }

  .sort-select {
    flex: 1;
    max-width: 200px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .category-card {
    padding: 1rem;
  }

  .category-icon {
    width: 56px;
    height: 56px;
    font-size: 1.75rem;
  }

  .category-info h3 {
    font-size: 1rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .article-image {
    height: 180px;
  }

  .article-content {
    padding: 1.25rem;
  }

  .article-content h3 {
    font-size: 1.125rem;
  }

  .article-content > p {
    font-size: 0.875rem;
  }

  .article-author {
    padding-top: 0.75rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.75rem;
    padding-top: 4.5rem;
  }

  .header-left h1 {
    font-size: 1.75rem;
  }

  .blog-header {
    margin-bottom: 1.5rem;
  }

  .categories-grid,
  .articles-grid {
    gap: 1rem;
  }

  .article-image {
    height: 160px;
  }

  .article-content {
    padding: 1rem;
  }

  .section-header h2 {
    font-size: 1.125rem;
  }

  .badge {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
}
</style>
