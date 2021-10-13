<template>
  <v-row>
    <v-col cols="12">
      <v-data-table :headers="headers" :items="transports" :items-per-page="10" :page.sync="page" class="elevation-1">
        <template v-slot:item.isFree="{ item }">
          <v-chip :color="getStatusColor(item.isFree)" dark>
            {{ item.isFree }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn class="mx-2 my-3" fab small :to="`transport/edit/${item.id}`">
            <v-icon> mdi-account-edit </v-icon>
          </v-btn>
          <v-btn class="mx-2 my-3" fab small @click="deleteAction(item.id)">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Transport } from '~/types/transports';

type Headers = {
  text: string;
  value: string;
  sortable?: boolean
};

@Component
export default class TransportsTable extends Vue {
  @Prop({ type: Array, default: [] })
  public readonly transports!: Transport[];

  protected headers: Headers[] = [
    { text: 'Model', value: 'model' },
    { text: 'Plate number', value: 'plateNumber' },
    { text: 'Transport type', value: 'transportType' },
    { text: 'Date of purchase', value: 'dateOfPurchase' },
    { text: 'Mileage', value: 'mileage' },
    { text: 'Is free', value: 'isFree' },
    { text: 'Actions', value: 'actions', sortable: false }
  ];

  protected page: number = 1;

  created() {}

  protected getStatusColor(value: boolean): string {
    return value ? 'green' : 'red';
  }

  protected deleteAction(id: string): void {
    this.$emit('delete', id);
  }
}
</script>
