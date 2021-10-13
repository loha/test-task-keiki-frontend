import { TransportsApi } from '~/core/api/transports';
import { TransportTypeApi } from '~/core/api/transportTypes';
import { RouteStatusesApi } from '~/core/api/routeStatuses';
import { CitiesApi } from '~/core/api/cities';
import { RoutesApi } from '~/core/api/routes';

const transportsApi = new TransportsApi();
const transportTypeApi = new TransportTypeApi();
const routeStatusesApi = new RouteStatusesApi();
const citiesApi = new CitiesApi();
const routesApi = new RoutesApi();

export { transportsApi, transportTypeApi, routeStatusesApi, citiesApi, routesApi };
