import Vue from 'vue';
import Vuex from 'vuex';
import { IWord } from '../types/word';
import { getWordListWithArticles } from '../constants/index';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    palavras: getWordListWithArticles()
  },
  mutations: {
    setScore({palavras}: any, payload: {word: string, score: number}) {
      const index = palavras.findIndex((w: IWord) => w.name === payload.word);
      if (index !== undefined) {
        Vue.set(palavras, index, {...palavras[index], score: payload.score });
      }

      // palavras[index] = {...palavras[index], score: payload.score};
      // state.palavras = [
      //   ...state.palavras.slice(0, selectedWord),
      //   {
      //     ...state.palavras[selectedWord],
      //     score: 1
      //   },
      //   ...state.palavras.slice(selectedWord)
      // ];
      // state.palavras = []
      // state.palavras = [
      //   { ...state.palavras[selectedWord] }
      // ];
    }
  },
  actions: {
    setScore({word, score}: any) {
      return {word, score};
    }
  },
});
