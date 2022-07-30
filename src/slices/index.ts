import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './weatherSlice';
export const store = configureStore({
  reducer: weatherSlice,
});

export type AppDispatch = typeof store.dispatch