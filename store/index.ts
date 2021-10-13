import { transportTypeApi, citiesApi, routeStatusesApi } from '~/core/providers/api';

export const actions = {
  async nuxtServerInit({ dispatch }: any) {
    const transportTypes = await transportTypeApi.getList();
    const cities = await citiesApi.getList();
    const routeStatuses = await routeStatusesApi.getList();

    dispatch('transportTypes/setValues', transportTypes);
    dispatch('cities/setValues', cities);
    dispatch('routeStatuses/setValues', routeStatuses);
  },
};
