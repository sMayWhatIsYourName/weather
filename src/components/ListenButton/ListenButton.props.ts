import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';
// import { IWeatherItem } from '../../interfaces/weather.interface';

export interface ListenButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  sayWeather: (setIsSpeaking: Dispatch<SetStateAction<boolean>>) => void;
}