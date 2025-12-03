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

  <div v-if="animeSeleccionado" class="detalle-box">
      <button class="btn-cerrar" @click="animeSeleccionado = null">X Cerrar</button>

      <h3>{{ animeSeleccionado.title }} ({{ animeSeleccionado.year }})</h3>

      <div class="detalle-contenido">
        <img :src="animeSeleccionado.images.jpg.image_url" alt="Cover" class="img-cover" />
        <div>
          <p><strong>Episodios:</strong> {{ animeSeleccionado.episodes }} </p>
          <p><strong>Calificación:</strong> {{ animeSeleccionado.score }} </p>
          <p><strong>Seguidores:</strong> {{ animeSeleccionado.members }} </p>
          <p><strong>Sinopsis:</strong> {{ animeSeleccionado.synopsis }}</p>
          <a :href="animeSeleccionado.url" target="_blank">Ver en MyAnimeList</a>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import ItemCard from '../components/ItemCard.vue'
import { getAnimeById } from '../services/communicationManager'
const store = useFavoritesStore()
const animeSeleccionado = ref(null)


async function verDetalle(id) {
  // Reutilizamos la lógica de obtener detalle
  // Podríamos optimizar pasando el objeto directo si ya tiene todo,
  // pero getAnimeById trae más info a veces.
  const datos = await getAnimeById(id)
  animeSeleccionado.value = datos
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
}

.detalle-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 30px rgba(0,0,0,0.3);
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

.img-cover {
  margin-top: 5%;
  height: 100%;
}
</style>