<script setup>
import { defineProps, onMounted } from 'vue'
import { useTvStore } from '@/stores/tv.js'
const tvStore = useTvStore()

const props = defineProps({
  tvShowId: {
    type: Number,
    required: true,
  },
})

onMounted(async () => {
  await tvStore.getTvShowDetail(props.tvShowId)
})
</script>

<template>
  <section class="all">
    <div class="main">
      <div class="content">
        <div>
          <img
            :src="`https://image.tmdb.org/t/p/w342${tvStore.currentTvShow.poster_path}`"
            :alt="tvStore.currentTvShow.title"
          />
          <div>
            <p class="produtoras">Produtoras:</p>
            <div class="companies">
              <div class="companias"
                v-for="company in tvStore.currentTvShow.production_companies"
                :key="company.id"
              >
                <img
                  v-if="company.logo_path"
                  :src="`https://image.tmdb.org/t/p/w500${company.logo_path}`"
                />
                <p v-else>{{  }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="details">
            <h1>{{ tvStore.currentTvShow.name }}</h1>
          <div class="tags">
            <p class="rate">
              <img src="/src/assets/icons8-estrela-48.png" class="rate-star" />
              {{ tvStore.currentTvShow.vote_average }}/10
            </p>
            <p>{{ tvStore.currentTvShow.runtime }}min</p>
            <p>{{ tvStore.currentTvShow.release_date }}</p>
          </div>
          <p class="white">"{{ tvStore.currentTvShow.tagline }}"</p>
          <p class="white">Sinopse:</p>
          <p class="white">{{ tvStore.currentTvShow.overview }}</p>

          <!-- Watch Providers -->
          <div class="watchProviders">
            <h2>Onde Assistir:</h2>
            <div v-if="tvStore.watchProviders.length > 0">
              <ul>
                <li v-for="provider in tvStore.watchProviders" :key="provider.provider_id">
                  <img
                    v-if="provider.logo_path"
                    :src="`https://image.tmdb.org/t/p/w92${provider.logo_path}`"
                    :alt="provider.provider_name"
                  />
                  <span>{{ provider.provider_name }}</span>
                </li>
              </ul>
            </div>
            <div v-else>
              <p>Provedores de exibição não disponíveis.</p>
            </div>
          </div>

          <!-- Elenco Carrossel -->
          <div class="cast">
            <h2>Elenco:</h2>
            <div v-if="tvStore.cast.length > 0" class="cast-carousel">
              <div class="cast-list">
                <div v-for="actor in tvStore.cast" :key="actor.id" class="actor">
                  <img
                    v-if="actor.profile_path"
                    :src="`https://image.tmdb.org/t/p/w92${actor.profile_path}`"
                    :alt="actor.name"
                    class="actor-img"
                  />
                  <p>{{ actor.name }}</p>
                  <p>{{ actor.character }}</p>
                </div>
              </div>
            </div>
            <div v-else>
              <p>Elenco não disponível.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.content {
  font-family: 'poppins';
  gap: 4rem;
  display: flex;
  justify-content: center;
}

.main {
  padding-top: 100px;
}

.produtoras{
    font-size: 12px;
    color: white;
}

h1 {
  font-size: 30px;
  color: white;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 40rem;
}

.rate-star {
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
}
.rate {
  align-items: center;
  display: flex;
  font-size: 15px;
  gap: 4px;
  color: rgb(255, 217, 0);
  font-weight: 300;
  background-color: transparent !important;
}
.tags {
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 10px;
}
.tags p {
  background-color: #3d4757;
}

.white p {
  color: white;
}

.all {
height: 94.9vh;
  background-color: #2c343f;
}
.companies {
    align-items: center;
  justify-content: space-between;
  display: flex;
}
.companies img {
  width: 100px;
}

.watchProviders {
  margin-top: 20px;
}

.watchProviders h2 {
  color: white;
}

.watchProviders ul {
  list-style: none;
  padding: 0;
}

.watchProviders li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.watchProviders img {
  width: 50px;
  height: 50px;
}

.watchProviders span {
  color: white;
  font-size: 16px;
}

.cast {
  gap: 90px;
  display: column;
  margin-top: 20px;
  width: 40rem;
  align-items: baseline;
}

.cast h2 {
  color: white;
}

.cast-carousel {
  padding-right: 5px;
  overflow-x: auto; /* Permite rolagem horizontal */
  padding: 10px 0;
  display: flex;
  gap: 15px;
}

.cast-list {
  align-items: baseline;
  gap: 20px;
  display: flex;
}

.actor {
  text-align: center;
  flex-shrink: 0; /* Impede que os itens se encolham */
}

.actor-img {
  width: 20x;
  height: auto;
}

.actor p {
  color: white;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 200;
}
</style>
