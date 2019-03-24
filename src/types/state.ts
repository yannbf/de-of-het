import { IWord } from './word';
import { IGameState } from '.';

export interface IState {
  game: IGameState;
  words: IWord[];
}
