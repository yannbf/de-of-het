import { IState } from '@/types';

const state: IState = {
  game: {
    isOver: false,
    isRunning: true,
    score: 0
  },
  words: []
};

export default state;
