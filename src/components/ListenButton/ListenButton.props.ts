import { DetailedHTMLProps, HTMLAttributes } from 'react';
// import { IWeatherItem } from '../../interfaces/weather.interface';

export interface ListenButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  sayWeather: () => void;
}