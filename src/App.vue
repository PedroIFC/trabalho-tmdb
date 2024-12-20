<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const posicao = ref(0)
function headerChange() {
  posicao.value = window.scrollY
}
const paginaVideo = computed(() => {
  return route.path == '/filmes' || route.path == '/tv'
})

// Verifica se `posicao.value > 10` somente se `paginaVideo` for verdadeira
const sticky = computed(() => {
  return posicao.value > 10
})

window.addEventListener('scroll', headerChange)

// Obter informações da rota atual

const route = useRoute()
</script>

<template>
  <header :class="sticky ? 'active' : 'disable'" :id="paginaVideo ? 'on' : 'off'">
    <nav>
      <router-link to="/filmes">Films</router-link>
      <router-link to="/tv">TV Shows</router-link></nav>
      <nav class="pad">
      <router-link to="/"><img src="/src/assets/User.png"></router-link>
      <router-link to="/tv"><img src="/src/assets/Bookmark.png"></router-link></nav>
    
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


header {
  font-family: 'poppins';
  top: 0;
  position: sticky;
  height: 4rem;
  display: flex;
  background-color: transparent;
  color: black;
  font-size: 1.2rem;
  padding-left: 2rem;
  z-index: 10;
  transition: 0.2s all ease;
  justify-content: space-between;
}

.pad{
  margin-top: 5px;
}

nav {
  padding-right: 20rem;
  padding-left: 20rem;
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: white;
}

.active {
  background-color: #14171C !important ;
  color: white;
}

#on {
  background-color: transparent;
  
}

#off{
  background-color: #14171C ;
  color: white;
}

</style>
