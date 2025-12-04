<template>
  <div class="item-page">
    <div v-if="loading" class="loading">Cargando detalles...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="anime" class="detalle-container">
      <h1>{{ anime.title }}</h1>
      <div class="detalle-content">
        <img :src="anime.images.jpg.large_image_url" :alt="anime.title" class="detalle-img" />
        <div class="detalle-info">
          <p class="synopsis">{{ anime.synopsis }}</p>
          <div class="stats">
            <p><strong>Año:</strong> {{ anime.year }}</p>
            <p><strong>Episodios:</strong> {{ anime.episodes }}</p>
            <p><strong>Score:</strong> {{ anime.score }}</p>
            <p><strong>Status:</strong> {{ anime.status }}</p>
          </div>
          <a :href="anime.url" target="_blank" class="mal-link">Ver en MyAnimeList</a>
          
          <div class="actions-container">
            <button 
              @click="toggleFavorite" 
              class="fav-btn"
              :class="{ 'is-favorite': isFavorite }"
            >
              {{ isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos' }}
            </button>
            
            <button 
              class="ai-generate-btn"
              @click="generateCreativeText(anime.title)" 
              :disabled="isGenerating"
            >
              <span v-if="!isGenerating"> Generar Resumen IA</span>
              <span v-else class="loading-state">
                <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span> Pensant
              </span>
            </button>
          </div>


        </div>

      </div>
                <div class="ai-container">
            <p v-if="aiResponse" class="response-box">
              {{ aiResponse }}
            </p>
          </div>
      <button @click="goBack" class="back-btn">Volver</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAnimeById } from '../services/communicationManager'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useGemini } from "../composables/useGemini";

const { aiResponse, isGenerating, generateCreativeText } = useGemini();
const route = useRoute()
const router = useRouter()
const store = useFavoritesStore()

const anime = ref(null)
const loading = ref(true)
const error = ref(null)

const isFavorite = computed(() => {
  return anime.value ? store.isFavorite(anime.value.mal_id) : false
})

onMounted(async () => {
  const id = route.query.id
  if (!id) {
    error.value = 'No se especificó un ID de anime.'
    loading.value = false
    return
  }

  try {
    anime.value = await getAnimeById(id)
  } catch (e) {
    error.value = 'Error al cargar los detalles del anime.'
    console.error(e)
  } finally {
    loading.value = false
  }
})

function toggleFavorite() {
  if (!anime.value) return
  
  if (isFavorite.value) {
    store.removeFavorite(anime.value.mal_id)
  } else {
    store.addFavorite(anime.value)
  }
}

function goBack() {
  router.back()
}
</script>

<style scoped>
.item-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 50px;
}

.error {
  color: #e74c3c;
}

.detalle-container {
  background: white;  
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.detalle-content {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
}

.detalle-img {
  height: 100%;
  width: 35%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  object-fit: cover;
}

.detalle-info {
  flex: 1;
}

.synopsis {
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.stats p {
  margin: 10px 0;
  color: #34495e;
}

.mal-link {
  display: inline-block;
  margin-top: 15px;
  color: #3498db;
  text-decoration: none;
}

.mal-link:hover {
  text-decoration: underline;
}

.actions-container {
  display: flex;
  gap: 15px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.fav-btn {
  padding: 12px 24px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.fav-btn:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.fav-btn.is-favorite {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.back-btn {
  background-color: #34495e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.back-btn:hover {
  background-color: #2c3e50;
}

@media (max-width: 768px) {
  .detalle-content {
    flex-direction: column;
    align-items: center;
  }
  
  .detalle-img {
    width: 100%;
    max-width: 350px;
    height: auto;
  }
}

.ai-generate-btn {
  padding: 12px 24px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ai-generate-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.ai-generate-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.ai-generate-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.8;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 2px;
}

.dot {
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.response-box {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
  color: #555;
  line-height: 1.6;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>
