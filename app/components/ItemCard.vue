<template>
  <div class="item-card">
    <img :src="item.images.jpg.image_url" :alt="item.title" />
    <h3>{{ item.title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps(['item'])
</script>

<style scoped>
.item-card {
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.item-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.item-card h3 {
  font-size: 1.1em;
  margin: 0;
  color: #333;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>