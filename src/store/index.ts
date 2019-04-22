import Vue from 'vue';
import Vuex from 'vuex';
import { IWord } from '../types/word';
import { getWordListWithArticles } from '../constants/index';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    words: getWordListWithArticles()
  },
  getters: {
    visibleWords: (state) => {
      return state.words.filter((w: any) => w.score === undefined);
    }
  },
  mutations: {
    setScore({words}: any, payload: {word: string, score: number}) {
      const index = words.findIndex((w: IWord) => w.name === payload.word);
      if (index !== undefined) {
        Vue.set(words, index, {...words[index], score: payload.score });
      }
    }
  },
  actions: {
    setScore({word, score}: any) {
      return {word, score};
    },
    resetWords() {
      return getWordListWithArticles();
    }
  },
});
