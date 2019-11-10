import { IWord } from './word.interface';

export interface IGameState {
  isRunning: boolean;
  isOver: boolean;
  score: number;
  username?: string;
  level: number;
  words: IWord[];
  debug?: string;
}
