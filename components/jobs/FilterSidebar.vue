<template>
  <div class="filter-sidebar">
    <div class="filter-header">
      <h3>Filters</h3>
      <button class="toggle-button">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Date Posted -->
    <div class="filter-section">
      <h4>Date posted</h4>
      <select v-model="filters.datePosted" class="select-input">
        <option value="">Last Week</option>
        <option value="today">Today</option>
        <option value="3days">Last 3 Days</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
      </select>
    </div>

    <!-- Job Type -->
    <div class="filter-section">
      <h4>Job type</h4>
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input v-model="filters.jobType" type="checkbox" value="full-time" class="checkbox" />
          <span>Full-time</span>
        </label>
        <label class="checkbox-label">
          <input v-model="filters.jobType" type="checkbox" value="part-time" class="checkbox" />
          <span>Part-time</span>
        </label>
        <label class="checkbox-label">
          <input v-model="filters.jobType" type="checkbox" value="freelance" class="checkbox" />
          <span>Freelance</span>
        </label>
      </div>
    </div>

    <!-- Salary Range -->
    <div class="filter-section">
      <h4>Salary Range</h4>
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input v-model="filters.salaryRange" type="checkbox" value="0-1000" class="checkbox" />
          <span>Under $1000</span>
        </label>
        <label class="checkbox-label">
          <input v-model="filters.salaryRange" type="checkbox" value="1000-2000" class="checkbox" />
          <span>$1000-$2000</span>
        </label>
        <label class="checkbox-label">
          <input v-model="filters.salaryRange" type="checkbox" value="2000-5000" class="checkbox" />
          <span>$2000-$5000</span>
        </label>
        <label class="checkbox-label">
          <input v-model="filters.salaryRange" type="checkbox" value="5000+" class="checkbox" />
          <span>$5000+</span>
        </label>
      </div>
    </div>

    <!-- On site/Remote -->
    <div class="filter-section">
      <h4>On site/Remote</h4>
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input v-model="filters.workMode" type="checkbox" value="on-site" class="checkbox" />
          <span>On-site</span>
        </label>
        <label class="checkbox-label">
          <input v-model="filters.workMode" type="checkbox" value="hybrid" class="checkbox" />
          <span>Hybrid</span>
        </label>
        <label class="checkbox-label">
          <input v-model="filters.workMode" type="checkbox" value="remote" class="checkbox" />
          <span>Remote</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:filters'])

const filters = ref({
  datePosted: '',
  jobType: [],
  salaryRange: [],
  workMode: []
})

watch(filters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })
</script>

<style scoped>
.filter-sidebar {
  width: 100%;
  background: var(--orange-bg);
  padding: 1.5rem;
  border-radius: 0.5rem;
}

@media (min-width: 768px) {
  .filter-sidebar {
    width: 16rem;
  }
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.filter-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0;
}

.toggle-button {
  background: none;
  border: none;
  color: var(--gray-500);
  cursor: pointer;
  padding: 0.25rem;
}

.toggle-button:hover {
  color: var(--gray-700);
}

.icon {
  width: 20px;
  height: 20px;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h4 {
  font-weight: 500;
  color: var(--gray-900);
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
}

.select-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: white;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
}

.select-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--gray-700);
  font-size: 0.875rem;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  accent-color: var(--primary-color);
}

.checkbox-label:hover {
  color: var(--gray-900);
}
</style>
