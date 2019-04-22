import { IState } from '@/types';

const state: IState = {
  game: {
    level: 0,
    isOver: false,
    isRunning: true,
    score: 0
  },
  words: []
};

export default state;
