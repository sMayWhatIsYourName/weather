export interface IWeatherAbout {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherItem {
  dt: number;
  sunrise: number;
  sunset: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  weather: IWeatherAbout[];
  temp: number;
  feels_like: number;
}

export interface IWeatherDay {
  id: number;
  data: IWeatherItem;
}

export interface IWeather {
  daily: IWeatherDay[];
  city: string;
  chosenId: number;
}