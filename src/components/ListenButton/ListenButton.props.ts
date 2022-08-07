import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ListenButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  sayWeather: () => void;
}