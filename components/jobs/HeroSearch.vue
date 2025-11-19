<template>
  <div class="hero">
    <div class="hero-container">
      <!-- Hero Text -->
      <div class="hero-text">
        <h1 class="hero-title">Find your Dream Job</h1>
        <p class="hero-subtitle">
          Looking for jobs? Browse our latest job openings to view & apply<br />
          oto the best jobs today
        </p>
      </div>

      <!-- Search Bar -->
      <div class="search-bar">
        <!-- Job Search Input -->
        <div class="input-wrapper">
          <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Job title or Keyword"
            class="search-input"
          />
        </div>

        <!-- Location Input -->
        <div class="input-wrapper">
          <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <input
            v-model="location"
            type="text"
            placeholder="Location"
            class="search-input"
          />
        </div>

        <!-- Search Button -->
        <button @click="handleSearch" class="search-button">
          Search
        </button>
      </div>

      <!-- Total Jobs -->
      <div class="total-jobs">
        <span class="total-label">Total jobs</span>
        <span class="total-badge">{{ totalJobs }} job results</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  totalJobs: {
    type: Number,
    default: 250
  }
})

const emit = defineEmits(['search'])

const searchQuery = ref('')
const location = ref('')

const handleSearch = () => {
  emit('search', {
    query: searchQuery.value,
    location: location.value
  })
}
</script>

<style scoped>
.hero {
  background: linear-gradient(to bottom, var(--orange-bg), white);
  padding: 3rem 0;
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-text {
  text-align: center;
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--gray-600);
  line-height: 1.75;
}

.search-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 56rem;
  margin: 0 auto 2rem;
}

@media (min-width: 768px) {
  .search-bar {
    flex-direction: row;
  }
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--gray-400);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.search-button {
  padding: 0.75rem 2rem;
  background: var(--primary-color);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.search-button:hover {
  background: var(--primary-hover);
}

.total-jobs {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.total-label {
  color: var(--gray-700);
  font-weight: 600;
}

.total-badge {
  padding: 0.25rem 0.75rem;
  background: #d1fae5;
  color: #065f46;
  font-weight: 600;
  border-radius: 0.375rem;
}
</style>
