import { GetterTree, ActionTree } from 'vuex';
import { RootState } from '~/types/store';

export const state = () => ({
  values: [],
});

export type CitiesState = ReturnType<typeof state>;

export const getters: GetterTree<CitiesState, RootState> = {
  values: (state) => state.values,
};

export const actions: ActionTree<CitiesState, RootState> = {
  setValues({ state }, payload) {
    state.values = payload;
  },
};
