import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useTvStore = defineStore('tv', () => {
  const state = reactive({
    currentTvShow: {},
    watchProviders: [], // Lista de provedores de exibição
    cast: [], // Lista de atores (elenco)
  });

  const currentTvShow = computed(() => state.currentTvShow);
  const watchProviders = computed(() => state.watchProviders);
  const cast = computed(() => state.cast);

  // Função para pegar os detalhes do seriado
  const getTvShowDetail = async (tvShowId) => {
    const response = await api.get(`tv/${tvShowId}`);
    state.currentTvShow = response.data;

    // Busca os provedores de exibição
    const providersResponse = await api.get(`tv/${tvShowId}/watch/providers`);
    state.watchProviders = providersResponse.data.results?.US?.flatrate || [];

    // Busca o elenco
    const castResponse = await api.get(`tv/${tvShowId}/credits`);
    state.cast = castResponse.data.cast;
  };

  return { currentTvShow, watchProviders, cast, getTvShowDetail };
});
