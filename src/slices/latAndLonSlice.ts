import axios from 'axios';
import {
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { APIPaths } from '../routes';
import { ILatAndLon } from '../interfaces/latAndLon.interface';
import { returnNormalizedData } from '../helpers/helpers';

export default createAsyncThunk(
  'weather/latAndLon',
  async (city: string) => {
    const latAndLonResponse = await axios.get(APIPaths.getLatAndLon(city));
    const latAndLonData: ILatAndLon[] = latAndLonResponse.data;
    const firstElement = latAndLonData[0];
    const weatherResponse = await axios.get(APIPaths.getWeather(firstElement.lat, firstElement.lon));
    const { data } = weatherResponse;
    return returnNormalizedData(data.daily, data.current, firstElement.name);
  }
);