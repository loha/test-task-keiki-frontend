<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <EditRouteForm
          :route="route"
          :transportTypes="$store.getters['transportTypes/values']"
          :cities="$store.getters['cities/values']"
          :routeStatuses="$store.getters['routeStatuses/values']"
          :transports="transports"
          @transportTypeChange="transportTypeChange"
          @update="updateRoute"
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
import EditRouteForm from '@/components/forms/route/edit.vue';
import { Route } from '~/types/routes';
import { Transport } from '~/types/transports';
import { routesApi, transportsApi } from '~/core/providers/api';

@Component({
  components: {
    EditRouteForm,
  },
})
export default class EditRoutePage extends Vue {
  protected loader = false;

  protected route: Route | null = null;

  protected transports: Transport[] = [];

  async created() {
    const route = await routesApi.getRouteById(this.$route.params.id);
    
    if (route) {
      this.route = route;
    } else {
      this.$router.push('/transports');
    }
  }

  protected async updateRoute(data: Route): Promise<void> {
    this.loader = true;

    await routesApi.updateRoute(this.$route.params.id, data);

    this.loader = false;

    this.$router.push('/routes');
  }

  protected async transportTypeChange(transportType: string): Promise<void> {
    const transports = await transportsApi.getList({
      isFree: 1,
      transportType,
    });

    const currentTransport = await transportsApi.getTransportById(this.route!.transport);

    this.transports = [...transports, currentTransport!];
  }
}
</script>
