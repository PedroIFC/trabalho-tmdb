<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

import { useGenreStore } from '@/stores/genre'
import { useRouter } from 'vue-router'
const router = useRouter()

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } })
}

const genreStore = useGenreStore()

const genres = ref([])

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  isLoading.value = false
  await fetchRandomMovie() // Chama a função para pegar um filme aleatório logo ao carregar a página
})

const listMovies = async (genreId) => {
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  })
  movies.value = response.data.results
  selectRandomMovie() // Chama para selecionar o filme aleatório da lista
}

const movies = ref([])
const randomMovie = ref(null) // Variável para armazenar o filme aleatório

// Função para obter filmes aleatórios
const fetchRandomMovie = async () => {
  const response = await api.get('discover/movie', {
    params: {
      language: 'pt-BR',
    },
  })
  movies.value = response.data.results
  selectRandomMovie() // Chama para selecionar o filme aleatório da lista
}

const selectRandomMovie = () => {
  if (movies.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * movies.value.length)
    randomMovie.value = movies.value[randomIndex] // Atribui o filme aleatório à variável
  }
}

import Loading from 'vue-loading-overlay'

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const isLoading = ref(false)

// Função para alternar a visibilidade do dropdown
const isDropdownOpen = ref(false) // Estado para controlar a visibilidade do dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name
</script>

<template>
  <section class="main">
    <!-- Seção de Capa -->
    <section v-if="randomMovie" class="hero-section">
      <img
        :src="`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`"
        :alt="randomMovie.title"
        class="hero-image"
      />
      <div class="hero-content">
        <h2>{{ randomMovie.title }}</h2>
        <p>{{ formatDate(randomMovie.release_date) }}</p>
        <button @click="openMovie(randomMovie.id)">Ver Detalhes</button>
      </div>
    </section>
    <div class="filmes">
      <div class="content-filmes">
    <section class="categorias">
      <!-- Botão para abrir o dropdown -->
      <button @click="toggleDropdown" class="dropdown-btn">GENRES</button>

      <!-- Menu Dropdown -->
      <div v-show="isDropdownOpen" class="dropdown-menu">
        <ul>
          <li
            v-for="genre in genreStore.genres"
            :key="genre.id"
            @click="listMovies(genre.id)"
            class="genre-item"
          >
            {{ genre.name }}
          </li>
        </ul>
      </div>

      <loading v-model:active="isLoading" is-full-page />
    </section>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          @click="openMovie(movie.id)"
        />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
          <p class="movie-genres">
            <span
              v-for="genre_id in movie.genre_ids"
              :key="genre_id"
              @click="listMovies(genre_id)"
              :class="{ active: genre_id === genreStore.currentGenreId }"
            >
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
      </div>
    </div>
    </div>
  </div>
  </section>
</template>

<style scoped>
.hero-section {
  background-color: black;
  margin-top: -3rem;
  position: relative;
  height: 58.5rem;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 58.5rem;
  object-fit: cover;
  opacity: 0.7;
  -webkit-mask-image: linear-gradient(to top, transparent 5%, black 100%);
}

.hero-content {
  width: 40rem;
  position: absolute;
  bottom: 22rem;
  left: 4rem;
  color: #fff;
}

.hero-content h2 {
  font-size: 2.5rem;
  font-weight: 900;
}

.hero-content p {
  font-size: 1.2rem;
}

.hero-content button {
  background-color: white;
  border: none;
  padding: 0.5rem 1rem;
  color: #677386;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.5rem;
}

.hero-content button:hover {
color: #2C343F;
}





.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.movie-card {
  width: 15rem;
    border-radius: 0.5rem;
  overflow: hidden;
  transition: 0.2s ease;
}
.movie-card:hover {
  cursor: pointer;
  width: 15rem;
    border-radius: 0;
  overflow: hidden;
}

.movie-card:hover img {
transform: scale(1.1);
}



.movie-card img {
  transition: 0.2s ease;
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-details {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0.5rem;
  background-color: #677386;
  width: 15rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  color: #14171C;
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.2rem;
}

.movie-genres span {
  background-color: #14171C;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #677386;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  color: #94a4bd;
}


.main{
  background-color: #2C343F;
}

.categorias{
  padding-top: 25px;
  background-color: #2C343F;
}


/* Estilos para o botão do dropdown */
.dropdown-btn {
  text-align: left;
  background-color: #14171C;
  color: #677386;
  border: none;
  padding: 12px 56px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 1rem;
}

.dropdown-btn:hover {
  color: #94a4bd;
}

/* Estilos para o menu dropdown */
.dropdown-menu {
  position: absolute;
  background-color: #14171C;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.5rem;
  border-top-right-radius: 0;
  border-top-left-radius: 0;

  z-index: 10;
  top: 63rem;
  
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.genre-item {
  padding: 0.5rem 1rem;
  color: #677386;
  cursor: pointer;
}

.filmes{
  align-items: center;
  flex-direction: column;
  display: flex;
  width: 100%;
}

.content-filmes{
  width: 80rem;
}

.genre-item:hover {
  color: #94a4bd;
}
</style>
