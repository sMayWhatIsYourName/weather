import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IWeatherItem } from '../../interfaces/weather.interface';

export interface CardSideProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  weather: IWeatherItem,
  weatherId: number;
}