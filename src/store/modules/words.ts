import { VuexModule, Module, getModule, MutationAction } from 'vuex-module-decorators';

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
}

export default getModule(WordsModule);
