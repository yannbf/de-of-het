import { GetterTree } from 'vuex';
import { IState, IGameState } from '@/types';
import { IWord } from '../../types/word.interface';

export const getters: GetterTree<IGameState, IState> = {
  visibleWords(state: IGameState): IWord[] {
    return state.words.filter((w: IWord) => w.point === undefined);
  },
};
