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
  private level: number = 1;

  @Mutation
  start(level = 1) {
    this.level = level;
    this.isOver = false;
    this.isRunning = true;
    this.score = 0;
  }

  @Mutation
  stop() {
    this.isOver = true;
    this.isRunning = false;
  }
}

export default getModule(GameModule);
