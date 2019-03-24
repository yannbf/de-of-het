import { IState } from '@/types';
import { getWordListWithArticles } from '@/constants';

const state: IState = {
  game: {
    isOver: false,
    isRunning: true,
    score: 0
  },
  words: getWordListWithArticles()
};

export default {
  state
};
