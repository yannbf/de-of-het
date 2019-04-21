import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';

import { store } from '@/store';
import { IWord } from '@/types';
import { getWords } from '@/api';

@Module({
  namespaced: true,
  dynamic: true,
  name: 'words',
  store
})
class WordsModule extends VuexModule {
  data: IWord[] = [];

  @MutationAction({mutate: ['data']})
  async fetchAll() {
    const data = await getWords();
    return { data };
  }

  @Mutation
  SET_SCORE(obj: {word: string, score: number}) {
    const selectedWord = this.data.find((w: IWord) => w.name === obj.word);
    if (selectedWord) {
      selectedWord.score = obj.score;
    }

    return [...this.data];
  }

  @Action({ commit: 'SET_SCORE' })
  SetScore({word, score}: any) {
    return {word, score};
  }
}

export default getModule(WordsModule);
