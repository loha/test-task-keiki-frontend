import axios from 'axios';
import { Transport, GetTransportsListFilter } from '~/types/transports';
import { TransportsApiContract } from './contracts';

class TransportsApi implements TransportsApiContract {
  protected url = `${process.env.apiUrl}/transport`;

  public async getList(filter: GetTransportsListFilter = {}): Promise<Transport[]> {
    let result: any = [];

    try {
      result = await axios.get(`${this.url}/list`, {
        params: filter,
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

  public async createTransport(data: Transport): Promise<Transport | null> {
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

  public async deleteTransport(id: string): Promise<boolean> {
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

  public async getTransportById(id: string): Promise<Transport | null> {
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

  public async updateTransport(id: string, data: Transport): Promise<Transport | null> {
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

export { TransportsApi };
