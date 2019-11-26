import { ActionTree } from 'vuex';

import { IState, IGameState } from '@/types';
import { getWordListWithArticles } from '@/constants';

export const actions: ActionTree<IGameState, IState> = {
  async startGame({ commit, dispatch }, level) {
    await dispatch('game/fetchWords', null, { root: true });

    commit('startGame', level);
  },
  stopGame({ commit }) {
    commit('stopGame');
  },
  setPoint({ commit }, { name, point }: any) {
    commit('setPoint', { name, point });
    commit('updateActiveCard');
  },
  updateActiveCard({ commit }, { index }: any) {
    commit('updateActiveCard', index);
  },
  async fetchWords({ commit }) {
    try {
      const words = await getWordListWithArticles();
      commit('setWords', { words });
    } catch (ex) {
      console.error('could not fetch data for wordList');
    }
  },
};
