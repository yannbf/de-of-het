import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators';
import { store } from '@/store';

@Module({
  namespaced: true,
  dynamic: true,
  name: 'game',
  store
})
class GameModule extends VuexModule {
  private isOver = false;
  private isRunning = false;
  private score = 0;
  private correctWords: string[] = [];
  private wrongWords: string[] = [];

  @Mutation
  start() {
    this.isOver = false;
    this.isRunning = true;
    this.score = 0;
    this.correctWords = [];
    this.wrongWords = [];
  }

  @Mutation
  stop() {
    this.isOver = true;
    this.isRunning = false;
  }
}

export default getModule(GameModule);
