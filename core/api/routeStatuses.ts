import axios from 'axios';
import { RouteStatusesApiContract } from './contracts';
import { RouteStatus } from '~/types/routeStatuses';

class RouteStatusesApi implements RouteStatusesApiContract {
  protected url = `${process.env.apiUrl}/route-status`;

  public async getList(): Promise<RouteStatus[]> {
    let result: any = [];

    try {
      result = await axios.get(`${this.url}/list`, {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      });
      result = result.data;

      if (result.status === 200) {
        result = result.data;
      }
    } catch (e) {}

    return result;
  }
}

export { RouteStatusesApi }