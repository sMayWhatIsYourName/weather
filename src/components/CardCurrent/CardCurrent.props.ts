import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IWeatherItem } from '../../interfaces/weather.interface';

export interface CardCurrentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  city: string;
  weather: IWeatherItem
}