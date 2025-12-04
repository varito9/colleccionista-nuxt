<template>
  <h1>Buscar Anime</h1>

  <SearchBar v-model="query" @search="handleSearch" />

  <!--no se pone nada porque sino mueve toda la lista de animes-->
  <div v-if="loading"></div>

  <hr />

  <ul class="anime-grid">
    <li v-for="anime in results" :key="anime.mal_id">
      <ItemCard :item="anime" @click="verDetalle(anime.mal_id)" />
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ItemCard from '../components/ItemCard.vue'
import SearchBar from '../components/SearchBar.vue'
import { useSearch } from '../composables/useSearch'

const router = useRouter()
const { query, results, loading, search } = useSearch()

async function handleSearch() {
  if (!query.value) return
  await search()
}

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
