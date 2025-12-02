<template>
  <h1>Buscar Anime</h1>

  <SearchBar v-model="query" @search="handleSearch" />

  <div v-if="animeSeleccionado" class="detalle-box">
    <button class="btn-cerrar" @click="animeSeleccionado = null">X Cerrar</button>

    <h3>{{ animeSeleccionado.title }} ({{ animeSeleccionado.year }})</h3>

    <div class="detalle-contenido">
      <img :src="animeSeleccionado.images.jpg.image_url" alt="Cover" class="img-cover" />
      <div>
        <p><strong>Episodios:</strong> {{ animeSeleccionado.episodes }}</p>
        <p><strong>Calificación:</strong> {{ animeSeleccionado.score }}</p>
        <p><strong>Seguidores:</strong> {{ animeSeleccionado.members }}</p>
        <p><strong>Sinopsis:</strong> {{ animeSeleccionado.synopsis }}</p>
        <a :href="animeSeleccionado.url" target="_blank">Ver en MyAnimeList</a>

        <button
          @click="toggleFavorite(animeSeleccionado)"
          :class="{ 'is-favorite': store.isFavorite(animeSeleccionado.mal_id) }"
          class="fav-btn-detail"
        >
          {{
            store.isFavorite(animeSeleccionado.mal_id)
              ? 'Quitar de Favoritos'
              : 'Añadir a Favoritos'
          }}
        </button>
      </div>
    </div>
  </div>

  <!--no se pone nada porque sino mueve toda la lista de animes-->
  <div v-if="cargandoSeleccion"></div>

  <hr />

  <ul class="anime-grid">
    <li v-for="anime in results" :key="anime.mal_id">
      <ItemCard :item="anime" @click="verDetalle(anime.mal_id)" />
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import { getAnimeById } from '../services/communicationManager'
import ItemCard from '../components/ItemCard.vue'
import SearchBar from '../components/SearchBar.vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useSearch } from '../composables/useSearch'

const { query, results, loading, error, search } = useSearch()
const store = useFavoritesStore()

const animeSeleccionado = ref(null)
const cargandoSeleccion = ref(false)

async function handleSearch() {
  if (!query.value) return
  animeSeleccionado.value = null
  await search()
}

async function verDetalle(id) {
  cargandoSeleccion.value = true
  animeSeleccionado.value = null

  const datos = await getAnimeById(id)

  animeSeleccionado.value = datos
  cargandoSeleccion.value = false
}

function toggleFavorite(anime) {
  if (store.isFavorite(anime.mal_id)) {
    store.removeFavorite(anime.mal_id)
  } else {
    store.addFavorite(anime)
  }
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

/* Modal / Detalle */
.detalle-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.btn-cerrar {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.detalle-contenido {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.detalle-contenido img {
  max-width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.fav-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 10px;
}

.fav-btn-detail {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.fav-btn-detail:hover {
  background-color: #e0e0e0;
}

.fav-btn-detail.is-favorite {
  background-color: #e8f5e9;
  border-color: #a5d6a7;
  color: #2e7d32;
}

@media (max-width: 600px) {
  .detalle-contenido {
    flex-direction: column;
    align-items: center;
  }
}
.img-cover {
  margin-top: 5%;
  height: 100%;
}
</style>
