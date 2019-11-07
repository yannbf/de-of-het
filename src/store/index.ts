import Vue from 'vue';
import Vuex from 'vuex';
import { find, findIndex } from 'lodash-es';

import { getWordListWithArticles } from '../constants/index';
import { IState } from '../types';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    game: {
      isRunning: false,
      isOver: false,
      score: 0,
      username: '',
      level: 0
    },
    words: []
  },
  getters: {
    visibleWords: (state) => {
      return state.words.filter((w: any) => w.point === undefined);
    }
  },
  mutations: {
    setWords(state: IState, payload: {words: any[]}) {
      state.words = payload.words.map((word: any, index: number) => ({...word, point: undefined, sentence: '', active: index === 0}));
    },
    setPoint({words, game}: IState, payload: {name: string, point: number}) {
      const { name, point } = payload;
      const word = find(words, {name});
      if (word) {
        word.point = point;
      }
      game.score += point;
    },
    updateActiveCard(state: IState) {
      const activeCardIndex = state.words.findIndex((word) => word.active === true);
      state.words[activeCardIndex].active = false;
      if (state.words[activeCardIndex + 1]) {
        state.words[activeCardIndex + 1].active = true;
      }
    },
    startGame(state: IState, payload: number) {
      state.game.level = payload;
      state.game.isOver = false;
      state.game.isRunning = true;
      state.game.score = 0;
    },
    stopGame(state: IState) {
      state.game.isOver = true;
      state.game.isRunning = false;
    }
  },
  actions: {
    setPoint(_, {name, point}: any) {
      this.commit('setPoint', {name, point});
      this.commit('updateActiveCard');
    },
    updateActiveCard(_, { index }: any) {
      this.commit('updateActiveCard', index);
    },
    async fetchWords() {
      try {
        const words = await getWordListWithArticles();
        this.commit('setWords', {words});
      } catch (ex) {
        console.log('could not fetch data for wordList');
      }
    },
    async startGame(_, level) {
      await this.dispatch('fetchWords');
      this.commit('startGame', level);
    },
    stopGame(_) {
      this.commit('stopGame');
    }
  },
});
