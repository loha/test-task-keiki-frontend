<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <AddTransportForm :transportTypes="$store.getters['transportTypes/values']" @create="createTransport" />
      </v-col>
      <v-col v-if="loader" cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AddTransportForm from '@/components/forms/transport/add.vue';
import { Transport } from '~/types/transports';
import { transportsApi } from '~/core/providers/api';

@Component({
  components: {
    AddTransportForm,
  },
})
export default class AddTransportPage extends Vue {
  public loader = false;

  public async createTransport(data: Transport): Promise<void> {
    this.loader = true;

    await transportsApi.createTransport(data);

    this.loader = false;

    this.$router.push('/transports');
  }
}
</script>
