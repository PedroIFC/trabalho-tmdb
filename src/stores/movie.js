import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    currentMovie: {},
    watchProviders: [],
    cast: [], // Adiciona a lista de atores (elenco)
  });

  const currentMovie = computed(() => state.currentMovie);
  const watchProviders = computed(() => state.watchProviders);
  const cast = computed(() => state.cast);

  // Função para pegar os detalhes do filme
  const getMovieDetail = async (movieId) => {
    const response = await api.get(`movie/${movieId}`);
    state.currentMovie = response.data;

    // Busca os provedores de exibição
    const providersResponse = await api.get(`movie/${movieId}/watch/providers`);
    state.watchProviders = providersResponse.data.results?.US?.flatrate || [];

    // Busca o elenco
    const castResponse = await api.get(`movie/${movieId}/credits`);
    state.cast = castResponse.data.cast;
  };

  return { currentMovie, watchProviders, cast, getMovieDetail };
});
