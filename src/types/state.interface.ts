import { IWord } from './word.interface';
import { IGameState } from './game.interface';

export interface IState {
  game: IGameState;
  words: IWord[];
}
