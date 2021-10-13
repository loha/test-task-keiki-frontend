<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <EditTransportForm
          :transportTypes="$store.getters['transportTypes/values']"
          :transport="transport"
          @update="updateTransport"
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
import EditTransportForm from '@/components/forms/transport/edit.vue';
import { Transport } from '~/types/transports';
import { transportsApi } from '~/core/providers/api';

@Component({
  components: {
    EditTransportForm,
  },
})
export default class EditTransportPage extends Vue {
  protected loader = false;

  protected transport: Transport | null = null;

  async created() {
    const transport = await transportsApi.getTransportById(this.$route.params.id);

    if (transport) {
      this.transport = transport;
    } else {
      this.$router.push('/transports');
    }
  }

  public async updateTransport(data: Transport): Promise<void> {
    this.loader = true;

    await transportsApi.updateTransport(this.$route.params.id, data);

    this.loader = false;

    this.$router.push('/transports');
  }
}
</script>
