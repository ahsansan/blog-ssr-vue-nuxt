<template>
  <header class="header">
    <div class="header-container">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <h1>LOGO</h1>
        </div>

        <!-- Navigation -->
        <nav class="nav">
          <a href="#" class="nav-link">Find Jobs</a>
          <a href="#" class="nav-link">Find Talent</a>
          <a href="#" class="nav-link">Post Job</a>
          <a href="#" class="nav-link">About Us</a>
        </nav>

        <!-- Right side -->
        <div class="header-actions">
          <!-- Notification Bell -->
          <button class="icon-button">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <!-- Profile Avatar -->
          <div class="avatar">
            <svg class="avatar-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  margin: 0;
}

.nav {
  display: none;
  gap: 2rem;
}

@media (min-width: 768px) {
  .nav {
    display: flex;
  }
}

.nav-link {
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--gray-900);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-button {
  position: relative;
  padding: 0.5rem;
  background: none;
  border: none;
  color: var(--gray-600);
  cursor: pointer;
  transition: color 0.2s;
}

.icon-button:hover {
  color: var(--gray-900);
}

.icon {
  width: 24px;
  height: 24px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #60a5fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 24px;
  height: 24px;
  color: white;
}
</style>
