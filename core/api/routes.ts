import axios from 'axios';
import { RoutesApiContract } from './contracts';
import { Route } from '~/types/routes';

class RoutesApi implements RoutesApiContract {
  protected url = `${process.env.apiUrl}/route`;

  public async getList(): Promise<Route[]> {
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

  public async createRoute(data: Route): Promise<Route | null> {
    let result: any;

    try {
      result = await axios.post(this.url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      });

      result = result.data;

      if (result.status === 200) {
        result = result.data;
      } else {
        result = null;
      }
    } catch (e) {
      return null;
    }

    return result;
  }

  public async deleteRoute(id: string): Promise<boolean> {
    let result = false;

    try {
      let apiResult: any = await axios.delete(`${this.url}/${id}`, {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      });
      apiResult = apiResult.data;

      if (apiResult.status === 200 && !!apiResult.data.deletedRows) {
        result = true;
      }
    } catch (e) {}

    return result;
  }

  public async getRouteById(id: string): Promise<Route | null> {
    let result: any;

    try {
      result = await axios.get(`${this.url}/${id}`, {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      });
      result = result.data;

      if (result.status === 200) {
        result = result.data;
      } else {
        result = null;
      }
    } catch (e) {
      result = null;
    }

    return result;
  }

  public async updateRoute(id: string, data: Route): Promise<Route| null> {
    let result: any;

    try {
      result = await axios.put(`${this.url}/${id}`, data, {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      });
      result = result.data;

      if (result.status === 200) {
        result = result.data;
      } else {
        result = null;
      }
    } catch (e) {
      result = null;
    }

    return result;
  }
}

export { RoutesApi }