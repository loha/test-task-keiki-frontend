import axios from 'axios';
import { CitiesApiContract } from './contracts';
import { City } from '~/types/cities';

class CitiesApi implements CitiesApiContract {
  protected url = `${process.env.apiUrl}/city`;

  public async getList(): Promise<City[]> {
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

export { CitiesApi }