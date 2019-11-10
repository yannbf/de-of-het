import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { IState, IGameState } from '@/types';

export const state: IGameState = {
    isRunning: false,
    isOver: false,
    score: 0,
    username: '',
    level: 0,
    words: [],
    debug: undefined
};

const namespaced: boolean = true;

export const game: Module<IGameState, IState> = {
    namespaced,
    state,
    actions,
    getters,
    mutations
};
