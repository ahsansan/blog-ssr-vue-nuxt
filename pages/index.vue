<template>
  <div class="welcome-page">
    <div class="container">
      <h1 class="title">Welcome</h1>
      <p class="subtitle">Choose a demo to explore</p>

      <div class="cards">
        <NuxtLink to="/jobs" class="demo-card">
          <div class="card-icon job-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2>Job Board</h2>
          <p>Browse job listings, apply for positions, and find your dream job</p>
          <span class="arrow">→</span>
        </NuxtLink>

        <NuxtLink to="/blog" class="demo-card">
          <div class="card-icon blog-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2>Blog</h2>
          <p>Read articles and blog posts</p>
          <span class="arrow">→</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Welcome - Demo Projects',
  meta: [
    { name: 'description', content: 'Choose between Job Board and Mental Health Blog demos' }
  ]
})
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  text-align: center;
  max-width: 900px;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 3rem 0;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.demo-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.demo-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.card-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.3s;
}

.demo-card:hover .card-icon {
  transform: scale(1.1);
}

.job-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.blog-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.demo-card h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 1rem 0;
}

.demo-card p {
  color: var(--gray-600);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.arrow {
  font-size: 2rem;
  color: #667eea;
  font-weight: 300;
  margin-top: auto;
  transition: transform 0.3s;
}

.demo-card:hover .arrow {
  transform: translateX(8px);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
