import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CardSideProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dayId: number;
}