export * from './word';
export * from './state';

export interface IGameState {
  isRunning: boolean;
  isOver: boolean;
  score: number;
  username?: string;
}
