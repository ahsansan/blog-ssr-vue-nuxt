<template>
  <div class="page">
    <!-- Header -->
    <JobsHeader />

    <!-- Hero & Search Section -->
    <JobsHeroSearch
      :total-jobs="filteredJobs.length"
      @search="handleSearch"
    />

    <!-- Main Content -->
    <div class="main-container">
      <div class="content-wrapper">
        <!-- Filter Sidebar -->
        <aside>
          <JobsFilterSidebar @update:filters="handleFilterUpdate" />
        </aside>

        <!-- Job Listings -->
        <main class="job-listings">
          <div class="job-list">
            <JobsJobCard
              v-for="job in filteredJobs"
              :key="job.id"
              :job="job"
              @apply="handleApply"
            />

            <!-- No Results -->
            <div v-if="filteredJobs.length === 0" class="no-results">
              <p>No jobs found. Try adjusting your filters.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const { jobs, filteredJobs } = useJobs()

const searchQuery = ref('')
const searchLocation = ref('')
const activeFilters = ref({
  datePosted: '',
  jobType: [],
  salaryRange: [],
  workMode: []
})

const handleSearch = ({ query, location }) => {
  searchQuery.value = query
  searchLocation.value = location
  console.log('Searching for:', query, 'in', location)
}

const handleFilterUpdate = (filters) => {
  activeFilters.value = filters
  console.log('Filters updated:', filters)
}

const handleApply = (job) => {
  console.log('Applying for job:', job.title, 'at', job.company)
  alert(`Applying for ${job.title} at ${job.company}!`)
}

useHead({
  title: 'Find Your Dream Job - Job Board',
  meta: [
    {
      name: 'description',
      content: 'Browse our latest job openings to view and apply to the best jobs today'
    }
  ]
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--orange-bg);
}

.main-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .content-wrapper {
    flex-direction: row;
    align-items: flex-start;
  }
}

.job-listings {
  flex: 1;
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-results {
  text-align: center;
  padding: 3rem 0;
}

.no-results p {
  color: var(--gray-500);
  font-size: 1.125rem;
}
</style>
