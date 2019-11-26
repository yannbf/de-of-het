import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { game } from './game';
import { IState } from '../types';

Vue.use(Vuex);
const store: StoreOptions<IState> = {
  modules: {
    game,
  },
};

export default new Vuex.Store<IState>(store);
