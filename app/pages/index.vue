<template>
  <div class="home-page">
    <h1>Bienvenido a la API de anime</h1>

    <section>
      <h2>Top Animes Populares</h2>
      <div v-if="cargandoTop">Cargando top...</div>
      <ul v-else class="anime-grid">
        <li v-for="anime in topAnimes" :key="anime.mal_id" @click="verDetalle(anime.mal_id)">
          <ItemCard :item="anime" />
        </li>
      </ul>
    </section>

    <section>
      <h2>Temporada Actual</h2>
      <div v-if="cargandoSeason">Cargando temporada...</div>
      <ul v-else class="anime-grid">
        <li v-for="anime in seasonAnimes" :key="anime.mal_id" @click="verDetalle(anime.mal_id)">
          <ItemCard :item="anime" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTopAnime, getSeasonNow } from '../services/communicationManager'
import ItemCard from '../components/ItemCard.vue'

const router = useRouter()

const topAnimes = ref([])
const seasonAnimes = ref([])

const cargandoTop = ref(true)
const cargandoSeason = ref(true)

onMounted(async () => {
  try {
    topAnimes.value = await getTopAnime()
  } catch (error) {
    console.error('Error cargando top animes:', error)
  } finally {
    cargandoTop.value = false
  }

  try {
    seasonAnimes.value = await getSeasonNow()
  } catch (error) {
    console.error('Error cargando temporada:', error)
  } finally {
    cargandoSeason.value = false
  }
})

function verDetalle(id) {
  router.push(`/item?id=${id}`)
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
}

section {
  margin-bottom: 50px;
}

h2 {
  color: #42b983;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 0;
  list-style: none;
}

.anime-grid li {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
</style>
