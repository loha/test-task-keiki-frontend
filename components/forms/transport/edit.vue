<template>
  <v-card elevation="3" class="col-6 py-6 px-6">
    <v-form v-model="isValidForm" @submit.prevent="updateTransport">
      <label for="add partner" class="text-h6">Add transport</label>
      <v-row class="mt-4">
        <v-col cols="6">
          <v-text-field
            outlined
            label="Model"
            placeholder="Nissan Skyline R34"
            v-model="model"
            :rules="modelRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            label="Plate number"
            placeholder="AA 1111 BB"
            v-model="plateNumber"
            :rules="plateNumberRules"
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
          <v-menu
            v-model="datePicker"
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
                label="Date of purchase"
                prepend-inner-icon="mdi-calendar"
                v-model="dateOfPurchase"
                v-bind="attrs"
                v-on="on"
                :rules="dateOfPurchaseRules"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateOfPurchase" @input="datePicker = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            label="Mileage/km"
            placeholder="100"
            v-model="mileage"
            :rules="mileageRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-switch v-model="isFree" label="Is free"></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col offset="9" cols="3">
          <v-btn type="submit" color="primary" depressed elevation="2" large>Update</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { TransportType } from '~/types/transportTypes';
import { Transport } from '~/types/transports';
import { Validator } from '~/core/extentions/validator';

@Component
export default class EditTransportForm extends Vue {
  @Prop({ type: Array, default: [] })
  public transportTypes!: TransportType[];

  @Prop({ type: Object })
  public transport!: Transport;

  protected isValidForm = false;

  protected transportType: string = '';

  protected datePicker = false;

  protected dateOfPurchase = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);

  protected dateOfPurchaseRules = [(v: string) => this.validateDateOfPurchase(v) || 'Select valid date'];

  protected plateNumber = '';

  protected plateNumberRules = [
    (v: string) => !!v || 'Is required',
    (v: string) => Validator.isCarPlateNumber(v) || 'Plate number must be valid',
  ];

  protected model = '';

  protected modelRules = [(v: string) => (v.length >= 3 && v.length <= 255) || 'Min 3, max 255'];

  protected mileage = '';

  protected mileageRules = [(v: string) => Validator.isInteger(v) || 'Mast be integer'];

  protected isFree = false;

  @Watch('transport')
  transportWatch(transport: Transport) {
    this.model = transport.model;
    this.transportType = transport.transportType;
    this.dateOfPurchase = moment(transport.dateOfPurchase).add(1, 'days').format('YYYY-MM-DD');
    this.plateNumber = transport.plateNumber;
    this.mileage = transport.mileage.toString();
    this.isFree = transport.isFree!;
  }

  protected updateTransport(): void {
    if (this.isValidForm) {
      const data = {
        plateNumber: this.plateNumber,
        model: this.model,
        transportType: this.transportType,
        dateOfPurchase: moment(this.dateOfPurchase).toISOString(),
        mileage: parseInt(this.mileage),
        isFree: this.isFree,
      };

      this.$emit('update', data);
    }
  }

  protected validateDateOfPurchase(value: string): boolean {
    const currentDate = moment().format('YYYY-MM-DD');

    return currentDate > value;
  }
}
</script>
