<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="d-flex py-6 px-6 flex-wrap">
          <v-col offset="5" cols="7" class="d-flex align-center justify-end">
            <v-btn color="primary" elevation="2" to="/transport/add">
              <v-icon>mdi-plus</v-icon>
              Add transport
            </v-btn>
          </v-col>
          <v-col cols="12">
            <TransportsTable :transports="transports" @delete="deleteTransport" />
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="deleteErrorSnackbar">
      Delete routes and after delete transport

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="deleteErrorSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue } from 'nuxt-property-decorator';
import TransportsTable from '@/components/tables/transports.vue';
import { transportsApi } from '~/core/providers/api';
import { Transport } from '~/types/transports';

@Component({
  components: {
    TransportsTable,
  },
})
export default class TransportsPage extends Vue {
  protected transports: Transport[] = [];

  protected deleteErrorSnackbar = false;

  async created() {
    const transports = await transportsApi.getList();

    for (const transport of transports) {
      transport.dateOfPurchase = moment(transport.dateOfPurchase).add(1, 'days').format('YYYY-MM-DD');
    }

    this.transports = transports;
  }

  public async deleteTransport(id: string): Promise<void> {
    const result = await transportsApi.deleteTransport(id);

    if (result) {
      this.transports = this.transports.filter((el) => el.id !== id);
    } else {
      this.deleteErrorSnackbar = true;
    }
  }
}
</script>
