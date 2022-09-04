import {
  createSlice,
} from '@reduxjs/toolkit';

import fetchWeatherFromIp from './ipSlice';
import fetchWeatherFromCity from './latAndLonSlice';
import { IWeather } from '../interfaces/weather.interface';
import { returnNormalizedData } from '../helpers/helpers';

const initialState: IWeather = {
  daily: [],
  city: '',
  chosenId: 0,
  timeZone: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrent: (state, { payload: { id } }) => {
      state.chosenId = id;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherFromIp.fulfilled, (state, { payload: { city, daily, current, timeZone } }) => {
        state.daily = returnNormalizedData(daily.slice(1, -1), current);
        state.city = city;
        state.timeZone = timeZone;
      })
      .addCase(fetchWeatherFromCity.fulfilled, (state, { payload: { city, daily, current, timeZone } }) => {
        state.daily = returnNormalizedData(daily.slice(1, -1), current);
        state.city = city;
        state.timeZone = timeZone;
      });
  },
});
export const { actions } = weatherSlice;
export default weatherSlice.reducer;