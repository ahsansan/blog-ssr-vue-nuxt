<template>
  <div class="job-card">
    <div class="card-header">
      <div class="card-info">
        <!-- Company Logo -->
        <div class="company-logo">
          <img v-if="job.companyLogo" :src="job.companyLogo" :alt="job.company" />
          <span v-else>{{ job.company.charAt(0) }}</span>
        </div>

        <!-- Job Info -->
        <div class="job-details">
          <h3 class="job-title">{{ job.title }}</h3>
          <p class="company-name">{{ job.company }}</p>

          <!-- Badges -->
          <div class="badges">
            <span v-if="job.type === 'full-time'" class="badge badge-green">Full-time</span>
            <span v-else-if="job.type === 'part-time'" class="badge badge-blue">Part-time</span>
            <span v-else class="badge badge-purple">{{ job.type }}</span>

            <span v-if="job.urgent" class="badge badge-red">Urgent</span>
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="location">
        <svg class="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{{ job.location }}</span>
      </div>
    </div>

    <!-- Job Description -->
    <ul class="requirements">
      <li v-for="(requirement, index) in job.requirements" :key="index">
        {{ requirement }}
      </li>
    </ul>

    <!-- Apply Button -->
    <div class="card-footer">
      <button @click="handleApply" class="apply-button">
        Apply Now
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['apply'])

const handleApply = () => {
  emit('apply', props.job)
}
</script>

<style scoped>
.job-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.job-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.card-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.company-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-logo span {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-400);
}

.job-details {
  flex: 1;
  min-width: 0;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 0.5rem 0;
}

.company-name {
  color: var(--gray-600);
  margin: 0 0 0.75rem 0;
  font-size: 0.9375rem;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.25rem;
}

.badge-green {
  background: #d1fae5;
  color: #065f46;
}

.badge-blue {
  background: #dbeafe;
  color: #1e40af;
}

.badge-purple {
  background: #e9d5ff;
  color: #6b21a8;
}

.badge-red {
  background: #fee2e2;
  color: #991b1b;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--gray-500);
  font-size: 0.875rem;
  white-space: nowrap;
}

.location-icon {
  width: 16px;
  height: 16px;
}

.requirements {
  margin: 0 0 1rem 0;
  padding: 0 0 0 1.25rem;
  list-style: disc;
}

.requirements li {
  color: var(--gray-700);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.apply-button {
  padding: 0.5rem 1.5rem;
  background: var(--primary-color);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.9375rem;
}

.apply-button:hover {
  background: var(--primary-hover);
}
</style>
