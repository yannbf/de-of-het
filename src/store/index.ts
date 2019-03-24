import Vue from 'vue';
import Vuex from 'vuex';

import initialStore from './state';

Vue.use(Vuex);

export const store = new Vuex.Store(initialStore);
