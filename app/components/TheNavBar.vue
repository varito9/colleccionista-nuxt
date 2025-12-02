<template>
  <header class="navbar">
    <div class="logo">
      <RouterLink to="/">AnimeApp</RouterLink>
    </div>
    <nav>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/search">Buscar</RouterLink>
      <RouterLink to="/favorites">Favoritos</RouterLink>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
  transition: opacity 0.3s;
}

.logo a:hover {
  opacity: 0.8;
}

nav {
  display: flex;
  gap: 2rem;
}

nav a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
}

nav a:hover,
nav a.router-link-active {
  color: #42b983;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #42b983;
  transition: width 0.3s;
}

nav a:hover::after,
nav a.router-link-active::after {
  width: 100%;
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
