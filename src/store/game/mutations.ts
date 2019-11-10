import { MutationTree } from 'vuex';
import { IGameState, IWord } from '@/types';
import { find } from 'lodash-es';

export const mutations: MutationTree<IGameState> = {
  startGame(state: IGameState, payload: number) {
    state.level = payload;
    state.isOver = false;
    state.isRunning = true;
    state.score = 0;
  },
  stopGame(state: IGameState) {
    state.isOver = true;
    state.isRunning = false;
  },
  setWords(state: IGameState, payload: {words: IWord[]}) {
    state.words = payload.words.map((word: IWord, index: number) => ({
      ...word,
      point: undefined,
      sentence: '',
      active: index === 0
    }));
  },
  setPoint({words}: IGameState, payload: {name: string, point: number}) {
    const { name, point } = payload;
    const word = find(words, {name}) as IWord;
    if (word) {
      word.point = point;
    }
    // game.score += point;
  },
  updateActiveCard(state: IGameState) {
    const activeCardIndex = state.words.findIndex((word) => word.active === true);
    if (activeCardIndex !== -1) {
      state.words[activeCardIndex].active = false;
    }
    const nextCard = state.words[activeCardIndex + 1];
    if (nextCard) {
      nextCard.active = true;
    }
  },
};
