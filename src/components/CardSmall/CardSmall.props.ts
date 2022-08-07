import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CardSmallProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string | number;
  type: 'feels' | 'humidity' | 'wind' | 'pressure';
}