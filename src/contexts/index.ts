import { createContext } from 'react';

export interface IWeatherContext {
  currentWeatherId: number;
  setCurrentWeatherId: (id: number) => void;
}

export const WeatherContext = createContext<IWeatherContext>({
  currentWeatherId: 0,
  setCurrentWeatherId: () => {},
});

export default createContext({});