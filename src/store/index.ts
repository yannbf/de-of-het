import Vue from 'vue';
import Vuex from 'vuex';
import { IWord } from '../types/word.interface';
import { getWordListWithArticles } from '../constants/index';
import { IState } from '@/types';

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
    words: getWordListWithArticles()
  },
  getters: {
    visibleWords: (state) => {
      return state.words.filter((w: any) => w.score === undefined);
    }
  },
  mutations: {
    setScore(state: IState, payload: {word: string, point: number}) {
      const index = state.words.findIndex((w: IWord) => w.name === payload.word);
      if (index !== undefined) { // Is this necessary?
        state.words = [
          ...state.words.slice(0, index),
          {
            ...state.words[index],
            score: payload.point
          },
          ...state.words.slice(index + 1)
        ];
        // This action/mutation should be renamed to something else, and setScore should be associated with the game.score prop
      }
      state.game.score += payload.point;
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
    setScore(_, {word, point}: any) {
      this.commit('setScore', {word, point});
    },
    resetWords() {
      this.commit('setWordsListWithArticles', getWordListWithArticles());
    },
    startGame(_, level) {
      this.commit('startGame', level);
    },
    stopGame(_) {
      this.commit('stopGame');
    }
  },
});
