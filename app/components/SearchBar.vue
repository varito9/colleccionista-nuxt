<template>
  <div class="buscador">
    <input v-model="query" placeholder="anime..." @keyup.enter="$emit('search')" />
    <button @click="$emit('search')">Buscar</button>
  </div>
</template>

<script setup>
defineEmits(['search'])
const query = defineModel() // v-model al component pare
</script>

<style scoped>
.buscador {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.buscador input {
  padding: 10px 15px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.buscador input:focus {
  border-color: #42b983;
}

.buscador button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.buscador button:hover {
  background-color: #3aa876;
}
</style>
