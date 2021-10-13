import { Transport, GetTransportsListFilter } from '~/types/transports';
import { TransportType } from '~/types/transportTypes';
import { City } from '~/types/cities';
import { RouteStatus } from '~/types/routeStatuses';
import { Route } from '~/types/routes';

export interface TransportsApiContract {
  getList(filter?: GetTransportsListFilter): Promise<Transport[]>;
  createTransport(data: Transport): Promise<Transport | null>;
  deleteTransport(id: string): Promise<boolean>;
  getTransportById(id: string): Promise<Transport | null>;
  updateTransport(id: string, data: Transport): Promise<Transport | null>;
}

export interface RoutesApiContract {
  getList(): Promise<Route[]>;
  createRoute(data: Route): Promise<Route | null>;
  deleteRoute(id: string): Promise<boolean>;
  getRouteById(id: string): Promise<Route | null>;
  updateRoute(id: string, data: Route): Promise<Route| null>;
}

export interface TransportTypesApiContract {
  getList(): Promise<TransportType[]>;
}

export interface CitiesApiContract {
  getList(): Promise<City[] | null>;
}

export interface RouteStatusesApiContract {
  getList(): Promise<RouteStatus[] | null>;
}
