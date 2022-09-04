import axios from 'axios';
import {
  createAsyncThunk
} from '@reduxjs/toolkit';

import { APIPaths } from '../routes';
import { IIpService } from '../interfaces/ip.interface';

export default createAsyncThunk(
  'weather/ip',
  async () => {
    const ipResponse = await axios.get(APIPaths.getIp());
    const ipData: IIpService = ipResponse.data;
    const weatherResponse = await axios.get(APIPaths.getWeather(ipData.latitude, ipData.longitude));
    const { data: { daily, current, timezone } } = weatherResponse;
    return {
      timeZone: timezone,
      daily,
      current,
      city: ipData.city,
    }
  }
);