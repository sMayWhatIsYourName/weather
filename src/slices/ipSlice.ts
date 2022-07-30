import axios from 'axios';
import {
  createAsyncThunk
} from '@reduxjs/toolkit';

import { APIPaths } from '../routes';
import { IIpService } from '../interfaces/ip.interface';
import { returnNormalizedData } from '../helpers/helpers';

export default createAsyncThunk(
  'weather/ip',
  async () => {
    const ipResponse = await axios.get(APIPaths.getIp());
    const ipData: IIpService = ipResponse.data;
    const weatherResponse = await axios.get(APIPaths.getWeather(ipData.latitude, ipData.longitude));
    const { data } = weatherResponse;
    return returnNormalizedData(data.daily, data.current, ipData.city);
  }
);