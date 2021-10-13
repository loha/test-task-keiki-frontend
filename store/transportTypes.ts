import { GetterTree, ActionTree } from 'vuex';
import { RootState } from '~/types/store';

export const state = () => ({
  values: [],
});

export type TransportTypesState = ReturnType<typeof state>;

export const getters: GetterTree<TransportTypesState, RootState> = {
  values: (state) => state.values,
};

export const actions: ActionTree<TransportTypesState, RootState> = {
  setValues({ state }, payload) {
    state.values = payload;
  },
};
