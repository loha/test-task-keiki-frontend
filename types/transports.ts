export type Transport = {
  id?: string;
  plateNumber: string;
  model: string;
  transportType: string;
  dateOfPurchase: string | Date;
  mileage: number;
  isFree?: boolean;
}

export type GetTransportsListFilter = {
  isFree?: boolean | number;
  transportType?: string;
}
