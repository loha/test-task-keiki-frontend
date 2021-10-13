<template>
  <v-row>
    <v-col cols="12">
      <v-data-table :headers="headers" :items="routes" :items-per-page="10" :page.sync="page" class="elevation-1">
        <template v-slot:item.isFree="{ item }">
          <v-chip :color="getStatusColor(item.isFree)" dark>
            {{ item.isFree }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn class="mx-2 my-3" fab small :to="`/route/edit/${item.id}`">
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
import { Route } from '~/types/routes';

type Headers = {
  text: string;
  value: string;
  sortable?: boolean
};

@Component
export default class RoutesTable extends Vue {
  @Prop({ type: Array, default: [] })
  public readonly routes!: Route[];

  protected headers: Headers[] = [
    { text: 'City Start', value: 'cityStart' },
    { text: 'City end', value: 'cityEnd' },
    { text: 'Distance', value: 'distance' },
    { text: 'Transport type', value: 'transportType' },
    { text: 'Revenue', value: 'revenue' },
    { text: 'Status', value: 'status' },
    { text: 'Transport', value: 'transport' },
    { text: 'Start date', value: 'startDate' },
    { text: 'End date', value: 'endDate' },
    { text: 'Actions', value: 'actions', sortable: false }
  ];

  protected page: number = 1;

  protected getStatusColor(value: boolean): string {
    return value ? 'green' : 'red';
  }

  protected deleteAction(id: string): void {
    this.$emit('delete', id);
  }
}
</script>
