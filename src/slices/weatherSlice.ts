import {
  createSlice,
} from '@reduxjs/toolkit';

import fetchWeatherFromIp from './ipSlice';
import fetchWeatherFromCity from './latAndLonSlice';
import { IWeather } from '../interfaces/weather.interface';

const initialState: IWeather = {
  daily: [],
  city: '',
};
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrent: (state, { payload }) => {
      console.log(payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherFromIp.fulfilled, (state, { payload: {city, daily } }) => {
        state.daily = daily;
        state.city = city;
      })
      .addCase(fetchWeatherFromCity.fulfilled, (state, { payload: {city, daily } }) => {
        state.daily = daily;
        state.city = city;
      });
  },
});
export const { actions } = weatherSlice;
export default weatherSlice.reducer;