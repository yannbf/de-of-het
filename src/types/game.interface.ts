export interface IGameState {
  isRunning: boolean;
  isOver: boolean;
  score: number;
  username?: string;
  level: number;
}
