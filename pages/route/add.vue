<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <AddRouteForm
          :transportTypes="$store.getters['transportTypes/values']"
          :cities="$store.getters['cities/values']"
          :routeStatuses="$store.getters['routeStatuses/values']"
          :transports="transports"
          @transportTypeChange="transportTypeChange"
          @create="createRoute"
        />
      </v-col>
      <v-col v-if="loader" cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AddRouteForm from '@/components/forms/route/add.vue';
import { Route } from '~/types/routes';
import { Transport } from '~/types/transports';
import { routesApi, transportsApi } from '~/core/providers/api';

@Component({
  components: {
    AddRouteForm,
  },
})
export default class AddRoutePage extends Vue {
  protected loader = false;

  protected transports: Transport[] = [];

  protected async createRoute(data: Route): Promise<void> {
    this.loader = true;

    await routesApi.createRoute(data);

    this.loader = false;

    this.$router.push('/routes');
  }

  protected async transportTypeChange(transportType: string): Promise<void> {
    const transports = await transportsApi.getList({
      isFree: 1,
      transportType
    });

    this.transports = transports;
  }


}
</script>
