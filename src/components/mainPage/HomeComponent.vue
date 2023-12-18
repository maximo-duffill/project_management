<!-- Home.vue -->
<template>
  <div class="home">
    <h1>Welcome to the newest project organizer!</h1>

      <div class="world-globe"></div>

    <!-- Add futuristic content here -->
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  overflow: hidden;
  
}

h1 {
  z-index: 1; /* Ensure the h1 appears above the globe */
  color: #020202;
}

.world-globe {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('@/assets/Pictures/WorldGlobe.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.world-globe::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, rgba(0, 170, 255, 0), rgba(0, 170, 255, 0.8), rgba(0, 170, 255, 1), rgba(0, 170, 255, 0.8), rgba(0, 170, 255, 0));
  pointer-events: none;
}
</style>