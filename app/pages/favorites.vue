<template>
  <h1>Página Favoritos</h1>

  <div v-if="store.favorites.length === 0" class="empty-msg">
    No tienes favoritos aún.
  </div>

  <ul v-else class="anime-grid">
    <li v-for="anime in store.favorites" :key="anime.mal_id">
      <ItemCard :item="anime" @click="verDetalle(anime.mal_id)" />
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favoritesStore'
import ItemCard from '../components/ItemCard.vue'

const store = useFavoritesStore()
const router = useRouter()

function verDetalle(id) {
  router.push(`/item?id=${id}`)
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.empty-msg {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 50px;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 0;
  list-style: none;
  max-width: 1200px;
  margin: 0 auto;
}

.anime-grid li {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
</style>