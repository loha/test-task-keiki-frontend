<template>
  <v-card elevation="3" class="col-6 py-6 px-6">
    <v-form v-model="isValidForm" @submit.prevent="updateRoute">
      <label for="add partner" class="text-h6">Update route</label>
      <v-row class="mt-4">
        <v-col cols="6">
          <v-select
            outlined
            item-text="name"
            item-value="id"
            label="City start"
            v-model="cityStart"
            :items="cities"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            outlined
            item-text="name"
            item-value="id"
            label="City end"
            v-model="cityEnd"
            :items="cities"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            label="Distance/km"
            placeholder="100"
            v-model="distance"
            :rules="distanceRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            label="Revenue/$"
            placeholder="100.00"
            v-model="revenue"
            :rules="revenueRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            outlined
            item-text="name"
            item-value="id"
            label="Transport type"
            v-model="transportType"
            :items="transportTypes"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            outlined
            item-text="name"
            item-value="id"
            label="Status"
            v-model="routeStatus"
            :items="routeStatuses"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-menu
            v-model="startDatePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                readonly
                label="Start date"
                prepend-inner-icon="mdi-calendar"
                v-model="startDate"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" @input="startDatePicker = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-menu
            v-model="endDatePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                readonly
                label="End date"
                prepend-inner-icon="mdi-calendar"
                v-model="endDate"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" @input="endDatePicker = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <v-select
            outlined
            item-text="model"
            item-value="id"
            label="Transport"
            v-model="transport"
            :items="transports"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col offset="9" cols="3">
          <v-btn type="submit" color="primary" depressed elevation="2" large>Create</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { Validator } from '~/core/extentions/validator';
import { TransportType } from '~/types/transportTypes';
import { City } from '~/types/cities';
import { RouteStatus } from '~/types/routeStatuses';
import { Transport } from '~/types/transports';
import { Route } from '~/types/routes';

@Component
export default class EditRouteForm extends Vue {
  @Prop({ type: Array, default: [] })
  public transportTypes!: TransportType[];

  @Prop({ type: Array, default: [] })
  public cities!: City[];

  @Prop({ type: Array, default: [] })
  public routeStatuses!: RouteStatus[];

  @Prop({ type: Array, default: [] })
  public transports!: Transport[];

  @Prop({ type: Object })
  public route!: Route;

  protected isValidForm = false;

  protected cityStart = '';

  protected cityEnd = '';

  protected distance = '';

  protected distanceRules = [(v: string) => Validator.isInteger(v) || 'Mast be integer'];

  protected transportType = '';

  protected revenue = '';

  protected revenueRules = [(v: string) => Validator.isFloat(v) || 'Mast be float'];

  protected routeStatus = '';

  protected startDatePicker = false;

  protected startDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);

  protected endDatePicker = false;

  protected endDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);

  protected transport = '';

  @Watch('transportType')
  transportTypeWatch(value: string) {
    this.$emit('transportTypeChange', value);
  }

  @Watch('route')
  routeWatch(value: Route) {
    this.cityStart = value.cityStart;
    this.cityEnd = value.cityEnd;
    this.distance = value.distance.toString();
    this.transportType = value.transportType;
    this.revenue = value.revenue.toString();
    this.routeStatus = value.status;
    this.transport = value.transport;
    this.startDate = moment(value.startDate).add(1, 'days').format('YYYY-MM-DD');
    this.endDate = moment(value.endDate).add(1, 'days').format('YYYY-MM-DD');
  }

  protected updateRoute(): void {
    const data: Route = {
      cityStart: this.cityStart,
      cityEnd: this.cityEnd,
      distance: parseInt(this.distance),
      transportType: this.transportType,
      revenue: parseFloat(this.revenue),
      status: this.routeStatus,
      transport: this.transport,
      startDate: moment(this.startDate).toISOString(),
      endDate: moment(this.endDate).toISOString(),
    };

    this.$emit('update', data);
  }
}
</script>
