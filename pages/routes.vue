<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="d-flex py-6 px-6 flex-wrap">
          <v-col offset="5" cols="7" class="d-flex align-center justify-end">
            <v-btn color="primary" elevation="2" to="/route/add">
              <v-icon>mdi-plus</v-icon>
              Add route
            </v-btn>
          </v-col>
          <v-col cols="12">
            <RoutesTable :routes="routes" @delete="deleteRoute" />
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue } from 'nuxt-property-decorator';
import RoutesTable from '@/components/tables/routes.vue';
import { routesApi } from '~/core/providers/api';
import { Route } from '~/types/routes';
import { TransportType } from '~/types/transportTypes';
import { UUIDKeyStringValueObject } from '~/types/objects';

@Component({
  components: {
    RoutesTable,
  },
})
export default class RoutesPage extends Vue {
  protected routes: Route[] = [];

  protected deleteErrorSnackbar = false;

  async created() {
    const routes = await routesApi.getList();

    for (const route of routes) {
      route.startDate = moment(route.startDate).add(1, 'days').format('YYYY-MM-DD');
      route.endDate = moment(route.endDate).add(1, 'days').format('YYYY-MM-DD');
    }

    this.routes = routes;
  }

  public get transportTypes(): UUIDKeyStringValueObject {
    const transportTypes: TransportType[] = this.$store.getters['transportTypes/values'];
    const result: any = {};

    for (let type of transportTypes) {
      result[type.id] = type.name;
    }

    return result;
  }

  public async deleteRoute(id: string): Promise<void> {
    const result = await routesApi.deleteRoute(id);

    if (result) {
      this.routes = this.routes.filter((el) => el.id !== id);
    } else {
      this.deleteErrorSnackbar = true;
    }
  }
}
</script>
