<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router';

const router = useRouter();

const genreStore = useGenreStore();
const genres = ref([]);
const tvShows = ref([]);
const randomTvShow = ref(null);
const isLoading = ref(false); // Move this to the top

// Função para formatar data
const formatDate = (date) => {
  if (date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
  return '';
};

// Função chamada quando a página é montada
onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
  await fetchRandomTvShow(); // Chama a função para pegar um seriado aleatório logo ao carregar a página
});

// Função para listar os seriados de um gênero
const listTvShows = async (genreId) => {
  if (!genreId) return; // Valida que o genreId é válido

  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  tvShows.value = response.data.results;
  isLoading.value = false;
  selectRandomTvShow(); // Chama para selecionar o seriado aleatório da lista
};

// Função para buscar um seriado aleatório
const fetchRandomTvShow = async () => {
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      language: 'pt-BR',
    },
  });
  tvShows.value = response.data.results;
  selectRandomTvShow(); // Chama para selecionar o seriado aleatório da lista
  isLoading.value = false;
};

// Função para selecionar um seriado aleatório da lista
const selectRandomTvShow = () => {
  if (tvShows.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * tvShows.value.length);
    randomTvShow.value = tvShows.value[randomIndex];
  }
};

// Função para alternar a visibilidade do dropdown
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Função para abrir detalhes do seriado
const openTvShow = (tvShowId) => {
  router.push({ name: 'TvShowDetails', params: { tvShowId } });
};
</script>

<template>
  <section class="main">
    <!-- Seção de Capa -->
    <section v-if="randomTvShow" class="hero-section">
      <img
        :src="`https://image.tmdb.org/t/p/original${randomTvShow.backdrop_path}`"
        :alt="randomTvShow.name"
        class="hero-image"
      />
      <div class="hero-content">
        <h2>{{ randomTvShow.name }}</h2>
        <p>{{ formatDate(randomTvShow.first_air_date) }}</p>
        <button @click="openTvShow(randomTvShow.id)">Ver Detalhes</button>
      </div>
    </section>
    
    <div class="tv-list">
      <div class="content-tv-shows">
        <section class="categorias">
          <!-- Botão para abrir o dropdown -->
          <button @click="toggleDropdown" class="dropdown-btn">GENRES</button>

          <!-- Menu Dropdown -->
          <div v-show="isDropdownOpen" class="dropdown-menu">
            <ul>
              <li
                v-for="genre in genreStore.genres"
                :key="genre.id"
                @click="listTvShows(genre.id)"
                class="genre-item"
              >
                {{ genre.name }}
              </li>
            </ul>
          </div>

          <loading v-model:active="isLoading" is-full-page />
        </section>

        <div class="tv-card-list">
          <div v-for="tvShow in tvShows" :key="tvShow.id" class="tv-card">
            <img
              :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`"
              :alt="tvShow.name"
              @click="openTvShow(tvShow.id)"
            />
            <div class="tv-details">
              <p class="tv-title">{{ tvShow.name }}</p>
              <p class="tv-release-date">{{ formatDate(tvShow.first_air_date) }}</p>
              <p class="tv-genres">
                <span
                  v-for="genre_id in tvShow.genre_ids"
                  :key="genre_id"
                  @click="listTvShows(genre_id)"
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





.tv-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
    border-radius: 0.5rem;
  overflow: hidden;
  transition: 0.2s ease;
}
.tv-card:hover {
  cursor: pointer;
  width: 15rem;
    border-radius: 0;
  overflow: hidden;
}

.tv-card:hover img {
transform: scale(1.1);
}

.tv-list{
  display: flex;
  justify-content: center;
}


.tv-card img {
  transition: 0.2s ease;
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0.5rem;
  background-color: #677386;
  width: 15rem;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  color: #14171C;
}

.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #14171C;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #677386;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
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

.content-tv-shows{
  width: 80rem;
}

.genre-item:hover {
  color: #94a4bd;
}
</style>
