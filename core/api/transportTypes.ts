import axios from 'axios';
import { TransportTypesApiContract } from './contracts';
import { TransportType } from '~/types/transportTypes';

class TransportTypeApi implements TransportTypesApiContract {
  protected url = `${process.env.apiUrl}/transport-type`;

  public async getList(): Promise<TransportType[]> {
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

export { TransportTypeApi };
