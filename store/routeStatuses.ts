import { GetterTree, ActionTree } from 'vuex';
import { RootState } from '~/types/store';

export const state = () => ({
  values: [],
});

export type RouteStatusesState = ReturnType<typeof state>;

export const getters: GetterTree<RouteStatusesState, RootState> = {
  values: (state) => state.values,
};

export const actions: ActionTree<RouteStatusesState, RootState> = {
  setValues({ state }, payload) {
    state.values = payload;
  },
};
