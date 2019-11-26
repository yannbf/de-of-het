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
  setWords(state: IGameState, payload: { words: IWord[] }) {
    state.words = payload.words.map((word: IWord, index: number) => ({
      ...word,
      point: undefined,
      sentence: '',
      active: index === 0,
    }));
  },
  setPoint(game: IGameState, payload: { name: string; point: number }) {
    const { name, point } = payload;
    const word = find(game.words, { name }) as IWord;
    if (word) {
      word.point = point;
      game.score += point;
    } else {
      console.error(`Error when trying to set point. Word '${name}' not found.`);
    }
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
  updateDebugInfo(state: IGameState, payload: string) {
    state.debug = payload;
  },
};
