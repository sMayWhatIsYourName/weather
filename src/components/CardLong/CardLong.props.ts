import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CardLongProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
  type: 'sunrise' | 'sunset';
}